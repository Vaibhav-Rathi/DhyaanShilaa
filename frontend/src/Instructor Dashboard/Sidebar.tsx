import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (location.pathname.startsWith("/ins-dashboard/create-course")) {
      setActiveSection("Create New Course");
    } else if (location.pathname.startsWith("/ins-dashboard/my-courses")) {
      setActiveSection("My Courses");
    } else {
      setActiveSection("Dashboard");
    }
  }, [location.pathname]);

  const handleNavigation = (section: string, path: string) => {
    setActiveSection(section);
    navigate(path);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden absolute top-0 left-4 z-50 bg-[#1E1E50] text-white p-2 rounded w-fit"
          onClick={() => setIsOpen(true)}
        >
          <IoMenu className="text-2xl" />
        </button>
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 w-64 bg-[#1E1E50] text-white p-5 h-screen z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:block md:h-screen overflow-y-auto`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent w-fit"
          onClick={() => setIsOpen(false)}
        >
          <IoClose className="text-2xl" />
        </button>

        <h1 className="text-xl font-bold">EinfraTech</h1>
        <nav className="mt-10">
          <ul>
            <li
              className={`mb-4 p-2 cursor-pointer rounded ${
                activeSection === "Dashboard"
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => handleNavigation("Dashboard", "/ins-dashboard")}
            >
              📊 Dashboard
            </li>
            <li
              className={`mb-4 p-2 cursor-pointer rounded ${
                activeSection === "Create New Course"
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-700"
              }`}
              onClick={() =>
                handleNavigation("Create New Course", "/ins-dashboard/create-course")
              }
            >
              📚 Create New Course
            </li>
            <li
              className={`mb-4 p-2 cursor-pointer rounded ${
                activeSection === "My Courses"
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-700"
              }`}
              onClick={() =>
                handleNavigation("My Courses", "/ins-dashboard/my-courses")
              }
            >
              📂 My Courses
            </li>
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};