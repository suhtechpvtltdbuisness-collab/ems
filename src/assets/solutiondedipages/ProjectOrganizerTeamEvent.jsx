export default function ProjectOrganizerTeamEvent() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT — IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative bg-white p-0">
            <img
              src="/Gemini_Generated_Image.svg"
              alt="feature-preview"
              className="w-full h-auto max-w-[450px] md:max-w-full"
            />
          </div>
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="md:pl-6 lg:pl-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
            Schedule your team’s <br />
            tasks and events on <br /> specific days
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Say goodbye to overwhelming to-do lists with hundreds of tasks. 
            In Orga, you can schedule tasks and meetings on specific days, 
            creating a short, actionable plan for each day. This allows your 
            team to focus solely on today’s tasks and get maximum out of 
            every single day.
          </p>
        </div>

      </div>
    </div>
  );
}
