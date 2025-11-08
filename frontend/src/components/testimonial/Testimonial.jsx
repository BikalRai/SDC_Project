import ReContainer from "../containers/ReContainer";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import SectionHeader from "../header/SectionHeader";

const Testimonial = () => {
  return (
    <section className='bg-background mt-20'>
      <ReContainer>
        <div className='grid gap-10 py-8'>
          <div className='text-center'>
            <SectionHeader header='Testimonials' />
            <p className='text-text-muted'>What our customers say</p>
          </div>
          <div>
            <Swiper
              rewind={true}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
              modules={[Navigation]}
              className='mySwiper max-w-sm mb-8'
            >
              <SwiperSlide>
                <div>
                  <h3 className='text-center'>
                    Rented a scooter from Kiraya Bazar the process was super
                    easy, affordable, and the ride was smooth all day!
                  </h3>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm flex items-center gap-2'>
                      <img
                        src=''
                        alt='avatar'
                        className='w-8 h-8 rounded-full border border-amber-200'
                      />
                      <span>Sita Giri</span>
                    </div>
                    <div>Customer</div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
            <div className='flex justify-center items-center gap-4 mt-4'>
              <button className='prev-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer'>
                ←
              </button>
              <button className='next-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer'>
                →
              </button>
            </div>
          </div>
        </div>
      </ReContainer>
    </section>
  );
};

export default Testimonial;
