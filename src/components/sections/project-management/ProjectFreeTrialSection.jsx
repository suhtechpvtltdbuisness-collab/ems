import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TRIAL_NOTE } from "../../../config/subscriptionPlans";
import { trackBookDemo } from "../../../utils/analytics";

export default function ProjectFreeTrialSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col items-center py-16 bg-white">
            <div className="w-full max-w-6xl bg-gradient-to-b from-[#AFF6B9] to-[#FFFFFF] rounded-[40px] py-14 relative overflow-hidden">





                {/* Background floating shapes */}
                <img
                    src="/float1.png"
                    alt="float1"
                    className="absolute top-6 left-40  "
                />

                <img
                    src="/float2.png"
                    alt="float2"
                    className=" absolute right-[-55px] top-15"
                />

                <img
                    src="/float3.png"
                    alt="float3"
                    className=" absolute bottom-28 left-[-55px]"

                />
                <img
                    src="/float4.png"
                    alt="float4"
                    className="absolute bottom-[-60px] left-[-40px]"
                />

                {/* Content starts */}
                <div className="relative z-10 flex flex-col items-center text-center gap-4">


                    <div className="flex flex-col items-center">
                        <img
                            src="/Avatar.png"
                            alt="avatars"
                            className="w-28 h-auto rounded-full"
                        />
                        <p className="text-sm font-medium mt-2">
                            20+ Projects Tracked Effortlessly
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="font-[Poppins] text-[42px] md:text-[48px] font-semibold text-center leading-snug mt-4">
                        Start your free trial today!
                    </h1>
                    <p className="text-[#64748B] text-base max-w-xl text-center px-4">
                        {TRIAL_NOTE}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6 flex-wrap justify-center">
                        <button
                            onClick={() => navigate("/pricing")}
                            className="w-fit px-6 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 md:mt-3 cursor-pointer"
                        >
                            <span>View plans</span>
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => trackBookDemo("hero")}
                            className="w-fit px-6 py-3 rounded-lg border border-[#756FCC] text-[#756FCC] shadow-sm hover:opacity-90 transition flex items-center gap-2 mt-2 md:mt-3 bg-transparent cursor-pointer"
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
