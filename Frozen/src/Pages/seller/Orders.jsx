import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);
  const [updating, setUpdating] = useState(null);

  // ✅ Define status list once
  const statusList = [
    "Order Placed",
    "Processing",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

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

  const updateStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);
      const { data } = await axios.post("/api/order/update-status", {
        orderId,
        status,
      });

      if (data.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Status update failed");
      console.log(error);
    } finally {
      setUpdating(null);
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
            !order?.address ? "border-red-400 bg-red-50" : "border-gray-300"
          } text-gray-800`}
        >
          {/* Product Info */}
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={
                order?.items?.[0]?.product?.image?.[0]
                  ? `${import.meta.env.VITE_BACKEND_URL}/images/${order.items[0].product.image[0]}`

                  : "/placeholder.png"
              }
              alt={order?.items?.[0]?.product?.name || "No product"}
            />
            <div>
              {order?.items?.map((item, idx) => (
                <p key={idx} className="font-medium">
                  {item?.product?.name || "Product unavailable"}{" "}
                  <span
                    className={`text-indigo-500 ${
                      item?.quantity < 2 && "hidden"
                    }`}
                  >
                    x {item?.quantity || 0}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Address Info */}
          <div className="text-sm">
            {order?.address ? (
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
              <p className="text-red-600 font-semibold">
                ⚠️ Address not available
              </p>
            )}
          </div>

          {/* Amount */}
          <p className="font-medium text-base my-auto text-black/70">
            ₹{order?.amount || 0}
          </p>

          {/* Payment Info */}
          <div className="flex flex-col text-sm">
            <p>Method: {order?.paymentType || "N/A"}</p>
            <p>
              Date:{" "}
              {order?.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p>Payment: {order?.isPaid ? "Paid" : "Pending"}</p>
          </div>

          {/* Tracking Status */}
          <div className="flex flex-col gap-2">
            <p className="font-medium">Status:</p>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              {statusList.map((item) => (
                <option
                  key={item}
                  value={item}
                  disabled={
                    statusList.indexOf(item) <
                    statusList.indexOf(order.status)
                  }
                >
                  {item}
                </option>
              ))}
            </select>

            {updating === order._id && (
              <p className="text-xs text-blue-500">Updating...</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
