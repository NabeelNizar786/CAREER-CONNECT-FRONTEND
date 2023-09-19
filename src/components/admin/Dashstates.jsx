import React, { useEffect, useState } from 'react';
import { revenue, userCount, empCount } from '../../services/adminApi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { postsByDate } from '../../services/adminApi';
import { Bar } from 'react-chartjs-2';
import { empJoinCountDates } from '../../services/adminApi';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashStates() {
  const [userCounts, setUserCount] = useState(0);
  const [empCounts, setEmpCount] = useState(0);
  const [revenuee, setRevenue] = useState(0);
  const [postsByDates, setPostsByDates] = useState([]);
  const [employerData, setEmployerData] = useState([]);

  const sortedData = postsByDates.sort((a, b) => new Date(a._id) - new Date(b._id));

// Get the data for the last 7 days
const lastSevenDaysData = sortedData.slice(-7);

const BarData = {
  labels: employerData.map((data) => {
    // Format the date object as a string in the desired format
    return new Date(data._id.year, data._id.month - 1, data._id.day).toLocaleDateString();
  }),
  datasets: [
    {
      label: 'Employers Joined',
      data: employerData.map((data) => data.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the bar color
      borderColor: 'rgba(75, 192, 192, 1)', // Adjust the border color
      borderWidth: 1,
    },
  ],
};


  const lineChartData = {
    labels: lastSevenDaysData.map((data) => data._id),
    datasets: [
      {
        label: 'Number of Posts',
        data: lastSevenDaysData.map((data) => data.count),
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: 'blue', // Color of data points
        pointRadius: 5, // Size of data points
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Number of Posts',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the curve of the line
      },
    },
  };



  useEffect(() => {
    revenue()
      .then((res) => {
        setRevenue(res.data.revenue);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    userCount()
      .then((res) => {
        setUserCount(res.data.count);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    empCount()
      .then((res) => {
        setEmpCount(res.data.count);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      postsByDate()
      .then((res) => {
        console.log(res.data);
        setPostsByDates(res.data.postsByDate);
      })
      .catch((err) => {
        console.log(err);
      })

      empJoinCountDates()
      .then((res) => {
        console.log(res.data);
        setEmployerData(res.data.empByDate)
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  console.log(employerData);

  const data = {
    labels: ["PREMIUM", "NORMAL"],
    datasets: [
      {
        data: [revenuee, empCounts - revenuee],
        backgroundColor: ["#FFC107", "#4CAF50"], // Adjust colors
        borderColor: ["#FFC107", "#4CAF50"], // Border colors
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom', // Legend position
      },
    },
    responsive: true, // Make the chart responsive to its container
    maintainAspectRatio: false, // Prevent the chart from maintaining a fixed aspect ratio
    width: 400, // Adjust the width to your desired size
    height: 400, // Adjust the height to your desired size
  };

  const colorScheme = {
    primary: 'blue',
    secondary: 'gray',
    background: 'white',
  };


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="bg-blue-800 hover:bg-blue-900 text-white rounded-lg p-6 text-center">
            <h1 className="text-2xl font-semibold">Job Seeker</h1>
            <h1 className="text-4xl font-bold">{userCounts}</h1>
          </div>

          {/* Revenue */}
          <div className="bg-blue-800 hover:bg-blue-900 text-white rounded-lg p-6 text-center">
            <h1 className="text-2xl font-semibold">Revenue</h1>
            <h1 className="text-4xl font-bold">₹{revenuee * 1000}</h1>
          </div>

          {/* Employers */}
          <div className="bg-blue-800 hover:bg-blue-900 text-white rounded-lg p-6 text-center">
            <h1 className="text-2xl font-semibold">Employers</h1>
            <h1 className="text-4xl font-bold">{empCounts}</h1>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-center font-semibold text-2xl">EMPLOYER TYPE</h1>
          <div className="mt-5 h-64">
            <Doughnut data={data} options={options} />
          </div>
        </div>

                {/* Line Chart */}
                <div className="bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-center font-semibold text-2xl">DAILY POST COUNT</h1>
          <div className="mt-5"style={{ height: '400px' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

            {/* Bar Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-center font-semibold text-2xl">EMPLOYERS COUNT BY DATE</h1>
          <div className="mt-5 bar-chart" style={{ height: '400px' }}>
          <Bar data={BarData} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
}
