import { Mail } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="w-full mt-28 md:mt-32 mb-28 md:mb-28 px-6 lg:px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Small Heading */}
        <p className="uppercase tracking-[6px] text-indigo-600 font-semibold text-sm">
          Newsletter
        </p>

        {/* Main Heading */}
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Get Weekly
          <span className="block mt-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
            Exclusive Updates
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 leading-8">
          Stay informed with the latest collections, exclusive discounts,
          product launches and special offers delivered straight to your
          inbox.
        </p>

        {/* Newsletter Form */}
        <form className="mt-8 max-w-3xl mx-auto">

          <div className="flex flex-col sm:flex-row items-center rounded-full border border-gray-200 p-2.5 shadow-md hover:shadow-xl transition-all duration-300">

            {/* Email */}
            <div className="flex items-center flex-1 w-full px-5">

              <Mail
                size={22}
                className="text-indigo-600"
              />

              <input
                type="email"  
                name="email"
                autoComplete="email"
                placeholder="Enter your email address"
                required
                className="flex-1 bg-transparent px-4 py-4 outline-none text-gray-700 placeholder:text-gray-400"
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Subscribe now
            </button>

          </div>

        </form>

        {/* Bottom Text */}
        <p className="mt-6 text-gray-400 text-sm">
          No spam. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
};

export default NewsLetter;