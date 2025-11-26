import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../card/ItemCard";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";
import { useState, useRef, useEffect } from "react";
import { getCategories } from "@/slices/category.slice";
import { getAllItems } from "@/slices/item.slice";

const FindYourRental = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -900, // adjust per card width
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  const categories = ["Vehicle", "Furniture", "Electronics", "Clothes"];

  const [selectedCategory, setSelectedCategory] = useState("scooter");

  // const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  // const { categories } = useSelector((state) => state.category);
  const { items } = useSelector((state) => state.item);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  console.log(items, "items");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`api/${selectedCategory}`);
  //       const data = await res.json();
  //       setItems(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, [selectedCategory]);

  return (
    <ReContainer>
      <section className='mt-20'>
        <div className='bg-background rounded-[8px] py-8 px-10'>
          <SectionHeader header='Find Your Rental' />

          {/* Category Selector */}
          <div className='flex flex-col items-center mt-6'>
            <div className='flex overflow-hidden border-2 border-gray-300 rounded-2xl bg-white shadow-sm mb-8'>
              {categories.map((cat, index) => {
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
              })}
            </div>

            {/* Slider Section */}
            <div className='relative w-full'>
              {/* Left Button */}
              <button
                onClick={scrollLeft}
                className='absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 hover:text-primary transition bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border'
              >
                ←
              </button>

              {/* Slider */}
              <div
                ref={sliderRef}
                className='flex gap-6 overflow-x-auto overflow-y-hidden py-2 scrollbar-hide'
              >
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

                <div className='flex-shrink-0'>
                  <ItemCard
                    name='sujal'
                    price='5000'
                    image='https://images.unsplash.com/photo-1759405095660-62a254209005?q=80&w=688&auto=format&fit=crop'
                    features={["Eat", "Sleep", "Repeat"]}
                  />
                </div>
              </div>

              {/* Right Button */}
              <button
                onClick={scrollRight}
                className='absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-3xl text-gray-600 hover:text-primary transition bg-white hover:bg-gray-200 rounded-full h-10 w-10 z-10 border'
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </ReContainer>
  );
};

export default FindYourRental;
