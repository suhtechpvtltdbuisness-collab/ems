import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

import PersonalInformation from "../../components/EmployeeTabs/PersonalInformation";
import Employment from "../../components/EmployeeTabs/Employment";
import Attendance from "../../components/EmployeeTabs/Attendance";
import Leave from "../../components/EmployeeTabs/Leave";
import Performance from "../../components/EmployeeTabs/Performance";
import Documents from "../../components/EmployeeTabs/Documents";
import Payroll from "../../components/EmployeeTabs/Payroll";
import ActivityLog from "../../components/EmployeeTabs/ActivityLog";

function EmployeeInformation() {
  const navigate = useNavigate();
  const { tab } = useParams();

  // Tab list
  const tabs = [
    { key: "personalinfo", label: "Personal Information" },
    { key: "employment", label: "Employment" },
    { key: "attendance", label: "Attendance" },
    { key: "leave", label: "Leave" },
    { key: "performance", label: "Performance" },
    { key: "documents", label: "Documents" },
    { key: "payroll", label: "Payroll" },
    { key: "activity", label: "Activity Log" },
  ];

  const activeTab = tab || "personalinfo";

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "personalinfo":
        return <PersonalInformation />;
      case "employment":
        return <Employment />;
      case "attendance":
        return <Attendance />;
      case "leave":
        return <Leave />;
      case "performance":
        return <Performance />;
      case "documents":
        return <Documents />;
      case "payroll":
        return <Payroll />;
      case "activity":
        return <ActivityLog />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-sm rounded-3xl overflow-hidden relative">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 m-3">
          Employees &gt;{" "}
          <span className="text-gray-800 font-medium">View Employee Details</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 ml-3 mb-6">
          Employee Information
        </h1>

        {/*  Main Container */}
        <div className="flex flex-col md:flex-row gap-3 h-screen items-stretch">
          {/* Left Section */}
            <div className="w-full md:w-1/4 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 ml-4 mb-4 flex flex-col items-center">
              {/*  Top Profile Section */}
              <div className="flex flex-col items-center w-full mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Rohan Patil</h2>
                <p className="text-gray-500">Front end Developer</p>
                <p className="text-gray-700 mt-1 text-base">EMP-1001</p>
              </div>

              {/* 🏢 Employee Details */}
              <div className="w-full text-sm text-gray-700 space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Department</span>
                  <span className="text-gray-900 font-medium">HR</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Location</span>
                  <span className="text-gray-900 font-medium">Mumbai</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Joining Date</span>
                  <span className="text-gray-900 font-medium">15 Jan 2022</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Email</span>
                  <span className="text-gray-900 font-medium">rohan.p@company.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Mobile</span>
                  <span className="text-gray-900 font-medium">+91 9845364758</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Manager</span>
                  <span className="text-gray-900 font-medium">Priya Sharma</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Status</span>
                  <span className="text-gray-900 font-medium">Active</span>
                </div>
              </div>
            </div>

          {/* Right Section */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mr-4 mb-4 flex flex-col">
            {/* Tabs */}
            <div className="relative flex flex-wrap gap-6 pb-2 mb-6 text-gray-600 text-sm font-medium border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => navigate(`/employees/${tab.key}`)}
                  className={`relative pb-2 transition-colors ${
                    activeTab === tab.key ? "text-gray-900 font-medium" : "hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-800 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Tab Content */}
            <div className="text-sm text-gray-700 space-y-6 flex-1 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm border px-3 py-1.5 rounded-full transition">
            Edit
            <Pencil size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInformation;