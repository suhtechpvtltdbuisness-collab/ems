import { Check, Lock, Building, Rocket, ShoppingBag, CreditCard, ShieldCheck, Mail, Key, LogIn, ArrowDown } from "lucide-react";
import { useState } from "react";

const processSteps = [
  {
    icon: <ShoppingBag size={32} />,
    title: "Plan Purchased",
    description: "Choose and subscribe to the plan that fits your business needs."
  },
  {
    icon: <CreditCard size={32} />,
    title: "Payment Done",
    description: "Secure payment processing and instant confirmation."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Auto-Account Creation",
    description: "System creates your Org account with Super Admin role automatically."
  },
  {
    icon: <Mail size={32} />,
    title: "Welcome Email",
    description: "Receive credentials, login URL, and a quick-start checklist via email."
  },
  {
    icon: <Key size={32} />,
    title: "Password Reset",
    description: "Securely update your temporary password to enter your workspace."
  },
  {
    icon: <LogIn size={32} />,
    title: "Admin Logs In",
    description: "Full access to your new dashboard and all included modules."
  }
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      title: "Free Plan",
      bestFor: "Small organizations & early-stage teams",
      price: "$0",
      categories: [
        {
          name: "HR MODULE",
          features: ["Employee management", "Leave & attendance (basic)"]
        },
        {
          name: "FINANCE MODULE",
          features: ["Expense & income tracking", "Basic financial reports"]
        }
      ],
      limitations: ["Limited number of users", "Basic support only"]
    },
    {
      title: "Standard Plan",
      icon: <Rocket size={24} className="text-[#756FCC]" />,
      bestFor: "Growing businesses & SMEs",
      price: "$99",
      categories: [
        {
          name: "HR & FINANCE",
          features: ["Employee management", "Leave & attendance", "Expense & income tracking", "Basic reports"]
        },
        {
          name: "SUPPORT & CRM",
          features: ["Ticket management system", "Customer communication", "Lead & customer management", "Follow-ups"]
        },
        {
          name: "PROJECT MANAGEMENT",
          features: ["Projects & tasks", "Assignments & timelines"]
        }
      ],
      limitations: ["Limited integrations", "Standard workflows only", "No inventory or order management"]
    },
    {
      title: "Advanced Plan",
      icon: <Building size={24} className="text-[#756FCC]" />,
      bestFor: "Large organizations & operations-heavy businesses",
      price: "$180",
      categories: [
        {
          name: "CORE MODULES",
          features: ["HR management", "Finance tracking & reports", "CRM & customer management", "Support ticket system"]
        },
        {
          name: "OPERATIONS",
          features: ["Inventory & warehouse management", "Sales & purchase orders", "Order lifecycle tracking"]
        },
        {
          name: "INTEGRATIONS",
          features: ["API access", "Third-party integrations"]
        }
      ],
      advancedFeatures: ["Advanced workflows", "Custom roles & permissions", "Priority / SLA support", "Higher user & data limits"]
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center gap-10 py-16 bg-white overflow-hidden">

      {/* Background Decorative Gradient (Top-Right) */}
      <div
        className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] blur-[80px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, #AFF6B9 0%, #DFFFDF 32.41%, #FAFFF9 60.16%, #FDFFFC 81.57%)'
        }}
      />
      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 mb-4">
        <h1 className="text-[#292D34] font-poppins font-bold text-2xl xs:text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-[-1px]">
          Choose the Right Plan for{" "}
          <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
            Your Business Growth
          </span>
        </h1>
        <p className="text-[#64748B] font-nunito text-[18px] max-w-2xl leading-relaxed">
          Scale your operations with our flexible pricing models designed for every stage of your journey.
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 px-4 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 w-full max-w-7xl mx-auto items-stretch">
        {plans.map((plan, index) => {
          const isStandard = plan.title === "Standard Plan";
          const isSelected = selectedPlan === plan.title;

          return (
            <div
              key={plan.title}
              onClick={() => setSelectedPlan(plan.title)}
              className={`
                relative w-full h-full p-10 flex flex-col gap-8
                rounded-[32px] bg-white border cursor-pointer
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                transition-all duration-500 hover:shadow-[0_20px_60px_rgba(117,111,204,0.12)]
                hover:-translate-y-1 overflow-hidden
                ${isSelected
                  ? "border-[#756FCC] ring-2 ring-[#756FCC]/30"
                  : isStandard
                    ? "border-[#756FCC]/20 ring-1 ring-[#756FCC]/10"
                    : "border-[#F1F5F9]"
                }
              `}
            >
              {/* Corner Shade for Middle Card */}
              {isStandard && (
                <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-[#7CF38D]/15 to-transparent pointer-events-none" />
              )}

              {/* Header */}
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-2">
                  {plan.icon}
                  <h2 className="text-[#1B223C] font-poppins text-3xl font-bold tracking-tight">
                    {plan.title}
                  </h2>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  <span className="text-[#1B223C] font-semibold">Best for:</span> {plan.bestFor}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 relative z-10">
                <span className="text-5xl font-poppins font-bold text-[#1B223C] tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-[#64748B] text-sm font-medium ml-1">
                  per month
                </span>
              </div>

              <div className="h-px bg-[#F1F5F9] relative z-10"></div>

              {/* Included Modules Section */}
              <div className="flex flex-col gap-5 relative z-10">
                {plan.categories.map((cat, catIdx) => (
                  <div key={catIdx} className="flex flex-col gap-2">
                    <h3 className="text-[#1B223C] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#50AA18]" />
                      {cat.name}
                    </h3>
                    <ul className="flex flex-col gap-2 pl-4">
                      {cat.features.map((feat, featIdx) => (
                        <li key={featIdx} className="text-[#64748B] text-sm flex items-center gap-3">
                          <Check size={16} className="text-[#50AA18]" strokeWidth={2.5} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Limitations Section if any */}
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

              {/* Advanced Features if any */}
              {plan.advancedFeatures && (
                <div className="flex flex-col gap-3 mt-2 relative z-10">
                  <div className="flex items-center gap-2 text-[#756FCC] font-semibold text-[13px] uppercase tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#756FCC]" />
                    Advanced Features
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-4">
                    {plan.advancedFeatures.map((adv, advIdx) => (
                      <li key={advIdx} className="text-[#1B223C] text-[13px] font-medium">
                        {adv}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlan(plan.title);
                }}
                className={`
                  mt-auto w-full py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer text-[15px]
                  ${isSelected
                    ? "bg-[#756FCC] text-white hover:bg-[#645db7] shadow-[0_10px_20px_rgba(117,111,204,0.3)]"
                    : "border-2 border-[#756FCC]/20 text-[#756FCC] hover:border-[#756FCC] hover:bg-[#F8F9FD]"
                  }
                `}
              >
                Get Started
              </button>
            </div>
          );
        })}
      </div>


    </div>
  );
}
