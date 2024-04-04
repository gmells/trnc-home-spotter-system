import React from "react";

export default function SignIn() {
  return (
    <div className="text-white p-3 max-w-lg mx-auto ">
      <h1 className="text-white text-4xl my-7 text-center font-semibold">
        Sign in
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

        <button className="bg-slate-200 text-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          sign up
        </button>
      </form>
    </div>
  );
}
