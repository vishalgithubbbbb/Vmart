import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import ProductDetails from './Pages/ProductDetails'
import Product from './Pages/Product'
import Navbar from './Components/Navbar'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import MyOrders from './Pages/MyOrders'
import Auth from './Models/Auth'
import ProductCategory from './Pages/ProductCategory'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'
import AddAddress from './Pages/AddAddress'
import SellerLogin from './Components/seller/SellerLogin'
import AddProduct from './Pages/seller/AddProduct'
import ProductList from './Pages/seller/ProductList'
import Orders from './Pages/seller/Orders'
import SellerLayout from './Pages/Seller/SellerLayout'
import Loading from './Components/Loading'





const App = () => {
const {isSeller,showUserLogin} = useContext(AppContext);
const isSellerPath=useLocation().pathname.includes('seller');


  return (
    <div className='text-default min-h-screen'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin?<Auth/>:null}
      <Toaster/>
     <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/products" element={<Product />} />
       <Route path="/product/:category/:id" element={<ProductDetails />} />
       <Route path="/products/:category" element={<ProductCategory />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/my-orders" element={<MyOrders />} />
       <Route path="/add-address" element={<AddAddress/>}/>
       <Route path="/loader" element={<Loading/>}/>


       <Route path="/seller" element={isSeller?<SellerLayout/>:<SellerLogin/>}>
       <Route index element={isSeller ? <AddProduct/> : null}/>
       <Route path='product-list' element={isSeller ? <ProductList/> : null}/>
       <Route path='orders' element={isSeller ? <Orders/> : null}/>
       </Route>
      </Routes>
     </div>
       {isSellerPath ? null : <Footer/>}
    </div>
  )
}

export default App