import { Check, Lock, Rocket, Sparkles, Building } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, subscriptionService } from "../../../service";

const plans = [
  {
    planType: "free_trial",
    title: "Free Trial",
    icon: <Sparkles size={24} className="text-[#50AA18]" />,
    bestFor: "New users exploring HRMS",
    price: "₹0",
    priceNote: "for 7 days",
    highlight: true,
    categories: [
      {
        name: "HR MODULE",
        features: [
          "Employee management",
          "Leave & attendance (basic)",
          "Up to 4 employees",
        ],
      },
    ],
    limitations: [
      "Card required (no charge during trial)",
      "Auto-renews at ₹999/month after 7 days",
      "4 employee limit during trial",
    ],
    cta: "Start Free Trial",
    actionable: true,
  },
  {
    planType: "starter_pack",
    title: "Starter Pack",
    icon: <Rocket size={24} className="text-[#756FCC]" />,
    bestFor: "Growing businesses & SMEs",
    price: "₹999",
    priceNote: "per month",
    highlight: true,
    categories: [
      {
        name: "HR MODULE",
        features: [
          "Full employee management",
          "Leave & attendance",
          "Up to 25 employees",
          "Payroll basics",
        ],
      },
      {
        name: "SUPPORT",
        features: ["Email support", "30-day subscription"],
      },
    ],
    limitations: ["Standard workflows only"],
    cta: "Subscribe Now",
    actionable: true,
  },
  {
    planType: "standard",
    title: "Standard Plan",
    icon: <Building size={24} className="text-gray-400" />,
    bestFor: "Mid-size organizations",
    price: "₹2,499",
    priceNote: "per month",
    categories: [
      {
        name: "ALL MODULES",
        features: ["HR + Finance + CRM", "Project management", "Advanced reports"],
      },
    ],
    limitations: ["Coming soon"],
    cta: "Coming Soon",
    actionable: false,
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free_trial");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [message, setMessage] = useState(null);

  const requireAuth = () => {
    if (!authService.hasSessionHint()) {
      navigate("/auth?mode=login");
      return false;
    }
    return true;
  };

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userData") || "{}");
    } catch {
      return {};
    }
  };

  const handleFreeTrial = async () => {
    if (!requireAuth()) return;

    setLoadingPlan("free_trial");
    setMessage(null);

    const profile = await authService.getProfile();
    const user = profile.data?.user || getUser();

    const trialResult = await subscriptionService.activateFreeTrial();

    if (!trialResult.success) {
      if (
        profile.success &&
        authService.isSubscribed(profile.data?.subscription)
      ) {
        authService.redirectToAdmin();
        return;
      }
      setMessage({ type: "error", text: trialResult.message });
      setLoadingPlan(null);
      return;
    }

    const paymentResult = await subscriptionService.openSubscriptionCheckout(
      trialResult.data,
      user,
    );

    if (paymentResult.success) {
      setMessage({
        type: "success",
        text: "Trial started! Card saved for auto-pay after 7 days. Redirecting...",
      });
      setTimeout(() => authService.redirectToAdmin(), 1500);
    } else if (paymentResult.message !== "Payment cancelled") {
      setMessage({ type: "error", text: paymentResult.message });
    }

    setLoadingPlan(null);
  };

  const handleStarterPack = async () => {
    if (!requireAuth()) return;

    setLoadingPlan("starter_pack");
    setMessage(null);

    const profile = await authService.getProfile();
    const user = profile.data?.user || getUser();

    const orderResult = await subscriptionService.createOrder("starter_pack");

    if (!orderResult.success) {
      setMessage({ type: "error", text: orderResult.message });
      setLoadingPlan(null);
      return;
    }

    const paymentResult = await subscriptionService.openCheckout(
      orderResult.data,
      user,
    );

    if (paymentResult.success) {
      setMessage({ type: "success", text: "Payment successful! Redirecting to admin..." });
      setTimeout(() => authService.redirectToAdmin(), 1500);
    } else if (paymentResult.message !== "Payment cancelled") {
      setMessage({ type: "error", text: paymentResult.message });
    }

    setLoadingPlan(null);
  };

  const handlePlanAction = (plan) => {
    if (!plan.actionable) return;

    if (plan.planType === "free_trial") {
      handleFreeTrial();
      return;
    }

    if (plan.planType === "starter_pack") {
      handleStarterPack();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-10 py-16 bg-white overflow-hidden">
      <div
        className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] blur-[80px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #AFF6B9 0%, #DFFFDF 32.41%, #FAFFF9 60.16%, #FDFFFC 81.57%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 mb-4">
        <h1 className="text-[#292D34] font-poppins font-bold text-2xl xs:text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-[-1px]">
          Choose the Right Plan for{" "}
          <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
            Your Business Growth
          </span>
        </h1>
        <p className="text-[#64748B] font-nunito text-[18px] max-w-2xl leading-relaxed">
          Start with a 7-day free trial — add your card via Razorpay (no charge
          today). Auto-pay begins after the trial unless you cancel.
        </p>
        {message && (
          <p
            className={`text-sm font-medium px-4 py-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      <div className="relative z-10 px-4 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 w-full max-w-7xl mx-auto items-stretch">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.planType;
          const isLoading = loadingPlan === plan.planType;

          return (
            <div
              key={plan.planType}
              onClick={() => setSelectedPlan(plan.planType)}
              className={`
                relative w-full h-full p-10 flex flex-col gap-8
                rounded-[32px] bg-white border cursor-pointer
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all duration-500 hover:shadow-[0_20px_60px_rgba(117,111,204,0.12)]
                hover:-translate-y-1 overflow-hidden
                ${isSelected
                  ? "border-[#756FCC] ring-2 ring-[#756FCC]/30"
                  : plan.highlight
                    ? "border-[#756FCC]/20 ring-1 ring-[#756FCC]/10"
                    : "border-[#F1F5F9] opacity-80"
                }
              `}
            >
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  {plan.icon}
                  <h2 className="text-[#1B223C] font-poppins text-3xl font-bold tracking-tight">
                    {plan.title}
                  </h2>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  <span className="text-[#1B223C] font-semibold">Best for:</span>{" "}
                  {plan.bestFor}
                </p>
              </div>

              <div className="flex items-baseline gap-1 relative z-10">
                <span className="text-5xl font-poppins font-bold text-[#1B223C] tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-[#64748B] text-sm font-medium ml-1">
                  {plan.priceNote}
                </span>
              </div>

              <div className="h-px bg-[#F1F5F9] relative z-10" />

              <div className="flex flex-col gap-5 relative z-10">
                {plan.categories.map((cat, catIdx) => (
                  <div key={catIdx} className="flex flex-col gap-2">
                    <h3 className="text-[#1B223C] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#50AA18]" />
                      {cat.name}
                    </h3>
                    <ul className="flex flex-col gap-2 pl-4">
                      {cat.features.map((feat, featIdx) => (
                        <li
                          key={featIdx}
                          className="text-[#64748B] text-sm flex items-center gap-3"
                        >
                          <Check size={16} className="text-[#50AA18]" strokeWidth={2.5} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {plan.limitations && (
                <div className="flex flex-col gap-3 mt-2 relative z-10">
                  <div className="flex items-center gap-2 text-gray-400 font-semibold text-[13px] uppercase tracking-wide">
                    <Lock size={14} />
                    Limitations
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {plan.limitations.map((limit, limitIdx) => (
                      <li key={limitIdx} className="text-[#94A3B8] text-[13px] italic">
                        {limit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.planType);
                  handlePlanAction(plan);
                }}
                disabled={!plan.actionable || isLoading}
                className={`
                  mt-auto w-full py-4 rounded-xl font-bold transition-all duration-300 text-[15px]
                  ${!plan.actionable
                    ? "border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "bg-[#756FCC] text-white hover:bg-[#645db7] shadow-[0_10px_20px_rgba(117,111,204,0.3)] cursor-pointer"
                      : "border-2 border-[#756FCC]/20 text-[#756FCC] hover:border-[#756FCC] hover:bg-[#F8F9FD] cursor-pointer"
                  }
                  ${isLoading ? "opacity-70 cursor-wait" : ""}
                `}
              >
                {isLoading ? "Processing..." : plan.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
