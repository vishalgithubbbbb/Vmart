import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../../Context/AppContext';
import { useContext } from 'react';
// 🔧 Paste ChartJS registration here
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Last30Sales = () => {
  const [salesData, setSalesData] = useState(null);
  const {axios} = useContext(AppContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales/seller")
      .then(res => setSalesData(res.data))
      .catch(err => console.error("AxiosError:",err));
  },[]);

  if (!salesData) return <p>Loading...</p>;

  const chartData = {
    labels: Object.keys(salesData.monthlyRevenue),
    datasets: [{
      label: 'Monthly Revenue',
      data: Object.values(salesData.monthlyRevenue),
      backgroundColor: '#875cf5'
    }]
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Sales Dashboard</h2>
      <p>Total Orders: {salesData.totalOrders}</p>
      <p>Total Revenue: ₹{salesData.totalRevenue}</p>
      <Bar data={chartData} />
    </div>
  );
};  

export default Last30Sales;