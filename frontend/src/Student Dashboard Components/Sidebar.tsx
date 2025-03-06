import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaCalendarAlt, FaCog, FaQuestionCircle } from "react-icons/fa";

interface Tab {
  name: string;
  icon: any;
}

const Sidebar: React.FC = () => {
  const tabs: Tab[] = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "My Course", icon: <FaBook /> },
    { name: "My Events", icon: <FaCalendarAlt /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Assistance", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-50 shadow-md flex flex-col fixed">
      <div className="bg-blue-900 text-white text-2xl font-bold text-center py-6">
        Einfratech
      </div>
      <ul className="mt-4">
        {tabs.map((tab) => (
          <li key={tab.name} className="mb-2">
            <NavLink
              to={tab.name === "Dashboard" ? "/dashboard" : `/${tab.name.toLowerCase().replace(" ", "")}`}
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
  );
};

export default Sidebar;
