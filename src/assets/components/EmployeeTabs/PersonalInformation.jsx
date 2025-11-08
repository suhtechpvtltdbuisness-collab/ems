import React from "react";

function PersonalInformation() {
  return (
    <div className="text-sm text-gray-700 space-y-6">
      {/* --- Personal Information --- */}
      <h3 className="text-lg font-semibold text-[#636363] mb-3">
        Personal Information
      </h3>
      <div className="grid md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Date of Birth
          </span>
          <span className="text-gray-900 text-base">25 August 1995</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">Gender</span>
          <span className="text-gray-900 text-base">Male</span>
        </div>
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Blood Group
          </span>
          <span className="text-gray-900 text-base">B+</span>
        </div>
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Marital Status
          </span>
          <span className="text-gray-900 text-base">Single</span>
        </div>
        <div className="col-span-2 whitespace-normal overflow-visible">
          <span className="font-medium text-gray-500 block mb-1">Address</span>
          <span className="text-gray-900 text-base">
            A-123, Rosewood Apartments, Andheri West, Mumbai, Maharashtra - 400058
          </span>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* --- Emergency Contact --- */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
        Emergency Contact
      </h3>
      <div className="grid md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Contact Name
          </span>
          <span className="text-gray-900 text-base">Anil Patil</span>
        </div>
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Relationship
          </span>
          <span className="text-gray-900 text-base">Father</span>
        </div>
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Contact Number
          </span>
          <span className="text-gray-900 text-base">9876543211</span>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* --- Identification --- */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
        Identification
      </h3>
      <div className="grid md:grid-cols-2 gap-y-6 gap-x-8">
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            Aadhar Number
          </span>
          <span className="text-gray-900 text-base">XXXX-XXXX-1234</span>
        </div>
        <div>
          <span className="font-medium text-gray-500 block mb-1">
            PAN Number
          </span>
          <span className="text-gray-900 text-base">ABCDE1234F</span>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
