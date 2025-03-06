export const ProfileViewChart = ({ Line }:any) => {
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
      scales: {
        x: { type: "category" },
        y: { beginAtZero: true },
      },
    };
  
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-bold">Profile View</h3>
        <div className="flex justify-between mb-4">
          <div>Today</div>
          <div className="text-lg font-semibold">7,443</div>
        </div>
        <Line data={profileViewData} options={options} height={300} />
      </div>
    );
  };