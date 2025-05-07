import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import LogoImage from "../../assets/hero1.jpg"; // Import your logo image

// Define your navigation menu
const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "#service" },   // updated path
  { id: 3, title: "About Us", path: "#card" },      // updated path
  { id: 5, title: "Contact Us", path: "#contact" },
];


const Navbar = () => {
  const [isMenuOpen, setIsMenuOApen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (title) => {
    setActive(title);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        background: scrolled ? "#2563eb" : "#fff",
        boxShadow: scrolled
          ? "0 2px 24px #2563eb22"
          : "0 2px 8px #0000000a",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={LogoImage}
            alt="Learners Point Logo"
            className="h-16 w-16 rounded-full object-cover shadow-md"
          />
          <span className={`font-extrabold text-4xl tracking-tight transition-colors duration-300 ${scrolled ? "text-white" : "text-blue-700"}`}>
            Learners Point Coaching Centre
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-2 md:gap-4">
          {NavbarMenu.map((menu) => (
            <li key={menu.id} className="relative">
              <a
                href={menu.path}
                className={`relative inline-block py-2 px-3 font-medium transition-colors duration-200
                  ${active === menu.title
                    ? scrolled
                      ? "text-yellow-300"
                      : "text-blue-700"
                    : scrolled
                      ? "text-white hover:text-yellow-200"
                      : "text-gray-700 hover:text-blue-600"}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
                onClick={() => handleLinkClick(menu.title)}
                aria-current={active === menu.title ? "page" : undefined}
              >
                <span>{menu.title}</span>
                {/* Animated underline on hover/active */}
                <AnimatePresence>
                  {active === menu.title && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-6 h-1 rounded-full"
                      style={{
                        background: scrolled ? "#fbbf24" : "#2563eb",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                </AnimatePresence>
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/enroll"
              className={`ml-4 font-semibold px-5 py-2 rounded-full shadow transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
                ${scrolled
                  ? "bg-yellow-400 text-blue-700 hover:bg-yellow-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"}
              `}
            >
              Join Us
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {isMenuOpen ? (
            <IoMdClose className={`text-3xl ${scrolled ? "text-white" : "text-blue-700"}`} />
          ) : (
            <IoMdMenu className={`text-3xl ${scrolled ? "text-white" : "text-blue-700"}`} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`lg:hidden ${scrolled ? "bg-blue-600" : "bg-white"} shadow-xl absolute w-full left-0 top-full z-40`}
          >
            <div className="container mx-auto px-4 py-6">
              <ul className="flex flex-col gap-3">
                {NavbarMenu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.path}
                      className={`block py-2 px-3 rounded-md font-medium transition-colors duration-200
                        ${active === menu.title
                          ? scrolled
                            ? "bg-yellow-400 text-blue-700"
                            : "bg-blue-100 text-blue-700"
                          : scrolled
                            ? "text-white hover:bg-blue-500"
                            : "text-gray-700 hover:bg-blue-100"}
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
                      onClick={() => handleLinkClick(menu.title)}
                      aria-current={active === menu.title ? "page" : undefined}
                    >
                      {menu.title}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/Enroll"
                    className={`block w-full mt-3 font-semibold px-5 py-2 rounded-full shadow transition duration-200 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
                      ${scrolled
                        ? "bg-yellow-400 text-blue-700 hover:bg-yellow-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"}
                    `}
                  >
                    Join Us
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;