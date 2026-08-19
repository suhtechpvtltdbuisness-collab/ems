import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    quote: "ORGA completely transformed how we manage our team and projects. Everything is now centralized and so much easier to track.",
    name: "Viraj jewellers",
    role: "CEO, Viraj jewellers",
    // avatar: "/Avatar (1).png"
  },
  {
    id: 2,
    quote: "We've seen a massive increase in productivity since moving to ORGA. The automated payroll and attendance tracking is a lifesaver.",
    name: "Dhanganga",
    role: "HR Director, TechFlow",
    // avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 3,
    quote: "The best enterprise management tool we've used. Managing global teams, budgets, and timelines has never been so seamless.",
    name: "minecheerish",
    role: "Operations Manager, minecheerish",
    // avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 4,
    quote: "Incredible software that easily integrates with our daily operations. Our HR team loves the new onboarding flow.",
    name: "Autoroma",
    role: "CEO, Autorama",
    // avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 5,
    quote: "The analytics and reporting feature gives us exactly the insights we need. Highly recommend ORGA for fast-growing companies.",
    name: "bkbs sewatrust",
    role: "CEO, bkbs sewatruth",
    // avatar: "https://i.pravatar.cc/150?img=68"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    // Show 3 testimonials at a time, so stop moving when the last 3 are visible
    setCurrentIndex((prev) => (prev < testimonials.length - 3 ? prev + 1 : prev));
  };

  return (
    <section className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ------------ HEADER ------------ */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-start md:divide-x md:divide-gray-400">

          {/* LEFT TITLE */}
          <div className="md:pr-6">
            <h2 className="text-[#2E2E2E] text-3xl sm:text-4xl md:text-[44px] font-poppins font-semibold leading-tight md:leading-[56px]">
              See how businesses <br className="hidden sm:block" />
              streamline their <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent font-poppins font-semibold">
                operations with us.
              </span>
            </h2>
          </div>

          {/* RIGHT PARAGRAPH */}
          <div className="md:pl-6">
            <p className="text-[#7C7C7C] text-[15px] leading-[22px] font-nunito mt-0 md:mt-15">
              Discover how organizations automate HR processes, improve employee engagement, and boost productivity with our all-in-one HRMS platform.
            </p>
          </div>
        </div>

        {/* ------------ ARROWS ------------ */}
        <div className="flex justify-end gap-3 mt-10">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`transition-opacity ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
          >
            <img src="/LeftArrow.png" alt="Left Arrow" className={currentIndex === 0 ? "" : "cursor-pointer"} />
          </button>

          <button 
            onClick={handleNext}
            disabled={currentIndex >= testimonials.length - 3}
            className={`transition-opacity ${currentIndex >= testimonials.length - 3 ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
          >
            <img src="/RightArrow.png" alt="Right Arrow" className={currentIndex >= testimonials.length - 3 ? "" : "cursor-pointer"} />
          </button>
        </div>

        {/* ------------ TESTIMONIAL CARDS ------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`
        rounded-2xl p-6 bg-white border border-gray-100
        shadow-[0px_8px_25px_0px_#756FCC40] transition-all duration-300
        ${index === 0 ? "min-h-[280px] mt-0 sm:mt-[-20px] md:mt-[-40px]" : ""}
        ${index === 1 ? "min-h-[250px] mt-0 sm:mt-[-4px] md:mt-[-8px]" : ""}
        ${index === 2 ? "min-h-[230px] mt-0 sm:mt-[2px] md:mt-[4px]" : ""}
      `}
            >
              <div className="space-y-6">
                <img src="/quote.png" alt="Quote" className="w-8" />
                <p className="text-gray-700 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  {/* <img
                    src={testimonial.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  /> */}
                  <div>
                    <p className="font-semibold text-gray-900 cursor-pointer">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 cursor-pointer">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
