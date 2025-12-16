import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function EmployeeDetails() {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const tabs = [
    "Personal Information",
    "Employment",
    "Attendance",
    "Leave",
    "Performance",
    "Documents",
    "Payroll",
    "Training & Development",
  ];

  const accordions = ["Basic Details", "Emergency Contact", "Identification"];

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Details</h1>
        <button className="flex items-center gap-2 cursor-pointer">
          <img src="/EDIT_BTN.svg" alt="edit icon" className="w-20 h-20" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <img
                    src="/EMP_IMG.svg"
                    alt="Employee"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* IMAGE EDIT BUTTON */}
                <button className="absolute bottom-0 right-0 text-white p-1 rounded-full text-xs cursor-pointer">
                  <img src="/EMP_IMG_EDIT.svg" alt="edit icon" className="w-8 h-8" />
                </button>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-gray-800 font-poppins">
                Rohan Patil
              </h2>
              <p className="text-sm text-gray-500">Front end Developer</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">EMP-1001</p>
            </div>

            {/* EMPLOYEE INFO */}
            <div className="mt-6 space-y-4">
              {[
                ["Mobile", "+9198453647588"],
                ["Email", "rohanp@company.com"],
                ["Location", "Mumbai"],
                ["Joining Date", "15 Jan 2022"],
                ["Department", "HR"],
                ["Manager", "Priya Sharma"],
                ["Status", "Active"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded cursor-pointer">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">

            {/* CUSTOM TABS */}
            <div className="px-6 pt-6 pb-4">
              <div
                className="flex items-center overflow-x-auto p-1"
                style={{
                  backgroundColor: "#EFEEE7",
                  borderRadius: "0.75rem",
                }}
              >
                <div className="flex w-full gap-1">
                  {tabs.map((tab, idx) => {
                    const isActive = activeTab === tab;

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-sm font-medium whitespace-nowrap transition-all`}
                        style={{
                          backgroundColor: isActive ? "#7D1EDB" : "#EFEEE7",
                          color: isActive ? "#ffffff" : "#5A5A5A",
                          borderRadius: "0.65rem",
                        }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ACCORDIONS */}
            <div className="p-6 space-y-3">
              {accordions.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <span className="font-medium text-gray-800">{item}</span>
                    <ChevronDown
                      size={20}
                      className={`text-gray-500 transition-transform ${
                        expandedAccordion === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedAccordion === index && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Content for {item} goes here...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
