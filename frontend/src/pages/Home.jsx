import React from "react";

import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/shared/HeroSection";
import CategoryCrousel from "@/components/shared/CategoryCrousel";
import LatestJobs from "@/components/shared/LatestJobs";
import Footer from "@/components/shared/Footer";
import getJobsComponent from "@/hooks/getJobsComponent";

const Home = () => {
  getJobsComponent();
  return (
    <div className="w-[100%] overflow-hidden">
      <Navbar />
      <HeroSection />
      <CategoryCrousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
