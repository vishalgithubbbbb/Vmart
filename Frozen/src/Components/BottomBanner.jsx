import { features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="mt-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-green-100 to-lime-50 shadow-xl">

        {/* Decorative Blur */}
        <div className="absolute -top-16 -left-16 w-52 h-52 bg-green-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-lime-300/30 rounded-full blur-3xl"></div>

        <div className="relative px-6 py-12 md:px-12">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">

            <span className="inline-block bg-green-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
              ⭐ Why Customers Love Us
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Fresh Frozen Foods,
              <span className="text-green-600"> Delivered Better.</span>
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              Experience premium quality frozen products with fast delivery,
              secure payments and customer-first service.
            </p>

          </div>

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-12 h-12 mx-auto mb-4"
                />

                <h3 className="font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl">
              Explore Products →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BottomBanner;