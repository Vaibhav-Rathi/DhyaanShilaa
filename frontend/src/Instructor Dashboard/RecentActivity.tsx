export const RecentActivity = () => {
    const activities = [
      "Kevin comments on your lecture \"What is UX in 2021\" - Just now",
      "John gives a 5-star rating on your course \"2021 UX Design\" - 5 min ago",
      "Sraboni purchases your course \"2021 UX Design\" - 6 min ago",
      "Arif purchases your course \"2021 UX Design\" - 7 min ago"
    ];
  
    return (
      <div className="bg-white p-6 shadow rounded-lg mb-4">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <div className="text-blue-600">View All</div>
        </div>
        <div>
          {activities.map((activity, index) => (
            <div key={index}>{activity}</div>
          ))}
        </div>
      </div>
    );
  };