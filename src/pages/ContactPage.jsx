import React, { useEffect, useRef } from "react";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { trackPageView } from "../utils/analytics";
import { trackEvent } from "../features/visitor/visitorTracking.js";

const CONTACT_EMAIL = "Reply@orga.cc";

export default function ContactPage() {
    const contactViewTracked = useRef(false);

    useEffect(() => {
        if (contactViewTracked.current) return;
        contactViewTracked.current = true;
        trackPageView("contact");
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const message = formData.get("message");
        
        const subject = encodeURIComponent(`Contact Us Query from ${firstName} ${lastName}`);
        const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        trackEvent("form_submit", { form: "contact" });
    };

    return (
        <div className="relative bg-white px-4 py-10 sm:p-8 md:p-[60px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 overflow-hidden">

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
                        Get in Touch with{" "}
                        <span className="bg-linear-to-r from-[#C65CF4] to-[#96FFB2] bg-clip-text text-transparent inline">
                            Us
                        </span>
                    </h1>

                    <p className="text-[#7C7C7C] font-[Nunito] text-base sm:text-[18px] md:text-[24px] leading-relaxed max-w-full">
                        Have questions about ORGA? Our team is here to help you find the right solutions for your business.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-6 mt-4 w-full">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                            <Mail size={24} className="text-[#756FCC]" />
                        </div>
                        <div>
                            <p className="text-[#7C7C7C] font-dmsans text-[14px]">Email us at</p>
                            <p className="text-[#090909] font-dmsans text-[18px] font-semibold">{CONTACT_EMAIL}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                            <Phone size={24} className="text-[#756FCC]" />
                        </div>
                        <div>
                            <p className="text-[#7C7C7C] font-dmsans text-[14px]">Call us at</p>
                            <p className="text-[#090909] font-dmsans text-[18px] font-semibold">8298252909</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                            <MapPin size={24} className="text-[#756FCC]" />
                        </div>
                        <div>
                            <p className="text-[#7C7C7C] font-dmsans text-[14px]">Visit our office</p>
                            <p className="text-[#090909] font-dmsans text-[18px] font-semibold">Ithums Galleria Alpha 2 Floor 8th-40 201310</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex justify-center items-center relative z-10">
                <div className="w-full max-w-[600px] bg-white shadow-lg rounded-[24px] p-5 sm:p-8 lg:p-10 border border-gray-100 shadow-purple-200">

                    <form className="space-y-5" onSubmit={handleContactSubmit}>
                        <h3 className="text-[24px] font-[Poppins] font-semibold text-[#1E1E1E] mb-2">Send us a message</h3>

                        {/* Input Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[16px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    placeholder="First name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-[16px] font-[Poppins] text-[#1E1E1E] mb-2">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    placeholder="Last name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-[Poppins] text-[#1E1E1E] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition"
                            />
                        </div>

                        {/* Textarea */}
                        <div>
                            <label className="block text-[16px] font-[Poppins] text-[#1E1E1E] mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                required
                                placeholder="How can we help you?"
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-[#756FCC] focus:ring-1 focus:ring-[#756FCC] transition resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#756FCC] hover:bg-[#5f58c3] text-white py-3.5 rounded-xl font-semibold text-[16px] transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
