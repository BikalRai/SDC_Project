import { useDispatch } from "react-redux";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";
import { useState, useEffect } from "react";
import { getAllItems } from "@/slices/item.slice";
import { NavLink, Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AppNavBar from "../navbar/AppNavBar";

const categories = [
  { id: 1, category: "vehicle", path: "/find" },
  { id: 2, category: "furniture", path: "furniture" },
  { id: 3, category: "electronic", path: "electronic" },
  { id: 4, category: "book", path: "book" },
];

const FindYourRental = () => {
  // const sliderRef = useRef(null);

  // const scrollLeft = () => {
  //   sliderRef.current.scrollBy({
  //     left: -900, // adjust per card width
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   sliderRef.current.scrollBy({
  //     left: 900,
  //     behavior: "smooth",
  //   });
  // };

  const [selectedCategory, setSelectedCategory] = useState("vehicle");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <AppLayout>
      <AppNavBar />
      <ReContainer>
        <section className='mt-20'>
          <div className='rounded-[8px] py-8'>
            <SectionHeader header='Find Your Rental' />

            {/* Category Selector */}
            <div className='flex flex-col items-center mt-6'>
              <div className='flex overflow-hidden gap-4 rounded-md bg-white shadow-sm my-10'>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`${
                      selectedCategory === cat.category &&
                      "bg-primary text-text-white"
                    } cursor-pointer`}
                  >
                    <NavLink to={cat.path} className='inline-block py-2 px-4'>
                      <span>
                        {cat.category[0].toUpperCase()}
                        {cat.category.slice(1).toLowerCase()}
                      </span>
                    </NavLink>
                  </div>
                ))}
                {/* {categories.map((cat, index) => {
                const isActive = selectedCategory === cat;

                const radiusClass =
                  index === 0
                    ? "rounded-l-xl"
                    : index === categories.length - 1
                    ? "rounded-r-xl"
                    : "rounded-none";

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      ${radiusClass}
                      relative px-6 py-2 font-medium transition-all duration-300
                      focus:outline-none
                      ${
                        isActive
                          ? "bg-gray-700 text-white shadow-inner"
                          : "bg-transparent text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {cat.name}
                  </button>
                );
              })} */}
              </div>

              {/* Slider Section */}
              {/* <div className='relative w-full'> */}
              {/* Left Button */}
              {/* <button
                onClick={scrollLeft}
                className='absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 hover:text-primary transition z-10'
              >
                <FaArrowAltCircleLeft />
              </button> */}

              {/* Slider */}
              {/* <div
                ref={sliderRef}
                className='flex gap-6 overflow-x-auto overflow-y-hidden py-2 no-scrollbar'
              > */}

              {/* {items
                  ?.filter((item) => item.name === selectedCategory)
                  .map((item) => ( */}
              {/* <div className='flex-shrink-0'>
                  <ItemCard
                    name={items[0]?.title}
                    price={items[0]?.rate}
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div> */}
              {/* ))} */}
              {/* Wrap each card to prevent shrinking */}
              {/* <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>

                <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>

                <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>

                <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>

                <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>
              </div> */}

              {/* Right Button */}
              {/* <button
                onClick={scrollRight}
                className='absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 hover:text-primary transition z-10'
              >
                <FaArrowAltCircleRight />
              </button> */}
              {/* </div> */}
            </div>
            <Outlet />
          </div>
        </section>
      </ReContainer>
    </AppLayout>
  );
};

export default FindYourRental;
