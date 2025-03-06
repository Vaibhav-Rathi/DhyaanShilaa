import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaCalendarAlt, FaBars } from "react-icons/fa";

interface Tab {
  name: string;
  icon: any;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const tabs: Tab[] = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Course", icon: <FaBook /> },
    { name: "My Events", icon: <FaCalendarAlt /> },
  ];

  return (
    <>
      {/* Hamburger icon for mobile view */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 text-gray-700 p-2 bg-gray-50 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed w-64 h-screen bg-gray-50 shadow-md flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block`}
      >
        <div className="bg-blue-900 text-white text-2xl font-bold text-center py-6">
          Einfratech
        </div>
        <ul className="mt-4">
          {tabs.map((tab) => (
            <li key={tab.name} className="mb-2">
              <NavLink
                to={
                  tab.name === "Dashboard"
                    ? "/dashboard"
                    : `/${tab.name.toLowerCase().replace(" ", "")}`
                }
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-blue-900 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-blue-900 text-white font-semibold" : ""
                  }`
                }
              >
                <span className="text-lg mr-3">{tab.icon}</span>
                <span>{tab.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close sidebar when clicked outside in mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
