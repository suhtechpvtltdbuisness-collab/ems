import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function AttendanceChartPercentage({ 
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
      <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
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

  // Process and calculate percentages for 100% stacked chart
  const processedData = data
    .filter(item => item && (item.present !== undefined || item.absent !== undefined || item.leave !== undefined))
    .map(item => {
      const validated = validateDataItem(item);
      const total = validated.present + validated.absent + validated.leave;
      
      if (total === 0) {
        return {
          day: validated.day,
          presentPercent: 0,
          absentPercent: 0,
          leavePercent: 0,
          rawData: validated
        };
      }
      
      return {
        day: validated.day,
        presentPercent: (validated.present / total) * 100,
        absentPercent: (validated.absent / total) * 100,
        leavePercent: (validated.leave / total) * 100,
        rawData: validated
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
      const raw = data.rawData;
      const total = raw.present + raw.absent + raw.leave;
      
      return (
        <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-gray-600">
          <p className="font-medium mb-2 text-center">{`${label}`}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-300"></span>
              <span>Present: {raw.present} ({data.presentPercent.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Absent: {raw.absent} ({data.absentPercent.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-800"></span>
              <span>Leave: {raw.leave} ({data.leavePercent.toFixed(1)}%)</span>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-2 pt-1 text-center">
            <span className="text-gray-300">Total: {total}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend component matching the design
  const CustomLegend = () => {
    const legendItems = [
      { color: '#ddd6fe', label: 'Present%' },
      { color: '#a855f7', label: 'Absent%' },
      { color: '#6b21a8', label: 'Leave%' }
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

  // Custom Y-axis tick formatter
  const formatYAxisTick = (tickItem) => `${tickItem}%`;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-2xl font-light">{title}</h3>
        {showLegend && <CustomLegend />}
      </div>

      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{
              top: 10,
              right: 10,
              left: 20,
              bottom: 10,
            }}
            barCategoryGap="15%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            
            {/* X-axis with custom styling */}
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#6b7280', 
                fontSize: 14, 
                fontWeight: 500,
                fontFamily: 'system-ui, sans-serif'
              }}
              dy={10}
            />
            
            {/* Y-axis with percentage labels on the left */}
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#9ca3af', 
                fontSize: 12,
                fontFamily: 'system-ui, sans-serif'
              }}
              tickFormatter={formatYAxisTick}
              domain={[0, maxHeight]}
              orientation="left"
              width={50}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
            />
            
            {/* Stacked bars with rounded corners */}
            <Bar 
              dataKey="presentPercent" 
              stackId="attendance"
              fill="#ddd6fe"
              stroke="#c4b5fd"
              strokeWidth={0.5}
              radius={[0, 0, 8, 8]} // Bottom rounded for first stack
            />
            <Bar 
              dataKey="absentPercent" 
              stackId="attendance"
              fill="#a855f7"
              stroke="#9333ea"
              strokeWidth={0.5}
            />
            <Bar 
              dataKey="leavePercent" 
              stackId="attendance"
              fill="#6b21a8"
              stroke="#581c87"
              strokeWidth={0.5}
              radius={[8, 8, 0, 0]} // Top rounded for last stack
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
