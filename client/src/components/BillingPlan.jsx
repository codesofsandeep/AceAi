import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const BillingPlan = () => {
    return (
        <section className="px-4 sm:px-12 lg:px-24 py-20">

            {/* Title Section */}
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-300">
                    Choose Your Plan
                </h2>
                <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
                    Start for free and scale up as you grow. Find the perfect plan for your content creation needs. 
                </p>
            </div>

            {/* Pricing Table Wrapper */}
            <div className="mt-14 flex justify-center">
                <div className="w-full max-w-4xl bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">

                    {/* Clerk Pricing Component */}
                    <PricingTable
                        // Optional themes (Clerk supports theme config)
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                pricingTable: "bg-transparent",
                                planCard: "bg-neutral-900 border border-white/10 shadow-md",
                                planName: "text-white",
                                planPrice: "text-white",
                                featureText: "text-gray-300",
                                button: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
                            },
                        }}
                    />
                </div>
            </div>

        </section>
    );
};

export default BillingPlan;
