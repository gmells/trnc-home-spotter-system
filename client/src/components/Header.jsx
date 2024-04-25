import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/home.png";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(() => {
    return localStorage.getItem("menuOpen") === "true" ? true : false;
  });

  // Update local storage when menuOpen state changes
  useEffect(() => {
    localStorage.setItem("menuOpen", menuOpen);
  }, [menuOpen]);

  function onToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setMenuOpen(true);
    }
  }, []);

  return (
    <header className="bg-slate-800 shadow-md ">
      <nav className="flex justify-between items-center w-[100%] mx-auto p-3">
        <Link to="/" onClick={closeMenu}>
          <div className="relative  font-bold text-sm sm:text-xl flex hover:shadow-lg items-center ">
            <img className="w-7" src={logo} alt="Logo" />
            <span className="text-slate-500">TRNC</span>
            <span className="text-slate-200">HOMESPOTTER</span>
          </div>
        </Link>

        <form className="bg-slate-500 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent w-24 sm:w-48"
          />
          <FaSearch className="text-slate-800 " />
        </form>

        <div
          className={`nav-panel flex md:flex-row flex-col md:static absolute bg-slate-900 md:justify-evenly md:bg-transparent min-h-[60vh] md:min-h-[7vh] gap-[4vw] items-center left-0 top-0 w-full h-[50%] pt-6 md:pt-0 ${
            menuOpen || window.innerWidth >= 768
              ? "top-[10%]"
              : "-top-[100%] hidden"
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

            <Link to="/contact">
              <li className="text-white hover:underline">Contact us</li>
            </Link>
          </ul>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile picture"
              />
            ) : (
              <button className="bg-black text-white rounded-lg p-2 hover:bg-slate-600 flex gap-6">
                Sign In
              </button>
            )}
          </Link>
        </div>

        <div className="md:hidden">
          {menuOpen ? (
            <IoMdClose
              onClick={onToggleMenu}
              className="menu w-7 h-7 cursor-pointer text-white"
            />
          ) : (
            <HiOutlineMenu
              onClick={onToggleMenu}
              className="menu w-7 h-7 cursor-pointer text-white"
            />
          )}
        </div>
      </nav>
    </header>
  );
}
