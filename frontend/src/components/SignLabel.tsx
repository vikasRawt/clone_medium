import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export function SignupLabel() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
  email:"",
  password:"",
  name:"",
  });
  async function submitClick(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        inputs
      );
      const jwt = response.data;
      localStorage.setItem("Token", jwt);
      navigate("/blog");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitClick}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setInputs({
                ...inputs,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="email"
            placeholder="me@gmail.com"
            onChange={(e) => {
              setInputs({
                ...inputs,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setInputs({
                ...inputs,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div className=" flex flex-col lg:flex items-center justify-between">
          <button
            className="bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
