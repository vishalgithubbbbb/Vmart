import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"
import ProductCard from "../Components/ProductCard";

const Product = () => {
  const {products,searchQuery}=useContext(AppContext);
  const [filterProducts,setFilterProducts] = useState([]);
  useEffect(()=>{
   if(searchQuery.length>0){
    setFilterProducts(
      products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
   } else{
    setFilterProducts(products);
   }
  },[products,searchQuery])

  return (
    <div className="mt-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">All Products</h1>
      <div className="my-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9 items-center justify-center">
        {
          filterProducts.filter((product)=>product.instock).map((p,i)=>(
            <ProductCard key={i} product={p}/>
          ))
        }
      </div>

    </div>
  )
}

export default Product