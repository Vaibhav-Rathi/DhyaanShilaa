import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
    return (
      <header className="bg-indigo-900 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Logo/>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-yellow-300">HOME</a>
            <a href="#" className="hover:text-yellow-300">ABOUT US</a>
            <a href="#" className="hover:text-yellow-300">COURSES</a>
            <a href="#" className="hover:text-yellow-300">FAQ</a>
            <a href="#" className="hover:text-yellow-300">BLOG</a>
          </nav>
          <div className="space-x-3">
            <button className="border border-white px-4 py-1 hover:bg-white hover:text-indigo-900 transition"onClick={() => navigate("/register")}>Register</button>            
            <button className="border border-white px-4 py-1 hover:bg-white hover:text-indigo-900 transition"onClick={() => navigate("/login")}>Login</button>            
          </div>
        </div>
      </header>
    );
  };

  