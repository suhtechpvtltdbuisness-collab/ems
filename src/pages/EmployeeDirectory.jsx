import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Pencil,
  ChevronDown,
  Download,
  Plus,
  ChevronsUpDown,
} from "lucide-react";

const employeesData = Array(10)
  .fill(null)
  .map((_, i) => ({
    name: "Akriti Nanda",
    empId: `EMP-${(123 + i).toString().padStart(5, "0")}`,
    department: "ENGINEERING",
    designation: "SOFTWARE ENGINEER",
    joiningDate: `0${(i % 9) + 1} NOV 2025`,
    email: `akriti${i}@test.com`,
    status: "Active",
  }));

const EmployeeDirectory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const totalPages = 7;

  const handleSort = (key) => {
    setSortConfig((prev) => {
      let direction = "asc";
      if (prev.key === key && prev.direction === "asc") {
        direction = "desc";
      }
      return { key, direction };
    });
  };


  const sortedEmployees = useMemo(() => {
    const sorted = [...employeesData];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const valueA = a[sortConfig.key]?.toString().toLowerCase() ?? "";
        const valueB = b[sortConfig.key]?.toString().toLowerCase() ?? "";

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [sortConfig]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Employee Directory
        </h1>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-[#7D1EDB] rounded-full text-[#7D1EDB] bg-white hover:bg-gray-50 text-sm font-medium transition-colors">
            <span>Export</span>
            <Download className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7D1EDB] text-white text-sm font-medium transition-colors">
            <span>Add Employee</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name,id,email"
            className="w-full border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {["Department", "Designation", "Status", "Joining Date"].map(
            (label) => (
              <button
                key={label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EEECFF] text-[#7D1EDB] text-sm font-medium hover:bg-[#EEECFF] transition-colors"
              >
                {label}
                <ChevronDown className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>

                {[
                  { label: "SR NO", key: "srNo" },
                  { label: "EMP NAME", key: "name" },
                  { label: "EMP ID", key: "empId" },
                  { label: "DEPARTMENT", key: "department" },
                  { label: "DESIGNATION", key: "designation" },
                  { label: "JOINING DATE", key: "joiningDate" },
                  { label: "CONTACT", key: "email" },
                  { label: "STATUS", key: "status" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      <button
                        onClick={() => handleSort(col.key)}
                        className={`transition-colors ${
                          sortConfig.key === col.key
                            ? "text-[#7D1EDB]"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        <ChevronsUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}

                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sortedEmployees.map((emp, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-4 py-4 text-gray-900">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[#7D1EDB] font-medium cursor-pointer hover:text-purple-700">
                      {emp.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-900">{emp.empId}</td>
                  <td className="px-4 py-4 text-gray-900">{emp.department}</td>
                  <td className="px-4 py-4 text-gray-900">{emp.designation}</td>
                  <td className="px-4 py-4 text-gray-900">{emp.joiningDate}</td>
                  <td className="px-4 py-4 text-gray-900">{emp.email}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className=" text-[#7D1EDB] hover:text-purple-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className=" text-[#7D1EDB] hover:text-purple-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 text-sm">
        <p className="text-gray-600">Showing 1-10 Of 100</p>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 6, 7].map((page, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-[#7D1EDB] text-white"
                    : "text-[#7D1EDB] hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 text-grey-600 hover:text-grey-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
