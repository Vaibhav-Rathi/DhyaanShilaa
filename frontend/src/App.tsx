import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import Register from "./components/Register";
import LoginPage from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import Dashboard from "./Instructor Dashboard/Dashboard";
import { CreateCourse } from "./Instructor Dashboard/Create-Course";
import AdminDashboard from "./components/AdminDashboard";
import ContentDashboard from "./Instructor Dashboard/MyCourses";
import CoursePage from "./Student Dashboard Components/StudentProgress";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/my-courses" element={<CoursePage />} />
          <Route path="/ins-dashboard" element={<Dashboard />} />
          <Route path="/ins-dashboard/my-courses" element={<ContentDashboard />} />
          <Route path="/ins-dashboard/create-course" element={<CreateCourse />} />
          <Route path="/adm-dashboard/" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
