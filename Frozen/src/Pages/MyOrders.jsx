import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "from-green-500 to-green-600";
      case "Shipped":
        return "from-blue-500 to-blue-600";
      case "Cancelled":
        return "from-red-500 to-red-600";
      default:
        return "from-yellow-500 to-orange-500";
    }
  };

  return (
    <div className="mt-12 pb-20 px-4">
      <h1 className="text-3xl font-semibold mb-10">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found</p>
      ) : (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="max-w-5xl mx-auto mb-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Top Header */}
            <div className="bg-gray-50 p-5 flex flex-col md:flex-row justify-between gap-5">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium text-sm break-all">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-600">
                  {order.paymentType}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-semibold">₹{order.amount}</p>
              </div>
            </div>

            {/* Status Section */}
            <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-5">
              <div>
                <p className="text-sm text-gray-500 mb-2">Current Status</p>
                <span
                  className={`px-5 py-2 rounded-full text-white bg-gradient-to-r ${getStatusStyle(
                    order.status
                  )} font-medium shadow`}
                >
                  {order.status}
                </span>
              </div>
              <button
                onClick={() => navigate(`/track-order/${order._id}`)}
                className="px-7 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition flex items-center gap-2"
              >
                🚚 Track Order
              </button>
            </div>

            {/* Products */}
            <div className="px-5 pb-5 space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-between gap-5 p-4 rounded-xl border hover:border-indigo-300 transition"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={
                        item?.product?.image?.[0]
                          ? `${import.meta.env.VITE_BACKEND_URL}/images/${item.product.image}`
                          : "/placeholder.png"
                      }
                      alt={item?.product?.name || "Product"}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">
                        {item?.product?.name || "Product unavailable"}
                      </h2>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      ₹
                      {item?.product?.offerPrice
                        ? item.product.offerPrice * item.quantity
                        : 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
