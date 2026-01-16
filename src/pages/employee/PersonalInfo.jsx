import React from "react";

const PersonalInfo = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["First Name", "Rohan"],
          ["Last Name", "Patil"],
          ["Date of Birth", "12 Oct 1994"],
          ["Gender", "Male"],
          ["Blood Group", "O+"],
          ["Marital Status", "Single"],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;
