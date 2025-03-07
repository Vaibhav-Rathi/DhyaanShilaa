import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle smooth scrolling with proper TypeScript types
  const scrollToSection = (sectionId: string, event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Close mobile menu after clicking a link
      setIsMenuOpen(false);
      
      // Smooth scroll to the section
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="bg-indigo-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <nav
          className={`absolute md:relative top-16 left-0 w-full md:w-auto md:flex space-y-4 md:space-y-0 md:space-x-6 bg-indigo-900 md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none transition-all ${
            isMenuOpen ? "block" : "hidden"
          } md:flex`}
        >
          <a 
            href="#home" 
            className="block md:inline hover:text-yellow-300"
            onClick={(e) => scrollToSection('home', e)}
          >
            HOME
          </a>
          <a 
            href="#about" 
            className="block md:inline hover:text-yellow-300"
            onClick={(e) => scrollToSection('about', e)}
          >
            ABOUT US
          </a>
          <a 
            href="#courses" 
            className="block md:inline hover:text-yellow-300"
            onClick={(e) => scrollToSection('courses', e)}
          >
            COURSES
          </a>
          <a 
            href="#faq" 
            className="block md:inline hover:text-yellow-300"
            onClick={(e) => scrollToSection('faq', e)}
          >
            FAQ
          </a>
          <a 
            href="#blog" 
            className="block md:inline hover:text-yellow-300"
            onClick={(e) => scrollToSection('blog', e)}
          >
            BLOG
          </a>
        </nav>
        
        <div className="hidden md:flex space-x-3">
          <button
            className="border border-white px-4 py-1 hover:bg-white hover:text-indigo-900 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="border border-white px-4 py-1 hover:bg-white hover:text-indigo-900 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};