export const CourseOverviewChart = ({ Line, windowWidth }:any) => {
  const courseOverviewData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Views",
        data: [100, 150, 200, 180, 220, 250, 300],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Enrollments",
        data: [50, 70, 100, 90, 120, 150, 180],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const courseOverviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      y: { 
        beginAtZero: true,
        ticks: {
          font: {
            size: windowWidth < 768 ? 8 : 10
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: windowWidth < 768 ? 8 : 10
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: windowWidth < 768 ? 8 : 10,
          padding: windowWidth < 768 ? 6 : 10,
          font: {
            size: windowWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg h-full">
      <h3 className="text-base sm:text-lg font-bold mb-2">Course Overview</h3>
      <div className="h-40 sm:h-48 md:h-56 lg:h-64">
        <Line
          data={courseOverviewData}
          options={courseOverviewOptions}
        />
      </div>
    </div>
  );
};