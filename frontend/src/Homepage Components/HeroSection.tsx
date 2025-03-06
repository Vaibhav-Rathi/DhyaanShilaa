
export const HeroSection = () => {
  return (
    <section className="bg-[#1A1A4A] text-white pb-20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Build and Realize Aspirations with [Edutech] Institute.
          </h1>
          <p className="mb-8 text-indigo-100">
            [Edutech]'s platform delivers educational experiences at affordable prices so you can develop skills to achieve your professional growth and success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-medium px-6 py-3 rounded">
              Explore Courses
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-indigo-900 font-medium px-6 py-3 rounded transition">
              Start Learning Free
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img className="w-full max-w-md sm:max-w-lg md:max-w-none" src="/HeroImage.png" alt="Hero Image" />
        </div>
      </div>
    </section>
  );
};
