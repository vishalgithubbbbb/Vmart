import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ dailyRevenue = {} }) => {

  const chartData = Object.keys(dailyRevenue).map((date) => ({
    date: new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    revenue: dailyRevenue[date],
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Daily Revenue Trend
        </h2>

        <p className="text-sm text-gray-500">
          Revenue generated in the last 30 days
        </p>
      </div>

      <div className="w-full h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={chartData}>

            <defs>

              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">

                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />

                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />

              </linearGradient>

            </defs>

            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueChart;