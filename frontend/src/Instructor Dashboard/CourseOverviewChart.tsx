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
      scales: { y: { beginAtZero: true } },
    };
  
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-bold">Course Overview</h3>
        <Line
          data={courseOverviewData}
          options={courseOverviewOptions}
          height={200}
        />
      </div>
    );
  };