import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    cartCount,
    searchQuery,
    setSearchQuery,
  } = useContext(AppContext);

  // Logout
  const handleUserLogout = async () => {
    try {
      const res = await axios.get("/api/user/logout");

      if (res.data.success) {
        toast.success(res.data.message);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed");
      setUser(null);
      navigate("/");
    }
  };

  // Search (Same Logic)
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  // Close Mobile Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".mobile-menu") &&
        !event.target.closest('[aria-label="Menu"]')
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm transition-all">

      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4">

        {/* Logo */}

        <Link to="/" className="group">

          <h1 className="text-3xl font-extrabold tracking-widest uppercase transition-all duration-300 group-hover:scale-105">

            <span className="text-orange-500">V</span>

            <span className="text-gray-800">Mart</span>

          </h1>

        </Link>
        {/* ================= Desktop Menu ================= */}

        <div className="hidden sm:flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `font-medium transition duration-300 ${isActive
                ? "text-orange-500"
                : "text-gray-700 hover:text-orange-500"
              }`
            }
          >
            All Products
          </NavLink>

          {/* ===== Search (Logic Same) ===== */}

          <div className="relative hidden lg:block">

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={typeof searchQuery === "string" ? searchQuery : ""}
              type="text"
              placeholder="Search here..."
              className="w-72 rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-5 pr-11 outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200"
            />

            <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />

          </div>

          {/* ===== Cart ===== */}

          <button
            onClick={() => navigate("/cart")}
            className="relative rounded-full p-3 transition-all duration-300 hover:bg-orange-50 hover:scale-105"
          >

            <FaShoppingCart className="text-2xl text-gray-700" />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
              {cartCount()}
            </span>

          </button>

          {/* ===== User ===== */}

          {user ? (

            <div className="relative">

              <img
                src={assets.logo}
                alt="User"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="h-11 w-11 cursor-pointer rounded-full border-2 border-orange-300 object-cover transition duration-300 hover:scale-105"
              />

              {userMenuOpen && (

                <div className="absolute right-0 top-14 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                  <button
                    onClick={() => {
                      navigate("/my-orders");
                      setUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left transition hover:bg-orange-50"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={handleUserLogout}
                    className="w-full px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            <button
              onClick={() => setShowUserLogin(true)}
              className="rounded-full bg-orange-500 px-7 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
            >
              Login
            </button>

          )}

        </div>
        {/* ================= Mobile Menu Button ================= */}

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="sm:hidden p-2 rounded-md hover:bg-orange-50 transition"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

      </div>

      {/* ================= Mobile Menu ================= */}

      <div
        id="mobile-menu"
        className={`${open ? "flex" : "hidden"
          } mobile-menu flex-col border-t border-gray-200 bg-white px-6 py-5 gap-5 shadow-lg sm:hidden`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="font-medium hover:text-orange-500"
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setOpen(false)}
          className="font-medium hover:text-orange-500"
        >
          All Products
        </NavLink>

        <button
          onClick={() => {
            navigate("/cart");
            setOpen(false);
          }}
          className="flex items-center gap-3 font-medium hover:text-orange-500"
        >
          <FaShoppingCart />
          Cart ({cartCount()})
        </button>

        {/* Search (Same Logic) */}

        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search here..."
            className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-10 outline-none focus:border-orange-500"
          />

          <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        </div>

        {user ? (
          <>
            <button
              onClick={() => {
                navigate("/my-orders");
                setOpen(false);
              }}
              className="rounded-lg bg-orange-50 py-2 font-medium hover:bg-orange-100"
            >
              My Orders
            </button>

            <button
              onClick={handleUserLogout}
              className="rounded-lg bg-red-50 py-2 font-medium text-red-500 hover:bg-red-100"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setShowUserLogin(true);
              setOpen(false);
            }}
            className="rounded-full bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;