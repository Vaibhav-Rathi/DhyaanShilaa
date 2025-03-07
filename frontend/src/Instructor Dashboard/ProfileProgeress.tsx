import React, { useState, useEffect } from 'react';

interface ProfileProgressProps {
  ProfileDashboard: string;
}

export const ProfileProgress: React.FC<ProfileProgressProps> = ({ ProfileDashboard }) => {
  const [progressPercentage] = useState(75);
  const [steps, setSteps] = useState(2);

  useEffect(() => {
    setSteps(Math.round((progressPercentage / 100) * 4));
  }, [progressPercentage]);

  return (
    <div className="bg-[#1E1E50] p-4 md:p-6 shadow rounded-lg mt-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center">
          <img
            src={ProfileDashboard}
            alt="Vako Shvili"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold text-white">Vako Shvili</div>
            <div className="text-sm text-white">vako.shvili@gmail.com</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="text-white">{steps}/4 Steps</div>
          
          <div className="text-white flex items-center">
            <div className="bg-gray-700 rounded-full h-3 md:h-4 w-20 md:w-24 mr-2">
              <div
                className="bg-green-500 rounded-full h-3 md:h-4"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="whitespace-nowrap">{progressPercentage}% Completed</span>
          </div>
          
          <button className="bg-[#FF6600] hover:bg-[#CC5200] text-white font-bold py-1 md:py-2 px-3 md:px-4 rounded text-sm md:text-base">
            Edit Biography
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 inline-block"
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