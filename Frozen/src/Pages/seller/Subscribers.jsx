import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Subscribers = () => {
  const { axios } = useContext(AppContext);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("/api/newsletter/all");
      if (data.success) {
        setSubscribers(data.subscribers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="flex-1 px-6 md:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-sm text-gray-500 mt-1">
          Total Subscribers:
          <span className="ml-1 font-semibold text-green-600">{subscribers.length}</span>
        </p>
      </div>

      {/* Subscriber List */}
      <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_140px] bg-gray-50 border-b px-5 py-3 text-sm font-semibold text-gray-700">
          <span>Email</span>
          <span>Joined</span>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading...</div>
        ) : subscribers.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No subscribers found</div>
        ) : (
          subscribers.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_140px] items-center px-5 py-3.5 border-b last:border-none hover:bg-gray-50 transition"
            >
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm">
                  @
                </div>
                <p className="text-sm text-gray-700 truncate">{item.email}</p>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subscribers;
