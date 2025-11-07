/**
 * Attendance Data Utilities
 * 
 * Helper functions for processing and validating attendance data
 * for the AttendanceChart component and API integration.
 */

/**
 * Validates and normalizes a single attendance data item
 * @param {Object} item - Raw attendance data item
 * @returns {Object} Normalized attendance data item
 */
export const validateAndNormalizeItem = (item) => {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const day = item.day || item.date || item.day_name || item.day_of_week || 'Unknown';
  const present = Math.max(0, parseInt(item.present || item.present_count || item.employees_present || 0));
  const absent = Math.max(0, parseInt(item.absent || item.absent_count || item.employees_absent || 0));
  const leave = Math.max(0, parseInt(item.leave || item.leave_count || item.employees_on_leave || 0));

  return {
    day,
    present,
    absent,
    leave,
    total: present + absent + leave
  };
};

/**
 * Transforms various API response formats into the expected format for AttendanceChart
 * @param {*} apiResponse - Raw API response
 * @returns {Array} Array of normalized attendance data
 */
export const transformAttendanceData = (apiResponse) => {
  if (!apiResponse) {
    return [];
  }

  let dataArray = [];

  // Handle different response structures
  if (Array.isArray(apiResponse)) {
    dataArray = apiResponse;
  } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
    dataArray = apiResponse.data;
  } else if (apiResponse.attendance && Array.isArray(apiResponse.attendance)) {
    dataArray = apiResponse.attendance;
  } else if (apiResponse.attendance_data && Array.isArray(apiResponse.attendance_data)) {
    dataArray = apiResponse.attendance_data;
  } else if (apiResponse.results && Array.isArray(apiResponse.results)) {
    dataArray = apiResponse.results;
  } else {
    console.warn('Unrecognized attendance data format:', apiResponse);
    return [];
  }

  // Transform and validate each item
  return dataArray
    .map(validateAndNormalizeItem)
    .filter(item => item !== null);
};

/**
 * Converts percentage-based data to actual counts
 * @param {Array} percentageData - Array of percentage-based attendance data
 * @param {number} totalEmployees - Total number of employees
 * @returns {Array} Array of count-based attendance data
 */
export const convertPercentagesToCounts = (percentageData, totalEmployees = 100) => {
  if (!Array.isArray(percentageData) || totalEmployees <= 0) {
    return [];
  }

  return percentageData.map(item => {
    const presentPercent = parseFloat(item.present_percentage || item.presentPercent || 0);
    const absentPercent = parseFloat(item.absent_percentage || item.absentPercent || 0);
    const leavePercent = parseFloat(item.leave_percentage || item.leavePercent || 0);

    return {
      day: item.day || item.date || 'Unknown',
      present: Math.round((presentPercent / 100) * totalEmployees),
      absent: Math.round((absentPercent / 100) * totalEmployees),
      leave: Math.round((leavePercent / 100) * totalEmployees)
    };
  });
};

/**
 * Calculates attendance statistics from data array
 * @param {Array} attendanceData - Array of attendance data
 * @returns {Object} Statistical summary
 */
export const calculateAttendanceStats = (attendanceData) => {
  if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
    return {
      totalDays: 0,
      averagePresent: 0,
      averageAbsent: 0,
      averageLeave: 0,
      totalEmployees: 0,
      presentRate: 0,
      absentRate: 0,
      leaveRate: 0
    };
  }

  const totals = attendanceData.reduce(
    (acc, item) => {
      const present = item.present || 0;
      const absent = item.absent || 0;
      const leave = item.leave || 0;
      
      return {
        present: acc.present + present,
        absent: acc.absent + absent,
        leave: acc.leave + leave,
        total: acc.total + present + absent + leave
      };
    },
    { present: 0, absent: 0, leave: 0, total: 0 }
  );

  const days = attendanceData.length;
  const avgTotal = totals.total / days;

  return {
    totalDays: days,
    averagePresent: Math.round(totals.present / days),
    averageAbsent: Math.round(totals.absent / days),
    averageLeave: Math.round(totals.leave / days),
    totalEmployees: Math.round(avgTotal),
    presentRate: avgTotal > 0 ? ((totals.present / totals.total) * 100).toFixed(1) : 0,
    absentRate: avgTotal > 0 ? ((totals.absent / totals.total) * 100).toFixed(1) : 0,
    leaveRate: avgTotal > 0 ? ((totals.leave / totals.total) * 100).toFixed(1) : 0
  };
};

/**
 * Validates attendance data before rendering
 * @param {Array} data - Attendance data array
 * @returns {Object} Validation result
 */
export const validateAttendanceData = (data) => {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
    return { isValid: false, errors, warnings };
  }

  if (data.length === 0) {
    warnings.push('No attendance data provided');
  }

  data.forEach((item, index) => {
    if (!item || typeof item !== 'object') {
      errors.push(`Item at index ${index} is not a valid object`);
      return;
    }

    const { present, absent, leave } = item;
    
    if (present === undefined && absent === undefined && leave === undefined) {
      warnings.push(`Item at index ${index} has no attendance data`);
    }

    if (present < 0 || absent < 0 || leave < 0) {
      errors.push(`Item at index ${index} has negative values`);
    }

    if (!item.day && !item.date) {
      warnings.push(`Item at index ${index} has no day/date identifier`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasData: data.length > 0 && warnings.length < data.length
  };
};

/**
 * Filters attendance data by date range
 * @param {Array} data - Attendance data array
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {Array} Filtered attendance data
 */
export const filterByDateRange = (data, startDate, endDate) => {
  if (!Array.isArray(data)) return [];
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.warn('Invalid date range provided');
    return data;
  }

  return data.filter(item => {
    const itemDate = new Date(item.date || item.day);
    if (isNaN(itemDate.getTime())) return true; // Keep if date can't be parsed
    
    return itemDate >= start && itemDate <= end;
  });
};

/**
 * Sorts attendance data by date
 * @param {Array} data - Attendance data array
 * @param {boolean} ascending - Sort order (default: true)
 * @returns {Array} Sorted attendance data
 */
export const sortByDate = (data, ascending = true) => {
  if (!Array.isArray(data)) return [];
  
  return [...data].sort((a, b) => {
    const dateA = new Date(a.date || a.day);
    const dateB = new Date(b.date || b.day);
    
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // Keep original order if dates can't be parsed
    }
    
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Groups attendance data by time period
 * @param {Array} data - Attendance data array
 * @param {string} period - Grouping period ('week', 'month', 'quarter')
 * @returns {Object} Grouped attendance data
 */
export const groupByPeriod = (data, period = 'week') => {
  if (!Array.isArray(data)) return {};
  
  const groups = {};
  
  data.forEach(item => {
    const date = new Date(item.date || item.day);
    if (isNaN(date.getTime())) return;
    
    let key;
    switch (period) {
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'quarter':
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        key = `${date.getFullYear()}-Q${quarter}`;
        break;
      default:
        key = item.day || item.date || 'unknown';
    }
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  
  return groups;
};

/**
 * Creates mock attendance data for testing
 * @param {number} days - Number of days to generate
 * @param {number} baseEmployees - Base number of employees
 * @returns {Array} Mock attendance data
 */
export const generateMockData = (days = 7, baseEmployees = 100) => {
  const mockData = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let i = 0; i < days; i++) {
    const variation = Math.random() * 0.2 - 0.1; // ±10% variation
    const totalForDay = Math.round(baseEmployees * (1 + variation));
    
    const presentRate = 0.75 + Math.random() * 0.15; // 75-90%
    const leaveRate = 0.05 + Math.random() * 0.10; // 5-15%
    const absentRate = 1 - presentRate - leaveRate;
    
    mockData.push({
      day: dayNames[i % 7],
      present: Math.round(totalForDay * presentRate),
      absent: Math.round(totalForDay * absentRate),
      leave: Math.round(totalForDay * leaveRate)
    });
  }
  
  return mockData;
};

// Export all utilities as default object for easier importing
export default {
  validateAndNormalizeItem,
  transformAttendanceData,
  convertPercentagesToCounts,
  calculateAttendanceStats,
  validateAttendanceData,
  filterByDateRange,
  sortByDate,
  groupByPeriod,
  generateMockData
};
