import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Content Creator",
    text: "Ace.ai helps me write articles 3x faster. The AI is incredibly accurate and understands context perfectly!",
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Verma",
    role: "Digital Marketer",
    text: "The blog title generator changed my workflow. Engagement has noticeably increased across all platforms.",
    img: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    text: "Loving Ace.ai! Image generation and background removal tools save me hours every week.",
    img: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Sneha Kapoor",
    role: "UX Designer",
    text: "The UI is smooth, the AI is fast, and the results are spot on. Definitely one of my favorite tools this year!",
    img: "https://i.pravatar.cc/150?img=21",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="px-6 sm:px-16 lg:px-32 xl:px-48 py-20">
      {/* Heading */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-300">
          Loved by Creators Worldwide
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Real feedback from people using Ace.ai daily to supercharge their workflow.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-3xl mx-auto">
        {/* Card */}
        <div
          className="
            p-8 rounded-2xl border border-white/10 bg-white/5 
            backdrop-blur-xl shadow-lg text-center
            transition-all duration-700 ease-in-out
          "
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Text */}
          <p className="text-gray-300 text-lg leading-relaxed min-h-[100px]">
            {testimonials[index].text}
          </p>

          {/* Profile */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={testimonials[index].img}
              className="w-16 h-16 rounded-full border border-white/20"
              alt="user"
            />
            <h4 className="text-white font-semibold mt-3">{testimonials[index].name}</h4>
            <p className="text-gray-400 text-sm">{testimonials[index].role}</p>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={goPrev}
          className="
            absolute -left-5 top-1/2 -translate-y-1/2 
            p-3 bg-white/10 rounded-full border border-white/20
            hover:bg-white/20 transition
          "
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={goNext}
          className="
            absolute -right-5 top-1/2 -translate-y-1/2 
            p-3 bg-white/10 rounded-full border border-white/20
            hover:bg-white/20 transition
          "
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
