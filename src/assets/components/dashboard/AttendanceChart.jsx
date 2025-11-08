import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AttendanceChart({ 
  data = [], 
  isLoading = false, 
  error = null,
  title = "Daily Attendance statistic",
  maxHeight = 120,
  showLegend = true 
}) {
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <span className="ml-3 text-gray-500">Loading attendance data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-full " style={{ border: '1px solid #D9D9D9' }}>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-red-500 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-400 mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Validate and normalize data
  const validateDataItem = (item) => {
    const present = Number(item.present) || 0;
    const absent = Number(item.absent) || 0;
    const leave = Number(item.leave) || 0;
    const day = item.day || item.date || 'Unknown';
    
    return { present, absent, leave, day };
  };

  // Process and calculate percentages for the chart
  const processedData = data
    .filter(item => item && (item.present !== undefined || item.absent !== undefined || item.leave !== undefined))
    .map(item => {
      const validated = validateDataItem(item);
      const total = validated.present + validated.absent + validated.leave;
      
      return {
        day: validated.day,
        present: validated.present,
        absent: validated.absent,
        leave: validated.leave,
        total,
        // Calculate percentages for display
        presentPercent: total > 0 ? ((validated.present / total) * 100).toFixed(1) : 0,
        absentPercent: total > 0 ? ((validated.absent / total) * 100).toFixed(1) : 0,
        leavePercent: total > 0 ? ((validated.leave / total) * 100).toFixed(1) : 0
      };
    });

  // Handle empty data
  if (processedData.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-600">No attendance data available</p>
          <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
        </div>
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
          <p className="font-medium mb-1">{`Day: ${label}`}</p>
          <p className="text-purple-300">{`Present: ${data.present} (${data.presentPercent}%)`}</p>
          <p className="text-purple-400">{`Absent: ${data.absent} (${data.absentPercent}%)`}</p>
          <p className="text-purple-500">{`Leave: ${data.leave} (${data.leavePercent}%)`}</p>
          <div className="border-t border-gray-600 mt-1 pt-1">
            <p className="text-white">{`Total: ${data.total}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = () => {
    const legendItems = [
      { color: '#ddd6fe', label: 'Present%', dataKey: 'present' },
      { color: '#a855f7', label: 'Absent%', dataKey: 'absent' },
      { color: '#6b21a8', label: 'Leave%', dataKey: 'leave' }
    ];

    return (
      <div className="flex items-center gap-6 text-sm flex-wrap mb-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-2xl font-light">{title}</h3>
        {showLegend && <CustomLegend />}
      </div>

      <div style={{ width: '100%', height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{
              top: 5,
              right: 10,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="15%"
          >
            {/* Subtle grid lines */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f3f4f6" 
              vertical={false} 
              horizontal={true}
            />
            
            {/* X-axis matching original design */}
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#6b7280', 
                fontSize: 11, 
                fontWeight: 500,
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
              dy={3}
            />
            
            {/* Y-axis on left side with clean styling */}
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#9ca3af', 
                fontSize: 10,
                fontFamily: 'Inter, system-ui, sans-serif',
                textAnchor: 'end'
              }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, maxHeight]}
              orientation="left"
              width={35}
              dx={-2}
            />
            
            {/* Enhanced tooltip */}
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(139, 92, 246, 0.08)', radius: 4 }}
            />
            
            {/* Stacked bars with proper visual hierarchy */}
            <Bar 
              dataKey="present" 
              stackId="attendance"
              fill="#ddd6fe"
              stroke="rgba(196, 181, 253, 0.3)"
              strokeWidth={0.5}
              radius={[0, 0, 6, 6]}
              name="Present"
            />
            <Bar 
              dataKey="absent" 
              stackId="attendance"
              fill="#a855f7"
              stroke="rgba(147, 51, 234, 0.3)"
              strokeWidth={0.5}
              name="Absent"
            />
            <Bar 
              dataKey="leave" 
              stackId="attendance"
              fill="#6b21a8"
              stroke="rgba(88, 28, 135, 0.3)"
              strokeWidth={0.5}
              radius={[6, 6, 0, 0]}
              name="Leave"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}