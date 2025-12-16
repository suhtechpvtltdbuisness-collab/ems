import React from "react";

const Employment = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Employment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["Employment Type", "Full-Time"],
          ["Designation", "Frontend Developer"],
          ["Department", "HR"],
          ["Manager", "Priya Sharma"],
          ["Work Location", "Mumbai"],
          ["Experience", "3 Years"],
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

export default Employment;
