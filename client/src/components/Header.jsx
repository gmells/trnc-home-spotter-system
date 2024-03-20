import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/home.png";

export default function Header() {
  return (
    <header className="bg-slate-800 shadow-md">
      <div className="flex justify-between items-center w-[92%] mx-auto p-3">
        <Link to="/">
          <div className="font-bold text-sm sm:text-xl flex flex-wrap hover:shadow-lg items-center">
            <img className="w-7" src={logo} />
            <span className="text-slate-500">TRNC</span>
            <span className="text-slate-200">HOMESPOTTER</span>
          </div>
        </Link>

        <div className="flex md:flex-row flex-col md:static absolute bg-slate-800 md:min-h-fit min-h-[60vh] gap-[4vw]  items-center left-0 top-[9%] md:w-auto w-full ">
          <Link to="/">
            <div className="bg-black text-white rounded-lg p-2 hover:bg-slate-600 ">
              {" "}
              Home{" "}
            </div>
          </Link>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
            <Link to="/about">
              <li className="text-white hover:underline">About</li>
            </Link>
            <Link to="/properties">
              <li className="text-white hover:underline">Properties</li>
            </Link>
            <Link to="/sign-in">
              <li className="text-white hover:underline">Sign In</li>
            </Link>
          </ul>

          <Link to="/contact">
            <div className="bg-black text-white rounded-lg p-2 hover:bg-slate-600">
              {" "}
              Contact us{" "}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
