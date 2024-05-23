import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/images/home.png";
import Logo from "../components/Logo.jsx";
import { FaCompressAlt } from "react-icons/fa";

import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("searchTerm", searchTerm);
    const searchQuery = searchParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermUrl = searchParams.get("searchTerm");
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl);
    }
  }, [location.search]);
  return (
    <header>
      <nav className="fixed h-20 border-b-0.5 border-gray-300 flex items-center right-0 left-0 top-0 z-50 bg-opacity-80 backdrop-blur-[20px] bg-gray-100">
        <div className="px-4 w-full flex items-center justify-between max-w-screen-lg mx-auto z-50">
          <div className="w-28 h-28 flex items-center justify-center cursor-pointer">
            <Link to="/">
              <a className="text-gray-600 font-semibold" to="/">
                <Logo />
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-between gap-8 max-w-screen-lg z-50">
            <form
              onSubmit={handleSubmit}
              className="relative md:w-64 hidden md:block"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-200 border text-gray-600 border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Search
              </button>
            </form>
            <Link to="/">
              <a
                className="text-gray-600 font-semibold hover:text-gray-800 hidden md:block"
                to="/"
              >
                Home
              </a>
            </Link>

            <Link to="/about">
              <a
                className="text-gray-600 font-semibold hover:text-gray-800 hidden md:block"
                to="/about"
              >
                About
              </a>
            </Link>

            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={currentUser.avatar}
                  alt="profile picture"
                />
              ) : (
                <a
                  className="text-gray-600 font-semibold hover:text-gray-800 hidden md:block"
                  to="/sign-in"
                >
                  Sign In
                </a>
              )}
            </Link>

            <Link to="/">
              <a href="#">
                <img src={profile} alt="profile" className="w-12 h-12" />
              </a>
            </Link>

            <div
              className="w-14 h-14 flex items-center justify-center border border-gray-300 rounded-full cursor-pointer md:hidden"
              onClick={toggleMobileMenu}
            >
              <svg
                width="26"
                height="15"
                viewBox="0 0 26 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0712891"
                  y="6.88281"
                  width="25"
                  height="2"
                  fill="#030211"
                />
                <rect
                  x="12.6279"
                  y="0.807129"
                  width="12.4168"
                  height="2"
                  fill="#030211"
                />
                <rect
                  x="0.0644531"
                  y="12.9092"
                  width="12.4168"
                  height="2"
                  fill="#030211"
                />
              </svg>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden flex flex-col items-center gap-5 py-36 px-8 fixed top-0 right-0 justify-center h-screen w-full bg-opacity-97 backdrop-blur-[20px] bg-gray-100 z-50">
            <div
              onClick={closeMobileMenu}
              className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <form onSubmit={handleSubmit} className="relative md:w-64">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-200 text-gray-600 border border-gray-300 rounded-lg py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={closeMobileMenu}
                className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Search
              </button>
            </form>
            <Link to="/" onClick={closeMobileMenu}>
              <a
                className="text-gray-600 font-semibold text-2xl text-center hover:text-gray-800"
                to="/"
              >
                Home
              </a>
            </Link>

            <Link to="/about" onClick={closeMobileMenu}>
              <a
                className="text-gray-600 font-semibold text-2xl text-center hover:text-gray-800"
                to="/about"
              >
                About
              </a>
            </Link>

            <Link onClick={closeMobileMenu} to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={currentUser.avatar}
                  alt="profile picture"
                />
              ) : (
                <a
                  className="text-gray-600 font-semibold text-2xl text-center hover:text-gray-800"
                  to="/sign-in"
                >
                  Sign In
                </a>
              )}
            </Link>

            <div className="footer-buttom text-lg flex flex-col items-center gap-20">
              <p className="text-gray-600 font-semibold text-center">
                &copy; 2024 TRNC. All rights reserved.
              </p>
              <p className="text-gray-600 developedby text-lg">
                Developed by <a href="#">Victor Mayowa Adedayo</a>
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
