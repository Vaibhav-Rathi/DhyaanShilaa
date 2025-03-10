import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../assets/user1.png'; // Adjust this import path as needed

interface TopNavigationProps {
  heading: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ heading }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!searchTerm) {
      document.querySelectorAll(".highlight").forEach(el => {
        (el as HTMLElement).outerHTML = (el as HTMLElement).textContent || "";
      });
      return;
    }

    const walkDOM = (node: Node): void => {
      if (node.nodeType === 3) { // Text node
        const regex = new RegExp(`(${searchTerm})`, "gi");
        if (node.textContent && regex.test(node.textContent)) {
          const span = document.createElement("span");
          span.innerHTML = node.textContent.replace(
            regex,
            '<mark class="highlight bg-yellow-300">$1</mark>'
          );
          node.parentNode?.replaceChild(span, node);
        }
      } else {
        Array.from(node.childNodes).forEach(walkDOM);
      }
    };

    document.querySelectorAll(".highlight").forEach(el => {
      (el as HTMLElement).outerHTML = (el as HTMLElement).textContent || "";
    });
    walkDOM(document.body);
  }, [searchTerm]);

  const handleLogout = (): void => {
    localStorage.removeItem("authToken");
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
    });
    navigate("/login");
  };

  return (
    <header className="bg-white p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow gap-2 sm:gap-4">
      <div className="flex items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">{heading}</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="border rounded-full py-1 sm:py-2 px-3 sm:px-4 w-full focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <img
              src={ProfileImage}
              alt="User Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="border-1 rounded-md py-1 px-2 sm:py-2 sm:px-3 bg-indigo-900 hover:bg-blue-700 text-white text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};