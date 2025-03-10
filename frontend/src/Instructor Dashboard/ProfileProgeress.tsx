import { useEffect, useState } from "react";

export const ProfileProgress = ({ ProfileDashboard }:any) => {
  const [progressPercentage] = useState(75);
  const [steps, setSteps] = useState(2);

  useEffect(() => {
    setSteps(Math.round((progressPercentage / 100) * 4));
  }, [progressPercentage]);

  return (
    <div className="bg-[#1E1E50] p-3 sm:p-4 md:p-6 shadow rounded-lg my-3 md:my-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
        <div className="flex items-center">
          <img
            src={ProfileDashboard}
            alt="Vako Shvili"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mr-2 sm:mr-3"
          />
          <div>
            <div className="font-semibold text-white text-sm sm:text-base">Vako Shvili</div>
            <div className="text-xs sm:text-sm text-white">vako.shvili@gmail.com</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="text-white text-sm sm:text-base">{steps}/4 Steps</div>
          
          <div className="text-white flex items-center">
            <div className="bg-gray-700 rounded-full h-2 sm:h-3 md:h-4 w-16 sm:w-20 md:w-24 mr-2">
              <div
                className="bg-green-500 rounded-full h-2 sm:h-3 md:h-4"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="whitespace-nowrap text-xs sm:text-sm">{progressPercentage}% Completed</span>
          </div>
          
          <button className="bg-[#FF6600] hover:bg-[#CC5200] text-white font-bold py-1 px-2 sm:py-1 sm:px-3 md:py-2 md:px-4 rounded text-xs sm:text-sm md:text-base">
            Edit Biography
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-4 md:w-4 ml-1 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
