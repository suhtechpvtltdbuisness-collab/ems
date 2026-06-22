export default function FeaturesSection() {
  const features = [
    {
      iconUrl: "/list_alt.png",
      title: "Task Management",
      description: "Stay organized with smart task planning, real-time tracking, deadlines, priorities, and automated workflows — all in one intuitive dashboard.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/TeamC.svg",
      title: "Team Collaboration",
      description: "Enhance teamwork with seamless communication, shared workspaces, file sharing, and synchronized updates for faster decision-making.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/ProjectT.svg",
      title: "Project Timeline",
      description: "Visualize your entire project journey with dynamic timelines, milestones, and progress tracking to ensure on-time delivery every single time.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/HRMS.svg",
      title: "HRMS",
      description: "Manage employees effortlessly with automated attendance, leave tracking, document management, onboarding, and performance analytics.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/finance.svg",
      title: "Finance Management",
      description: "Track expenses, generate invoices, monitor budgets, and analyze financial performance with smart, accurate, and secure financial tools.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/support.svg",
      title: "Support",
      description: "Offer quick resolutions with a built-in support system for tickets, customer queries, and internal issue tracking — ensuring smooth operations.",
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-5xl font-semibold font- poppins text-gray-900 mb-4 leading-tight">
            <span className="block">Everything your team</span>
            <span className="block">needs in <span className="text-green-500">one place</span></span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <span className="block">A complete, all-in-one Enterprise Management System designed to streamline workflows, boost productivity, and centralize business operations. From tasks and timelines to HR and finance, everything you need is available in one powerful platform.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                ${feature.bgColor} 
                rounded-3xl p-8 
                border border-[#756FCC] 
                hover:shadow-lg 
                transition-shadow duration-300 
                relative overflow-hidden cursor-pointer
                shadow-[0_6px_10px_4px_rgba(112,79,230,0.10)]
              `}
            >
              {/* Optional Background Shape */}
              {index === features.length - 2 && (
                <img
                  src="/Ellipse 487.svg"
                  alt="bg-shape"
                  className="absolute z-0"
                  style={{ right: '1px', top: '0px', pointerEvents: 'none' }}
                />
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 relative z-10 mt-[-20px]">
                <img
                  src={feature.iconUrl}
                  alt={feature.title}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
