const PaymentChart = ({
  onlineOrders = 0,
  offlineOrders = 0,
}) => {

  const total = onlineOrders + offlineOrders;

  const getPercent = (value) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  const paymentData = [
    {
      title: "Online Payment",
      value: onlineOrders,
      color: "bg-green-500",
    },
    {
      title: "Cash On Delivery",
      value: offlineOrders,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Payment Methods
      </h2>

      <div className="space-y-8">

        {paymentData.map((item) => (

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

export default PaymentChart;