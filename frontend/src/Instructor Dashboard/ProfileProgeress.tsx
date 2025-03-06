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
    <div className="bg-[#1E1E50] p-6 shadow rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={ProfileDashboard}
            alt="Vako Shvili"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold text-white">Vako Shvili</div>
            <div className="text-sm text-white">vako.shvili@gmail.com</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-white">{steps}/4 Steps</div>
          <div className="mr-3 text-white flex items-center">
            <div className="bg-gray-700 rounded-full h-4 w-24 mr-2">
              <div
                className="bg-green-500 rounded-full h-4"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {progressPercentage}% Completed
          </div>
          <button className="bg-[#FF6600] hover:bg-[#CC5200] text-white font-bold py-2 px-4 rounded">
            Edit Biography
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 inline-block"
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