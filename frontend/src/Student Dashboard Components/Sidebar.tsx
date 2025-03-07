import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaBars, FaTimes } from "react-icons/fa";

interface Tab {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when screen size becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const tabs: Tab[] = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "My Course", icon: <FaBook />, path: "/mycourse" },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-600 text-2xl p-2 bg-white rounded-md shadow-md sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar container - We're setting overflow-hidden on the container */}
      <div 
        className={`sidebar fixed top-0 left-0 h-full overflow-hidden transition-all duration-300 z-40
        ${isOpen ? "w-64" : "w-0 md:w-64"}`}
      >
        {/* Actual sidebar content with transform for smoother animation */}
        <div 
          className={`h-full bg-gray-50 shadow-md flex flex-col w-64 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="bg-blue-900 flex items-center justify-center text-white text-xl sm:text-2xl font-bold text-center py-4 sm:py-6">
            <img src="/Logo.png" alt="logo" width={100} className="mr-2" />
            <span>Einfratech</span>
          </div>

          <ul className="mt-4 w-full overflow-y-auto">
            {tabs.map((tab) => (
              <li key={tab.name} className="mb-2 px-3">
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 sm:px-6 sm:py-3 text-gray-500 hover:bg-gray-100 hover:text-blue-900 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-blue-900 text-white font-semibold" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg mr-3">{tab.icon}</span>
                  <span>{tab.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;