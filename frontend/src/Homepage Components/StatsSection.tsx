export const StatsSection = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-col items-center md:items-start">
        
        <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-10 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-semibold">21,000+</h2>
            <p className="text-gray-500">Registered Students</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">100+</h2>
            <p className="text-gray-500">Expert Instructors</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">150+</h2>
            <p className="text-gray-500">Courses</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mt-8">
          {["L", "D", "O", "N", "O"].map((letter, index) => (
            <span key={index} className="text-lg font-semibold flex items-center space-x-2">
              <span className="w-6 h-6 bg-black text-white flex items-center justify-center rounded">{letter}</span>
              <span>{["LOREM", "DITLANCE", "OWTHEST", "NEOVASI", "ONAGO"][index]}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
