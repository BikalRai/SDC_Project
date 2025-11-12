import FloatingBlobs from "@/components/FloatingBlobs";
import React from "react";
import AboutUs from "@/components/aboutUs/AboutUs";
import AppLayout from "@/components/layout/AppLayout";
import AppNavBar from "@/components/navbar/AppNavBar";
import Footer from "@/components/section/Footer";

const AboutUsPage = () => {
  return (
    <AppLayout>
      <AppNavBar />
      <AboutUs />
      <Footer />
    </AppLayout>
  );
};

export default AboutUsPage;
