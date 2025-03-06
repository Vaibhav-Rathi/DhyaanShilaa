export const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h3 className="text-xl sm:text-2xl text-yellow-600 font-semibold tracking-wide mb-2 animate-fade-in">
            ABOUT US
          </h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4 animate-slide-up">
            [Edutech]: Elevate Your Learning Journey
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 animate-fade-in">
            [Edutech] is your ultimate e-learning platform, designed to make education accessible and empowering for learners worldwide.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/MiddleImage.png"
            alt="Team working together"
            className="w-4/5 sm:w-3/4 md:w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Animations */}
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
