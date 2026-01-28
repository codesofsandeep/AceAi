import React from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const SocialBar = () => {
  return (
    <div
      className="
        fixed z-50

        /* Desktop: vertical left side */
        md:left-6 md:top-1/2 md:-translate-y-1/2

        /* Mobile: bottom center */
        left-1/2 -translate-x-1/2 bottom-4 
        md:bottom-auto md:translate-x-0
      "
    >
      <div
        className="
          flex md:flex-col
          px-0 md:px-0
          py-0 md:py-0
          space-x-4 md:space-x-0 md:space-y-4
        "
      >
        {/* SOCIAL ICONS */}
        {[
          { icon: <Twitter size={22} />, color: "cyan" },
          { icon: <Github size={22} />, color: "purple" },
          { icon: <Linkedin size={22} />, color: "blue" },
          { icon: <Mail size={22} />, color: "amber" },
        ].map((item, i) => (
          <a
            key={i}
            href="#"
            className="
              relative p-3 rounded-xl
              bg-white/10 backdrop-blur-lg
              transition-all shadow-lg hover:scale-110 group
            "
          >
            {/* Hover Border */}
            <span
              className={`
                absolute inset-0 rounded-xl border border-transparent
                group-hover:border-${item.color}-400
                group-hover:shadow-[0_0_10px_rgba(255,255,255,0.4)]
                transition-all duration-300
              `}
            ></span>

            {/* Icon */}
            <div className="text-white relative z-10">
              {item.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar;
