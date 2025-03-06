import { Search, ChevronDown } from "lucide-react";

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
  return (
    <div className=" mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Learning Activities</h2>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-md">
          Category <ChevronDown className="ml-2" size={16} />
        </button>
      </div>
      <div className="w-full bg-gray-200 h-px" />
      <div className="mt-4 space-y-4 font-Poppins">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center gap-4">
            <img src={course.image} alt={course.title} className="w-16 h-16 rounded-md" />
            <div className="flex-1">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.description}</p>
            </div>
            <div className="w-40 mr-20">
              <div className="relative w-full h-2 bg-gray-300 rounded-full">
                <div
                  className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 text-right mt-1">{course.progress}%</p>
            </div>
            {course.status === "Certificate" ? (
              <button className="px-3 py-1 bg-yellow-400 text-sm rounded-md font-medium">{course.status}</button>
            ) : (
              <button className="text-blue-600 font-medium ml-5">{course.status}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}