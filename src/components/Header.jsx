import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logoLight from "../assets/profile-light.png";
import logoDark from "../assets/profile-dark.png";
import { useTheme } from "../theme";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Blogs", to: "/blogs" },
    { label: "Projects", to: "/projects" },
  ];

  // ปิด dropdown ถ้าคลิกนอก
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={theme === "dark" ? logoDark : logoLight} alt="Logo" />
          <span>WATKORN.ME</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="header-nav-desktop">
          {menuItems.map(item => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Dark mode always visible */}
          <ThemeToggle />

          {/* Three-dot menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="header-mobile-btn"
              aria-label="Open menu"
            >
              ⋮
            </button>

            {/* Dropdown menu with animation */}
            <div
              className={`absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded shadow-lg overflow-hidden
                transition-all duration-300 ease-out transform origin-top
                ${mobileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
              `}
            >
              {menuItems.map(item => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) => 
                    `block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
