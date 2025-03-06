import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import Register from "./components/Register";
import LoginPage from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import Dashboard from "./Instructor Dashboard/Dashboard";
import {CreateCourse} from "./Instructor Dashboard/CreateCourse";
import AdminDashboard from "./components/AdminDashboard"
import ContentDashboard from "./Instructor Dashboard/MyCourses";
import StudentProgress from "./Student Dashboard Components/StudentProgress"

const App = () => {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/ins-dashboard" element={<Dashboard />} />
        <Route path="/ins-dashboard/my-courses" element={<ContentDashboard />} />
        <Route path="/ins-dashboard/create-course" element={<CreateCourse />} />
        <Route path="/adm-dashboard" element={<AdminDashboard />} />
        <Route path="/mycourse" element={<StudentProgress/>} />

      </Routes>
    </Router>
  );
};

export default App;