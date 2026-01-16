// src/components/InputField.jsx
import React from "react";

export const InputField = ({ label, icon: Icon, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 text-gray-400" size={18} />}

        <input
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
          {...props}
        />
      </div>
    </div>
  );
};
