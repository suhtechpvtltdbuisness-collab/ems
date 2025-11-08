import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeInformation from "./assets/pages/Employees/EmployeeInformation";

function App() {
  return (
    <Routes>
      {/* Redirect to personalinfo by default */}
      <Route
        path="/employees"
        element={<Navigate to="/employees/personalinfo" replace />}
      />

      {/* Employee Info with tabs */}
      <Route
        path="/employees/:tab"
        element={<EmployeeInformation />}
      />
    </Routes>
  );
}

export default App;
