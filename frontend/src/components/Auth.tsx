import { Link } from "react-router-dom";

export function Auth() {
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center flex-col items-center">
        <div className="text-3xl font-extrabold">Create an account</div>
        <div className="text-slate-300">Already has an account? <Link to='/signIn' className="underline">Login</Link></div>
      </div>
    </div>
  );
}
