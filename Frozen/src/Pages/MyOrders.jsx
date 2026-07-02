import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl font-medium md:text-3xl">My Orders</p>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between items-center gap-6">
            <span>Order ID: {order?._id}</span>
            <span>Payment : {order?.paymentType}</span>
            <span>TotalAmount : ₹{order?.amount}</span>
          </p>

          {order?.items?.map((item, idx) => (
            <div
              key={idx}
              className={`relative bg-white text-gray-800 ${
                order.items.length !== idx + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full max-w-4xl`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-4 rounded-lg">
                  <img
                    src={
                      item?.product?.image
                        ? `http://localhost:5000/images/${item.product.image}`
                        : "/placeholder.png"
                    }
                    alt={item?.product?.name || "No product"}
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium">
                    {item?.product?.name || "Product unavailable"}
                  </h2>
                  <p>{item?.product?.category || "Unknown category"}</p>
                </div>
              </div>

              <div className="text-lg font-medium">
                <p>Quantity: {item?.quantity || 0}</p>
                <p>Status: {order?.status || "N/A"}</p>
                <p>
                  Date:{" "}
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <p className="text-lg">
                Amount: ₹
                {item?.product?.offerPrice
                  ? item.product.offerPrice * (item?.quantity || 0)
                  : 0}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
