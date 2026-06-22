import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Demo() {
    return (
        <div className="relative bg-white p-6 md:p-[60px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">


            <img
                src="/Ellipse 492 (1).svg"
                alt="bg-shape"
                className="absolute left-0 top-0 w-56 md:w-96 pointer-events-none z-10"

            />

            {/* Left Section */}
            <div className="flex flex-col items-center md:items-start gap-6 md:gap-4 relative z-10">

                {/* Title + Description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
                    <h1 className="text-[#1E1E1E] font-poppins text-[32px] md:text-[48px] font-semibold leading-tight">
                        Book your Demo{" "}
                        <span className="bg-linear-to-r from-[#C65CF4] to-[#96FFB2] bg-clip-text text-transparent inline">
                            Today
                        </span>
                    </h1>

                    <p className="text-[#7C7C7C] font-[Nunito] text-[18px] md:text-[24px] leading-relaxed max-w-[90%] md:max-w-full">
                        See how ORGA can streamline your workflows and empower your team to achieve more.

                    </p>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-4 mt-2 w-full">
                    {[
                        "Pick a time slot that works for you and schedule a personalized demo.",
                        "Discover how ORGA maximizes productivity and simplifies operations.",
                        "Manage global teams with multi-currency and tax compliance support.",
                        " Get answers tailored to your business needs and unique challenges."
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 w-full">
                            <CheckCircle2 size={28} className="text-white fill-[#756FCC]" />
                            <p className="text-[#090909] font-dmsans text-[18px] md:text-[24px] font-semibold leading-snug">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex justify-center items-center relative z-10">
                <div className="w-full max-w-[600px] bg-white shadow-lg rounded-[24px] p-10 border border-gray-100 shadow-purple-200">

                    <form className="space-y-5">

                        {/* Input Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your work mail"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    Contact
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your contact number"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>
                        </div>

                        {/* Select Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="block text-[18px]  font-[Poppins] text-[#1E1E1E] mb-2">
                                    Preferred Demo Language
                                </label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] text-gray-700 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition appearance-none cursor-pointer pr-10">
                                    <option>Select language</option>
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Spanish</option>
                                </select>
                                <svg className="absolute right-4 top-[46px] pointer-events-none text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div className="relative">
                                <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    Team size
                                </label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] text-gray-700 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition appearance-none cursor-pointer pr-10">
                                    <option>Select Team size</option>
                                    <option>1-10</option>
                                    <option>10-50</option>
                                    <option>50+</option>
                                </select>
                                <svg className="absolute right-4 top-[46px] pointer-events-none text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Textarea */}
                        <div>
                            <label className="block text-[18px] font-[Poppins] text-[#1E1E1E] mb-2">
                                Tell us more about your use case & business needs
                            </label>
                            <textarea
                                placeholder="Explain about your idea..."
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#756FCC] hover:bg-[#5f58c3] text-white py-3.5 rounded-xl font-semibold text-[16px] transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Submit
                        </button>

                        <p className="text-[13px] text-gray-500 text-center leading-relaxed px-2">
                            By submitting this form, I agree to SUH Tech's Privacy Policy as I have read & understood it.
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}
