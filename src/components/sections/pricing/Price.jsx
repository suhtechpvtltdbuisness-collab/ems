import { Check, Lock, Rocket, Sparkles, Building, Wrench, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_ADDONS,
  formatPrice,
  formatDiscountedPrice,
  getDiscountedPrice,
  LAUNCH_DISCOUNT_PERCENT,
  PRICING_TAGLINE_USD,
  TRIAL_NOTE_USD,
  getPriceKey,
  getPerEmployeePriceKey,
} from "../../../config/subscriptionPlans";
import { authService, subscriptionService } from "../../../service";
import { trackEvent, trackPageView } from "../../../utils/analytics";

const PLAN_UI = {
  free_trial: {
    title: "Free Trial",
    icon: <Sparkles size={24} className="text-[#50AA18]" />,
    bestFor: "New teams exploring ORGA HRMS",
    priceNote: "for 7 days",
    highlight: true,
    categories: [
      {
        name: "HR MODULE",
        features: [
          "Employee management",
          "Leave & attendance (basic)",
          "Up to {limit} employees",
        ],
      },
    ],
    limitations: [
      "Card required (no charge during trial)",
      "Auto-renews after 7 days",
      `${SUBSCRIPTION_PLANS.free_trial.maxEmployees} employee limit during trial`,
    ],
    cta: "Start Free Trial",
    actionable: true,
  },
  starter_pack: {
    title: "Starter",
    icon: <Rocket size={24} className="text-[#756FCC]" />,
    bestFor: "Small teams and early-stage HR operations",
    priceNote: "per month",
    highlight: true,
    categories: [
      {
        name: "HR MODULE",
        features: [
          "Full employee management",
          "Leave & attendance",
          "Up to {limit} employees",
          "Payroll basics",
          "Extra employees at {perEmpPrice}/seat",
        ],
      },
      {
        name: "SUPPORT",
        features: ["Email support", "30-day subscription"],
      },
    ],
    limitations: ["Custom features are billed separately"],
    cta: "Subscribe Now",
    actionable: true,
  },
  premium: {
    title: "Growth",
    icon: <Building size={24} className="text-[#756FCC]" />,
    bestFor: "Growing companies with broader HR workflows",
    priceNote: "per month",
    highlight: true,
    categories: [
      {
        name: "ALL MODULES",
        features: [
          "Everything in Starter",
          "Advanced HR workflows",
          "Up to {limit} employees",
          "Extra employees at {perEmpPrice}/seat",
        ],
      },
    ],
    limitations: [],
    cta: "Subscribe Now",
    actionable: true,
  },
  enterprise: {
    title: "Enterprise",
    icon: <Building size={24} className="text-[#50AA18]" />,
    bestFor: "Larger teams that need higher employee capacity",
    priceNote: "per month",
    highlight: true,
    categories: [
      {
        name: "ALL MODULES",
        features: [
          "Everything in Growth",
          "Up to {limit} employees",
          "Extra employees at {perEmpPrice}/seat",
        ],
      },
    ],
    limitations: [],
    cta: "Subscribe Now",
    actionable: true,
  },
  custom_feature: {
    title: "Custom Feature",
    icon: <Wrench size={24} className="text-[#1B223C]" />,
    bestFor: "Teams that need a specific workflow, instance, or feature",
    priceNote: "one-time starting price",
    highlight: false,
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
    cta: "Buy Custom Feature",
    actionable: true,
  },
};

const EMPLOYEE_LIMITS = {
  free_trial: SUBSCRIPTION_PLANS.free_trial.maxEmployees,
  starter_pack: SUBSCRIPTION_PLANS.starter_pack.maxEmployees,
  premium: SUBSCRIPTION_PLANS.premium.maxEmployees,
  enterprise: SUBSCRIPTION_PLANS.enterprise.maxEmployees,
};

const enrichFeatures = (features, planType, limits, perEmpPrice) => {
  return features.map((feat) => {
    if (feat.includes("{limit}")) return feat.replace("{limit}", limits);
    if (feat.includes("{perEmpPrice}")) return feat.replace("{perEmpPrice}", perEmpPrice);
    return feat;
  });
};

const buildPlans = (apiPlans = [], currency) => {
  const apiByType = Object.fromEntries(
    (apiPlans || []).map((p) => [p.planType, p]),
  );
  const priceKey = getPriceKey(currency);
  const perEmpKey = getPerEmployeePriceKey(currency);

  const subscriptionPlans = Object.keys(SUBSCRIPTION_PLANS).map((planType) => {
    const config = SUBSCRIPTION_PLANS[planType];
    const api = apiByType[planType];
    const ui = PLAN_UI[planType];
    const rawPrice = api?.[priceKey] ?? config[priceKey];
    const limits = EMPLOYEE_LIMITS[planType];
    const perEmpPrice = formatPrice(config[perEmpKey], currency);

    const priceNote = limits
      ? `per month · up to ${limits} employees`
      : ui.priceNote;

    return {
      planType,
      ...ui,
      priceNote,
      categories: ui.categories.map((cat) => ({
        ...cat,
        features: enrichFeatures(cat.features, planType, limits, perEmpPrice),
      })),
      price: formatPrice(rawPrice, currency),
      rawPrice,
      discountedPrice: formatDiscountedPrice(rawPrice, currency),
      discountedPriceRaw: getDiscountedPrice(rawPrice),
      maxEmployees: api?.maxEmployees ?? config.maxEmployees,
      perEmployeePrice: perEmpPrice,
      currency,
    };
  });

  return [
    ...subscriptionPlans,
    {
      planType: "custom_feature",
      ...PLAN_UI.custom_feature,
      categories: PLAN_UI.custom_feature.categories.map((cat) => ({
        ...cat,
        features: enrichFeatures(cat.features, "custom_feature", null, null),
      })),
      price: formatPrice(SUBSCRIPTION_ADDONS.custom_feature[priceKey], currency),
      rawPrice: SUBSCRIPTION_ADDONS.custom_feature[priceKey],
      discountedPrice: formatDiscountedPrice(SUBSCRIPTION_ADDONS.custom_feature[priceKey], currency),
      discountedPriceRaw: getDiscountedPrice(SUBSCRIPTION_ADDONS.custom_feature[priceKey]),
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
      }
    });
  }, []);

  const plans = useMemo(() => buildPlans(apiPlans, currency), [apiPlans]);
  const tagline = PRICING_TAGLINE_USD;
  const trialNote = TRIAL_NOTE_USD;

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
      trackEvent("subscription_failed", { plan_name: PLAN_UI.free_trial.title, reason: trialResult.message });
      setMessage({ type: "error", text: trialResult.message });
      setLoadingPlan(null);
      return;
    }

    const paymentResult = await subscriptionService.openSubscriptionCheckout({
      ...trialResult.data,
      planName: PLAN_UI.free_trial.title,
      currency,
      organizationType: getOrganizationType(user),
    }, user);

    if (paymentResult.success) {
      setMessage({ type: "success", text: "Trial started! Card saved for auto-pay after 7 days. Redirecting..." });
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
    if (["starter_pack", "premium", "enterprise"].includes(plan.planType)) { handlePaidPlan(plan); return; }
    if (plan.planType === "custom_feature") {
      trackEvent("click_book_demo", { location: "pricing_custom_feature" });
      navigate("/demo");
      window.scrollTo(0, 0);
    }
  };

  const isPaidPlan = (planType) => ["starter_pack", "premium", "enterprise"].includes(planType);

  return (
    <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:py-20">
      <div className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] blur-[80px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, #AFF6B9 0%, #DFFFDF 32.41%, #FAFFF9 60.16%, #FDFFFC 81.57%)" }}
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
        {/* Launch Offer Banner */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#50AA18]/30 bg-gradient-to-r from-[#7CF38D]/20 to-[#50AA18]/20 px-4 py-2.5 text-sm font-semibold text-[#1B223C] sm:rounded-full sm:px-5">
          <Zap size={16} className="text-[#50AA18]" />
          <span>🚀 <span className="font-bold">{LAUNCH_DISCOUNT_PERCENT}% Launch Offer</span> — <span className="text-[#64748B] font-normal">locked-in for life on all paid plans</span></span>
        </div>

        <h1 className="text-[#292D34] font-poppins font-bold text-2xl xs:text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-[-1px]">
          Choose the Right Plan for{" "}
          <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">Your Business Growth</span>
        </h1>

        {/* Prices are displayed in USD only */}
        <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
          <span className="rounded-full bg-white px-5 py-1.5 text-sm font-medium text-[#1B223C] shadow-sm">
            $ USD
          </span>
        </div>

        <p className="max-w-2xl font-nunito text-base leading-7 text-[#64748B] sm:text-[17px]">
          {tagline}. {trialNote}
        </p>
        {message && (
          <p className={`text-sm font-medium px-4 py-2 rounded-lg ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {message.text}
          </p>
        )}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.planType;
          const isLoading = loadingPlan === plan.planType;
          const paid = isPaidPlan(plan.planType);
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
              {/* Launch Offer Badge */}
              {paid && (
                <div className="absolute top-3 right-3 z-20" style={{ pointerEvents: "none" }}>
                  <div className="bg-gradient-to-r from-[#50AA18] to-[#7CF38D] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-md shadow-md whitespace-nowrap">
                    {LAUNCH_DISCOUNT_PERCENT}% OFF
                  </div>
                </div>
              )}

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
                {paid ? (
                  <>
                    <span className="font-poppins text-xl font-bold tracking-tighter text-[#94A3B8] line-through">
                      {plan.price}
                    </span>
                    <span className="font-poppins text-4xl font-bold tracking-tighter text-[#1B223C]">
                      {plan.discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="font-poppins text-4xl font-bold tracking-tighter text-[#1B223C]">
                    {plan.price}
                  </span>
                )}
                <span className="text-[#64748B] text-xs sm:text-sm font-medium w-full sm:w-auto">{plan.priceNote}</span>
              </div>}

              {paid && (
                <p className="text-[#50AA18] text-xs font-semibold relative z-10">
                  Save {LAUNCH_DISCOUNT_PERCENT}% — launch pricing locked in forever
                </p>
              )}

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
