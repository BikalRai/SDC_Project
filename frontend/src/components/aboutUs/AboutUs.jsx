import { aboutUsImg } from "@/lib/images";
import SectionHeader from "../header/SectionHeader";
import ReContainer from "../containers/ReContainer";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const AboutUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // runs only once
    threshold: 0.3, // when 30% visible
  });

  // numerical data only (we'll format them)
  const cardItems = [
    { id: 1, value: 11.2, suffix: "M+", type: "Monthly Visits" },
    { id: 2, value: 20000, suffix: "+", type: "Users" },
    { id: 3, value: 112.3, suffix: "K+", type: "Positive Reviews" },
    { id: 4, value: 18000, suffix: "+", type: "Trusted Customers" },
  ];

  return (
    <ReContainer>
      <section className='mt-20'>
        <div className='flex justify-center items-center'>
          <SectionHeader header='About Us' />
        </div>

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 mt-6 md:mt-8 lg:mt-12'>
          {/* LEFT TEXT CONTENT */}
          <div className='bg-background p-10 grid gap-10 lg:gap-52 rounded-xl'>
            <div className='grid gap-5'>
              <h3 className='text-base md:text-lg lg:text-2xl font-bold text-primary'>
                How it started?
              </h3>
              <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold leading-10 lg:leading-[64px]'>
                Our vision is to redefine the way people rent
              </h1>
            </div>
            <p className='text-sm lg:text-base'>
              Kiraya Bazar was created with a simple idea — to make renting
              effortless, affordable, and sustainable for everyone. We saw how
              people often buy things they only use once or twice, and we wanted
              to change that. So, we built a platform where anyone can rent or
              lend anything — from clothes and furniture to bikes and cars —
              all in one trusted space. With dedication and passion, our team
              continues to make sharing easier, promoting a lifestyle that values
              convenience, community, and care for the environment.
            </p>
          </div>

          {/* RIGHT SIDE IMAGE & STATS */}
          <div className='flex flex-col gap-10'>
            <div>
              <img
                src={aboutUsImg}
                alt='About us Image'
                className='w-full h-full rounded-xl'
              />
            </div>

            <div
              ref={ref}
              className='grid md:grid-cols-2 place-items-center gap-12 p-7 bg-background rounded-[8px]'
            >
              {cardItems.map((item) => (
                <div
                  key={item.id}
                  className='flex flex-col gap-3 items-left justify-center rounded-[8px] w-[224px] p-4 bg-white shadow'
                >
                  {inView ? (
                    <h1 className='text-[32px] font-semibold text-primary'>
                      <CountUp
                        end={item.value}
                        duration={2.5}
                        decimals={item.value % 1 !== 0 ? 1 : 0}
                        suffix={` ${item.suffix}`}
                      />
                    </h1>
                  ) : (
                    <h1 className='text-[32px] font-semibold text-primary'>0</h1>
                  )}
                  <p className='text-gray-700 font-medium'>{item.type}</p>
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
