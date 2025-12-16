import React from "react";

export default function ProjectOrganizerWorks() {
  return (
    <section className="relative py-20 bg-white px-4 flex flex-col items-center text-center">

     
     <img
        src="/Ellipse_newpro_492.svg"
        alt="bg-glow"
        className="absolute -bottom-80 left-0 w-[550px] md:w-[750px] opacity-90 pointer-events-none z-0"
      />
      {/* Heading Section */}
      <div className="flex flex-col items-center max-w-3xl relative z-10">

        <h1 className="text-[#1E1E1E] font-poppins font-semibold 
          text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight">
          How does our Project
          <br />
          <span className="bg-linear-to-r from-[#5EE05B] to-[#64FF9F] text-transparent bg-clip-text">
            Organizer work?
          </span>
        </h1>

        <p className="text-[#7C7C7C] font-nunito text-base sm:text-lg md:text-xl mt-4 max-w-[600px]">
          Lorem ipsum dolor sit amet consectetur. kshi uemnamet consectetur.  
          kshi uemnamet
        </p>
      </div>

      {/* Dashboard Image */}
      <div className="flex items-center justify-center w-full mt-10 relative z-10">
        <img
          src="/howitworks.png"
          alt="Project Organizer Dashboard"
          className="w-full max-w-[1050px] rounded-3xl cursor-pointer object-contain"
        />
      </div>

      
    </section>
  );
}