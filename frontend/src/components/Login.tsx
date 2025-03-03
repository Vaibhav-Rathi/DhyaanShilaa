import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <a href="#" className="flex items-center text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Homepage
        </a>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto overflow-hidden rounded-lg">
        <div className="relative w-full md:w-1/2 bg-cover bg-center" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbGFwdG9wfGVufDB8fDB8fHww')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
          <div></div>
          <div className="relative p-10 flex flex-col h-full justify-center z-10 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-6">Log in to continue your learning journey.</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-indigo-900 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
          <p className="text-white mb-8">Access your account and explore new opportunities.</p>
          
          <form className="space-y-6">
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-4 rounded bg-indigo-800 text-white placeholder-gray-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full p-4 rounded bg-indigo-800 text-white placeholder-gray-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              LOGIN
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white">
              Don't have an account? 
              <a href="/register" className="ml-2 text-white hover:text-yellow-300 font-medium">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
