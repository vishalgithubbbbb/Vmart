import { useContext } from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../Context/AppContext";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8">
      <p className="text-2xl md:text-3xl font-medium text-center md:text-left">
        Best Sellers
      </p>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products
          .filter((product) => product.instock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;