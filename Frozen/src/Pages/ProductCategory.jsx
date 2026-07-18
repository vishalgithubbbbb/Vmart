import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";
import { categories } from "../assets/assets";


const ProductCategory = () => {

  const { category } = useParams();

  const { products } = useContext(AppContext);



  const searchCategory = categories.find(
    (item) =>
      item.path.toLowerCase() === category.toLowerCase()
  );



  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );



  return (

    <div className="mt-16 px-4 pb-20">


      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">


        <div>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">

            {
              searchCategory
              ?
              searchCategory.name.toUpperCase()
              :
              category.toUpperCase()
            }

          </h1>


          <p className="text-gray-500 mt-2">

            Find your favourite products here

          </p>


        </div>



        <div className="mt-4 md:mt-0">

          <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">

            {filteredProducts.length} Products

          </span>


        </div>



      </div>





      {/* Product Grid */}

      {

        filteredProducts.length > 0

        ?

        (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">


            {

              filteredProducts.map((product,index)=>(


                <div

                key={index}

                className="hover:-translate-y-1 transition duration-300"

                >

                  <ProductCard product={product}/>


                </div>


              ))

            }


          </div>


        )


        :

        (

          <div className="flex flex-col items-center justify-center mt-20">


            <h2 className="text-2xl font-semibold text-gray-700">

              No Product Found

            </h2>


            <p className="text-gray-500 mt-2">

              Products are not available in this category

            </p>


          </div>


        )


      }



    </div>


  );

};


export default ProductCategory;