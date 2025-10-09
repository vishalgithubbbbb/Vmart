import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Responsive banner images */}
      <img src={assets.bottombanner} alt="banner" className="w-full hidden md:block" />
      <img src={assets.bottombannersm} alt="banner" className="w-full md:hidden" />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="max-w-xl w-full">
          <h1 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
            Why We Are the Best?
          </h1>

          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={feature.icon} alt={feature.title} className="w-9 md:w-11" />
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg md:text-xl font-semibold whitespace-nowrap">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500/70 text-xs md:text-sm whitespace-nowrap">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;