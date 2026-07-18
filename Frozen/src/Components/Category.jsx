import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { categories } from "../assets/assets";

const Category = () => {

  const [hovered, setHovered] = useState(null);

  const { navigate } = useContext(AppContext);


  return (

    <section className="mt-16 px-4 sm:px-6 lg:px-8">


      <div className="max-w-7xl mx-auto">



        {/* Heading */}

        <div className="
        text-center
        mb-12
        ">


          <span className="
          inline-flex
          items-center
          rounded-full
          bg-white-100
          text-white-600
          px-4
          py-1.5
          text-xs
          sm:text-sm
          font-semibold
          ">


          </span>





          <h1 className="
          mt-5
          text-3xl
          md:text-5xl
          font-extrabold
          text-gray-800
          ">


            Discover Our

            <span className="
            text-green-500
            ml-2
            ">

              Frozen Goods

            </span>


          </h1>






          <p className="
          mt-4
          max-w-2xl
          mx-auto
          text-gray-500
          text-sm
          md:text-base
          leading-7
          ">

            Explore fresh frozen products from our premium collection,
            carefully selected for quality and taste.


          </p>



        </div>








        {/* Category Grid */}


        <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-5
        sm:gap-6
        ">



          {
            categories.map((category, idx)=>(


              <div

              key={idx}


              onClick={()=>{

                navigate(`/products/${category.path.toLowerCase()}`);

                scrollTo(0,0);

              }}



              onMouseEnter={()=>setHovered(category.name)}

              onMouseLeave={()=>setHovered(null)}



              className="
              group
              bg-white
              rounded-3xl
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              cursor-pointer
              flex
              flex-col
              items-center
              justify-center
              p-5
              hover:-translate-y-2
              "

              >





                {/* Image */}


                <div className="
                w-24
                h-24
                sm:w-28
                sm:h-28
                md:w-32
                md:h-32
                rounded-full
                bg-gray-50
                flex
                items-center
                justify-center
                overflow-hidden
                group-hover:bg-green-50
                transition
                ">


                  <img

                  src={category.image}

                  alt={category.name}

                  className="
                  w-full
                  h-full
                  object-contain
                  group-hover:scale-110
                  transition-transform
                  duration-300
                  "

                  />


                </div>






                {/* Name */}


                <p

                className={`
                mt-4
                text-center
                font-semibold
                text-sm
                md:text-base
                transition
                ${
                  hovered === category.name
                  ?
                  "text-green-500"
                  :
                  "text-gray-700"
                }
                `}


                >

                  {category.name}


                </p>



              </div>



            ))
          }




        </div>



      </div>



    </section>


  );

};


export default Category;