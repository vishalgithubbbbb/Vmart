import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();


  // State variables
  const [user, setUser] = useState(null);  
  const [isSeller, setIsSeller] = useState(null) 
  const [showUserLogin, setShowUserLogin] = useState(false) 
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});


  //check seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);  
      }
      else {
        setIsSeller(false);
      }
    }
    catch (error) {
      setIsSeller(false);
      toast.error(error.message)
    }
  }

  //check user status 
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }


  //fetch all products data
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }


  //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    }
    else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added To Cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated Successfully")
  }


  //total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item]
    }
    return totalCount
  }

  //total cart amounts
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id == items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 1000) / 1000;
  };

  //remove products from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("removed from cart")
      setCartItems(cartData)
    }

  }

  useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, [])


  const value = { navigate, user, setUser, removeFromCart, totalCartAmount,setCartItems, isSeller, addToCart, cartCount, cartItems, updateCartItem, setIsSeller, products, fetchProducts, showUserLogin, setShowUserLogin, setSearchQuery, searchQuery, axios };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export default AppContextProvider; 