import React from "react";
import ImageSlider from "../Component/ImageSlider";
import FeaturedServices from "../Component/FeaturedServices";
import CountUpStats from "../Component/CountUpStats";
import MeetOurPartners from "../Component/PartnersComponent";
import CreativeSolutions from "../Component/CreativeSolutions";
import DiscoverSection from "../Component/DiscoverSection";
import { Helmet } from "react-helmet";
import BlogSection from "../Component/BlogSection";

const MainLayout = () => {
  return (
    <div>
      <Helmet>
        <title>Home | SRS</title>
      </Helmet>

      <ImageSlider></ImageSlider>
      <FeaturedServices></FeaturedServices>
      <BlogSection></BlogSection>
      <CreativeSolutions></CreativeSolutions>
      <MeetOurPartners></MeetOurPartners>
      <DiscoverSection></DiscoverSection>
    </div>
  );
};

export default MainLayout;
