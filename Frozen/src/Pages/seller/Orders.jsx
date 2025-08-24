import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";


const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Order List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className={`flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border ${
            !order.address ? "border-red-400 bg-red-50" : "border-gray-300"
          } text-gray-800`}
        >
          {/* Product Info */}
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={`http://localhost:5000/images/${order.items[0].product.image[0]}`}
              alt="boxIcon"
            />
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="font-medium">
                  {item.product?.name || "Unnamed Product"}{" "}
                  <span
                    className={`text-indigo-500 ${
                      item.quantity < 2 && "hidden"
                    }`}
                  >
                    x {item.quantity}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Address Info */}
          <div className="text-sm">
            {order.address ? (
              <>
                <p className="font-medium mb-1">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.zipCode},{" "}
                  {order.address.country}
                </p>
              </>
            ) : (
              <p className="text-red-600 font-semibold">⚠️ Address not available</p>
            )}
          </div>

          {/* Amount */}
          <p className="font-medium text-base my-auto text-black/70">
            ₹{order.amount}
          </p>

          {/* Payment Info */}
          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
