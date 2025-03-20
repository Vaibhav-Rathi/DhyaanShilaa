import React from "react";
import Overview from "../Student Dashboard Components/Overview";
import Statistics from "../Student Dashboard Components/Statistics";
import LearningActivities from "../Student Dashboard Components/LearningActivity";
import Sidebar from "../Student Dashboard Components/Sidebar";
import profileImage from "/image.png";
import { useNavigate } from "react-router-dom";


type Course = {
  id: number;
  title: string;
  progress: number;
};

type User = {
  name: string;
  role: string;
};

const userName = localStorage.getItem("userName") || "User";

const user: User = { name: userName, role: "Frontend Developer" };

const courses: Course[] = [
  { id: 1, title: "Basics Web Programming", progress: 20 },
  { id: 2, title: "Digital Marketing 101", progress: 100 },
  { id: 3, title: "Data Science Fundamental", progress: 50 },
  { id: 4, title: "UI/UX Design", progress: 90 },
];
const totalCourses = courses.length;
const completedCourses = courses.filter(course => course.progress === 100).length;
const completedPercentage = (completedCourses / totalCourses) * 100;
const averageProgress =
  courses.reduce((acc, course) => acc + course.progress, 0) / totalCourses;

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col md:flex-row bg-[#F8F9FC] min-h-screen font-Poppins">
      <Sidebar />
      
      <div className="flex-1 p-4 sm:p-6 md:p-8 md:ml-64">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 ml-20">Dashboard</h1>
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-md w-full sm:w-auto">
            <img src={profileImage} alt="User Avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
            <div className="text-gray-700 text-xs sm:text-sm">
              <p className="font-medium">Hi, {user.name}</p>
              <p className="text-gray-500">{user.role}</p>
            </div>
            <button
            onClick={() => {
              localStorage.removeItem("authToken"); 
              localStorage.removeItem("token"); 
              navigate("/login");
            }}
            className="border-1 rounded-md p-2 bg-blue-800 hover:bg-blue-500 text-white"
          >
            Logout
          </button>

          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <Overview />
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex justify-center">
            <Statistics
              averageProgress={averageProgress} 
              completedPercentage={completedPercentage} 
              totalCourses={totalCourses} 
            />
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <LearningActivities />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
