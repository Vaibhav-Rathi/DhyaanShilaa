export const RevenueChart = ({ Line }: any) => {
  const revenueData = {
    labels: ["Aug 01", "Aug 02", "Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 1000, 700, 1200, 1500, 900, 1769],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1.5,  // Thinner line
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows customization of height
    scales: {
      x: { type: "category" },
      y: { beginAtZero: true },
    },
    plugins: {
      legend: {
        labels: {
          font: { size: 12 },  // Smaller font for labels
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg" style={{ maxWidth: '600px' }}> {/* Smaller container */}
      <h3 className="text-sm font-bold mb-2">Revenue</h3>
      <div className="flex justify-between mb-2 text-sm">
        <div>This Month</div>
        <div className="font-semibold">$1,769</div>
      </div>
      <div style={{ height: '200px' }}> {/* Smaller height */}
        <Line data={revenueData} options={options} />
      </div>
    </div>
  );
};
