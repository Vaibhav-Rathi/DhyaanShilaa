import { useState } from "react";
import { Search } from "lucide-react";

const courses = [
  {
    image: "/CourseImage1.png",
    title: "Basics Web Programming",
    description: "Materi pembelajaran mengenai pembuatan website",
    progress: 20,
    status: "Continue",
  },
  {
    image: "/CourseImage2.png",
    title: "Digital Marketing 101",
    description: "Materi mengenai strategi dan konsep marketing pemula",
    progress: 100,
    status: "Certificate",
  },
  {
    image: "/CourseImage3.png",
    title: "Data Science Fundamental",
    description: "Materi pembelajaran mengenai dasar-dasar data science",
    progress: 50,
    status: "Continue",
  },
  {
    image: "/CourseImage2.png",
    title: "UI/UX Design",
    description: "Dasar-dasar teori dan praktik tentang dunia ui/ux design",
    progress: 90,
    status: "Continue",
  },
];

export default function LearningActivities() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Learning Activities</h2>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="w-full bg-gray-200 h-px" />
      <div className="mt-4 space-y-4 font-Poppins">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 border-b border-gray-100">
              <img src={course.image} alt={course.title} className="w-16 h-16 rounded-md" />
              <div className="flex-1 mt-2 sm:mt-0">
                <h3 className="font-semibold text-sm sm:text-base">{course.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{course.description}</p>
              </div>
              <div className="w-full sm:w-32 lg:w-40 mt-2 sm:mt-0">
                <div className="relative w-full h-2 bg-gray-300 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 text-right mt-1">{course.progress}%</p>
              </div>
              <div className="mt-2 sm:mt-0 flex justify-end">
                {course.status === "Certificate" ? (
                  <button className="px-3 py-1 bg-yellow-400 text-sm rounded-md font-medium">
                    {course.status}
                  </button>
                ) : (
                  <button className="text-blue-600 font-medium text-sm">
                    {course.status}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center text-gray-500">No courses found</div>
        )}
      </div>
    </div>
  );
}