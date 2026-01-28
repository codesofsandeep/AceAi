import React from 'react';
import Particles from '../components/Particle';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AiTools from '../components/AiTools';
// import TestimonialSlider from '../components/TestimonialSlider';
import BillingPlan from '../components/BillingPlan';
import Footer from '../components/Footer';
// import SocialBar from '../components/SocialBar';
import ScrollReveal from '../components/ScrollReveal';

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-y-auto">

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={300}
          particleSpread={8}
          speed={0.2}
          particleColors={['#00FFFF', '#FFFFFF', '#FF00FF', '#FFFFFF', '#FFD700']}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.12}
          cameraDistance={25}
          disableRotation={false}
        />
      </div>

      {/* UI */}

        <div className="relative z-10">
  <Navbar />
  {/* <SocialBar /> */}

  <section id="home">
    <ScrollReveal><Hero /></ScrollReveal>
  </section>

  <section id="Aitools">
    <ScrollReveal><AiTools /></ScrollReveal>
  </section>


  <section id="plan">
    <ScrollReveal><BillingPlan /></ScrollReveal>
  </section>

  <section id="contact">
    <ScrollReveal><Footer /></ScrollReveal>
  </section>
</div>

    </div>
  );
};

export default Home;
