import React from "react";
import { Sparkles, PenTool, FileText, Brain } from "lucide-react";
import SpotlightCard from "../components/SpotLightCard";

const AiTools = () => {
    return (
        <div className="px-4 sm:px-16 lg:px-28 xl:px-40 py-20">

            {/* Title Section */}
            <div className="text-center space-y-4">
                <h2
                    className="
                        text-4xl 
                        sm:text-5xl 
                        font-extrabold 
                        text-transparent 
                        bg-clip-text 
                        bg-gradient-to-r 
                        from-[#b8b2b2] 
                        via-[#4A4A4A] 
                        to-[#E5E5E5]
                    "
                >
                    {" "}Powerful <span
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
                </h2>

                <p className="text-gray-300 max-w-xl mx-auto text-lg">
                    Everything you need to create, enhance, and optimize your content using cutting-edge AI technology.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

                {/* AI Article Writer */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <PenTool size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">AI Article Writer</h3>
                        <p className="text-gray-400">
                            Generate SEO-friendly, engaging articles on any topic in minutes.
                        </p>
                    </div>
                </SpotlightCard>

                {/* Blog Title Generator */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">Blog Title Generator</h3>
                        <p className="text-gray-400">
                            Find the perfect, catchy title for your blog posts effortlessly.
                        </p>
                    </div>
                </SpotlightCard>

                {/* AI Image Generation */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">AI Image Generation</h3>
                        <p className="text-gray-400">
                            Create stunning visuals effortlessly using powerful AI image generation.
                        </p>
                    </div>
                </SpotlightCard>

                {/* Background Removal */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">Background Removal</h3>
                        <p className="text-gray-400">
                            Effortlessly remove backgrounds from images with AI precision.
                        </p>
                    </div>
                </SpotlightCard>

                {/* Object Removal */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">Object Removal</h3>
                        <p className="text-gray-400">
                            Remove unwanted objects from images seamlessly using AI.
                        </p>
                    </div>
                </SpotlightCard>

                {/* Resume Reviewer */}
                <SpotlightCard className="h-[230px] p-6 border-neutral-700">
                    <div className="space-y-4">
                        <div className="p-3 w-fit rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-xl text-white font-semibold">Resume Reviewer</h3>
                        <p className="text-gray-400">
                            Get AI-powered suggestions to improve your resume instantly.
                        </p>
                    </div>
                </SpotlightCard>

            </div>
        </div>
    );
};

export default AiTools;
