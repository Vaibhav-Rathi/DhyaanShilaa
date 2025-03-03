export const AboutSection = () => {
    return (
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h3 className="text-2xl text-yellow-600 font-semibold tracking-wide mb-2 animate-fade-in">ABOUT US</h3>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4 animate-slide-up">
              DhyaanShilaa: Elevate Your Learning Journey
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 animate-fade-in">
              DhyaanShilaa is your ultimate e-learning platform, designed to make education accessible and empowering for learners worldwide.
            </p>
          </div>
  
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.stockcake.com/public/d/c/4/dc43867d-5a5b-49e4-82e7-3eb135eb8dea_large/coding-classroom-activity-stockcake.jpg"
              alt="Team working together"
              className="rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
  
        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 1s ease-out; }
            .animate-slide-up { animation: slide-up 1s ease-out; }
          `}
        </style>
      </section>
    );
  };
  