export const StatsSection = () => {
    const stats = [
      { value: '21,000+', label: 'Students Enrolled' },
      { value: '100+', label: 'Courses' },
      { value: '150+', label: 'Instructors' }
    ];
    const partners = ['EDUVISTA', 'LEARNX', 'SCHOLARIA', 'MENTORA', 'KNOWLIFY'];
  
    return (
      <section className="py-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-6 flex flex-wrap justify-center items-center gap-6 overflow-auto">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
          <div className=" space-y-2 space-x-6 bg-amber-200 p-2 rounded-lg">
            <div className="text-xl font-bold text-slate-700 flex justify-center">Partners</div>
            <div className="flex space-x-3">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg shadow-md text-white font-semibold transition-transform transform hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #ff9a8b, #ff6b6b, #a044ff)" }}
                  >
                    {partner}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export const StatItem = ({ value, label }: any) => (
    <div className="bg-white shadow-lg rounded-xl px-6 py-4 transition-all transform hover:scale-105 text-center">
      <div className="font-bold text-3xl text-gray-900">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
  