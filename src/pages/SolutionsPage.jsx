import React from "react";
import { useNavigate } from "react-router-dom";

export default function SolutionsPage() {
    const navigate = useNavigate();

    const cards = [
        "Project organizer",
        "Online project board",
        "Task board",
        "Work organizer",
        "Day organizer",
        "Online task manager",
        "Work board",
        "Digital Daily Planner",
        "Time Manager",
    ];

    const handleClick = (title) => {
        if (title === "Project organizer") {
            navigate("/solutiondedipages");
        }
    };

    return (
        <div className="w-full min-h-screen bg-white relative overflow-hidden">
            <img
                src="/Ellipse 492 (1).svg"
                alt="bg-shape"
                className="absolute left-0 top-[-60px] w-80 md:w-130 z-0"
            />

            <div className="max-w-7xl mx-auto mt-24 px-6">
                <div className="relative bg-[#756FCC] text-white rounded-3xl p-16 md:p-20 overflow-hidden">
                    <div className="relative z-10 max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Solutions –</h1>
                        <p className="text-lg md:text-xl leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Eu sit platea vivamus quis.
                        </p>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden z-0">
                        <img
                            src="/Right_icons.svg"
                            alt="shapes"
                            className="absolute right-0 top-0 h-full w-auto object-cover object-left"
                        />
                    </div>
                </div>
            </div>

            {/* GRID SECTION */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-16 relative z-10">
    {cards.map((title, index) => (
        <div
            key={index}
            onClick={() => handleClick(title)}
            className="border rounded-xl p-6 text-lg font-medium shadow-sm hover:shadow-md transition cursor-pointer bg-white relative z-20"
        >
            {title}
        </div>
    ))}
</div>
        </div>
    );
}
