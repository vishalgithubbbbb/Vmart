import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, navigate } = useContext(AppContext);

  const handleSellerLogout = async () => {
    try {
      const res = await axios.get("/api/seller/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        setIsSeller(false);
        navigate("/seller");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.addicon },
    { name: "Products", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    { name: "Subscribers", path: "/seller/subscribers", icon: assets.newsletter },
    { name: "Sales", path: "/seller/sales", icon: assets.sales },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <header className="h-16 flex items-center justify-between px-5 md:px-10 border-b border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider">
            <span className="text-orange-500">AV</span>
            <span className="text-gray-900">Mart</span>
          </h1>
          <span className="hidden md:block text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
            Seller Panel
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm text-gray-600">Hi, Admin 👋</p>
          <button
            onClick={handleSellerLogout}
            className="px-4 py-1.5 rounded-full border border-gray-300 text-sm hover:bg-red-500 hover:text-white hover:border-red-500 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 md:w-56 border-r border-gray-200 min-h-[calc(100vh-64px)] pt-5 bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 mb-2 px-3 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="hidden md:block text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
