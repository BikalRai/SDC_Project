import ItemCard from "../card/ItemCard";
import ReContainer from "../containers/ReContainer";
import SectionHeader from "../header/SectionHeader";

const FindYourRental = () => {
  return (
    <ReContainer>
      <section className='mt-20'>
        <div className='bg-background rounded-[8px] py-8 px-10'>
          <div>
            <SectionHeader header='Find Your Rental' />
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center mt-10'>
            {Array.from({ length: 4 }, (_, index) => (
              <ItemCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </ReContainer>
  );
};

export default FindYourRental;
