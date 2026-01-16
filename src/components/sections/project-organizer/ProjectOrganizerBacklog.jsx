export default function ProjectOrganizerBacklog() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT — TEXT CONTENT */}
        <div className="md:pr-6 lg:pr-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
            Use waiting list as a <br />
            backlog for future tasks <br /> and ideas
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Every team has tasks that are important but not immediately 
            urgent, requiring the team’s attention in the future. Our 
            waiting list is a dedicated space for such tasks. Instead of 
            scheduling them on a specific date, put them on the waiting 
            list and come back later.
          </p>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative bg-white p-0">
            <img
              src="/Gemini_Generated_Image.svg"
              alt="feature-preview"
              className="w-full h-auto max-w-[450px] md:max-w-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
