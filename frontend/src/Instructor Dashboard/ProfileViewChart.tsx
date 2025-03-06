export const ProfileViewChart = ({ Line }: any) => {
  const profileViewData = {
    labels: ["Aug 01", "Aug 02", "Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],
    datasets: [
      {
        label: "Profile Views",
        data: [300, 400, 200, 600, 500, 700, 7443],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1.5, // Thinner line for a cleaner look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows height customization
    scales: {
      x: { type: "category" },
      y: { beginAtZero: true },
    },
    plugins: {
      legend: {
        labels: {
          font: { size: 12 }, // Smaller font for labels
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg" style={{ maxWidth: '600px' }}> {/* Smaller container */}
      <h3 className="text-sm font-bold mb-2">Profile Views</h3>
      <div className="flex justify-between mb-2 text-sm">
        <div>Today</div>
        <div className="font-semibold">7,443</div>
      </div>
      <div style={{ height: '200px' }}> {/* Smaller chart height */}
        <Line data={profileViewData} options={options} />
      </div>
    </div>
  );
};
