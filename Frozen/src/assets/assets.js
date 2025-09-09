import Cp_Popcorn from './Cp_Popcorn.webp';
import Amul_cheese from './Amul_cheese.jpeg';
import Hungritos from './Hungritos.jpeg';
import ITC_Corn_Triangles from './ITC_Corn_Triangles.jpg';
import Cheese_block from './Cheese_block.jpg';
import Pizza_Pocket from './Pizza_Pocket.jpeg';
import ITC_kebab from './ITC_kebab.jpeg';
import Chicken_Sausages from './Chicken_Sausages.jpg';
import Chicken_cheese_coin from './Chicken_cheese_coin.webp';
import cp_Mini_kievs from './cp_Mini_kievs.webp';
import Nutrich_Chicken from './Nutrich_Chicken.jpg';
import cp_Crunchy_Munchy from './cp_Crunchy_Munchy.jpeg';
import cp_Flamin_chicken from './cp_Flamin_chicken.jpg';
import Delicious_Patty from './Delicious_Patty.jpg';
import cp_burger_coated from './cp_burger_coated.jpeg';
import cp_burger_patty from './cp_burger_patty.webp';
import cp_wings from './cp_wings.jpeg';
import Garlic_Finger from './Garlic_Finger.jpg';
import Delicious_Finger from './Delicious_Finger.webp';
import cp_chicken_finger from './cp_chicken_finger.jpg';
import Total_Popbites from './Total_Popbites.jpg';
import Delicious_Popcorn from './Delicious_Popcorn.jpg';
import Total_nuggets from './Total_nuggets.jpg';
import Deliocious_nuggets from './Deliocious_nuggets.jpg';
import cp_nuggets from './cp_nuggets.webp';
import cp_boneless from './cp_boneless.jpg';
import Nutrich from './Nutrich.webp';
import Cp_krispy_popcorn from './Cp_krispy_popcorn.webp';
import logo from './logo.png';
import Heroimg from './Heroimg.avif'
import banner from './banner.jpeg'
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import add_address_iamge from "./add_address_image.svg";
import bannersm from "./bannersm.jpg";
import banners from "./banners.jpeg";
import bannersmm from "./bannersmm.jpg";
import pop from "./pop.jpg";
import colddrink from './colddrink.png';
import burger from './burger.avif';
import nug from './nug.jpeg';
import chi from './chi.jpeg';
import extra from './extra.jpg';
import Dairy from './Dairy.png';
import Snacks from './Snacks.jpeg';
import addicon from './add_icon.svg';
import uploadarea from './upload_area.png'
import sales from './increase.png'


export const assets = {
  uploadarea,
   nug,
   colddrink,
   sales,
   chi,
   extra,
   burger,
   Snacks,
   Dairy,
   pop,
   addicon,
    Cp_Popcorn,
    Total_nuggets,
    banners,
    logo,
    bannersmm,
    Deliocious_nuggets,
    banner,
    Hungritos,
    Amul_cheese,
    cp_nuggets,
    ITC_Corn_Triangles,
    Cp_krispy_popcorn,
    Total_Popbites,
    Delicious_Popcorn,
    Cheese_block,
    Pizza_Pocket,
    ITC_kebab,
    Chicken_Sausages,
    Chicken_cheese_coin,
    cp_Mini_kievs,
    Nutrich_Chicken,
    cp_Crunchy_Munchy,
    cp_Flamin_chicken,
    cp_boneless,
    Delicious_Patty,
    cp_burger_coated,
    Delicious_Finger,
    cp_chicken_finger,
    cp_burger_patty,
    Nutrich,
    cp_wings,
    Garlic_Finger,
    Heroimg,
    search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  product_list_icon,
  order_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  add_address_iamge,
  box_icon,
  bannersm,
};

export const categories = [
  { 
    name: "Dairy Products",
    image: Dairy,
    path: '🧀 Cheese & Dairy Delights'
  },
  { 
    name: "Snacks",
    image: Snacks,
    path: '🍕 Stuffed Snacks & Bites', 
  },
  { 
    name: "Chicken",
    image: chi,
    path: '🍗 Chicken Specialties', 
  },
  { 
    name: "Burger",
    image: burger,
    path: '🍔 Burger Patties & Coated Delights',
  },
  { 
    name: " Popcorn",
    image: pop,
    path : '🍿 Popcorn & Crispies',
  },
  { 
    name: "Nuggets",
    image: nug,
    path: '🍴 Nuggets & Bites', 
  },
  { 
    name: "Extra items",
    image: extra,
     path: '👾 Extra Crisp & Unique', 
  },
   {
      name: "Cold Drinks",
      image: colddrink,
       path: "🍹 Cool & Refreshing Sips"
    },
];



export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Vishal",
    lastName: "Chaurasiya",
    email: "vishalchaurasiya@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyProducts = [
  { _id: 1, name: "Amul Cheese", image: Amul_cheese, price: 150, offerPrice: 120, instock: true, category: "🧀 Cheese & Dairy Delights", description: "Creamy and delicious processed cheese perfect for sandwiches, pizzas, and more.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 2, name: "Cp Popcorn", image: Cp_Popcorn, price: 120, offerPrice: 96, instock: true, category: "🍿 Popcorn & Crispies", description: "Crispy and flavorful popcorn perfect for movie nights or anytime cravings.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 3, name: "ITC Corn Triangles", image: ITC_Corn_Triangles, price: 90, offerPrice: 72, instock: true, category: "👾 Extra Crisp & Unique", description: "Corn-filled savory triangles with a crunchy bite, great for quick snacking.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 4, name: "Delicious Nuggets", image: Deliocious_nuggets, price: 180, offerPrice: 144, instock: true, category: "🍴 Nuggets & Bites", description: "Juicy chicken nuggets with a crispy golden coating.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 5, name: "Chicken Sausages", image: Chicken_Sausages, price: 200, offerPrice: 160, instock: true, category: "🍗 Chicken Specialties", description: "Smoky and savory chicken sausages perfect for breakfast or grilling.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 6, name: "Pizza Pocket", image: Pizza_Pocket, price: 85, offerPrice: 68, instock: true, category: "🍕 Stuffed Snacks & Bites", description: "Mini pizza pockets loaded with cheese and herbs inside a soft crust.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 7, name: "Nutrich Chicken", image: Nutrich_Chicken, price: 220, offerPrice: 176, instock: true, category: "🍗 Chicken Specialties", description: "High-protein chicken cuts for your everyday cooking needs.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 8, name: "Cp Krispy Popcorn", image: Cp_krispy_popcorn, price: 140, offerPrice: 112, instock: true, category: "🍿 Popcorn & Crispies", description: "Crunchy popcorn chicken bites, perfect for party platters or solo munching.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 9, name: "Cp Nuggets", image: cp_nuggets, price: 160, offerPrice: 128, instock: true, category: "🍴 Nuggets & Bites", description: "Tender chicken nuggets coated in golden crispiness, ideal for quick meals.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 10, name: "Hungritos", image: Hungritos, price: 95, offerPrice: 76, instock: true, category: "👾 Extra Crisp & Unique", description: "Fun and tasty bites with bold flavors that satisfy random hunger pangs.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 11, name: "Total Nuggets", image: Total_nuggets, price: 175, offerPrice: 140, instock: true, category: "🍴 Nuggets & Bites", description: "Total satisfaction in each nugget—crunchy outside, juicy inside.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 12, name: "Total Popbites", image: Total_Popbites, price: 130, offerPrice: 104, instock: true, category: "🍴 Nuggets & Bites", description: "Bite-sized crispy chicken delights, poppable and delicious.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 13, name: "Delicious Popcorn", image: Delicious_Popcorn, price: 115, offerPrice: 92, instock: true, category: "🍿 Popcorn & Crispies", description: "Light, crunchy popcorn that hits the spot with every bite.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 14, name: "Cheese Block", image: Cheese_block, price: 200, offerPrice: 160, instock: true, category: "🧀 Cheese & Dairy Delights", description: "Solid block of rich cheese—slice, shred, or snack straight!", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 15, name: "ITC Kebab", image: ITC_kebab, price: 180, offerPrice: 144, instock: true, category: "🍗 Chicken Specialties", description: "Succulent spiced kebabs perfect for grilling or pan-frying.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 16, name: "Chicken Cheese Coin", image: Chicken_cheese_coin, price: 190, offerPrice: 152, instock: true, category: "🍗 Chicken Specialties", description: "Round bites bursting with chicken and gooey cheese.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 17, name: "Cp Mini Kievs", image: cp_Mini_kievs, price: 210, offerPrice: 168, instock: true, category: "🍗 Chicken Specialties", description: "Mini chicken Kievs with herbed butter centers, ready to impress.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 18, name: "Cp Crunchy Munchy", image: cp_Crunchy_Munchy, price: 145, offerPrice: 116, instock: true, category: "🍗 Chicken Specialties", description: "Crunch-loaded chicken bites with a munch-worthy flavor punch.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 19, name: "Cp Flamin Chicken", image: cp_Flamin_chicken, price: 170, offerPrice: 136, instock: true, category: "🍗 Chicken Specialties", description: "Spicy chicken strips that bring the heat and crave-worthy crunch.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 20, name: "Cp Boneless", image: cp_boneless, price: 220, offerPrice: 176, instock: true, category: "🍗 Chicken Specialties", description: "Premium boneless chicken cuts for versatile cooking and grilling.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 21, name: "Delicious Patty", image: Delicious_Patty, price: 160, offerPrice: 128, instock: true, category: "🍔 Burger Patties & Coated Delights", description: "Satisfying chicken patty with a crispy shell and juicy core.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 22, name: "Cp Burger Coated", image: cp_burger_coated, price: 150, offerPrice: 120, instock: true, category: "🍔 Burger Patties & Coated Delights", description: "Breaded chicken burger patty for a crunchy bite and meaty flavor.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 23, name: "Delicious Finger", image: Delicious_Finger, price: 130, offerPrice: 104, instock: true, category: "🍕 Stuffed Snacks & Bites", description: "Finger-style chicken pieces packed with flavor and fun.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 24, name: "Cp Chicken Finger", image: cp_chicken_finger, price: 135, offerPrice: 108, instock: true, category: "👾 Extra Crisp & Unique", description: "Slim chicken fingers ideal for dipping, snacking, and sharing.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 25, name: "Cp Burger Patty", image: cp_burger_patty, price: 155, offerPrice: 124, instock: true, category: "🍔 Burger Patties & Coated Delights", description: "Classic chicken patty for burgers, packed with juicy flavor.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 26, name: "Nutrich", image: Nutrich, price: 210, offerPrice: 168, instock: true, category: "🍗 Chicken Specialties", description: "Nutrich quality cuts for protein-rich meals and healthy cooking.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 27, name: "Cp Wings", image: cp_wings, price: 180, offerPrice: 144, instock: true, category: "👾 Extra Crisp & Unique", description: "Hot and crispy wings—ideal for game days and get-togethers.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" },
  { _id: 28, name: "Garlic Finger", image: Garlic_Finger, price: 125, offerPrice: 100, instock: true, category: "🍕 Stuffed Snacks & Bites", description: "Crispy garlic-seasoned chicken fingers bursting with flavor.", createdAt: "2025-07-13", updatedAt: "2025-07-13T00:00:00Z" }

]

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];