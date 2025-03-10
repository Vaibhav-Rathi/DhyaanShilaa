export const RecentActivity = () => {
  const activities = [
    "Kevin comments on your lecture \"What is UX in 2021\" - Just now",
    "John gives a 5-star rating on your course \"2021 UX Design\" - 5 min ago",
    "Sraboni purchases your course \"2021 UX Design\" - 6 min ago",
    "Arif purchases your course \"2021 UX Design\" - 7 min ago"
  ];

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg mb-3 md:mb-4">
      <div className="flex justify-between mb-2 md:mb-4">
        <h3 className="text-base sm:text-lg font-bold">Recent Activity</h3>
        <div className="text-blue-600 text-sm sm:text-base cursor-pointer">View All</div>
      </div>
      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base">
        {activities.map((activity, index) => (
          <div key={index} className="py-1 border-b border-gray-100 last:border-0">{activity}</div>
        ))}
      </div>
    </div>
  );
};