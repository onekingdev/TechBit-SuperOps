import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function TicketsBarChart(props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    
    // const labels = [10, 11, 5, 1, 2];
    const labels = props.data.labels;
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Closed',
                data: props.data.data,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
            // {
            //     label: 'Open',
            //     data: props.data.data,
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)rgba(255, 99, 132, 0.5)',
            // },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default TicketsBarChart
