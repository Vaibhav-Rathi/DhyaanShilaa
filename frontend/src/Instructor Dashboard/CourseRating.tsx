export const CourseRating = () => {
    const ratingCategories = [
      { stars: "★★★★★", label: "5 Star", percentage: 75 },
      { stars: "★★★★☆", label: "4 Star", percentage: 60 },
      { stars: "★★★☆☆", label: "3 Star", percentage: 50 },
      { stars: "★★☆☆☆", label: "2 Star", percentage: 25 },
      { stars: "★☆☆☆☆", label: "1 Star", percentage: 0 }
    ];
  
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-bold">Overall Course Rating</h3>
        <div className="mt-2">
          <div className="text-3xl">4.6</div>
          <div>Overall Rating</div>
          <div className="mt-4">
            {ratingCategories.map((rating, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="mr-2">{rating.stars} {rating.label}</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <div className="ml-3">{rating.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };