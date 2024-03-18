import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-700 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
      <Link to= '/'>
        <div className="font-bold text-sm sm:text-xl flex flex-wrap hover:shadow-lg">
          <span className="text-slate-500">TRNC</span>
          <span className="text-slate-200">HOMESPOTTER</span>
        </div>
     </Link>

        <div className="flex gap-4 items-center">
          <Link to = '/'><div className="bg-black text-white rounded-lg p-2 hover:bg-slate-800"> Home </div></Link>
          <ul className="flex gap-4">
          <Link to= '/about'><li className="text-white hover:underline">About</li></Link>
          <Link to = '/properties'><li className="text-white hover:underline">Properties</li></Link>
          <Link to = '/sign-in'><li className="text-white hover:underline">Sign In</li></Link>
          </ul>
        </div>

        <Link to = '/contact'><div className="bg-black text-white rounded-lg p-2 hover:bg-slate-800"> Contact us</div></Link>
      </div>
    </header>
  );
}
