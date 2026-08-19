export default function ProjectFeature() {
  const features = [
    {
      iconUrl: "/list_alt.png",
      title: "Task Management",
      description:
        "monitor every business expense with automated categorization and instant insights.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/TeamC.svg",
      title: "Project Timeline - Gantt & Kanban",
      description:
        "Generate invoices , send remainders, and track due payments effortlessly.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/ProjectT.svg",
      title: "Profitability Tracking",
      description:
        "Understand revenue trends , profit margins , and spending patterns at a glance.",
      bgColor: "bg-white",
    },
    {
      iconUrl: "/HRMS.svg",
      title: "Document Sharing",
      description:
        "Seamless invoicing and transaction across global currencies.",
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="bg-white px-4 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold font-poppins text-gray-900 mb-4 leading-tight">
            Everything your team <br />
            needs in <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent ">one place</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage tasks, teams, timelines, and profitability—all in one place. Streamline workflows and empower your team to achieve more with ORGA.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-col items-center">


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full cursor-pointer">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-2xl p-6
                  border border-[#756FCC]
                  hover:shadow-lg
                  transition-shadow duration-300
                  relative overflow-hidden cursor-pointer
                  shadow-[0_6px_10px_4px_rgba(112,79,230,0.10)]
                "
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 relative z-10">
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
                <p className="text-gray-600 text-sm relative z-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>


          <div className="mt-6 w-full flex justify-center">
            <div
              className="
                rounded-2xl p-6 border border-[#756FCC]
                hover:shadow-lg transition-shadow duration-300
                relative overflow-hidden cursor-pointer
                shadow-[0_6px_10px_4px_rgba(112,79,230,0.10)]
                max-w-[380px] w-full bg-white
              "
            >

              <img
                src="/Ellipse 487.svg"
                alt="hello"
                className="absolute z-0"
                style={{
                  right: "1px",
                  top: "0px",
                  pointerEvents: "none",
                }}
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <img
                  src={features[3].iconUrl}
                  alt={features[3].title}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">
                {features[3].title}
              </h3>
              <p className="text-gray-600 text-sm relative z-10">
                {features[3].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
