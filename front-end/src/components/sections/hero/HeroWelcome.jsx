import React from 'react';
import HeroSection from './HeroSection';

const HeroWelcome = () => {
  return (
    <HeroSection
      variant="welcome"
      title="Music Closer"
      subtitle="A model designed to inspire and support music enthusiasts. Get samples, tips, and organize your ideas effortlessly"
      ctaText="Join Us | Sign Up"
      overlay={false}
    >
    </HeroSection>
  );
};

export default HeroWelcome;