import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import ProfileDashboard from "../assets/user1.png";
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { QuickStats } from './Quickstart';
import { ProfileProgress } from './ProfileProgeress';
import { RecentActivity } from './RecentActivity';
import { RevenueChart } from './RevenueChart';
import { ProfileViewChart } from './ProfileViewChart';
import { CourseRating } from './CourseRating';
import { CourseOverviewChart } from './CourseOverviewChart';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale
);

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-4 mt-5">
        <TopNavigation heading="Dashboard" />
        
        <div className="flex-1 p-4">          
          <QuickStats/>
          
          <ProfileProgress ProfileDashboard={ProfileDashboard} />
          
          <RecentActivity/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <RevenueChart Line={Line} />
            <ProfileViewChart Line={Line} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseRating />
            <CourseOverviewChart Line={Line} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;