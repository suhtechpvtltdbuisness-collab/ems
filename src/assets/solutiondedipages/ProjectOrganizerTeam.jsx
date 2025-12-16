export default function ProjectOrganizerTeam() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="md:pr-6 lg:pr-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-snug">
            Create projects and <br />
            share them with your <br /> teammates
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            In Orga you can create as many projects as you need,
            organize them into folders, and add your teammates to
            collaborate. Additionally, you can invite guests, such as
            clients or freelancers, to join specific projects at no extra cost.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative bg-white p-0">
            <img
              src="/Gemini_Generated_Image.svg"
              alt="icon"
              className="w-full h-auto max-w-[450px] md:max-w-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
