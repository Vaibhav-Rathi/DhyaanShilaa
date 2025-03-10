import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBook, FaVideo, FaUsers, FaStar } from 'react-icons/fa';
import content1 from '../assets/web_development.png';
import content2 from '../assets/digital_marketing.png';
import content3 from '../assets/machinelearning.png';
import content4 from '../assets/beginner.png';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

// Updated interface to match the API response
interface CourseCardProps {
  title: string;
  description: string;
  duration: {
    value: number;
    unit: string;
  };
  level: string;
  category: string;
  subCategory: string;
  thumbnail?: any;
  instructor?: {
    _id: string;
    name: string;
  };
}

// Define a course type to match the API response
interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  subCategory: string;
  topic: string;
  language: string;
  subtitleLanguage: string;
  level: string;
  duration: {
    value: number;
    unit: string;
  };
  thumbnail?: any;
  instructor?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

// Define API response structure
interface ApiResponse {
  success: boolean;
  count: number;
  pagination: any;
  data: Course[];
}

// Define CourseAdvance component that was referenced but missing
function CourseAdvance({ onBack }: { onBack: () => void }): React.ReactElement {
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3}></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (value)</label>
            <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration Unit</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="Week">Week</option>
              <option value="Day">Day</option>
              <option value="Hour">Hour</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Create Course</button>
        </div>
      </form>
    </div>
  );
}

function ContentDashboard(): React.ReactElement {
  const [showCourseAdvance, setShowCourseAdvance] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get default courses as fallback
  const getDefaultCourses = (): Course[] => [
    {
      _id: "default-1",
      title: "Web Development Basics",
      subtitle: "Learn web development from scratch",
      description: "Learning materials on beginner-level website creation",
      category: "Programming",
      subCategory: "Web dev",
      topic: "HTML/CSS",
      language: "english",
      subtitleLanguage: "english",
      level: "Beginner",
      duration: {
        value: 4,
        unit: "Week"
      },
      instructor: {
        _id: "default-instructor-1",
        name: "John Doe"
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: "default-2",
      title: "Digital Marketing 101",
      subtitle: "Learn marketing fundamentals",
      description: "Materials on beginner strategies and concepts of marketing",
      category: "Marketing",
      subCategory: "Digital",
      topic: "SEO",
      language: "english",
      subtitleLanguage: "english",
      level: "Beginner",
      duration: {
        value: 6,
        unit: "Week"
      },
      instructor: {
        _id: "default-instructor-2",
        name: "Jane Smith"
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: "default-3",
      title: "Machine Learning 101",
      subtitle: "Introduction to ML concepts",
      description: "Understand the foundational concepts of machine learning",
      category: "Data Science",
      subCategory: "Machine Learning",
      topic: "Python",
      language: "english",
      subtitleLanguage: "english",
      level: "Intermediate",
      duration: {
        value: 7,
        unit: "Week"
      },
      instructor: {
        _id: "default-instructor-3",
        name: "Michael Johnson"
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: "default-4",
      title: "Beginner UI/UX",
      subtitle: "Learn design fundamentals",
      description: "Fundamentals of theory and practice in the world of UI/UX design",
      category: "Design",
      subCategory: "UI/UX",
      topic: "Figma",
      language: "english",
      subtitleLanguage: "english",
      level: "Beginner",
      duration: {
        value: 5,
        unit: "Week"
      },
      instructor: {
        _id: "default-instructor-4",
        name: "Sarah Wilson"
      },
      createdAt: new Date().toISOString()
    }
  ];

  // Fetch courses from API using axios
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/courses');
        
        // Handle the new API response format
        const apiResponse = response.data as ApiResponse;
        
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          setCourses(apiResponse.data);
          setFilteredCourses(apiResponse.data);
        } else {
          // Fallback to default courses if data isn't in expected format
          const defaultCourses = getDefaultCourses();
          setCourses(defaultCourses);
          setFilteredCourses(defaultCourses);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
        const defaultCourses = getDefaultCourses();
        setCourses(defaultCourses);
        setFilteredCourses(defaultCourses);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []); 
  
  useEffect(() => {
    if (!Array.isArray(courses)) {
      setFilteredCourses([]);
      return;
    }
    
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);
  
  
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

  // Ensure filteredCourses is always an array before rendering
  const coursesToDisplay = Array.isArray(filteredCourses) ? filteredCourses : [];

  // Map course image based on category or use default
  const getCourseImage = (category: string): string => {
    switch(category.toLowerCase()) {
      case 'programming':
      case 'web dev':
        return content1;
      case 'marketing':
      case 'digital marketing':
        return content2;
      case 'data science':
      case 'machine learning':
        return content3;
      default:
        return content4;
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

        {showCourseAdvance ? (
          <CourseAdvance onBack={handleBackToDashboard} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <input 
                type="text" 
                placeholder="Search for Courses..." 
                className="border p-2 rounded-md w-full md:w-3/4 mb-4 md:mb-0" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="flex space-x-2">
                <input type="file" id="course-upload" className="hidden" onChange={handleCourseUpload} />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Loading courses...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : coursesToDisplay.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No courses found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coursesToDisplay.map((course) => (
                  <CourseCard
                    key={course._id}
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    level={course.level}
                    category={course.category}
                    subCategory={course.subCategory}
                    thumbnail={getCourseImage(course.category)}
                    instructor={course.instructor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export function CourseCard({ title, description, level, category, subCategory, thumbnail, instructor }: CourseCardProps): React.ReactElement {
  // Format the duration for display
  
  // Use placeholder values for videos and students since they're not in the API response
  const videos = "15+ Videos";
  const students = "500+ Students";
  const rating = "4.8";
  
  return (
    <div className="bg-white rounded-md shadow-md p-4 relative">
      <img src={thumbnail} alt={title} className="h-40 w-full object-cover rounded-md mb-4" />
      <div className="absolute top-4 right-4 bg-indigo-900 text-white p-1 rounded-md flex items-center">
        <FaStar className="mr-1" />
        <span>{rating}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{level}</span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <div className="flex items-center"><FaBook className="mr-1" /><span>{category} • {subCategory}</span></div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center"><FaVideo className="mr-1" /><span>{videos}</span></div>
        <div className="flex items-center"><FaUsers className="mr-1" /><span>{students}</span></div>
      </div>
      {instructor && (
        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
          <span>Instructor: {instructor.name}</span>
        </div>
      )}
    </div>
  );
}

export default ContentDashboard;