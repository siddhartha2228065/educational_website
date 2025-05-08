import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import logo from "../../assets/hero1.jpg";

// Define your navigation menu
const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "#service" },
  { id: 3, title: "About Us", path: "#card" },
  { id: 4, title: "Contact Us", path: "#contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Handle click on menu item
  const handleLinkClick = (title) => {
    setActive(title);
    setIsMenuOpen(false);
  };

  // Determine background and text colors based on scroll state
  const navbarBg = scrolled ? "bg-blue-600" : "bg-white";
  const textColor = scrolled ? "text-white" : "text-blue-700";
  const menuTextColor = scrolled ? "text-white" : "text-gray-700";
  const activeTextColor = scrolled ? "text-yellow-300" : "text-blue-700";
  const activeMenuBg = scrolled ? "bg-blue-700" : "bg-blue-100";
  const underlineColor = scrolled ? "bg-yellow-400" : "bg-blue-600";

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg} ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Learners Point Logo" 
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shadow-md"
          />
          <span
            className={`font-bold text-xl sm:text-4xl transition-colors duration-300 ${textColor}`}
          >
            <span className="hidden sm:inline">Learners Point Coaching Centre</span>
            <span className="sm:hidden">LP</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4">
          {NavbarMenu.map((menu) => (
            <li key={menu.id} className="relative">
              <a
                href={menu.path}
                className={`relative inline-block py-2 px-3 font-medium transition-colors duration-200
                  ${
                    active === menu.title
                      ? activeTextColor
                      : `${menuTextColor} hover:${activeTextColor}`
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={() => handleLinkClick(menu.title)}
                aria-current={active === menu.title ? "page" : undefined}
              >
                <span>{menu.title}</span>
                {/* Simple underline for active item */}
                {active === menu.title && (
                  <div
                    className={`absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-6 h-1 rounded-full ${underlineColor}`}
                  />
                )}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/enroll"
              className={`ml-4 font-semibold px-5 py-2 rounded-full transition duration-200 focus:outline-none
                ${
                  scrolled
                    ? "bg-yellow-400 text-blue-700 hover:bg-yellow-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
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
          className="lg:hidden p-2 rounded-md focus:outline-none"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <IoMdClose className={`text-2xl ${textColor}`} />
          ) : (
            <IoMdMenu className={`text-2xl ${textColor}`} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          className={`lg:hidden ${navbarBg} shadow-lg absolute w-full left-0 top-full z-40`}
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-2">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.path}
                    className={`block py-2 px-3 rounded-md font-medium transition-colors duration-200
                      ${
                        active === menu.title
                          ? scrolled
                            ? "bg-blue-700 text-yellow-300"
                            : "bg-blue-100 text-blue-700"
                          : scrolled
                            ? "text-white hover:bg-blue-500"
                            : "text-gray-700 hover:bg-blue-100"
                      }
                      focus:outline-none`}
                    onClick={() => handleLinkClick(menu.title)}
                    aria-current={active === menu.title ? "page" : undefined}
                  >
                    {menu.title}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/enroll"
                  className={`block w-full mt-3 font-semibold px-5 py-2 rounded-full transition duration-200 text-center focus:outline-none
                    ${
                      scrolled
                        ? "bg-yellow-400 text-blue-700 hover:bg-yellow-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
