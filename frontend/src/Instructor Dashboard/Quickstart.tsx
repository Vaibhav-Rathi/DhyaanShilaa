export const QuickStats = () => {
  const stats = [
    { label: 'Enrolled Courses', value: 957 },
    { label: 'Active Courses', value: 19 },
    { label: 'Course Instructors', value: 241 },
    { label: 'Total Earnings', value: '$7,461,767' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold">{stat.value}</div>
          <div className="text-sm sm:text-base">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
