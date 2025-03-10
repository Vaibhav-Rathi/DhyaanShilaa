export const CourseRating = () => {
  const ratingCategories = [
    { stars: "★★★★★", label: "5 Star", percentage: 75 },
    { stars: "★★★★☆", label: "4 Star", percentage: 60 },
    { stars: "★★★☆☆", label: "3 Star", percentage: 50 },
    { stars: "★★☆☆☆", label: "2 Star", percentage: 25 },
    { stars: "★☆☆☆☆", label: "1 Star", percentage: 0 }
  ];

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg h-full">
      <h3 className="text-base sm:text-lg font-bold mb-2">Overall Course Rating</h3>
      <div className="mt-1 sm:mt-2">
        <div className="text-xl sm:text-2xl md:text-3xl">4.6</div>
        <div className="text-xs sm:text-sm">Overall Rating</div>
        <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
          {ratingCategories.map((rating, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-2 text-xs sm:text-sm whitespace-nowrap">{rating.stars} {rating.label}</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-2.5">
                <div
                  className="bg-yellow-400 h-1.5 sm:h-2 md:h-2.5 rounded-full"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>
              <div className="ml-2 sm:ml-3 text-xs sm:text-sm">{rating.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};