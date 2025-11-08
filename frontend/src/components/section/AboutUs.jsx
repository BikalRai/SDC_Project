import React from "react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const AboutUs = () => {
  const [count, setCount] = useState(760);
  const userTarget = 20000;
  const trustedCustomersTarget = 18000;
  const positiveReviewsTarget = 112.7; // in thousands
  const monthlyVisitTarget = 1.2; // in millions
  const duration = 2000; // in ms (2 seconds)

  useEffect(() => {
    let start = 0;
    const increment = userTarget / (duration / 16); // roughly 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= userTarget) {
        start = userTarget;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true, // runs only the first time it appears
    threshold: 0.3, // 30% of the card must be visible
  });
  return (
    <>
      <div className="w-full bg-card-bg">
        <div className="max-w-7xl mx-auto bg-white">
          <div className=" pt-6 flex justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          </div>
          <section className="max-w-7xl mx-auto px-6 pb-6 pt-6 grid grid-cols-1 md:grid-cols-[42%_58%] gap-12 items-center">
            {/* Left Text Section */}
            <div className="bg-card-bg p-4 h-full">
              <h4 className="text-primary font-semibold mb-2 text-center md:text-left">
                How it started?
              </h4>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-6 text-center md:text-left">
                  Our vision is to <br />
                  <span className="text-gray-800">
                    Redefine the way people rent
                  </span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Kiraya Bazar was created with a simple idea to make renting
                  effortless, affordable, and sustainable for everyone. We saw
                  how people often buy things they only use once or twice, and
                  we wanted to change that. So, we built a platform where anyone
                  can rent or lend anything from clothes and furniture to bikes
                  and cars — all in one trusted space.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With dedication and passion, our team continues to make
                  sharing easier, promoting a lifestyle that values convenience,
                  community, and care for the environment.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-9/10">
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1761839257647-df30867afd54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="Renting process"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />

              {/* Stats Cards */}
              <div
                ref={ref}
                className="grid grid-cols-2 gap-6 w-full bg-card-bg px-4 py-8"
              >
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inView ? (
                      <CountUp
                        end={monthlyVisitTarget}
                        duration={2}
                        separator=","
                        start={0}
                        decimals={2}
                      />
                    ) : (
                      "0"
                    )}
                    M +
                  </h3>
                  <p className="text-gray-500 text-sm">Monthly visit</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inView ? (
                      <CountUp end={userTarget} duration={2} separator="," />
                    ) : (
                      "0"
                    )}
                    +
                  </h3>
                  <p className="text-gray-500 text-sm">Users</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inView ? (
                      <CountUp
                        end={positiveReviewsTarget}
                        duration={2}
                        separator=","
                        start={0}
                        decimals={2}
                      />
                    ) : (
                      "0"
                    )}
                     K
                  </h3>
                  <p className="text-gray-500 text-sm">Positive reviews</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {inView ? (
                      <CountUp
                        end={trustedCustomersTarget}
                        duration={2}
                        separator=","
                      />
                    ) : (
                      "0"
                    )}{" "}
                    +
                  </h3>
                  <p className="text-gray-500 text-sm">Trusted customers</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
