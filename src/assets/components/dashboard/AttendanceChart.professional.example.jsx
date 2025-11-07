
import React, { useState, useEffect } from 'react';
import AttendanceChart from './AttendanceChart';
import AttendanceChartPercentage from './AttendanceChartPercentage';

// Example 1: Basic Professional Usage
export function ProfessionalAttendanceExample() {
  const mockData = [
    { day: 'Mon', present: 85, absent: 10, leave: 5 },
    { day: 'Tue', present: 88, absent: 8, leave: 4 },
    { day: 'Wed', present: 82, absent: 12, leave: 6 },
    { day: 'Thu', present: 86, absent: 9, leave: 5 },
    { day: 'Fri', present: 80, absent: 13, leave: 7 },
    { day: 'Sat', present: 65, absent: 20, leave: 15 },
    { day: 'Sun', present: 50, absent: 25, leave: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* Count-based chart */}
      <AttendanceChart 
        data={mockData}
        title="Weekly Attendance Overview"
        maxHeight={120}
        showLegend={true}
      />
      
      {/* Percentage-based chart */}
      <AttendanceChartPercentage 
        data={mockData}
        title="Weekly Attendance Distribution"
        maxHeight={100}
        showLegend={true}
      />
    </div>
  );
}

// Example 2: Real-time Dashboard Integration
export function RealTimeDashboard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate API calls with different response formats
  const fetchRealTimeData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate different API response formats
      const responses = [
        // Format 1: Direct array
        [
          { day: 'Mon', present: Math.floor(Math.random() * 20) + 80, absent: Math.floor(Math.random() * 15) + 5, leave: Math.floor(Math.random() * 10) + 3 },
          { day: 'Tue', present: Math.floor(Math.random() * 20) + 80, absent: Math.floor(Math.random() * 15) + 5, leave: Math.floor(Math.random() * 10) + 3 },
          { day: 'Wed', present: Math.floor(Math.random() * 20) + 80, absent: Math.floor(Math.random() * 15) + 5, leave: Math.floor(Math.random() * 10) + 3 },
          { day: 'Thu', present: Math.floor(Math.random() * 20) + 80, absent: Math.floor(Math.random() * 15) + 5, leave: Math.floor(Math.random() * 10) + 3 },
          { day: 'Fri', present: Math.floor(Math.random() * 20) + 80, absent: Math.floor(Math.random() * 15) + 5, leave: Math.floor(Math.random() * 10) + 3 }
        ],
        
        // Format 2: Nested object
        {
          attendance_data: [
            { day_of_week: 'Monday', employees_present: Math.floor(Math.random() * 20) + 80, employees_absent: Math.floor(Math.random() * 15) + 5, employees_on_leave: Math.floor(Math.random() * 10) + 3 },
            { day_of_week: 'Tuesday', employees_present: Math.floor(Math.random() * 20) + 80, employees_absent: Math.floor(Math.random() * 15) + 5, employees_on_leave: Math.floor(Math.random() * 10) + 3 },
            { day_of_week: 'Wednesday', employees_present: Math.floor(Math.random() * 20) + 80, employees_absent: Math.floor(Math.random() * 15) + 5, employees_on_leave: Math.floor(Math.random() * 10) + 3 },
            { day_of_week: 'Thursday', employees_present: Math.floor(Math.random() * 20) + 80, employees_absent: Math.floor(Math.random() * 15) + 5, employees_on_leave: Math.floor(Math.random() * 10) + 3 },
            { day_of_week: 'Friday', employees_present: Math.floor(Math.random() * 20) + 80, employees_absent: Math.floor(Math.random() * 15) + 5, employees_on_leave: Math.floor(Math.random() * 10) + 3 }
          ]
        }
      ];

      // Randomly select a response format
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Transform the data if needed
      let transformedData;
      if (Array.isArray(randomResponse)) {
        transformedData = randomResponse;
      } else if (randomResponse.attendance_data) {
        transformedData = randomResponse.attendance_data.map(item => ({
          day: item.day_of_week?.slice(0, 3) || item.day,
          present: item.employees_present || item.present,
          absent: item.employees_absent || item.absent,
          leave: item.employees_on_leave || item.leave
        }));
      }

      setAttendanceData(transformedData);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch real-time attendance data');
      console.error('Attendance fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Real-Time Attendance</h2>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button 
          onClick={fetchRealTimeData}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Updating...' : 'Refresh'}
        </button>
      </div>
      
      <AttendanceChart 
        data={attendanceData}
        isLoading={isLoading}
        error={error}
        title="Live Team Attendance"
        maxHeight={120}
      />
    </div>
  );
}

// Example 3: Comparative View with Multiple Charts
export function ComparativeAttendanceView() {
  const currentWeekData = [
    { day: 'Mon', present: 85, absent: 10, leave: 5 },
    { day: 'Tue', present: 88, absent: 8, leave: 4 },
    { day: 'Wed', present: 82, absent: 12, leave: 6 },
    { day: 'Thu', present: 86, absent: 9, leave: 5 },
    { day: 'Fri', present: 80, absent: 13, leave: 7 }
  ];

  const lastWeekData = [
    { day: 'Mon', present: 78, absent: 15, leave: 7 },
    { day: 'Tue', present: 82, absent: 12, leave: 6 },
    { day: 'Wed', present: 79, absent: 14, leave: 7 },
    { day: 'Thu', present: 84, absent: 11, leave: 5 },
    { day: 'Fri', present: 77, absent: 16, leave: 7 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AttendanceChart 
        data={currentWeekData}
        title="Current Week"
        maxHeight={120}
        showLegend={true}
      />
      
      <AttendanceChart 
        data={lastWeekData}
        title="Previous Week"
        maxHeight={120}
        showLegend={true}
      />
    </div>
  );
}

// Example 4: Interactive Dashboard with Filters
export function InteractiveDashboard() {
  const [timeRange, setTimeRange] = useState('week');
  const [department, setDepartment] = useState('all');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data generator based on filters
  const generateData = (range, dept) => {
    const baseData = {
      week: [
        { day: 'Mon', present: 85, absent: 10, leave: 5 },
        { day: 'Tue', present: 88, absent: 8, leave: 4 },
        { day: 'Wed', present: 82, absent: 12, leave: 6 },
        { day: 'Thu', present: 86, absent: 9, leave: 5 },
        { day: 'Fri', present: 80, absent: 13, leave: 7 }
      ],
      month: [
        { day: 'W1', present: 420, absent: 50, leave: 30 },
        { day: 'W2', present: 435, absent: 45, leave: 25 },
        { day: 'W3', present: 410, absent: 55, leave: 35 },
        { day: 'W4', present: 425, absent: 48, leave: 27 }
      ]
    };

    // Simulate department variations
    const deptMultiplier = dept === 'engineering' ? 1.1 : dept === 'sales' ? 0.9 : 1.0;
    
    return baseData[range].map(item => ({
      ...item,
      present: Math.round(item.present * deptMultiplier),
      absent: Math.round(item.absent * deptMultiplier),
      leave: Math.round(item.leave * deptMultiplier)
    }));
  };

  // Update data when filters change
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(generateData(timeRange, department));
      setIsLoading(false);
    }, 500); // Simulate API delay
  }, [timeRange, department]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">Time Range</label>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select 
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <AttendanceChart 
        data={data}
        isLoading={isLoading}
        title={`Attendance - ${department === 'all' ? 'All Departments' : department} (${timeRange})`}
        maxHeight={timeRange === 'month' ? 500 : 120}
        showLegend={true}
      />
    </div>
  );
}

// Export all examples for easy importing
export {
  ProfessionalAttendanceExample,
  RealTimeDashboard,
  ComparativeAttendanceView,
  InteractiveDashboard
};
