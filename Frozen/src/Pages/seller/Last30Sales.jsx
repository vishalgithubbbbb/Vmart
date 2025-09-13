import { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../../Context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Last30Sales = () => {
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState('');
  const { axios } = useContext(AppContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/seller")
      .then(res => {
        console.log('Sales Data:', res.data);
        setSalesData(res.data);
      })
      .catch(err => {
        console.error("AxiosError:", err);
        setError('Failed to load sales data');
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!salesData) return <p>Loading sales data...</p>;

  const {
    monthlyRevenue = {},
    dailyRevenue = {},
    totalOrders = 0,
    totalRevenue = 0,
    totalPaidOrders = 0,
    totalUnpaidOrders = 0,
    totalPaidRevenue = 0,
    totalUnpaidRevenue = 0
  } = salesData;

  const monthlyChartData = {
    labels: Object.keys(monthlyRevenue),
    datasets: [{
      label: 'Monthly Revenue',
      data: Object.values(monthlyRevenue),
      backgroundColor: '#875cf5'
    }]
  };

  const last30DaysLabels = Object.keys(dailyRevenue).slice(-30);
  const last30DaysValues = Object.values(dailyRevenue).slice(-30);

  const dailyChartData = {
    labels: last30DaysLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Daily Revenue (Bar)',
        data: last30DaysValues,
        backgroundColor: '#f59e42'
      },
      {
        type: 'line',
        label: 'Daily Revenue (Line)',
        data: last30DaysValues,
        borderColor: '#3b82f6',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#3b82f6'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `₹${value}`
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="border rounded-lg shadow-md bg-white p-6 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-700">🧊 VMART Seller Dashboard</h2>

        {/* 🔢 Summary Stats */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">📊 Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800">
            <div className="border p-3 rounded-md bg-white">Total Orders: <strong>{totalOrders}</strong></div>
            <div className="border p-3 rounded-md bg-white">Total Revenue: <strong>₹{totalRevenue}</strong></div>
            <div className="border p-3 rounded-md bg-white">Paid Orders: <strong>{totalPaidOrders}</strong></div>
            <div className="border p-3 rounded-md bg-white">Unpaid Orders: <strong>{totalUnpaidOrders}</strong></div>
            <div className="border p-3 rounded-md bg-white">Paid Revenue: <strong>₹{totalPaidRevenue}</strong></div>
            <div className="border p-3 rounded-md bg-white">Unpaid Revenue: <strong>₹{totalUnpaidRevenue}</strong></div>
          </div>
        </div>

        {/* 📅 Monthly Revenue Chart */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">📅 Monthly Revenue</h3>
          <Bar data={monthlyChartData} options={chartOptions} />
        </div>

        {/* 📆 Daily Revenue Chart */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">📆 Daily Revenue Chart </h3>
          <Bar data={dailyChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Last30Sales;