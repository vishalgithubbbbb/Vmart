import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const OrdersChart = ({ dailyOrders = {} }) => {

  const chartData = Object.keys(dailyOrders).map((date) => ({
    date: new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    orders: dailyOrders[date],
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Daily Orders Overview
        </h2>

        <p className="text-gray-500 text-sm">
          Number of orders received each day
        </p>
      </div>

      <div className="h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            {/* X Axis = Orders */}
            <XAxis
              type="number"
            />

            {/* Y Axis = Dates */}
            <YAxis
              type="category"
              dataKey="date"
              width={70}
            />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#2563EB"
              radius={[0, 8, 8, 0]}
              barSize={20}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );

};

export default OrdersChart;