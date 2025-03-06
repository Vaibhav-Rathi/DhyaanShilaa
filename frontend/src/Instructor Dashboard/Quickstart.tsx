export const QuickStats = () => {
    const stats = [
      { label: 'Enrolled Courses', value: 957 },
      { label: 'Active Courses', value: 19 },
      { label: 'Course Instructors', value: 241 },
      { label: 'Total Earnings', value: '$7,461,767' }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 shadow rounded-lg text-center">
            <div className="text-3xl">{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };