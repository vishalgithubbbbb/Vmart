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
  const {axios,user,navigate} = useContext(AppContext);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try{
       e.preventDefault();
       const {data} = await axios.post("/api/address/add",{address}) 
       if(data.success){
        toast.success(data.message);
        navigate("/cart")
       }
       else{
        toast.error(data.message);
       }
    }
    catch(error){
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(!user){
      navigate("/cart");
    }
  },[])

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-br from-gray-100 to-indigo-100 rounded-lg shadow-lg">
      {/* Left side: Address Fields */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Address Details</h2>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              placeholder="Vishal"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              placeholder="Chaurasiya"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={address.email}
              onChange={handleChange}
              placeholder="vishal.chaurasiya@example.com"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="123 Main St"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Bhiwandi"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="Maharashtra"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              placeholder="421302"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="India"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="+91 8960370524"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md p-2 transition duration-200"
            >
              Save Address
            </button>
            {submitted && (
              <p className="text-green-600 mt-2 text-center">✅ Address saved successfully!</p>
            )}
          </div>
        </form>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AddAddress;   