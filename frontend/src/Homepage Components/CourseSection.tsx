export const CourseSection = () => {
    const courses = [
      {
        title: "Basics of Web Programming",
        description: "Learn frontend and backend development to create stunning websites and web apps.",
        hours: "12 Hours",
        views: "3.5K Views",
        students: "133 Students",
        tag: "NEW",
        image: "https://miro.medium.com/v2/resize:fit:800/1*PSxOGedy1wpbsLPwOp-8OQ.jpeg",
      },
      {
        title: "Digital Marketing 101",
        description: "Master strategies for online marketing and effective brand promotion.",
        hours: "10 Hours",
        views: "2.8K Views",
        students: "95 Students",
        tag: "HOT",
        image: "https://jupitervidya.com/wp-content/uploads/2015/05/Digital-Marketing-course-in-Whitefield.jpg",
      },
      {
        title: "Data Science Fundamentals",
        description: "Understand key concepts in data analysis, statistics, and machine learning.",
        hours: "15 Hours",
        views: "4.2K Views",
        students: "219 Students",
        tag: "TOP",
        image: "https://www.thinknexttraining.com/images/data-science-course-in-chandigarh-mob.jpg",
      },
    ];
  
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
            Explore Our Best Courses
          </h2>
  
          <div className="flex justify-between items-center mb-8">
            <div className="relative inline-block">
              <select className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Categories</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>Data Science</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition">
              See All
            </button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export const CourseCard = ({ title, description, hours, views, students, tag, image }: any) => {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
        <img src={image} alt={`${title} Course`} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
  
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{hours}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{views}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{students}</span>
            </div>
          </div>
  
          <div className={`px-3 py-1 text-xs font-semibold rounded-md inline-block ${
            tag === "NEW" ? "bg-blue-100 text-blue-600" : 
            tag === "HOT" ? "bg-red-100 text-red-600" : 
            "bg-green-100 text-green-600"
          }`}>
            {tag}
          </div>
        </div>
      </div>
    );
  };
