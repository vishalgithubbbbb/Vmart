import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();

  const product = Array.isArray(products)
    ? products.find((item) => item._id?.toString() === id?.toString())
    : null;

  const relatedProducts =
    product && Array.isArray(products)
      ? products.filter(
          (item) => item.category === product.category && item._id !== product._id
        )
      : [];

  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (product) {
      setThumbnail(Array.isArray(product.image) ? product.image[0] : product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500 text-lg">
        Loading Product...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600">Products</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-12 mt-8">
        {/* Left - Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image?.map((img) => (
              <button
                key={img}
                onClick={() => setThumbnail(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border transition ${
                  thumbnail === img
                    ? "border-indigo-600"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/${img}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-gray-50">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${thumbnail}`}
                alt={product.name}
                className="w-full h-[350px] md:h-[450px] object-contain p-6"
              />
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-4">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-4"
                alt="rating star"
              />
            ))}
            <span className="ml-2 text-gray-500">4.8 (124 Reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <h2 className="text-4xl font-bold text-gray-900">₹{product.offerPrice}</h2>
            <p className="text-xl text-gray-400 line-through">₹{product.price}</p>
            {product.price > product.offerPrice && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500">Inclusive of all taxes</p>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Product</h3>
            {Array.isArray(product.description) ? (
              <ul className="list-disc pl-5 space-y-2 text-gray-600 leading-7">
                {product.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 leading-7">{product.description}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 py-4 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="flex-1 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <div className="text-center">
          <p className="text-indigo-600 text-sm font-semibold uppercase tracking-wider">
            You May Also Like
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Related Products</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Explore similar products from the same category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
          {relatedProducts
            .filter((item) => item.instock)
            .slice(0, 5)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-800 transition hover:bg-gray-900 hover:text-white"
          >
            View All Products
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;
