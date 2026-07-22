import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getSolutionBySlug } from "../config/solutions";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = getSolutionBySlug(slug);

  if (!solution) return <Navigate to="/solutions" replace />;

  return (
    <main className="overflow-hidden bg-white text-[#292D34]">
      <section className="relative px-6 pb-20 pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(124,243,141,0.22),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(117,111,204,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-[#756FCC] hover:text-[#5f58c3]">
            <ArrowLeft size={17} /> All solutions
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#756FCC]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#756FCC] shadow-sm">
                <Sparkles size={16} /> ORGA Solution
              </span>
              <h1 className="mt-6 max-w-3xl font-poppins text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {solution.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">{solution.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/demo" className="inline-flex items-center gap-2 rounded-xl bg-[#756FCC] px-6 py-3.5 font-semibold text-white shadow-[0_12px_28px_rgba(117,111,204,0.28)] transition hover:bg-[#645db7]">
                  Book a Demo <ArrowRight size={18} />
                </Link>
                <Link to="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-[#756FCC]/35 bg-white px-6 py-3.5 font-semibold text-[#756FCC] transition hover:bg-[#F7F6FF]">
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="relative rounded-[32px] bg-[#756FCC] p-7 text-white shadow-[0_24px_60px_rgba(117,111,204,0.26)] sm:p-10">
              <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[100px] bg-white/10" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Built for better work</p>
              <h2 className="relative mt-3 font-poppins text-3xl font-semibold">{solution.title}</h2>
              <div className="relative mt-8 grid gap-3">
                {solution.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7CF38D] text-[#24522B]"><Check size={15} strokeWidth={3} /></span>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#50AA18]">How it works</p>
            <h2 className="mt-3 font-poppins text-3xl font-bold sm:text-4xl">A simple path from planning to progress</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((step, index) => (
              <article key={step} className="rounded-3xl border border-[#E9E8F7] bg-[#FBFBFE] p-6">
                <span className="text-sm font-bold text-[#756FCC]">0{index + 1}</span>
                <h3 className="mt-8 font-poppins text-lg font-semibold">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] bg-gradient-to-br from-[#F1F0FF] to-[#EEFFF1] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#756FCC]">The impact</p>
            <h2 className="mt-3 font-poppins text-3xl font-bold">What your team can achieve</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {solution.outcomes.map((outcome) => (
                <span key={outcome} className="rounded-full border border-white bg-white/80 px-4 py-2 text-sm font-semibold text-[#41506A] shadow-sm">{outcome}</span>
              ))}
            </div>
          </div>
          <Link to="/auth?mode=register" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#292D34] px-6 py-3.5 font-semibold text-white transition hover:bg-[#17191d]">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
