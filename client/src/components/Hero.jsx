import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 py-6 md:py-10"
    >
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 py-6 md:py-10">

        {/* Heading */}
        <h1
          className="
    text-3xl 
    sm:text-4xl 
    md:text-5xl 
    lg:text-6xl 
    font-bold 
    mb-4 
    leading-tight
    bg-gradient-to-r 
    from-[#d1cece] 
    via-[#4A4A4A] 
    to-[#E5E5E5]
    text-transparent 
    bg-clip-text
  "
        >
          Create amazing content <br />
          with{" "}
          <span
            className="
      bg-clip-text 
      text-transparent 
      bg-gradient-to-r 
      from-[#00FFFF] 
      via-[#FF00FF] 
      to-[#FFD700]
    "
          >
            AI tools.
          </span>
        </h1>


        {/* Paragraph */}
        <p className="
        text-[#E87811] 
        text-sm 
        sm:text-base
        md:text-lg 
        max-w-xl 
        leading-relaxed
        mb-6
      ">
          Transform your content creation with our suite of premium AI tools. <br className="hidden sm:block" />
          Write articles, generate images, and enhance your workflow with ease.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">

          {/* Primary Button — clean & professional */}
          <button
            onClick={() => navigate('/ai')}
            className="
    group
    relative
    px-6 
    py-3 
    text-sm 
    sm:text-base  
    font-semibold 
    text-white 
    border 
    border-white/40
    rounded-lg 
    backdrop-blur-md
    transition-all 
    duration-300
    flex
    items-center
    gap-2
    overflow-hidden
  "
          >
            {/* Shine Hover Effect */}
            <span
              className="absolute inset-0 bg-gradient-to-r
              from-transparent via-white/10 to-transparent
              translate-x-[-150%]
              group-hover:translate-x-[150%]
              transition-transform duration-700 ease-out"
            />

            {/* Button Text */}
            <span className="relative z-10">Start Creating Now</span>

            {/* Arrow Icon */}
            <ArrowRight
              className="
      relative z-10 size-4 
      transition-all duration-300
      group-hover:translate-x-1 
      group-hover:text-cyan-300 
      group-hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]
    "
            />
          </button>


          {/* Secondary Button — minimal outline */}
          <button
            className="
      px-6 
      py-3 
      text-sm 
      sm:text-base  
      font-semibold 
      text-white 
      border 
      border-white/40
      rounded-lg 
      hover:bg-white/10 
      transition-all 
      duration-300
    "
          >
            Watch Demo
          </button>

        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
