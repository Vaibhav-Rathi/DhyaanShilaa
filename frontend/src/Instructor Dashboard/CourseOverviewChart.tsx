export const CourseOverviewChart = ({ Line }:any) => {
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
            size: 10
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg w-full">
      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Course Overview</h3>
      <div className="w-full h-40 sm:h-48 md:h-64 lg:h-80">
        <Line
          data={courseOverviewData}
          options={courseOverviewOptions}
        />
      </div>
    </div>
  );
};