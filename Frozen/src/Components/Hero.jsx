import { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const [hovered, setHovered] = useState(null);

  const handleShopHover = () => {
    setHovered("shop");
  };

  const handleExploreHover = () => {
    setHovered("explore");
  };

  const handleLeave = () => {
    setHovered(null);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop Banner */}
      <img
        src={assets.image}
        alt="banner"
        className="hidden md:block w-full h-[70vh] object-cover"
      />

      {/* Mobile Banner */}
      <img
        src={assets.bannersmm}
        alt="banner"
        className="md:hidden w-full h-[60vh] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">

          <p className="uppercase tracking-[6px] text-white font-semibold mb-5">
            Premium Frozen Foods
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Fresh Food
            <br />
            <span className="text-green-400">Delivered Daily</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-8">
            Discover premium frozen foods, snacks, beverages and daily essentials
            delivered fresh to your doorstep.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-10 flex-wrap">

            {/* Shop Now */}
<Link
  to="/products"
  onMouseEnter={handleShopHover}
  onMouseLeave={handleLeave}
  className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold border-2 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105
    ${
      hovered === "explore"
        ? "bg-white text-green-600 border-white"
        : hovered === "shop"
        ? "bg-green-500 text-white border-green-500"
        : "bg-green-500 text-white border-green-500"
    }`}
>
  Shop Now
  <span className="text-xl transition-transform duration-300 hover:translate-x-2">
    →
  </span>
</Link>

{/* Explore Products */}
<Link
  to="/products"
  onMouseEnter={handleExploreHover}
  onMouseLeave={handleLeave}
  className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold border-2 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-105
    ${
      hovered === "explore"
        ? "bg-green-500 text-white border-green-500"
        : hovered === "explore"
        ? "bg-white text-green-600 border-white"
        : "bg-white text-green-600 border-white"
    }`}
>
  Explore Products
  <span className="text-xl transition-transform duration-300 hover:translate-x-2">
    →
  </span>
</Link>


          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;