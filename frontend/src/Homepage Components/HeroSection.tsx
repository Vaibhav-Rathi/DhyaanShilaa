export const HeroSection = () => {
    return (
      <section className="bg-indigo-900 text-white pb-20">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Build and Realize Aspirations with DhyaanShilaa Institute.</h1>
            <p className="mb-8 text-indigo-100">DhyaanShilaa's platform delivers educational experiences at affordable prices so you can develop skills to achieve your professional growth and success.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-medium px-6 py-3 rounded">Explore Courses</button>
              <button className="border border-white text-white hover:bg-white hover:text-indigo-900 font-medium px-6 py-3 rounded transition">Start Learning Free</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <CodeVisual />
          </div>
        </div>
      </section>
    );
  };

  export const CodeVisual = () => {
    return (
      <div className="bg-indigo-800 rounded-lg p-6 relative">
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 w-1/2 bg-indigo-600 rounded"></div>
          <div className="h-4 w-3/4 bg-indigo-600 rounded"></div>
          <div className="h-4 w-2/3 bg-indigo-600 rounded"></div>
          <div className="mt-6 space-y-2">
            <div className="h-3 w-full bg-indigo-600 rounded"></div>
            <div className="h-3 w-full bg-indigo-600 rounded"></div>
            <div className="h-3 w-4/5 bg-indigo-600 rounded"></div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-yellow-300 rounded-lg p-4 text-3xl text-center">
          {'{'}{'}'} 
        </div>
      </div>
    );
  };