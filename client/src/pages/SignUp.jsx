import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formInfo, setformInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformInfo({
      ...formInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);

        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="text-white p-3 max-w-lg mx-auto ">
      <h1 className="text-white text-4xl my-7 text-center font-semibold">
        Sign Up
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="username"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border-slate-800 bg-slate-800 rounded-lg p-3"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className=" bg-slate-200 text-slate-700 p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 font-bold"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-3 mt-4">
        <p> Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500 hover:font-semibold">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-4 ">Error Details: {error}</p>}
    </div>
  );
}
