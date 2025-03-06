import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, ChevronDown, Search, Bell, Settings, User, Menu, X 
} from 'lucide-react';

// Import images with proper TypeScript support
import loginStats from '../assets/login_stats.png';
import courseView from '../assets/course_view.png';
import interactionRate from '../assets/interaction_rate.png';
import currentenroll from '../assets/current_enroll.png';
import coursedropout from '../assets/course_dropout_rate.png';
import revenueChart from '../assets/monthly_revenue.png';

// Define types for notification items
interface NotificationItem {
  title: string;
  message: string;
  time: string;
}

// Define types for table data
interface CourseRevenue {
  courseName: string;
  user: string;
  transactionDate: string;
  amount: string;
}

interface Subscription {
  id: string;
  userName: string;
  userType: number;
  paymentMethod: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Sample data with type definitions
  const courseRevenueData: CourseRevenue[] = [
    { courseName: "Introduction to Python", user: "John Doe", transactionDate: "2023-10-01", amount: "$99" },
    { courseName: "Data Science 101", user: "John Doe", transactionDate: "2023-10-02", amount: "$99" },
    { courseName: "Web Development Bootcamp", user: "John Doe", transactionDate: "2023-10-03", amount: "$99" }
  ];

  const subscriptionData: Subscription[] = [
    { id: "SUB-001", userName: "John Doe", userType: 1, paymentMethod: "Credit Card", status: "Active" },
    { id: "SUB-002", userName: "Jane Smith", userType: 1, paymentMethod: "PayPal", status: "Inactive" },
    { id: "SUB-003", userName: "Michael Johnson", userType: 2, paymentMethod: "Bank Transfer", status: "Active" }
  ];

  const leftColumnNotifications: NotificationItem[] = [
    { title: "Security Alert", message: "Unauthorized login attempt detected.", time: "2 mins ago" },
    { title: "New User Added", message: "John Doe was added to the admin group.", time: "30 mins ago" },
    { title: "Backup Completed", message: "The weekly backup was completed.", time: "3 hours ago" },
    { title: "New Feature", message: "Dark mode is now available.", time: "5 hours ago" },
    { title: "New Policy", message: "Updated privacy policy is now in effect.", time: "8 hours ago" }
  ];

  const rightColumnNotifications: NotificationItem[] = [
    { title: "System Update", message: "Scheduled maintenance at midnight.", time: "15 mins ago" },
    { title: "Password Change", message: "Your password was changed successfully.", time: "1 hour ago" },
    { title: "Server Reboot", message: "Server will reboot in 5 mins.", time: "4 hours ago" },
    { title: "Critical Error", message: "Database connection failed.", time: "6 hours ago" },
    { title: "Service Restored", message: "Email service is back online.", time: "10 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-indigo-900 text-white py-3 px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center w-full md:w-auto">
          <img src="/Logo.ico" alt=""  width={40}/>
          <h1 className="ml-2 text-lg font-bold">Einfratech</h1>
          {/* Mobile Menu Button */}
          <button
            className="ml-auto md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`absolute top-14 left-0 w-full bg-indigo-900 p-4 md:static md:flex md:items-center md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <h1 className='text-3xl '>
              Admin Dashboard
            </h1>
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="py-1 px-3 pr-8 rounded text-sm text-black"
            />
            <Search className="absolute right-2 top-1.5 h-4 w-4 text-gray-500" />
          </div>
          <Bell className="h-5 w-5" />
          <Settings className="h-5 w-5" />
          <User className="h-5 w-5" />
        </div>
      </header>
  
      {/* Main Content */}
      <main className="p-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1 - Login Stats */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={loginStats} alt="Login stats chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">Login Stats</h3>
            <p className="text-sm text-gray-600">Weekly logins increased by 15%</p>
            <p className="text-xs text-gray-500">Last activity: 2 hours ago</p>
            <button className="mt-2 bg-indigo-600 text-white py-1 px-4 rounded text-sm">
              Download Report
            </button>
          </div>
  
          {/* Card 2 - Course Views */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={courseView} alt="Course views chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">Course Views</h3>
            <p className="text-sm text-gray-600">Engagement up by 20%</p>
            <p className="text-xs text-gray-500">Most active day: Monday</p>
          </div>
  
          {/* Card 3 - Interaction Rate */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={interactionRate} alt="Interaction rate chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">Interaction Rate</h3>
            <p className="text-sm text-gray-600">Increased interactions by 25%</p>
            <p className="text-xs text-gray-500">Last compared: 2 days ago</p>
            
            {/* Pagination */}
            <div className="flex items-center justify-center mt-2">
              <button className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-1">1</button>
              <button className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-1">2</button>
              <button className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-1">3</button>
              <button className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-1">4</button>
              <button className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-1">5</button>
              <button className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-1">6</button>
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Center content container */}
        <div className="flex flex-col items-center mb-8">
          {/* Current Enrollment Section */}
          <div className="w-full max-w-md mb-8">
            <h2 className="text-lg font-semibold mb-1 text-center">Current Enrollment - 46 Students</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">Historical Enrollment Trends</p>
            
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                <img src={currentenroll} alt="Enrollment trends chart" className="w-full h-full object-cover rounded" />
              </div>
            </div>
          </div>

          {/* Course Drop-out Rates Section */}
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Course Drop-out Rates</h2>
            
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
                <img src={coursedropout} alt="Drop-out rates heatmap" className="w-full h-full object-cover rounded" />
              </div>
              
              <p className="text-sm text-gray-700">
                Based on the analysis, consider the following suggestions to improve course 
                engagement and completion rates: Enhance course content interactivity, increase 
                the number of assessments to gauge understanding, and provide additional resources 
                for challenging topics.
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center"></div>
        
          <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-[700px]">
            {/* Grid Container - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              
              {/* Total Revenue */}
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm flex flex-col items-start w-full">
                <h3 className="text-base font-medium text-gray-700">Total Revenue</h3>
                <p className="text-xl font-bold my-0">$30,000</p>
                <p className="text-sm text-gray-500">Previous Month: $25,000</p>
                <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs w-full sm:w-24">
                  Download
                </button>
              </div>

              {/* Monthly Revenue */}
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm flex flex-col items-start w-full">
                <h3 className="text-base font-medium text-gray-700">Monthly Revenue</h3>
                <img
                  src={revenueChart}
                  alt="Monthly Revenue Chart"
                  className="w-full max-w-[180px] rounded-lg shadow-md my-1"
                />
                <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs w-full sm:w-24">
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Tabs - Scrollable on Small Screens */}
          <div className="border-b pb-2 mb-2 mt-3 overflow-x-auto">
            <ul className="flex space-x-6 sm:space-x-20 text-sm whitespace-nowrap">
              <li className="font-medium text-indigo-600 cursor-pointer">Manage Subscription</li>
              <li className="font-medium text-indigo-600 cursor-pointer">Course Revenue</li>
              <li className="font-medium text-indigo-600 cursor-pointer">Transaction History</li>
            </ul>
          </div>

          {/* Course Revenue Table - Scrollable on Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm border-collapse mb-6">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-3">Course Name</th>
                  <th className="py-3">User</th>
                  <th className="py-3">Transaction Date</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courseRevenueData.map((course, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{course.courseName}</td>
                    <td>{course.user}</td>
                    <td>{course.transactionDate}</td>
                    <td>{course.amount}</td>
                    <td>
                      <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subscription Table - Scrollable on Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-3">Subscription ID</th>
                  <th className="py-3">User Name</th>
                  <th className="py-3">User Type</th>
                  <th className="py-3">Payment Method</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((sub, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{sub.id}</td>
                    <td>{sub.userName}</td>
                    <td>
                      <div className={`h-6 w-6 rounded-full ${sub.userType === 2 ? "bg-green-500" : "bg-purple-500"}`}></div>
                    </td>
                    <td>{sub.paymentMethod}</td>
                    <td className="flex items-center">
                      <span className="mr-2">{sub.status}</span>
                      <ChevronDown className="h-4 w-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>      
        </div>

        <div className="p-4 max-w-full">
          {/* Instructor Performance Section */}
          <h2 className="text-base sm:text-lg font-semibold mb-2">Instructor Performance</h2>

          <p className="text-sm sm:text-base mb-1">Effectiveness Ratings</p>
          <p className="text-sm sm:text-base mb-4">Feedback Summary</p>

          {/* Student Engagement Section */}
          <h2 className="text-base sm:text-lg font-semibold mb-2">Student Engagement</h2>

          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base">Participation</p>
            <p className="text-sm sm:text-base">Statistics</p>
            <p className="text-sm sm:text-base">Assessment Feedback</p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold">System-wide Notifications</h2>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm w-full sm:w-fit mt-3 sm:mt-0">
              Mark all as read
            </button>
          </div>

          {/* Notifications Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {leftColumnNotifications.map((notification, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {rightColumnNotifications.map((notification, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-center sm:justify-end items-center text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <p className="text-center sm:text-left">Filters:</p>
          <div className="flex space-x-2">
            <button className="text-indigo-600 font-medium bg-transparent hover:text-indigo-800">All</button>
            <button className="text-gray-800 bg-transparent hover:text-gray-600">Comments</button>
            <button className="text-gray-800 bg-transparent hover:text-gray-600">Assignments</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;