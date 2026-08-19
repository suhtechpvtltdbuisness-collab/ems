import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getSolutionBySlug } from "../config/solutions";

const featureIcons = ["/list_alt.png", "/TeamC.svg", "/ProjectT.svg", "/finance.svg"];

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = getSolutionBySlug(slug);

  if (!solution) return <Navigate to="/solutions" replace />;

  return (
    <main className="overflow-hidden bg-white text-[#292D34]">
      <section className="relative flex flex-col items-center overflow-hidden px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-20 sm:pt-16">
        <div className="absolute -top-24 left-1/2 -z-0 w-full max-w-5xl -translate-x-1/2">
          <img src="/Ellipse_btn _492.svg" alt="" className="h-auto w-full opacity-90" />
        </div>

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
          <Link to="/solutions" className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#756FCC]/15 bg-white/80 px-4 py-2 text-sm font-semibold text-[#756FCC] shadow-sm backdrop-blur-sm hover:bg-white">
            <ArrowLeft size={16} /> All solutions
          </Link>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#756FCC]">{solution.title}</p>
          <h1 className="mt-4 max-w-4xl font-poppins text-[34px] font-semibold leading-[1.14] text-gray-900 sm:text-5xl lg:text-6xl">
            {solution.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">{solution.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#756FCC] px-6 py-3 font-poppins font-medium text-white shadow-md transition hover:bg-[#645db7]">
              Try for free <ArrowRight size={18} />
            </Link>
            <Link to="/demo" className="inline-flex min-h-12 items-center rounded-xl border border-[#756FCC] bg-white px-6 py-3 font-poppins font-medium text-[#756FCC] transition hover:bg-[#F5F4FF]">
              Book a Demo
            </Link>
          </div>

          <div className="mt-10 w-full max-w-6xl rounded-2xl border border-[#E9E6F5] bg-white/70 p-1.5 shadow-[0_28px_80px_-32px_rgba(86,72,166,0.5)] sm:rounded-[30px] sm:p-2">
            <img src="/Dash.png" alt={`${solution.title} dashboard preview`} className="w-full rounded-xl sm:rounded-[22px]" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-poppins text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
              Everything you need for <span className="text-green-500">{solution.title}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">A focused set of tools that keeps your team’s work accurate, visible, and easy to manage.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solution.features.map((feature, index) => (
              <article key={feature} className="relative overflow-hidden rounded-2xl border border-[#756FCC] bg-white p-6 shadow-[0_6px_10px_4px_rgba(112,79,230,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3F1FF]">
                  <img src={featureIcons[index % featureIcons.length]} alt="" className="h-7 w-7 object-contain" />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-gray-900">{feature}</h3>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#50AA18]">
                  <Check size={16} strokeWidth={3} /> Included with ORGA
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 bg-[#FBFAFF] px-4 py-16 text-center sm:px-6 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#756FCC]">Product walkthrough</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold text-[#1E1E1E] sm:text-4xl">See how ORGA works</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#7C7C7C]">See how your team can manage {solution.title.toLowerCase()} and everyday business operations in one seamless workflow.</p>
        </div>
        <div className="w-full max-w-[1000px] overflow-hidden rounded-2xl border border-[#E9E6F5] bg-white p-1.5 shadow-[0_24px_70px_-30px_rgba(86,72,166,0.45)] sm:rounded-[28px] sm:p-2">
          <video className="block w-full rounded-xl object-contain sm:rounded-[20px]" autoPlay muted loop playsInline preload="metadata" aria-label={`${solution.title} product walkthrough`}>
            <source src="/WhatsApp%20Video%202026-08-14%20at%2011.37.22.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#50AA18]">Simple by design</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold text-gray-900 sm:text-4xl">How it works</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map((step, index) => (
              <article key={step} className="rounded-2xl border border-[#E9E8F7] bg-white p-6 shadow-[0_8px_30px_rgba(41,45,52,0.05)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F0FF] text-sm font-bold text-[#756FCC]">0{index + 1}</span>
                <h3 className="mt-7 font-poppins text-lg font-semibold leading-7">{step}</h3>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-8 rounded-[30px] bg-[#756FCC] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/65">Better business outcomes</p>
              <h2 className="mt-3 font-poppins text-3xl font-semibold">Ready to improve the way your team works?</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {solution.outcomes.map((outcome) => <span key={outcome} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">{outcome}</span>)}
              </div>
            </div>
            <Link to="/auth?mode=register" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#625CBC] transition hover:bg-[#F5F4FF]">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
