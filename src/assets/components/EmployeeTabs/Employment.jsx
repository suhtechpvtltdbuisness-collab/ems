import React from 'react'

function Employment() {
  return (
    <div className="text-sm text-gray-700 space-y-6">
      {/* --- Employment Details --- */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Employment Details
      </h3>
      <div className="grid md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Current Status
          </span>
          <span className="text-gray-900 text-base">Active</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">Employment Type</span>
          <span className="text-gray-900 text-base">Full</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Grade Level
          </span>
          <span className="text-gray-900 text-base">Senior</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Date of Joining
          </span>
          <span className="text-gray-900 text-base">15 Jan 2022</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Confirmation Date
          </span>
          <span className="text-gray-900 text-base">15 April 2022</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Probation Period
          </span>
          <span className="text-gray-900 text-base">3 Months</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Work Location
          </span>
          <span className="text-gray-900 text-base">Mumbai</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Offline Branch
          </span>
          <span className="text-gray-900 text-base">Mumbai Hq</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Reporting Manger 
          </span>
          <span className="text-gray-900 text-base">Priya Sharma</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Team Project
          </span>
          <span className="text-gray-900 text-base">Website ReVamp Project</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Shift Timing 
          </span>
          <span className="text-gray-900 text-base">9.00 AM - 6.00 PM</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Notice Period 
          </span>
          <span className="text-gray-900 text-base">30 Days</span>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-300 my-6"></div>

      {/* --- Employment Hisotry --- */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
        Employment History
      </h3>
      <div className="grid md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Previous Company
          </span>
          <span className="text-gray-900 text-base">TechSolve Pvt. Ltd.</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Total Experience
          </span>
          <span className="text-gray-900 text-base">3 years</span>
        </div>
        <div>
          <span className="font-light text-gray-500 block mb-1">
            Experience in Current Company
          </span>
          <span className="text-gray-900 text-base">2 years 2 months</span>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-300 my-6"></div>
    </div>
  )
}

export default Employment