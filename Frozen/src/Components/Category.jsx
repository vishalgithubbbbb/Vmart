import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { categories } from "../assets/assets";

const Category = () => {
  const [hovered, setHovered] = useState(null);
  const {navigate} = useContext(AppContext);
  return (
    <div className="mt-[50px] px-6">
      <div className="border-b-2 border-b-gray-300 mb-8">
        <h1 className="text-5xl font-bold md:text-3xl mb-6">
          Discover Our FrozenGoods
        </h1>
      </div>

      <div className="my-6 product-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-15 justify-start">
        {categories.map((category, idx) => (
          <div onClick={()=>{
          navigate(`/products/${category.path.toLowerCase()}`);
          scrollTo(0,0);
        }}
            key={idx}
            className="product-card py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center hover:scale-150 transition-transform duration-200 cursor-pointer"
            onMouseEnter={() => setHovered(category.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 object-contain mb-2 rounded"
            />
            <p
              className={`text-md font-bold text-center transition-colors duration-150 ${
                hovered === category.name ? "text-green-500" : "text-black"
              }`}
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;