import { Check, Lock, Rocket, Sparkles, Building, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice, durationLabel } from "../../../config/subscriptionPlans";
import { authService, subscriptionService } from "../../../service";
import { trackEvent, trackPageView } from "../../../utils/analytics";

const PLAN_UI = {
  free_trial: {
    icon: <Sparkles size={24} className="text-[#50AA18]" />,
    bestFor: "New teams exploring ORGA HRMS",
    highlight: true,
    cta: "Start Free Trial",
    actionable: true,
  },
  starter_pack: {
    icon: <Rocket size={24} className="text-[#756FCC]" />,
    bestFor: "Small teams and early-stage HR operations",
    highlight: true,
    cta: "Subscribe Now",
    actionable: true,
  },
  premium: {
    icon: <Building size={24} className="text-[#756FCC]" />,
    bestFor: "Growing companies with broader HR workflows",
    highlight: true,
    cta: "Subscribe Now",
    actionable: true,
  },
  enterprise: {
    icon: <Building size={24} className="text-[#50AA18]" />,
    bestFor: "Larger teams that need higher employee capacity",
    highlight: true,
    cta: "Subscribe Now",
    actionable: true,
  },
  custom_feature: {
    icon: <Wrench size={24} className="text-[#1B223C]" />,
    bestFor: "Teams that need a specific workflow, instance, or feature",
    highlight: false,
    cta: "Buy Custom Feature",
    actionable: true,
  },
};

const defaultUi = (plan) => ({
  icon: <Rocket size={24} className="text-[#756FCC]" />,
  bestFor: plan.description || "ORGA subscription",
  highlight: true,
  cta: plan.priceUsd > 0 ? "Subscribe Now" : "Get Started",
  actionable: true,
});

const buildPlans = (apiPlans = [], currency) => {
  const starter = apiPlans.find((plan) => plan.planType === "starter_pack");
  const addonSource = apiPlans[0];

  const subscriptionPlans = apiPlans.map((api) => {
    const ui = PLAN_UI[api.planType] || defaultUi(api);
    const perEmpPrice = formatPrice(api.pricePerEmployeeUsd ?? 0, currency);
    const isPerEmployee = api.billingModel === "per_employee";
    const isTrial = api.planType === "free_trial";
    const rawPrice = isTrial
      ? 0
      : isPerEmployee
        ? Number(api.pricePerEmployeeUsd ?? 0)
        : Number(api.priceUsd ?? 0);
    const period = durationLabel(api.durationDays);
    const priceNote = isTrial
      ? `for ${period} · up to ${api.maxEmployees} employees`
      : isPerEmployee
        ? `per employee / month · up to ${api.maxEmployees} employees`
        : `per month · up to ${api.maxEmployees} employees`;

    const features = (api.features || []).length
      ? api.features
      : [`Up to ${api.maxEmployees} employees`];

    const limitations = isTrial
      ? [
          "Card required (no charge during trial)",
          `Auto-renews to ${api.autoRenewPlanName || starter?.name || "Starter"} after ${period}`,
          `${api.maxEmployees} employee limit during trial`,
        ]
      : [];

    return {
      ...ui,
      planType: api.planType,
      title: api.name,
      priceNote,
      categories: [{ name: isTrial ? "HR MODULE" : "PLAN", features }],
      limitations,
      price: formatPrice(rawPrice, currency),
      rawPrice,
      maxEmployees: api.maxEmployees,
      durationDays: api.durationDays,
      perEmployeePrice: perEmpPrice,
      currency,
    };
  });

  if (!addonSource) return subscriptionPlans;

  return [
    ...subscriptionPlans,
    {
      planType: "custom_feature",
      ...PLAN_UI.custom_feature,
      title: "Custom Feature",
      priceNote: "one-time starting price",
      categories: [
        {
          name: "ADD-ON",
          features: [
            "Specific instance or feature request",
            "Best for custom workflow enhancements",
          ],
        },
      ],
      limitations: ["Requires an active HRMS subscription"],
      price: formatPrice(addonSource.customFeaturePriceUsd ?? 0, currency),
      rawPrice: Number(addonSource.customFeaturePriceUsd ?? 0),
      maxEmployees: null,
      perEmployeePrice: null,
      currency,
    },
  ];
};

export default function PricingSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const pricingViewTracked = useRef(false);
  const [selectedPlan, setSelectedPlan] = useState("free_trial");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [message, setMessage] = useState(null);
  const [apiPlans, setApiPlans] = useState([]);
  const [plansError, setPlansError] = useState(null);
  const [plansLoading, setPlansLoading] = useState(true);
  const currency = "USD";

  useEffect(() => {
    if (location.pathname === "/pricing" && !pricingViewTracked.current) {
      pricingViewTracked.current = true;
      trackPageView("pricing");
    }
  }, [location.pathname]);

  useEffect(() => {
    subscriptionService.getPlans().then((result) => {
      if (result.success && Array.isArray(result.data)) {
        setApiPlans(result.data);
        setPlansError(null);
      } else {
        setApiPlans([]);
        setPlansError(result.message || "Unable to load plans.");
      }
      setPlansLoading(false);
    });
  }, []);

  const plans = useMemo(() => buildPlans(apiPlans, currency), [apiPlans]);
  const trial = apiPlans.find((plan) => plan.planType === "free_trial");
  const starter = apiPlans.find((plan) => plan.planType === "starter_pack");
  const tagline = starter
    ? `Starter is ${formatPrice(starter.pricePerEmployeeUsd, currency)} per employee / month, up to ${starter.maxEmployees} employees`
    : "";
  const trialNote = trial && starter
    ? `${durationLabel(trial.durationDays)} free trial with the same Starter limits, then ${starter.name} billing`
    : "";

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

  const getOrganizationType = (user) =>
    user?.organizationType ||
    user?.organization_type ||
    user?.organization?.organizationType ||
    user?.organization?.type ||
    "unknown";

  const handleFreeTrial = async () => {
    if (!requireAuth()) return;
    setLoadingPlan("free_trial");
    setMessage(null);

    const profile = await authService.getProfile();
    const user = profile.data?.user || getUser();
    const trialResult = await subscriptionService.activateFreeTrial();

    if (!trialResult.success) {
      if (profile.success && authService.isSubscribed(profile.data?.subscription)) {
        authService.redirectToAdmin();
        return;
      }
      trackEvent("subscription_failed", { plan_name: trial?.name || "Free Trial", reason: trialResult.message });
      setMessage({ type: "error", text: trialResult.message });
      setLoadingPlan(null);
      return;
    }

    const paymentResult = await subscriptionService.openSubscriptionCheckout({
      ...trialResult.data,
      planName: trial?.name || "Free Trial",
      currency,
      organizationType: getOrganizationType(user),
    }, user);

    if (paymentResult.success) {
      const period = durationLabel(trialResult.data?.trialDays || trial?.durationDays);
      setMessage({ type: "success", text: `Trial started! Card saved for auto-pay after ${period}. Redirecting...` });
      setTimeout(() => authService.redirectToAdmin(), 1500);
    } else if (paymentResult.message !== "Payment cancelled") {
      setMessage({ type: "error", text: paymentResult.message });
    }
    setLoadingPlan(null);
  };

  const handlePaidPlan = async (plan) => {
    if (!requireAuth()) return;
    setLoadingPlan(plan.planType);
    setMessage(null);

    const profile = await authService.getProfile();
    const user = profile.data?.user || getUser();
    const orderResult = await subscriptionService.createOrder(plan.planType);

    if (!orderResult.success) {
      trackEvent("subscription_failed", { plan_name: plan.title, reason: orderResult.message });
      setMessage({ type: "error", text: orderResult.message });
      setLoadingPlan(null);
      return;
    }

    const paymentResult = await subscriptionService.openCheckout(orderResult.data, user, {
      planName: plan.title,
      organizationType: getOrganizationType(user),
      amount: plan.rawPrice,
      currency,
    });

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
    if (plan.planType === "free_trial") { handleFreeTrial(); return; }
    if (plan.planType !== "custom_feature") { handlePaidPlan(plan); return; }
    trackEvent("click_book_demo", { location: "pricing_custom_feature" });
    navigate("/demo");
    window.scrollTo(0, 0);
  };

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:py-20">
      <div className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] blur-[80px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, #AFF6B9 0%, #DFFFDF 32.41%, #FAFFF9 60.16%, #FDFFFC 81.57%)" }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-[#292D34] font-poppins font-bold text-2xl xs:text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-[-1px]">
          Choose the Right Plan for{" "}
          <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">Your Business Growth</span>
        </h1>

        <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
          <span className="rounded-full bg-white px-5 py-1.5 text-sm font-medium text-[#1B223C] shadow-sm">
            $ USD
          </span>
        </div>

        <p className="max-w-2xl font-nunito text-base leading-7 text-[#64748B] sm:text-[17px]">
          {tagline}{tagline && trialNote ? ". " : ""}{trialNote}
        </p>
        {message && (
          <p className={`text-sm font-medium px-4 py-2 rounded-lg ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {message.text}
          </p>
        )}
        {plansError && (
          <p className="text-sm font-medium px-4 py-2 rounded-lg bg-red-50 text-red-700">{plansError}</p>
        )}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plansLoading && (
          <p className="col-span-full text-center text-sm text-[#64748B]">Loading plans...</p>
        )}
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.planType;
          const isLoading = loadingPlan === plan.planType;
          const isCustomFeature = plan.planType === "custom_feature";

          return (
            <div
              key={plan.planType}
              onClick={() => setSelectedPlan(plan.planType)}
              className={`
                relative min-w-0 w-full h-full p-6 flex flex-col gap-5
                rounded-3xl bg-white border cursor-pointer
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all duration-500 hover:shadow-[0_20px_60px_rgba(117,111,204,0.12)]
                hover:-translate-y-1
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
                  <h2 className="min-w-0 break-words font-poppins text-2xl font-bold tracking-tight text-[#1B223C]">{plan.title}</h2>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  <span className="text-[#1B223C] font-semibold">Best for:</span> {plan.bestFor}
                </p>
              </div>

              {!isCustomFeature && <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 relative z-10">
                <span className="font-poppins text-4xl font-bold tracking-tighter text-[#1B223C]">
                  {plan.price}
                </span>
                <span className="text-[#64748B] text-xs sm:text-sm font-medium w-full sm:w-auto">{plan.priceNote}</span>
              </div>}

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
                        <li key={featIdx} className="text-[#64748B] text-sm flex items-start gap-3">
                          <Check size={16} className="text-[#50AA18] shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="break-words">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {plan.limitations?.length > 0 && (
                <div className="flex flex-col gap-3 mt-2 relative z-10">
                  <div className="flex items-center gap-2 text-gray-400 font-semibold text-[13px] uppercase tracking-wide">
                    <Lock size={14} /> Limitations
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {plan.limitations.map((limit, limitIdx) => (
                      <li key={limitIdx} className="text-[#94A3B8] text-[13px] italic break-words">{limit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPlan(plan.planType); handlePlanAction(plan); }}
                disabled={!plan.actionable || isLoading}
                className={`
                  mt-auto w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-300
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
    </section>
  );
}
