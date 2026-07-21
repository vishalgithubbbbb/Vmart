const OrderStatusChart = ({
  orderPlaced = 0,
  pendingPayment = 0,
  shipped = 0,
  delivered = 0,
  cancelled = 0,
}) => {

  const total =
    orderPlaced +
    pendingPayment +
    shipped +
    delivered +
    cancelled;

  const getPercent = (value) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  const statusData = [
    {
      title: "Order Placed",
      value: orderPlaced,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: pendingPayment,
      color: "bg-yellow-500",
    },
    {
      title: "Shipped",
      value: shipped,
      color: "bg-cyan-500",
    },
    {
      title: "Delivered",
      value: delivered,
      color: "bg-green-500",
    },
    {
      title: "Cancelled",
      value: cancelled,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Order Status
      </h2>

      <div className="space-y-6">

        {statusData.map((item) => (

          <div key={item.title}>

            <div className="flex justify-between mb-2">

              <span className="font-medium text-gray-700">
                {item.title}
              </span>

              <span className="font-semibold">
                {item.value}
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className={`${item.color} h-3 rounded-full transition-all duration-700`}
                style={{
                  width: `${getPercent(item.value)}%`,
                }}
              />

            </div>

            <p className="text-xs text-gray-500 mt-1">

              {getPercent(item.value)}%

            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default OrderStatusChart;