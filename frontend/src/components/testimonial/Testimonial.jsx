import ReContainer from "../containers/ReContainer";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import SectionHeader from "../header/SectionHeader";

const testimonials = [
  {
    review:
      "Rented a scooter from Kiraya Bazar — the process was super easy, affordable, and the ride was smooth all day!",
    name: "Sita Giri",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687",
    role: "Customer",
  },
  {
    review:
      "Got a laptop for a week at a great price. The device worked perfectly and the pickup was smooth!",
    name: "Ramesh Thapa",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    role: "Customer",
  },
  {
    review:
      "Kiraya Bazar made it so easy to rent furniture for my new flat. Great service and quick delivery!",
    name: "Anita Shrestha",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=700",
    role: "Customer",
  },
  {
    review:
      "I needed a DSLR for a weekend shoot — the booking was instant and the camera quality was excellent!",
    name: "Bishal Khadka",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=700",
    role: "Customer",
  },
  {
    review:
      "Loved the quick response and professional handling. The car I rented was clean and well-maintained!",
    name: "Sabina Lama",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=700",
    role: "Customer",
  },
  {
    review:
      "Needed a projector for an office event — Kiraya Bazar delivered on time and setup was hassle-free.",
    name: "Rajeev KC",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=700",
    role: "Customer",
  },
  {
    review:
      "The renting experience was fantastic. Highly recommend Kiraya Bazar for anyone needing short-term rentals!",
    name: "Mina Gurung",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=700",
    role: "Customer",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-background mt-20">
      <ReContainer>
        <div className="grid gap-10 py-8">
          <div className="text-center">
            <SectionHeader header="Testimonials" />
            <p className="text-text-muted">What our customers say</p>
          </div>
          <div>
            <Swiper
              rewind={true}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper max-w-sm mb-8"
              onInit={(swiper) => {
                swiper.params.navigation.prevEl =
                  document.querySelector(".prev-btn");
                swiper.params.navigation.nextEl =
                  document.querySelector(".next-btn");
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide>
                  <div>
                    <h3 className="text-center">{testimonial.review}</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-sm flex items-center gap-2">
                        <img
                          src={`${testimonial.image}`}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border border-text-muted object-cover"
                        />
                        <span>{testimonial.name}</span>
                      </div>
                      <div>{testimonial.role}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button className="prev-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer">
                ←
              </button>
              <button className="next-btn text-3xl text-gray-600 hover:text-primary transition cursor-pointer">
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
