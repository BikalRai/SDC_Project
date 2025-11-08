import { aboutUsImg } from "@/lib/images";
import SectionHeader from "../header/SectionHeader";
import ReContainer from "../containers/ReContainer";

const cardItems = [
  { id: 1, value: "1.2M +", type: "Monthly Visit" },
  { id: 2, value: "20K +", type: "Users" },
  { id: 3, value: "112.3k +", type: "Positive Reviews" },
  { id: 1, value: "18K +", type: "Trusted Customers" },
];

const AboutUs = () => {
  return (
    <ReContainer>
      <section className='mt-20'>
        <div className='flex justify-center items-center'>
          <SectionHeader header='About Us' />
        </div>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 mt-6 md:mt-8 lg:mt-12'>
          <div className='bg-background p-10 grid gap-10 lg:gap-52 rounded-xl'>
            <div className='grid gap-5'>
              <h3 className='text-base md:text-lg lg:text-2xl font-bold text-primary'>
                How it started?
              </h3>
              <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold leading-10 lg:leading-16'>
                Our vision is to Redefine the way people rent
              </h1>
            </div>
            <p className='text-sm lg:text-base'>
              Kiraya Bazar was created with a simple idea to make renting
              effortless, affordable, and sustainable for everyone. We saw how
              people often buy things they only use once or twice, and we wanted
              to change that. So, we built a platform where anyone can rent or
              lend anything from clothes and furniture to bikes and cars all in
              one trusted space.With dedication and passion, our team continues
              to make sharing easier, promoting a lifestyle that values
              convenience, community, and care for the environment.
            </p>
          </div>
          <div className='flex flex-col gap-10'>
            <div>
              <img
                src={aboutUsImg}
                alt='About us Image'
                className='w-full h-full'
              />
            </div>
            <div className='grid md:grid-cols-2 place-items-center lg:grid-cols-2 gap-12 p-7 bg-background rounded-[8px]'>
              {cardItems.map((item) => (
                <div
                  key={item.id}
                  className='flex flex-col gap-5 rounded-[8px] w-[224px] p-4 bg-text-white'
                >
                  <h1 className='text-[32px] font-semibold'>{item.value}</h1>
                  <p>{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ReContainer>
  );
};

export default AboutUs;
