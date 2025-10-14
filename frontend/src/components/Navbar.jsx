import { useState } from "react";

import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    const handleLogout = () => {
    // Remove JWT tokens
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    toast.success("Logged out successfully!");

    // Redirect to login page
    navigate("/");
  };
  return (
    <div>
      <nav className="flex flex-wrap items-center justify-between p-3 bg-gray-100">
        {/* Logo */}
        <img
          src={logo}
          className="h-16 w-18"
          alt="Job Portal"
          width="100"
        />

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            <img
              className={menuOpen ? "hidden" : "block"}
              src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
              width="40"
              height="40"
              alt="Menu"
            />
            <img
              className={menuOpen ? "block" : "hidden"}
              src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
              width="40"
              height="40"
              alt="Close"
            />
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`w-full flex-grow md:flex md:items-center md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="ml-40 text-right text-bold mt-5 md:mt-0 border-t-2 border-white md:border-none">
            <a
              href="/admindashboard"
              className="block md:inline-block text-navy hover:text-teal-400 px-3 py-3 border-b-2 border-transparent md:border-none"
            >
              Dashboard
            </a>          

               <a
              href="/uservisits"
              className="block md:inline-block text-navy hover:text-teal-400 px-3 py-3 border-b-2 border-transparent md:border-none"            >
              User ManagementSystem
            </a>
          </div>
        </div>

        {/* Logout Button */}
    
          <button
             onClick={handleLogout}
            className="hidden md:flex px-4 py-2 text-right bg-aqua text-navy font-bold hover:bg-teal-400 hover:text-black md:rounded"
          >
            Logout
          </button>
        
      </nav>
    </div>
  );
}

export default Navbar;