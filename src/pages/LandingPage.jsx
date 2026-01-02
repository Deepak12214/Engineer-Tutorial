import React from 'react';
import HeroSection from '../components/HeroSection';
import AlternatingSection from '../components/AlternatingSection';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import FooterSection from '../components/FooterSection';
import WhatYouLearn from '../components/WhatYouLearn';

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <AlternatingSection />
      <ReviewsSection />
      <WhatYouLearn/>
      <FAQSection />
      <FooterSection />
    </div>
  );
}
