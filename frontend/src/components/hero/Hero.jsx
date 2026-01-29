import ReContainer from "../containers/ReContainer";
import heroImg from "../../assets/hero-image.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllItems } from "@/slices/item.slice";

const rentalTypes = [
  { id: 1, type: "VEHICLE" },
  { id: 2, type: "SCOOTER" },
  { id: 3, type: "BIKE" },
  { id: 4, type: "CAR" },
  { id: 5, type: "BOOK" },
  { id: 6, type: "ELECTRONICS" },
  { id: 7, type: "FURNITURE" },
  { id: 8, type: "TOOLS" },
  { id: 9, type: "SPORTS_EQUIPMENT" },
  { id: 10, type: "CAMERA" },
  { id: 11, type: "OTHER" },
];

const rentalPriceRanges = [
  { id: 1, label: "100rs - 1500rs", value: "100-1500" },
  { id: 2, label: "100rs - 3750rs", value: "100-3750" },
  { id: 3, label: "3750rs - 7500rs", value: "3750-7500" },
  { id: 4, label: "7500rs +", value: "7500+" },
];

const Hero = () => {
  const [searchParams, setSearchParams] = useState({
    search: "",
    category: "",
    priceRange: "",
  });

  const dispatch = useDispatch();

  const handleSearchParams = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        getAllItems({
          search: searchParams.search,
          category: searchParams.category,
          priceRange: searchParams.priceRange,
        }),
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  // console.log(searchParams);

  return (
    <ReContainer>
      <div className="grid gap-10">
        {/* heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
          Discover Your <span className="text-primary">Perfect Rental</span>
        </h1>
        <p className="texl-sm md:text-base lg:text-xl font-semibold text-text-muted text-center">
          Rent Scooters, Cars, Clothes and Items in just a click.
        </p>

        {/* filter search */}
        <div className="shadow-lg overflow-hidden rounded-sm">
          <form
            onSubmit={handleSubmit}
            className="rounded-sm bg-[#fffcfc] grid md:grid-cols-2 lg:grid-cols-4 overflow-hidden"
          >
            <div className="border border-text-muted rounded-t-sm rounded-b-sm">
              <input
                type="text"
                name="search"
                value={searchParams.search}
                onChange={handleSearchParams}
                placeholder="Location, name,..."
                className="bg-transparent outline-0 border-0 px-8 py-4 text-text-muted w-full"
              />
            </div>
            <div className="border border-text-muted pr-4">
              <select
                name="category"
                value={searchParams.category}
                onChange={handleSearchParams}
                className="bg-transparent outline-0 border-0 px-8 py-4 text-text-muted w-full"
              >
                <option value="">Rental type</option>
                {rentalTypes.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type[0].toUpperCase()}
                    {type.type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="border border-text-muted pr-4">
              <select
                name="priceRange"
                value={searchParams.priceRange}
                onChange={handleSearchParams}
                className="bg-transparent outline-0 border-0 px-8 py-4 text-text-muted  w-full"
              >
                <option value="">Price range</option>
                {rentalPriceRanges.map((range) => (
                  <option key={range.id} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#D1E4D2] text-primary font-medium cursor-pointer py-4 px-12 hover:bg-primary hover:text-text-white transition"
            >
              Check results
            </button>
          </form>
        </div>

        {/* hero cta & image */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-2xl md:text:3xl lg:text-[40px] font-bold text-primary text-center">
              Rent What You Need. Return When You’re Done.
            </h1>
            <h3 className="text-sm md:text-base lg:text-xl font-medium text-center">
              A smarter, greener, and more affordable way to access what you
              love.
            </h3>
          </div>
          <div>
            <img
              src={heroImg}
              alt="Hero Image"
              className="w-full h-full object-fit"
            />
          </div>
        </div>
      </div>
    </ReContainer>
  );
};

export default Hero;
