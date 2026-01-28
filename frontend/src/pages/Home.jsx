import AboutUs from "@/components/aboutUs/AboutUs";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import AppLayout from "@/components/layout/AppLayout";
import MostPopularSection from "@/components/mostPopular/MostPopularSection";
import AppNavBar from "@/components/navbar/AppNavBar";
import Footer from "@/components/section/Footer";
import Testimonial from "@/components/testimonial/Testimonial";
import { getAllItems } from "@/slices/item.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log(user, isAuthenticated, "in home");
  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <div>
      <AppLayout>
        <AppNavBar />
        <Hero />
        <AboutUs />
        <MostPopularSection />
        <HowItWorks />
        <Testimonial />
        <Footer />
      </AppLayout>
    </div>
  );
};

export default Home;
