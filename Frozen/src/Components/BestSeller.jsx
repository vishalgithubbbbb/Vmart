import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

const BestSeller = () => {
  const { products, navigate } = useContext(AppContext);

  // Get top 5 in-stock products
  const bestSellerProducts = products.filter((p) => p.instock).slice(0, 5);

  return (
    <section className="mt-16 md:mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-600 px-4 py-1.5 text-xs sm:text-sm font-semibold">
              🔥 Trending Products
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Best Sellers
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl text-sm sm:text-base leading-7">
              Discover our most loved frozen products, trusted by thousands of happy customers.
            </p>
          </div>

          <button
            aria-label="View all products"
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 w-fit rounded-full border border-gray-900 px-6 py-3 font-medium transition-all duration-300 hover:bg-gray-900 hover:text-white"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {bestSellerProducts.length === 0 ? (
            <p className="text-gray-500">No best sellers available right now.</p>
          ) : (
            bestSellerProducts.map((product, index) => (
              <div
                key={product._id || index}
                className="relative group w-full max-w-[360px] transition-all duration-300 hover:-translate-y-2"
              >
                {/* Badge only for top 3 */}
                {index < 3 && (
                  <span className="absolute top-3 left-3 z-20 rounded-full bg-red-500 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white shadow">
                    Best Seller
                  </span>
                )}
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
