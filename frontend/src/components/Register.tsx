import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ email: "" });
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setUser({ ...user, email: newEmail });
    
    if (newEmail && !validateEmail(newEmail)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submission
    if (!validateEmail(user.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", user);
      console.log("Registration successful:", response.data);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error registering user:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <a href="/" className="flex items-center text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Homepage
        </a>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-hidden rounded-lg">
        <div className="relative w-full md:w-1/2 bg-cover bg-center" style={{ 
          backgroundImage: "url('/RegisterImage.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
          <div className="relative p-10 flex flex-col h-full justify-center z-10 text-white">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700  ml-16">One Step Closer to<br />Your Dream</h1>
            <p className="mb-6 text-black ml-16">An E-Learning service ready to help you become an expert</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-indigo-900 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">Register</h2>
          <p className="text-white mb-8">Get ready for a future filled with opportunities.</p>
          
          {/* Form */}
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <input 
                type="text" 
                placeholder="Your Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-4 rounded bg-indigo-800 text-white placeholder-gray-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <input 
                type="email" 
                placeholder="Email"
                value={user.email}
                onChange={handleEmailChange}
                className={`w-full p-4 rounded bg-indigo-800 text-white placeholder-gray-300 border ${
                  errors.email ? "border-red-500" : "border-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full p-4 rounded bg-indigo-800 text-white placeholder-gray-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-300 hover:text-white"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm1.47 3.97A9.97 9.97 0 0021 12a9.97 9.97 0 00-4.53-7.97M9.53 4.03A9.97 9.97 0 003 12a9.97 9.97 0 004.53 7.97m9.94 0A9.97 9.97 0 003 12a9.97 9.97 0 004.53-7.97" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.022 10.022 0 0112 19c-5.523 0-10-4.477-10-10 0-1.902.53-3.678 1.46-5.175m7.036 7.036A3 3 0 1112 5m4.536 4.536A9.978 9.978 0 0121 12a9.978 9.978 0 01-2.464 6.464m-3.929-3.929A3 3 0 1112 19" />
                  </svg>
                )}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-yellow-300 text-gray-800 font-bold rounded hover:bg-yellow-400 transition duration-200"
            >
              REGISTER
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white">
              Already have an account? 
              <a href="/login" className="ml-2 text-white hover:text-yellow-300 font-medium">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;