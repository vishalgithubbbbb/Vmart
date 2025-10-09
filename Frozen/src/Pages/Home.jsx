import BestSeller from "../Components/BestSeller"
import BottomBanner from "../Components/BottomBanner"
import Category from "../Components/Category"
import Hero from "../Components/Hero"
import NewsLetter from "../Components/NewsLetter"



const Home = () => {
  return (
    <div className="mt-10">
      <Hero/>
      <Category/>
      <BestSeller/>
      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default Home