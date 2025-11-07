/**
 * AttendanceChart API Integration Examples
 * 
 * This file demonstrates various ways to integrate the AttendanceChart component
 * with different API response formats and scenarios.
 */

import React, { useState, useEffect } from 'react';
import AttendanceChart from './AttendanceChart';

// Example 1: Basic Usage with Static Data
export function BasicAttendanceExample() {
  const staticData = [
    { day: 'Mon', present: 85, absent: 10, leave: 5 },
    { day: 'Tue', present: 88, absent: 8, leave: 4 },
    { day: 'Wed', present: 82, absent: 12, leave: 6 },
    { day: 'Thu', present: 86, absent: 9, leave: 5 },
    { day: 'Fri', present: 80, absent: 13, leave: 7 }
  ];

  return (
    <AttendanceChart 
      data={staticData}
      title="Weekly Attendance Overview"
    />
  );
}

// Example 2: API Integration with Loading and Error States
export function APIIntegratedAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendanceData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/attendance/weekly');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform API response to expected format
      const transformedData = data.attendance.map(item => ({
        day: item.date || item.day_name || item.day,
        present: parseInt(item.present_count || item.present || 0),
        absent: parseInt(item.absent_count || item.absent || 0),
        leave: parseInt(item.leave_count || item.leave || 0)
      }));
      
      setAttendanceData(transformedData);
    } catch (err) {
      setError(err.message || 'Failed to load attendance data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <AttendanceChart 
        data={attendanceData}
        isLoading={isLoading}
        error={error}
        title="Real-time Attendance Data"
      />
      
      {error && (
        <button 
          onClick={fetchAttendanceData}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Retry
        </button>
      )}
    </div>
  );
}

// Example 3: Different API Response Formats
export function FlexibleAPIExample() {
  const [data, setData] = useState([]);

  // Handle different API response formats
  const transformAPIResponse = (apiResponse) => {
    // Format 1: Direct format
    if (apiResponse.day && apiResponse.present !== undefined) {
      return apiResponse;
    }
    
    // Format 2: Nested format
    if (apiResponse.attendance_data) {
      return apiResponse.attendance_data.map(item => ({
        day: item.day_of_week || item.date,
        present: item.employees_present || item.present,
        absent: item.employees_absent || item.absent,
        leave: item.employees_on_leave || item.leave
      }));
    }
    
    // Format 3: Percentage-based format
    if (apiResponse.percentages) {
      return apiResponse.percentages.map(item => ({
        day: item.day,
        present: Math.round((item.present_percentage / 100) * item.total_employees),
        absent: Math.round((item.absent_percentage / 100) * item.total_employees),
        leave: Math.round((item.leave_percentage / 100) * item.total_employees)
      }));
    }
    
    return apiResponse;
  };

  return (
    <AttendanceChart 
      data={data}
      maxHeight={100}
      showLegend={true}
    />
  );
}

// Example 4: Custom Hook for Attendance Data
export function useAttendanceData(dateRange = 'week') {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    error: null,
    lastUpdated: null
  });

  const fetchData = async (refresh = false) => {
    if (state.isLoading && !refresh) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/attendance?range=${dateRange}&ts=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      
      const result = await response.json();
      
      setState({
        data: result.data || [],
        isLoading: false,
        error: null,
        lastUpdated: new Date()
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  return { ...state, refetch: () => fetchData(true) };
}

// Example 5: Component with Custom Hook
export function AttendanceWithHook() {
  const { data, isLoading, error, refetch } = useAttendanceData('week');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly Attendance</h2>
        <button 
          onClick={refetch}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <AttendanceChart 
        data={data}
        isLoading={isLoading}
        error={error}
        title="Team Attendance Tracking"
      />
    </div>
  );
}

/*
=== API Response Format Examples ===

The AttendanceChart component can handle various API response formats:

Format 1 - Simple Array:
[
  { day: "Mon", present: 85, absent: 10, leave: 5 },
  { day: "Tue", present: 88, absent: 8, leave: 4 }
]

Format 2 - Nested Object:
{
  attendance_data: [
    { 
      day_of_week: "Monday", 
      employees_present: 85, 
      employees_absent: 10, 
      employees_on_leave: 5 
    }
  ]
}

Format 3 - With Metadata:
{
  data: [
    { date: "2024-01-15", present: 85, absent: 10, leave: 5 }
  ],
  meta: {
    total_employees: 100,
    department: "Engineering"
  }
}

Format 4 - Percentage Based:
{
  percentages: [
    { 
      day: "Mon", 
      present_percentage: 85, 
      absent_percentage: 10, 
      leave_percentage: 5,
      total_employees: 100 
    }
  ]
}

=== Component Props ===

data: Array - Attendance data array (required)
isLoading: Boolean - Shows loading spinner when true (optional, default: false)
error: String - Error message to display (optional, default: null)
title: String - Chart title (optional, default: "Daily Attendance statistic")
maxHeight: Number - Maximum height for percentage scale (optional, default: 120)
showLegend: Boolean - Whether to show color legend (optional, default: true)

=== Usage Examples ===

// Basic usage
<AttendanceChart data={attendanceData} />

// With all props
<AttendanceChart 
  data={attendanceData}
  isLoading={loading}
  error={errorMessage}
  title="Custom Title"
  maxHeight={100}
  showLegend={false}
/>

// With API integration
const { data, isLoading, error } = useAttendanceData();
<AttendanceChart data={data} isLoading={isLoading} error={error} />

=== Data Transformation Helper ===

// Helper function to transform various API formats
export const transformAttendanceData = (apiResponse) => {
  if (!apiResponse) return [];
  
  // Handle array directly
  if (Array.isArray(apiResponse)) {
    return apiResponse.map(validateAndNormalize);
  }
  
  // Handle nested structures
  if (apiResponse.data) return apiResponse.data.map(validateAndNormalize);
  if (apiResponse.attendance) return apiResponse.attendance.map(validateAndNormalize);
  if (apiResponse.attendance_data) return apiResponse.attendance_data.map(validateAndNormalize);
  
  return [];
};

const validateAndNormalize = (item) => ({
  day: item.day || item.date || item.day_name || item.day_of_week || 'Unknown',
  present: parseInt(item.present || item.present_count || item.employees_present || 0),
  absent: parseInt(item.absent || item.absent_count || item.employees_absent || 0),
  leave: parseInt(item.leave || item.leave_count || item.employees_on_leave || 0)
});

*/
