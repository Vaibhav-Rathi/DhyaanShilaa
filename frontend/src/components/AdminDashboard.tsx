import React, { useState, useEffect } from 'react';
import { 
   ChevronRight, ChevronDown, Search, Bell, User, Menu, X, ChevronUp 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

// Define User interface
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userManagementExpanded, setUserManagementExpanded] = useState<boolean>(false); // New state for user management section
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]); // Store all users for client-side filtering
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch users data
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const response = await axios.get('http://localhost:3000/api/auth/users', {
        headers: {
          Authorization: token
        }
      });
      
      const userData = response.data.data || [];
      setAllUsers(userData); // Store all users for filtering
      setUsers(userData);    // Initially show all users
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user data. Please try again.");
      setLoading(false);
    }
  };

  // This function now filters users as you type
  const filterUsers = (searchValue: string) => {
    if (!searchValue.trim()) {
      // If search is cleared, show all users
      setUsers(allUsers);
    } else {
      // Filter users based on search term
      const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.role.toLowerCase().includes(searchValue.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  // Handle search input changes and immediately filter users
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterUsers(value);
  };

  const confirmDeleteUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const deleteUser = async () => {
    if (!selectedUserId) return;
    
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:3000/api/auth/users?id=${selectedUserId}`, {
        headers: {
          Authorization: token
        }
      });
      
      // Update both all users and filtered users lists
      const updatedUsers = allUsers.filter(user => user._id !== selectedUserId);
      setAllUsers(updatedUsers);
      setUsers(updatedUsers);
      
      setShowDeleteModal(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again.");
    }
  };
  
  // Toggle function for the user management section
  const toggleUserManagement = () => {
    setUserManagementExpanded(!userManagementExpanded);
  };
  
  // Enhanced highlightText function that works with any text content
  const highlightText = (text: string) => {
    if (!searchTerm || searchTerm.trim() === "") return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 text-black px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  
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

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p className="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={deleteUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {showDeleteModal && <DeleteModal />}
      
      <header className="bg-indigo-900 text-white py-3 px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center w-full md:w-auto">
          <img src="/Logo.png" alt="" width={100}/>
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

        <div className="hidden md:flex items-center space-x-4">
          <Bell className="h-5 w-5" />
          <button
            onClick={() => {
              localStorage.removeItem("authToken"); 
              navigate("/login");
            }}
            className="border-1 rounded-md p-1 bg-indigo-800 hover:bg-indigo-500"
          >
            Logout
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="p-6">
        {/* User Management Section - Collapsible */}
        <div className="mb-8 border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <button 
              onClick={toggleUserManagement}
              className="flex items-center text-xl font-semibold focus:outline-none w-full"
            >
              <span>User Management</span>
              {userManagementExpanded ? 
                <ChevronUp className="ml-2 h-5 w-5 text-gray-600" /> : 
                <ChevronDown className="ml-2 h-5 w-5 text-gray-600" />
              }
            </button>
            
            {/* Show search only when expanded */}
            {userManagementExpanded && (
              <div className="relative w-full md:w-64 mt-4 md:mt-0">
                <input
                  type="text"
                  placeholder="Search for users..."
                  className="w-full py-2 px-3 pr-8 rounded text-gray-800 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            )}
          </div>
          
          {/* Collapsible content */}
          {userManagementExpanded && (
            <>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
              
              {loading ? (
                <p>Loading user data...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm border-collapse">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th className="py-3">Name</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Role</th>
                        <th className="py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="py-3">{highlightText(user.name)}</td>
                            <td>{highlightText(user.email)}</td>
                            <td>{highlightText(user.role)}</td>
                            <td>
                              <button 
                                onClick={() => confirmDeleteUser(user._id)}
                                className="bg-red-600 text-white py-1 px-3 rounded text-xs hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-4 text-center">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1 - Login Stats */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={loginStats} alt="Login stats chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">{highlightText("Login Stats")}</h3>
            <p className="text-sm text-gray-600">{highlightText("Weekly logins increased by 15%")}</p>
            <p className="text-xs text-gray-500">{highlightText("Last activity: 2 hours ago")}</p>
            <button className="mt-2 bg-indigo-600 text-white py-1 px-4 rounded text-sm">
              {highlightText("Download Report")}
            </button>
          </div>
  
          {/* Card 2 - Course Views */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={courseView} alt="Course views chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">{highlightText("Course Views")}</h3>
            <p className="text-sm text-gray-600">{highlightText("Engagement up by 20%")}</p>
            <p className="text-xs text-gray-500">{highlightText("Most active day: Monday")}</p>
          </div>
  
          {/* Card 3 - Interaction Rate */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="h-32 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
              <img src={interactionRate} alt="Interaction rate chart" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-semibold">{highlightText("Interaction Rate")}</h3>
            <p className="text-sm text-gray-600">{highlightText("Increased interactions by 25%")}</p>
            <p className="text-xs text-gray-500">{highlightText("Last compared: 2 days ago")}</p>
            
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
            <h2 className="text-lg font-semibold mb-1 text-center">{highlightText("Current Enrollment - 46 Students")}</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">{highlightText("Historical Enrollment Trends")}</p>
            
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                <img src={currentenroll} alt="Enrollment trends chart" className="w-full h-full object-cover rounded" />
              </div>
            </div>
          </div>

          {/* Course Drop-out Rates Section */}
          <div className="w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-center">{highlightText("Course Drop-out Rates")}</h2>
            
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
                <img src={coursedropout} alt="Drop-out rates heatmap" className="w-full h-full object-cover rounded" />
              </div>
              
              <p className="text-sm text-gray-700">
                {highlightText("Based on the analysis, consider the following suggestions to improve course engagement and completion rates: Enhance course content interactivity, increase the number of assessments to gauge understanding, and provide additional resources for challenging topics.")}
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
                <h3 className="text-base font-medium text-gray-700">{highlightText("Total Revenue")}</h3>
                <p className="text-xl font-bold my-0">{highlightText("$30,000")}</p>
                <p className="text-sm text-gray-500">{highlightText("Previous Month: $25,000")}</p>
                <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs w-full sm:w-24">
                  {highlightText("Download")}
                </button>
              </div>

              {/* Monthly Revenue */}
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm flex flex-col items-start w-full">
                <h3 className="text-base font-medium text-gray-700">{highlightText("Monthly Revenue")}</h3>
                <img
                  src={revenueChart}
                  alt="Monthly Revenue Chart"
                  className="w-full max-w-[180px] rounded-lg shadow-md my-1"
                />
                <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs w-full sm:w-24">
                  {highlightText("Download")}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs - Scrollable on Small Screens */}
          <div className="border-b pb-2 mb-2 mt-3 overflow-x-auto">
            <ul className="flex space-x-6 sm:space-x-20 text-sm whitespace-nowrap">
              <li className="font-medium text-indigo-600 cursor-pointer">{highlightText("Manage Subscription")}</li>
              <li className="font-medium text-indigo-600 cursor-pointer">{highlightText("Course Revenue")}</li>
              <li className="font-medium text-indigo-600 cursor-pointer">{highlightText("Transaction History")}</li>
            </ul>
          </div>

          {/* Course Revenue Table - Scrollable on Mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm border-collapse mb-6">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-3">{highlightText("Course Name")}</th>
                  <th className="py-3">{highlightText("User")}</th>
                  <th className="py-3">{highlightText("Transaction Date")}</th>
                  <th className="py-3">{highlightText("Amount")}</th>
                  <th className="py-3">{highlightText("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {courseRevenueData.map((course, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{highlightText(course.courseName)}</td>
                    <td>{highlightText(course.user)}</td>
                    <td>{highlightText(course.transactionDate)}</td>
                    <td>{highlightText(course.amount)}</td>
                    <td>
                      <button className="bg-indigo-600 text-white py-1 px-3 rounded text-xs">{highlightText("View Details")}</button>
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
                  <th className="py-3">{highlightText("Subscription ID")}</th>
                  <th className="py-3">{highlightText("User Name")}</th>
                  <th className="py-3">{highlightText("User Type")}</th>
                  <th className="py-3">{highlightText("Payment Method")}</th>
                  <th className="py-3">{highlightText("Status")}</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((sub, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{highlightText(sub.id)}</td>
                    <td>{highlightText(sub.userName)}</td>
                    <td>
                      <div className={`h-6 w-6 rounded-full ${sub.userType === 2 ? "bg-green-500" : "bg-purple-500"}`}></div>
                    </td>
                    <td>{highlightText(sub.paymentMethod)}</td>
                    <td className="flex items-center">
                      <span className="mr-2">{highlightText(sub.status)}</span>
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
          <h2 className="text-base sm:text-lg font-semibold mb-2">{highlightText("Instructor Performance")}</h2>

          <p className="text-sm sm:text-base mb-1">{highlightText("Effectiveness Ratings")}</p>
          <p className="text-sm sm:text-base mb-4">{highlightText("Feedback Summary")}</p>

          {/* Student Engagement Section */}
          <h2 className="text-base sm:text-lg font-semibold mb-2">{highlightText("Student Engagement")}</h2>

          <div className="flex flex-col gap-1">
            <p className="text-sm sm:text-base">{highlightText("Participation")}</p>
            <p className="text-sm sm:text-base">{highlightText("Statistics")}</p>
            <p className="text-sm sm:text-base">{highlightText("Assessment Feedback")}</p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold">{highlightText("System-wide Notifications")}</h2>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm w-full sm:w-fit mt-3 sm:mt-0">
              {highlightText("Mark all as read")}
            </button>
          </div>

          {/* Notifications Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {leftColumnNotifications.map((notification, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{highlightText(notification.title)}</h3>
                  <p className="text-gray-600">{highlightText(notification.message)}</p>
                  <p className="text-xs text-gray-500 mt-1">{highlightText(notification.time)}</p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {rightColumnNotifications.map((notification, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{highlightText(notification.title)}</h3>
                  <p className="text-gray-600">{highlightText(notification.message)}</p>
                  <p className="text-xs text-gray-500 mt-1">{highlightText(notification.time)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;