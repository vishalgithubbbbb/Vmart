import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const MonthlyRevenueChart = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await axios.get("/api/order/monthly-sales");

        if (data.success) {
          setSales(data.sales);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSales();
  }, []);

  const chartData = sales.map((item) => ({
    month: item.month,
    revenue: item.totalSales,
    orders: item.totalOrders,
  }));

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EF4444",
    "#06B6D4",
    "#22C55E",
    "#EC4899",
    "#6366F1",
    "#14B8A6",
    "#F97316",
    "#84CC16",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Monthly Sales
        </h2>

        <p className="text-gray-500">
          Revenue generated month-wise
        </p>
      </div>

      <div className="h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Revenue"]}
            />

            <Bar
              dataKey="revenue"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default MonthlyRevenueChart;