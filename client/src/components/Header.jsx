import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/home.png";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function onToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="bg-slate-800 shadow-md">
      <nav className="flex justify-between items-center w-[92%] mx-auto p-3">
        <Link to="/" onClick={closeMenu}>
          <div className="font-bold text-sm sm:text-xl flex flex-wrap hover:shadow-lg items-center">
            <img className="w-7" src={logo} alt="Logo" />
            <span className="text-slate-500">TRNC</span>
            <span className="text-slate-200">HOMESPOTTER</span>
          </div>
        </Link>

        <div
          className={`nav-panel flex md:flex-row md:top-[6%] flex-col md:static absolute bg-slate-900 md:min-h-fit min-h-[60vh] gap-[4vw]  items-center left-0 top-0 md:w-auto w-full pt-6 transition-all duration-300 ${
            menuOpen ? " top-[6%]" : "-top-[100%] hidden"
          }`}
          onClick={closeMenu}
        >
          <ul className="flex text-center md:flex-row flex-col md:items-center md:gap-[4vw] gap-6">
            <Link to="/">
              <li className="bg-black text-white w-20 md:items-center rounded-lg p-2 hover:bg-slate-600">
                Home
              </li>
            </Link>

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
            <button className="bg-black text-white rounded-lg p-2 hover:bg-slate-600 flex gap-6">
              Contact us
            </button>
          </Link>
        </div>

        {menuOpen ? (
          <IoMdClose
            onClick={onToggleMenu}
            className="menu w-7 h-7 cursor-pointer text-white md:hidden"
          />
        ) : (
          <HiOutlineMenu
            onClick={onToggleMenu}
            className="menu w-7 h-7 cursor-pointer text-white md:hidden"
          />
        )}
      </nav>
    </header>
  );
}