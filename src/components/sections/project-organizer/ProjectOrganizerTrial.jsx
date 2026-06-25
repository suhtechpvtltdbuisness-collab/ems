import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TRIAL_NOTE } from "../../../config/subscriptionPlans";
import { trackBookDemo } from "../../../utils/analytics";

export default function ProjectOrganizerTrial() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center py-16 bg-white px-6 md:px-8">
            <div className="w-full max-w-6xl bg-gradient-to-b from-[#AFF6B9] to-[#FFFFFF] rounded-[40px] py-14 relative overflow-hidden">

                
                <img
                    src="/float1.png"
                    alt="float1"
                    className="absolute top-4 left-10 md:left-40 w-20 md:w-24 opacity-70"
                />

                <img
                    src="/float2.png"
                    alt="float2"
                    className="absolute right-[-30px] md:right-[-55px] top-10 w-24 md:w-32 opacity-70"
                />

                <img
                    src="/float3.png"
                    alt="float3"
                    className="absolute bottom-24 left-[-30px] w-20 md:w-28 opacity-70"
                />

                <img
                    src="/float4.png"
                    alt="float4"
                    className="absolute bottom-[-40px] left-[-25px] w-24 md:w-36 opacity-70"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center gap-4 px-4">

                    <h1 className="font-poppins text-[28px] md:text-[40px] font-semibold leading-snug">
                        From customization to communication, our <br />
                        project organizer makes everything simpler—<br />
                        Get started today!
                    </h1>

                    {/* Buttons */}
                    <p className="text-[#64748B] text-sm md:text-base max-w-lg">
                        {TRIAL_NOTE}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            onClick={() => navigate("/pricing")}
                            className="px-6 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                        >
                            <span>View plans</span>
                            <ArrowRight size={18} />
                        </button>

                        {/* Book a Demo */}
                        <button
                            onClick={() => {
                                trackBookDemo("hero");
                                navigate("/demo");
                                window.scrollTo(0, 0);
                            }}
                            className="px-6 py-3 rounded-lg border border-[#756FCC] text-[#756FCC] shadow-sm hover:opacity-90 transition flex items-center justify-center gap-2 bg-transparent"
                        >
                            <span>Book a Demo</span>
                            <ArrowRight size={18} className="text-[#756FCC]" />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
