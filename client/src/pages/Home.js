import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import MantraStrip from '../components/MantraStrip';
import AboutSection from '../components/AboutSection';
import AartiSchedule from '../components/AartiSchedule';
import Utsav from '../components/Utsav';

const Home = () => {
  return (
    <>
      <HeroCarousel />
      <MantraStrip />
      <AboutSection />
      <AartiSchedule />
      <Utsav />
    </>
  );
};

export default Home;

