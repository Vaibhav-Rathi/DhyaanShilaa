export const RevenueChart = ({ Line }:any) => {
    const revenueData = {
      labels: ["Aug 01", "Aug 02", "Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],
      datasets: [
        {
          label: "Revenue",
          data: [500, 1000, 700, 1200, 1500, 900, 1769],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        x: { type: "category" },
        y: { beginAtZero: true },
      },
    };
  
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-bold">Revenue</h3>
        <div className="flex justify-between mb-4">
          <div>This Month</div>
          <div className="text-lg font-semibold">$1,769</div>
        </div>
        <Line data={revenueData} options={options} height={300} />
      </div>
    );
  };