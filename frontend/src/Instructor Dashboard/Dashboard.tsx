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
import { useEffect, useState } from 'react';

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-2 sm:p-3 md:p-4 mt-5 w-full">
        <TopNavigation heading="Dashboard" />
        
        <div className="flex-1 p-2 sm:p-3 md:p-4 w-full">          
          <QuickStats />
          
          <ProfileProgress ProfileDashboard={ProfileDashboard} />
          
          <RecentActivity />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mb-4">
            <RevenueChart Line={Line} windowWidth={windowWidth} />
            <ProfileViewChart Line={Line} windowWidth={windowWidth} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            <CourseRating />
            <CourseOverviewChart Line={Line} windowWidth={windowWidth} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;