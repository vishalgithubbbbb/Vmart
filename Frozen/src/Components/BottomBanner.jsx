import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="mt-20 px-4">
      <div
        className="
          w-full
          max-w-6xl
          mx-auto
          rounded-3xl
          overflow-hidden
          bg-[#eef8d9]
          p-8
          min-h-[400px]
          flex
          items-center
        "
      >
        <div
          className="
            grid
            lg:grid-cols-[58%_42%]
            items-center
            w-full
            gap-5
          "
        >
          {/* IMAGE SECTION */}
          <div
            className="
              h-[300px]
              w-full
              rounded-3xl
              overflow-hidden
            "
          >
            <img
              src={assets.bottom}
              alt="Frozen Foods"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col justify-center px-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-6">
              Why We Are the Best?
            </h2>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;