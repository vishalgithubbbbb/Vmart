import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FaShoppingCart } from 'react-icons/fa';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

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

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('[aria-label="Menu"]')
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white sticky top-0 z-50 transition-all">
      <Link to="/">
        <h1 className="text-orange-500 font-semibold text-3xl tracking-widest uppercase">
          Vmart
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
        <NavLink to="/products" className="hover:text-orange-500">All Products</NavLink>

        {/* Search Bar */}
        <div className="relative group hidden sm:block">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search here"
            className="search-bar"
          />
          <CiSearch className="text-xl text-gray-600 absolute top-1/2 -translate-y-1/2 right-3" />
        </div>

        {/* Cart */}
        <button onClick={() => navigate('/cart')} className="relative p-3">
          <FaShoppingCart className="text-xl text-gray-600" />
          <div className="w-5 h-3 bg-red-500 text-white rounded-full top-0 absolute flex items-center justify-center text-xs">
            {cartCount()}
          </div>
        </button>

        {/* User Section */}
        {user ? (
          <div className="relative">
            <img
              src={assets.logo}
              alt="User"
              className="w-10 cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            {userMenuOpen && (
              <ul className="absolute top-12 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-40 text-sm">
                <li
                  onClick={() => navigate('/my-orders')}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  My Orders
                </li>
                <li
                  onClick={() => setUser(null)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="sm:hidden"
      >
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          open ? 'flex' : 'hidden'
        } mobile-menu absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-5 text-sm sm:hidden`}
      >
        <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
        <NavLink to="/products" className="hover:text-orange-500">All Products</NavLink>
        <NavLink to="/cart" className="hover:text-orange-500">Cart Items</NavLink>

        {/* User Section */}
        {user ? (
          <div className="relative">
            <img
              src={assets.logo}
              alt="User"
              className="w-10 cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            />
            {userMenuOpen && (
              <ul className="absolute top-12 right-0 bg-white shadow-md rounded-md border border-gray-200 py-2 w-32 z-40 text-sm">
                <li
                  onClick={() => navigate('/my-orders')}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  My Orders
                </li>
                <li
                  onClick={() => setUser(null)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;