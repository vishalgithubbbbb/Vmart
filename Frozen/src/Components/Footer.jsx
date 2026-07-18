const Footer = () => {

  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us"
      ]
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"]
    }
  ];

  return (
    <footer className="mt-20 bg-gradient-to-b from-white to-orange-50/40 pt-16 px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row justify-between gap-12 pb-10 border-b border-gray-200">
        
        {/* Logo Section */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 group">
            {/* Removed the orange V box */}
            <h1 className="text-3xl font-extrabold tracking-widest uppercase transition-all duration-300 group-hover:scale-105">
              <span className="text-orange-500">AV</span>
              <span className="text-gray-800">Mart</span>
            </h1>
          </div>

          <p className="mt-6 text-gray-500 leading-7 text-sm sm:text-base">
            Your trusted online store for premium frozen foods.
            Fresh quality products delivered directly to your doorstep.
          </p>

          <div className="flex gap-3 mt-6">
            {["Instagram", "Facebook", "YouTube"].map((item, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-orange-500 hover:text-white transition text-sm font-semibold"
              >
                {item[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:w-[55%]">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-900 font-bold mb-5">{section.title}</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-500 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="py-5 text-center text-sm text-gray-500">
        Copyright © 2026
        <a
          href="https://food.vishdelivers.shop"
          className="mx-1 font-semibold text-orange-500 hover:underline"
        >
          VMart
        </a>
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
