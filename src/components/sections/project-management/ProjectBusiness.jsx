export default function ProjectBusiness() {
  const features = [
    {
      iconUrl: "list_alt.png",
      title: "Clear visibility",
      description:
        "Monitor every business expense with automated categorization and instant insights.",
    },
    {
      iconUrl: "/TeamC.svg",
      title: "Zero missed deadlines",
      description:
        "Generate invoices, send reminders, and track due payments effortlessly.",
    },
    {
      iconUrl: "/ProjectT.svg",
      title: "Smooth collaboration",
      description:
        "Generate invoices, send reminders, and track due payments effortlessly.",
    },
    {
      iconUrl: "/HRMS.svg",
      title: "Increased productivity",
      description:
        "Understand revenue trends, profit margins, and spending patterns at a glance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-5xl font-semibold font-poppins text-gray-900 mb-4">
            Why Businesses <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent">Choose ORGA
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Simplify HR, payroll, attendance, tasks, and project management with one powerful platform designed to help your team work smarter and grow faster.
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">


          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">


            <Card feature={features[0]} />


            <Card feature={features[1]} />


            <div className="md:col-span-2">
              <Card feature={features[2]} />
            </div>

          </div>


          <div className="row-span-2 cursor-pointer">
            <Card feature={features[3]} isLarge />
          </div>

        </div>
      </div>
    </div>
  );
}


function Card({ feature, isLarge }) {
  return (
    <div
      className={`
        bg-white rounded-3xl p-8 border border-[#756FCC]
        hover:shadow-lg transition-shadow duration-300
        relative overflow-hidden shadow-[0_6px_10px_4px_rgba(112,79,230,0.10)] cursor-pointer
        ${isLarge ? "h-full flex flex-col justify-between" : ""}
      `}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
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


      {isLarge && (
        <button className="mt-6 w-fit px-6 py-3 rounded-lg bg-[#756FCC] text-white shadow-sm hover:opacity-90 transition flex items-center gap-2 cursor-pointer">
          Try for free →
        </button>
      )}
    </div>
  );
}
