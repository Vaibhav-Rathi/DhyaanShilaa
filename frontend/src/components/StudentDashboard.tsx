import React from "react";
import Overview from "../Student Dashboard Components/Overview";
import Statistics from "../Student Dashboard Components/Statistics";
import LearningActivities from "../Student Dashboard Components/LearningActivity";
import Sidebar from "../Student Dashboard Components/Sidebar";
import profileImage from "/image.png";

type Course = {
  id: number;
  title: string;
  progress: number;
};

type User = {
  name: string;
  role: string;
};

const user: User = { name: "User", role: "Frontend Developer" };

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
  return (
    <div className="flex bg-[#F8F9FC] min-h-screen font-Poppins">
  <div className="w-64">
    <Sidebar />
  </div>
  
  <div className="flex-1 p-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-md">
        <img src={profileImage} alt="User Avatar" className="w-10 h-10 rounded-full" />
        <div className="text-gray-700 text-sm">
          <p className="font-medium">Hi, {user.name}</p>
          <p className="text-gray-500">{user.role}</p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <Overview />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg content-center">
        <Statistics
          averageProgress={averageProgress} 
          completedPercentage={completedPercentage} 
          totalCourses={totalCourses} 
        />
      </div>
    </div>
    
    <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
      <LearningActivities />
    </div>
  </div>
</div>

  );
};

export default StudentDashboard;