import React, { useState } from "react";
import favicon from "../assets/favicon.svg";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const {user} = useUser()
  const {openSignIn} = useClerk()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl px-4 transition-all duration-300"
    >
    <nav
      className="fixed  left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl px-4 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="bg-black/70 border border-white/10 rounded-full px-6 py-3 shadow-2xl backdrop-blur-md transition-all duration-300">
        <div className="flex justify-between items-center">
          {/*  Logo + Brand Name (Properly aligned) */}
          <a
            href="#home"
            className="flex items-center gap-2 focus:outline-none rounded-md"
            aria-label="AceAI Home"
          >
            <img
              src={favicon}
              alt="AceAI Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain cursor-pointer"
              onClick={() => navigate('/')}
            />

            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFD700] text-transparent bg-clip-text">
              Ace.ai
            </span>
          </a>

          {/* Desktop Menu */}
          <div
            className="hidden lg:flex items-center space-x-4 xl:space-x-6"
            role="menubar"
          >
            {[
              { label: "Home", href: "#home" },
              { label: "AI Tools", href: "#Aitools" },
              { label: "Plan", href: "#plan" },
              { label: "Contact", href: "#contact" },
              // { label: "Team", href: "#team" },
              // { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-400 hover:text-[#ff5500] px-3 py-2 text-sm font-medium transition-colors font-manrope focus:outline-none rounded-md"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Call-to-Action Button */}
          <div className="hidden md:block">
            {
              user ? <UserButton />
              :
              (
                <button onClick={openSignIn}
              type="button"
              className="relative inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-[#ffbb00] to-[#FF00FF] text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              aria-label="get started"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none" 
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </button>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center text-gray-400 hover:text-[#00FFFF] focus:outline-none transition-all"
              aria-expanded={menuOpen}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col items-center space-y-3 text-center">
            {[
              { label: "Home", href: "#home" },
              { label: "Features", href: "#features" },
              { label: "Process", href: "#process" },
              { label: "Works", href: "#works" },
              { label: "Team", href: "#team" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-[#00FFFF] font-medium text-sm transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
            onClick={openSignIn}
              type="button"
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-black font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  </motion.nav>
  );
};

export default Navbar;
