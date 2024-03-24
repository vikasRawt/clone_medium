import { Link } from "react-router-dom";
import { SignupLabel } from "./SignLabel";

export function Auth() {
  return (
    <div
      className="min-h-screen flex justify-center
    items-center flex-col"
    >
      <div className="flex justify-center items-center text-center flex-col">
        <div className="text-3xl font-extrabold">Create an account</div>
        <div className="text-slate-300">
          Already have an account?
          <Link to="/signIn" className="underline hover:text-black">
            Login
          </Link>
        </div>
      </div>
      <SignupLabel/>
    </div>
  );
}
