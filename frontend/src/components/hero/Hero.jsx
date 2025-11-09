import ReContainer from "../containers/ReContainer";
import heroImg from "../../assets/hero-image.png";

const rentalTypes = [
  { id: 1, type: "Scooters" },
  { id: 2, type: "Cars" },
  { id: 3, type: "Clothes" },
  { id: 4, type: "Electronics" },
];

const rentalPriceRanges = [
  { id: 1, range: "100rs - 1500rs" },
  { id: 2, range: "100rs - 3750rs" },
  { id: 3, range: "3750rs - 7500rs" },
  { id: 4, range: "7500rs +" },
];

const Hero = () => {
  return (
    <ReContainer>
      <div className='grid gap-10'>
        {/* heading */}
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold text-center'>
          Discover Your <span className='text-primary'>Perfect Rental</span>
        </h1>
        <p className='texl-sm md:text-base lg:text-xl font-semibold text-text-muted text-center'>
          Rent Scooters, Cars, Clothes and Items in just a click.
        </p>

        {/* filter search */}
        <div className='shadow-lg overflow-hidden rounded-sm'>
          <form className='rounded-sm bg-[#fffcfc] grid md:grid-cols-2 lg:grid-cols-4 overflow-hidden'>
            <div className='border border-text-muted rounded-t-sm rounded-b-sm'>
              <input
                type='text'
                placeholder='Location, name,...'
                className='bg-transparent outline-0 border-0 px-8 py-4 text-text-muted w-full'
              />
            </div>
            <div className='border border-text-muted pr-4'>
              <select className='bg-transparent outline-0 border-0 px-8 py-4 text-text-muted w-full '>
                <option value='type'>Rental type</option>
                {rentalTypes.map((type) => (
                  <option key={type.id} value={type.type}>
                    {type.type[0].toUpperCase()}
                    {type.type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className='border border-text-muted pr-4'>
              <select className='bg-transparent outline-0 border-0 px-8 py-4 text-text-muted  w-full'>
                <option value='type'>Price range</option>
                {rentalPriceRanges.map((range) => (
                  <option key={range.id} value={range.range}>
                    {range.range}
                  </option>
                ))}
              </select>
            </div>
            <button
              type='submit'
              className='bg-[#D1E4D2] text-primary font-medium cursor-pointer py-4 px-12 hover:bg-primary hover:text-text-white transition'
            >
              Check results
            </button>
          </form>
        </div>

        {/* hero cta & image */}
        <div className='grid lg:grid-cols-2 gap-10'>
          <div className='flex flex-col justify-center gap-6'>
            <h1 className='text-2xl md:text:3xl lg:text-[40px] font-bold text-primary text-center'>
              Rent What You Need. Return When You’re Done.
            </h1>
            <h3 className='text-sm md:text-base lg:text-xl font-medium text-center'>
              A smarter, greener, and more affordable way to access what you
              love.
            </h3>
          </div>
          <div>
            <img
              src={heroImg}
              alt='Hero Image'
              className='w-full h-full object-fit'
            />
          </div>
        </div>
      </div>
    </ReContainer>
  );
};

export default Hero;
