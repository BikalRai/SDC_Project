import AboutUs from "@/components/aboutUs/AboutUs";
import FindYourRental from "@/components/findYourRental/FindYourRental";
import Hero from "@/components/hero/Hero";
import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import Footer from "@/components/section/Footer";
import Testimonial from "@/components/testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <AppLayout>
        <AppNavBar />
        <Hero />
        <AboutUs />
        <FindYourRental />
        <Testimonial />
        <Footer />
      </AppLayout>
    </div>
  );
};

export default Home;
