import SolutionCard from "../components/solutions/SolutionCard";
import { SOLUTIONS } from "../config/solutions";

export default function SolutionsPage() {
    return (
        <div className="w-full min-h-screen bg-white relative overflow-hidden">
            <img
                src="/Ellipse 492 (1).svg"
                alt="bg-shape"
                className="absolute left-0 top-[-60px] w-80 md:w-130 z-0"
            />

            <div className="max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
                <div className="relative bg-[#756FCC] text-white rounded-[24px] sm:rounded-[32px] p-7 sm:p-14 md:p-20 overflow-hidden shadow-[0_24px_60px_rgba(117,111,204,0.22)]">
                    <div className="relative z-10 max-w-xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Solutions –</h1>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                            Explore powerful solutions designed to simplify operations, enhance collaboration, and drive business growth.
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 py-12 sm:py-16 relative z-10">
                {SOLUTIONS.map((solution, index) => (
                    <SolutionCard key={solution.slug} solution={solution} index={index} />
                ))}
            </div>
        </div>
    );
}
