export default function IntegrationSection() {
  const icons = Array(8).fill("/mnt/data/bbef9cdc-127a-41a9-aec2-1aef7306e3fc.png");

  return (
    <div className="w-full flex flex-col items-center py-16 bg-white px-4 sm:px-6 md:px-8">

      {/* Heading */}
      <h1 className="text-[#1B223C] font-poppins font-semibold text-3xl sm:text-4xl md:text-[48px] text-center leading-snug">
        Connect with the Tools{" "}< span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent inline">
          You
        </span>

        <span className="bg-linear-to-r from-[#7CF38D] to-[#50AA18] bg-clip-text text-transparent block">
          Already Use.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-[#7C7C7C] font-nunito text-sm sm:text-base md:text-lg text-center mt-4 max-w-2xl leading-relaxed">
        Seamlessly integrate with your favorite applications and streamline your workflow without changing the way your team works.      </p>

      {/* Icons Container */}
      <div className="mt-12 p-6 sm:p-10 md:p-14 rounded-3xl border-4 border-[#AAEBB3] w-full max-w-6xl bg-[linear-gradient(270deg,#FFFFFF_0%,#EAFFDD_100%)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="bg-white w-full sm:w-[120px] h-[120px] rounded-[22px] border border-[#E5E5E5] flex items-center justify-center"
            >
              <img src="./Vector.png" alt="integration-icon" className="w-14 h-14 object-contain cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
