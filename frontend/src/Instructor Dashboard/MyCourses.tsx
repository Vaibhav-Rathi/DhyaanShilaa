import React, { useState } from 'react';
import { FaTachometerAlt, FaBook, FaCalendarAlt, FaCog, FaQuestionCircle, FaClock, FaVideo, FaUsers, FaStar, FaChevronDown } from 'react-icons/fa';
import content1 from '../assets/web_development.png';
import content2 from '../assets/digital_marketing.png';
import content3 from '../assets/machinelearning.png';
import content4 from '../assets/beginner.png';
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

// Define a course type
interface Course {
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Define all courses
  const allCourses: Course[] = [
    {
      title: "Web Development Basics",
      description: "Learning materials on beginner-level website creation",
      hours: "4.5 Hours",
      videos: "20 Video",
      students: "1,900 Students",
      image: content1,
      rating: "4.9"
    },
    {
      title: "Digital Marketing 101",
      description: "Materials on beginner strategies and concepts of marketing",
      hours: "6.2 Hours",
      videos: "32 Video",
      students: "930 Students",
      image: content2,
      rating: "4.9"
    },
    {
      title: "Machine Learning 101",
      description: "Understand the foundational concepts of machine learning",
      hours: "7 Hours",
      videos: "17 Video",
      students: "200 Students",
      image: content3,
      rating: "4.9"
    },
    {
      title: "Beginner UI/UX",
      description: "Fundamentals of theory and practice in the world of UI/UX design",
      hours: "5 Hours",
      videos: "25 Video",
      students: "1,150 Students",
      image: content4,
      rating: "4.9"
    }
  ];
  
  // Filter courses based on search query
  const filteredCourses = allCourses.filter((course) => {
    const searchText = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText)
    );
  });
  
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
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
          <input 
            type="text" 
            placeholder="Search for Courses..." 
            className="border p-2 rounded-md w-full md:w-3/4 mb-4 md:mb-0" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <input type="file" id="course-upload" className="hidden" onChange={handleCourseUpload} />
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No courses found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                hours={course.hours}
                videos={course.videos}
                students={course.students}
                image={course.image}
                rating={course.rating}
              />
            ))}
          </div>
        )}
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