import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <img src={assets.banner} alt="banner" className="w-full object-cover md:block hidden" />
      <img src={assets.bannersmm} alt="banner" className=" object-cover md:hidden w-full " />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-10 md:px-20 py-8">
        <h2 className="text-[clamp(1rem,3vw,2rem)] mb-4 tracking-wide uppercase text-white  md:text-black text-center max-w-[90%]">
          Shop smarter, eat fresher.
        </h2>

        <h1 className="text-[clamp(2rem,5vw,5rem)] font-bold mb-6 text-white uppercase text-center  md:text-black leading-tight max-w-[95%]">
          Start your grocery <br />
          <span className="block md:text-black">journey now.</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-6 font-medium">
          <Link to='/products' className="bg-green-400 flex group items-center text-black cursor-pointer uppercase rounded-lg font-bold py-3 px-6  hover:bg-green-600">Shop Now<img src={assets.white_arrow_icon} alt="" className="md:hidden transition group-focus:translate-x-1" /></Link> 
          <Link to='/products' className="hidden bg-green-400 md:flex group items-center text-black cursor-pointer uppercase font-bold py-3 px-6 rounded-lg hover:bg-green-600 ">Explore Deals<img src={assets.white_arrow_icon} alt="" className="md:hidden transition group-focus:translate-x-1" /></Link> 

        </div>
      </div>
    </div>
  );
};

export default Hero;