import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticsProps {
    averageProgress: number;
    completedPercentage: number;
    totalCourses: number;
}

const Statistics: React.FC<StatisticsProps> = ({ averageProgress, completedPercentage, totalCourses }) => {
    const chartRef = useRef<any>(null);
    const [chartInstance, setChartInstance] = useState<ChartJS | null>(null);

    const data = {
        datasets: [
            {
                data: [completedPercentage, 100 - completedPercentage],
                backgroundColor: ['#F9C748', '#2D3A7C'],
                hoverBackgroundColor: ['#F9C748', '#2D3A7C'],
                borderWidth: 0,
            },
        ],
        labels: ['Completed Courses', 'Pending Courses'],
    };

    const options = {
        cutout: '75%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        maintainAspectRatio: false,
    };

    useEffect(() => {
        if (chartRef.current) {
            setChartInstance(chartRef.current.chart);
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [chartInstance]);

    return (
        <div className="p-5 bg-white rounded-3xl shadow-xl text-center font-Poppins">
            <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
            <p className="text-sm text-gray-500">Video Watched</p>
            <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
                <Doughnut ref={chartRef} data={data} options={options} />
                <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-bold text-gray-900">{completedPercentage}%</span>
                    <p className="text-xs text-gray-500">Video Ditonton</p>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Avg Progress: {averageProgress.toFixed(2)}% across {totalCourses} courses</p>
        </div>
    );
};

export default Statistics;