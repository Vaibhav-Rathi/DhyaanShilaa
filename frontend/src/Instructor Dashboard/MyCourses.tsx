import React, { useState } from 'react';
import { FaTachometerAlt, FaBook, FaCalendarAlt, FaCog, FaQuestionCircle, FaClock, FaVideo, FaUsers, FaStar, FaChevronDown } from 'react-icons/fa';
import content1 from '../assets/web_development.png';
import content2 from '../assets/digital_marketing.png';
import content3 from '../assets/machinelearning.png';
import content4 from '../assets/beginner.png';
import adminProfile from '../assets/admin-profile.png';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

// Define props interface for CourseCard component
interface CourseCardProps {
  title: string;
  description: string;
  hours: string;
  videos: string;
  students: string;
  image: string;
  rating: string;
}

// Define props interface for CourseAdvance component
interface CourseAdvanceProps {
  onBack: () => void;
}

function ContentDashboard(): React.ReactElement {
  const [showCourseAdvance, setShowCourseAdvance] = useState<boolean>(false);
  
  const handleCreateCourse = (): void => { 
    setShowCourseAdvance(true);
  };
  
  const handleBackToDashboard = (): void => {
    setShowCourseAdvance(false);
  };

  const handleCourseUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-screen-xl mx-auto">
        <div className='mb-5'>
            <TopNavigation heading="My Courses" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <input type="text" placeholder="Search for Courses..." className="border p-2 rounded-md w-full md:w-3/4 mb-4 md:mb-0" />
          <input type="file" id="course-upload" className="hidden" onChange={handleCourseUpload} />
        </div>

        <div className="flex flex-wrap space-x-0 md:space-x-4 mb-8">
          <button className="bg-gray-300 p-2 rounded-md text-gray-700 m-1">All Courses</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CourseCard
            title="Web Development Basics"
            description="Learning materials on beginner-level website creation"
            hours="4.5 Hours"
            videos="20 Video"
            students="1,900 Students"
            image={content1}
            rating="4.9"
          />
          <CourseCard
            title="Digital Marketing 101"
            description="Materials on beginner strategies and concepts of marketing"
            hours="6.2 Hours"
            videos="32 Video"
            students="930 Students"
            image={content2}
            rating="4.9"
          />
          <CourseCard
            title="Machine Learning 101"
            description="Understand the foundational concepts of machine learning"
            hours="7 Hours"
            videos="17 Video"
            students="200 Students"
            image={content3}
            rating="4.9"
          />
          <CourseCard
            title="Beginner UI/UX"
            description="Fundamentals of theory and practice in the world of UI/UX design"
            hours="5 Hours"
            videos="25 Video"
            students="1,150 Students"
            image={content4}
            rating="4.9"
          />
        </div>
      </main>
    </div>
  );
}

function CourseCard({ title, description, hours, videos, students, image, rating }: CourseCardProps): React.ReactElement {
  return (
    <div className="bg-white rounded-md shadow-md p-4 relative">
      <img src={image} alt={title} className="h-40 w-full object-cover rounded-md mb-4" />
      <div className="absolute bottom-22 right-5 bg-indigo-900 text-white p-1 rounded-md flex items-center">
        <FaStar className="mr-1" />
        <span>{rating}</span>
      </div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center"><FaClock className="mr-1" /><span>{hours}</span></div>
        <div className="flex items-center"><FaVideo className="mr-1" /><span>{videos}</span></div>
        <div className="flex items-center"><FaUsers className="mr-1" /><span>{students}</span></div>
      </div>
    </div>
  );
}

export default ContentDashboard;