export const ProfileViewChart = ({ Line, windowWidth }:any) => {
  const profileViewData = {
    labels: ["Aug 01", "Aug 02", "Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],
    datasets: [
      {
        label: "Profile Views",
        data: [300, 400, 200, 600, 500, 700, 7443],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        type: "category",
        ticks: {
          font: {
            size: windowWidth < 768 ? 8 : 10
          },
          maxRotation: windowWidth < 576 ? 45 : 0
        }
      },
      y: { 
        beginAtZero: true,
        ticks: {
          font: {
            size: windowWidth < 768 ? 8 : 10
          }
        }
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: windowWidth < 768 ? 10 : 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 shadow rounded-lg h-full">
      <h3 className="text-base sm:text-lg font-bold">Profile View</h3>
      <div className="flex justify-between mb-2 md:mb-4">
        <div className="text-xs sm:text-sm">Today</div>
        <div className="text-base sm:text-lg font-semibold">7,443</div>
      </div>
      <div className="h-40 sm:h-48 md:h-56 lg:h-64">
        <Line data={profileViewData} options={options} />
      </div>
    </div>
  );
};