import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";

const Product = () => {

  const { products, searchQuery } = useContext(AppContext);

  const [filterProducts, setFilterProducts] = useState([]);


  useEffect(() => {

    if(searchQuery.length > 0){

      setFilterProducts(
        products.filter((product)=>
          product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        )
      );

    }
    else{

      setFilterProducts(products);

    }


  },[products,searchQuery]);



  const availableProducts = filterProducts.filter(
    (product)=>product.instock
  );



  return (

    <div className="mt-16 px-4 pb-20">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">


        <div>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">

            All Products

          </h1>


          <p className="text-gray-500 mt-2">

            Explore our latest frozen products

          </p>


        </div>



        <div className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">

          {availableProducts.length} Products

        </div>


      </div>






      {/* PRODUCTS */}

      {
        availableProducts.length > 0 ?


        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">


          {
            availableProducts.map((product,index)=>(


              <ProductCard

                key={index}

                product={product}

              />


            ))
          }


        </div>


        :


        <div className="mt-20 flex flex-col items-center justify-center">


          <h2 className="text-2xl font-semibold text-gray-700">

            No Products Found 😔

          </h2>


          <p className="text-gray-500 mt-2">

            Try searching another product

          </p>


        </div>


      }



    </div>

  );

};


export default Product;