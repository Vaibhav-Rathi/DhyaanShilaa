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
    const [chartSize, setChartSize] = useState<number>(140);
    
    // Adjust chart size based on screen width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setChartSize(120);
            } else if (window.innerWidth < 1024) {
                setChartSize(140);
            } else {
                setChartSize(160);
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div className="w-full sm:w-auto text-center font-Poppins">
            <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
            <p className="text-sm text-gray-500 mb-3">Video Watched</p>
            <div className="relative flex items-center justify-center mx-auto" style={{ width: chartSize, height: chartSize }}>
                <Doughnut ref={chartRef} data={data} options={options} />
                <div className="absolute flex flex-col items-center">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{completedPercentage}%</span>
                    <p className="text-xs text-gray-500">Video Ditonton</p>
                </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Avg Progress: {averageProgress.toFixed(2)}% across {totalCourses} courses
            </p>
        </div>
    );
};

export default Statistics;