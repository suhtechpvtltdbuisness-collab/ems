import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SolutionCard({ solution, index }) {
  return (
    <Link
      to={`/solutions/${solution.slug}`}
      className="group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl border border-[#756FCC]/15 bg-white p-6 shadow-[0_12px_36px_rgba(41,45,52,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#756FCC]/40 hover:shadow-[0_18px_45px_rgba(117,111,204,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#756FCC]/25"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#756FCC]/15 to-[#7CF38D]/20 transition-transform duration-500 group-hover:scale-125" />
      <div className="relative flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F0FF] text-sm font-bold text-[#756FCC]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="text-[#756FCC] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={21} />
      </div>
      <div className="relative mt-8">
        <h2 className="font-poppins text-xl font-semibold text-[#292D34]">{solution.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#64748B]">{solution.shortDescription}</p>
      </div>
    </Link>
  );
}
