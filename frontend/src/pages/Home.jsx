import AboutUs from "@/components/aboutUs/AboutUs";
import FindYourRental from "@/components/findYourRental/FindYourRental";
import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import AppLayout from "@/components/layout/AppLayout";
import MostPopularSection from "@/components/mostPopular/MostPopularSection";
import AppNavBar from "@/components/navbar/AppNavBar";
import Footer from "@/components/section/Footer";
import Testimonial from "@/components/testimonial/Testimonial";
import { getCategories } from "@/slices/category.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <AppLayout>
        <AppNavBar />
        <Hero />
        <AboutUs />
        <FindYourRental />
        <MostPopularSection />
        <HowItWorks />
        <Testimonial />
        <Footer />
      </AppLayout>
    </div>
  );
};

export default Home;
