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
    closeMobileMenu();
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTermUrl = searchParams.get("searchTerm");
    if (searchTermUrl) {
      setSearchTerm(searchTermUrl);
    }
  }, [location.search]);
  return (
    <header class="bg-white">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <Link to="/">
            <a href="#" class="-m-1.5 p-1.5">
              <Logo />
            </a>
          </Link>
        </div>
        <div class="flex lg:hidden">
          <button
            onClick={toggleMobileMenu}
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span class="sr-only">Open main menu</span>
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
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12 items-center">
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
            <a class="text-sm font-semibold leading-6 text-gray-900" to="/">
              Home
            </a>
          </Link>

          <Link to="/about">
            <a
              class="text-sm font-semibold leading-6 text-gray-900"
              to="/about"
            >
              About
            </a>
          </Link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          {currentUser ? (
            <Link to="/profile">
              <a
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                to="/profile"
              >
                Profile
              </a>
            </Link>
          ) : (
            <Link to="/sign-in">
              <a
                class="hover:bg-gray-50  leading-6 text-gray-900"
                to="/sign-in"
              >
                Sign In <span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          )}
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div class="lg:hidden" role="dialog" aria-modal="true">
          <div class="fixed inset-0 z-10"></div>
          <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <a href="/" class="-m-1.5 p-1.5">
                <Logo />
              </a>
              <button
                onClick={closeMobileMenu}
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <div class="-mx-3">
                    <form
                      onSubmit={handleSubmit}
                      className="relative md:w-64  md:block"
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

                    <div class="mt-2 space-y-2" id="disclosure-1">
                      <Link onClick={closeMobileMenu} to="/">
                        <a
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          to="/"
                        >
                          Home
                        </a>
                      </Link>
                      <Link onClick={closeMobileMenu} to="/about">
                        <a
                          class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          to="/about"
                        >
                          About
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="py-6">
                  {currentUser ? (
                    <Link onClick={closeMobileMenu} to="/profile">
                      <a
                        class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        to="/profile"
                      >
                        Profile
                      </a>
                    </Link>
                  ) : (
                    <a
                      class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      to="/sign-in"
                    >
                      Sign In
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
