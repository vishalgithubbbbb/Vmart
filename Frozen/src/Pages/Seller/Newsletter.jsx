import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Newsletter = () => {
  const { axios } = useContext(AppContext);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/newsletter/send", { subject, message });

      if (data.success) {
        toast.success(data.message);
        setSubject("");
        setMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 px-8 py-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
        <p className="text-gray-500 mt-2">
          Send announcements, offers and new product updates to all your subscribers.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSend} className="max-w-3xl space-y-6">
        {/* Subject */}
        <div>
          <label className="block font-semibold mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            rows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your newsletter..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none focus:border-green-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-3 rounded-xl font-semibold transition ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? "Sending..." : "Send Newsletter"}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
