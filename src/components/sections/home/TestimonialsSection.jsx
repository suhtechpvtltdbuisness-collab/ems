import React from "react";

export default function TestimonialsSection() {
    return (
        <section className="w-full py-20 px-6 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* ------------ HEADER ------------ */}
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-start md:divide-x md:divide-gray-400">

                    {/* LEFT TITLE */}
                    <div className="md:pr-6">
                        <h2 className="text-[#2E2E2E] text-4xl md:text-[44px] font-poppins font-semibold leading-tight md:leading-[56px]">
                            See how businesses <br />
                            streamline their <br />
                            <span className="bg-gradient-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent font-poppins font-semibold">
                                operations with us.
                            </span>
                        </h2>
                    </div>

                    {/* RIGHT PARAGRAPH */}
                    <div className="md:pl-6">
                        <p className="text-[#7C7C7C] text-[15px] leading-[22px] font-nunito mt-15">
                            Lorem ipsum dolor sit amet consectetur. kshi uemnamet consectetur. kshi uemnamet
                        </p>
                    </div>
                </div>

                {/* ------------ ARROWS ------------ */}
                <div className="flex justify-end gap-3 mt-10">
                    <button>
                        <img src="/LeftArrow.png" alt="Left Arrow" className="cursor-pointer" />
                    </button>

                    <button>
                        <img src="/RightArrow.png" alt="Right Arrow" className="cursor-pointer" />
                    </button>
                </div>

                {/* ------------ TESTIMONIAL CARDS ------------ */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
  {[1, 2, 3].map((item) => (
    <div
      key={item}
      className={`
        rounded-2xl p-6 bg-white border border-gray-100
        shadow-[0px_8px_25px_0px_#756FCC40]
        ${item === 1 ? "min-h-[280px] mt-0 sm:mt-[-20px] md:mt-[-40px]" : ""}
        ${item === 2 ? "min-h-[250px] mt-0 sm:mt-[-4px] md:mt-[-8px]" : ""}
        ${item === 3 ? "min-h-[230px] mt-0 sm:mt-[2px] md:mt-[4px]" : ""}
      `}
    >
      <div className="space-y-6">
        <img src="/quote.png" alt="Quote" className="w-8" />
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Hendrerit quisque nibh
          neque ultricies nulla lectus. Risus.
        </p>
        <div className="flex items-center gap-3">
          <img
            src="/Avatar (1).png"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
          <div>
            <p className="font-semibold text-gray-900 cursor-pointer">Arefin Shuvo</p>
            <p className="text-sm text-gray-500 cursor-pointer">CEO, Urbancompany</p>
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
