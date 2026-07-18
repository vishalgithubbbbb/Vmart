import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContext";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
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
    if (!user) navigate("/cart");
  }, [user, navigate]);

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition bg-gray-50";

  return (
    <div className="mt-12 px-4 pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Add Delivery Address 📍</h1>
            <p className="text-gray-500 mt-2">Where should we deliver your order?</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  name="firstName"
                  value={address.firstName}
                  onChange={handleChange}
                  placeholder="Vishal"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  name="lastName"
                  value={address.lastName}
                  onChange={handleChange}
                  placeholder="Chaurasiya"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Street Address</label>
              <input
                name="street"
                value={address.street}
                onChange={handleChange}
                placeholder="House no, street name"
                className={inputClass}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className={inputClass}
                required
              />
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="State"
                className={inputClass}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                placeholder="Pincode"
                className={inputClass}
                required
              />
              <input
                name="country"
                value={address.country}
                onChange={handleChange}
                placeholder="Country"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
                required
              />
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02]"
              }`}
            >
              {loading ? "Saving..." : "Save Address →"}
            </button>
          </form>
        </div>

        {/* Image Side */}
        <div className="hidden md:flex items-center justify-center">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-10">
            <img
              src={assets.add_address_iamge}
              alt="Address"
              className="w-80 drop-shadow-xl"
            />
            <div className="text-center mt-6">
              <h2 className="text-xl font-semibold">Fast & Safe Delivery 🚚</h2>
              <p className="text-gray-600 mt-2">
                Your address helps us deliver your order smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
