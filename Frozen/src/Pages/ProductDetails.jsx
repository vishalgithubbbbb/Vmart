import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, addToCart } = useContext(AppContext);
  const { id } = useParams();

  // Match product safely by converting both to strings
  const product = Array.isArray(products)
    ? products.find((p) => p?._id?.toString() === id?.toString())
    : null;
  
    const relatedProducts = Array.isArray(products)
  ? products.filter(
      (p) => p.category === product.category && p._id !== product._id
    )
  : [];

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const firstImage = Array.isArray(product?.image)
      ? product.image[0]
      : product?.image;
    setThumbnail(firstImage || null);
  }, [product]);

  // Fallback if product not found 
  if (!products || !product) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>Product not found or still loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full px-6 mt-16">
      {/* Breadcrumb */}
      <p>
        <Link to="/">Home</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}> Products</Link> /
        <Link to={`/product/${product.category.toLowerCase()}/${product._id}`}>
          {product.category}
        </Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      {/* Image and Details */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) &&
              product.image.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setThumbnail(img)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={`http://localhost:5000/images/${img}`} alt={`${product.name} - Thumbnail ${i + 1}`} />
                </div>
              ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={`http://localhost:5000/images/${thumbnail}`}
              alt={`Selected view of ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          {/* Ratings */}
          <div className="flex items-center gap-0.5">     
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} src={i < 4 ? assets.star_icon: assets.star_dull_icon}
                        alt="rating"
                        className="w-3 md:w-3.5"
                         />  
                    ))}
                    <p>(4)</p>
                </div>

          {/* Pricing */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">MRP: ₹{product.price}</p>
            <p className="text-2xl font-medium">MRP: ₹{product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          {Array.isArray(product.description) ? (
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500/70 mt-2">{product.description}</p>
          )}


          {/* Actions */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/*Related Products */}
      <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium">Related Products </p>
            <div className="w-20 h-0.5 bg-red-600 rounded-full mt-2"></div>
          </div>
          <div className="my-6 flex flex-wrap gap-8 items-center justify-center">
            {relatedProducts.filter((product)=>product.instock).map((product,index)=>( <ProductCard key={index} product={product}/>))}
          </div>
          <button onClick={()=>{navigate('/products'); scrollTo(0,0)}} className="mx-auto my-12 px-8 py-3 rounded-lg bg-indigo-500 text-white font-medium shadow hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">See more</button>
      </div>
    </div>
  );
};

export default ProductDetails;