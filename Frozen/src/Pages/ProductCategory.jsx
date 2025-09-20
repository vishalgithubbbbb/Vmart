import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";
import { categories } from "../assets/assets";


const ProductCategory = () => {
  const { category } = useParams();
  const{products}=useContext(AppContext);
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );


  const filteredProducts = products.filter((product)=>
  product.category.toLowerCase()===category);
  console.log("Filtered products:", filteredProducts);

  return (
    <div className="mt-16">
      {searchCategory && (
          <div className="flex flex-col items-end w-max mb-6">
            <h1 className="text-3xl md:4xl font-medium">{searchCategory.name.toUpperCase()}</h1>
          </div>
      )}
      {
        filteredProducts.length>0?(
          <div>
             <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product}/>
            ))}
            </div>
            </div>
        ):(
          <div>
            <h1 className="text-3xl md:text-4xl font-medium">No Product Found</h1>
          </div>
        )}
        </div>
        )};

export default ProductCategory;