import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="text-white p-3 max-w-lg mx-auto ">
      <h1 className="text-white text-4xl my-7 text-center font-semibold">
        Sign up
      </h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="username"
        />

        <input
          type="email"
          placeholder="email"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="email"
        />

        <input
          type="password"
          placeholder="password"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="password"
        />

        <button className="bg-slate-200 text-slate-700 p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 font-bold">
          sign up
        </button>
      </form>

      <div className="flex gap-3 mt-4">
        <p> Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 hover:font-semibold">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
