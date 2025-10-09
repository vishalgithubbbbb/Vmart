const NewsLetter = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-20 mt-20 flex flex-col items-center justify-center text-center bg-white">
      <p className="text-indigo-500 font-medium text-sm sm:text-base">Get updated</p>
      <h1 className="max-w-xl font-semibold text-2xl sm:text-3xl md:text-4xl mt-2 text-black leading-snug">
        Subscribe to our newsletter & get the latest news
      </h1>

      <form className="mt-10 w-full max-w-md flex flex-col sm:flex-row items-center gap-4 sm:gap-2">
        <input
          type="email"
          className="bg-transparent border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-black rounded-full px-4 py-3 w-full"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-full px-6 py-3 w-full sm:w-auto"
        >
          Subscribe now
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;