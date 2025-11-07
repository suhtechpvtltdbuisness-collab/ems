# AttendanceChart Component - Professional Edition

Now powered by **Recharts** for enhanced performance, interactivity, and professional data visualization!

## 🚀 What's New

- ✅ **Professional Charts**: Built with Recharts library for production-ready visualizations
- ✅ **Enhanced Tooltips**: Rich, interactive hover information with precise data
- ✅ **Smooth Animations**: Fluid transitions and hover effects
- ✅ **Better Performance**: Optimized rendering for large datasets
- ✅ **Responsive Design**: Automatic scaling and mobile optimization
- ✅ **Accessibility**: Screen reader friendly with ARIA support

## 📦 Dependencies

The component now requires Recharts:

```bash
npm install recharts
```

## 🎯 New Features

### Professional Tooltips
```jsx
// Rich hover information with:
// - Color-coded data points
// - Percentage and raw values
// - Total calculations
// - Professional styling
<AttendanceChart data={data} />
```

### Smooth Animations
All chart elements now feature:
- Hover transitions
- Data update animations
- Responsive scaling
- Professional visual feedback

### Enhanced Responsiveness
- Automatic container sizing
- Mobile-optimized breakpoints
- Flexible legend positioning
- Adaptive font sizing

# AttendanceChart Component

A highly optimized, API-ready React component for displaying attendance statistics with stacked bar charts. Features responsive design, loading states, error handling, and support for multiple data formats.

## Features

- ✅ **API Ready**: Built-in loading states, error handling, and data validation
- ✅ **Flexible Data Input**: Supports multiple API response formats
- ✅ **Visual Accuracy**: Matches exact design specifications with proper scaling
- ✅ **Interactive**: Hover tooltips and smooth transitions
- ✅ **Responsive**: Mobile-friendly with adaptive breakpoints
- ✅ **Accessible**: Proper ARIA labels and keyboard navigation
- ✅ **Performant**: Optimized rendering with minimal re-renders

## Installation

```jsx
import AttendanceChart from './components/dashboard/AttendanceChart';
import { transformAttendanceData } from './utils/attendanceUtils';
```

## Basic Usage

```jsx
const attendanceData = [
  { day: 'Mon', present: 85, absent: 10, leave: 5 },
  { day: 'Tue', present: 88, absent: 8, leave: 4 },
  { day: 'Wed', present: 82, absent: 12, leave: 6 }
];

<AttendanceChart data={attendanceData} />
```

## API Integration

```jsx
function AttendanceDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/attendance');
        const result = await response.json();
        const transformed = transformAttendanceData(result);
        setData(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <AttendanceChart 
      data={data}
      isLoading={loading}
      error={error}
      title="Team Attendance"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Array of attendance data objects |
| `isLoading` | `Boolean` | `false` | Shows loading spinner when true |
| `error` | `String` | `null` | Error message to display |
| `title` | `String` | `"Daily Attendance statistic"` | Chart title |
| `maxHeight` | `Number` | `120` | Maximum height for percentage scale |
| `showLegend` | `Boolean` | `true` | Whether to show color legend |

## Data Format

### Expected Format

```javascript
[
  {
    day: "Mon",        // Required: Day identifier
    present: 85,       // Required: Number of present employees
    absent: 10,        // Required: Number of absent employees
    leave: 5           // Required: Number of employees on leave
  }
]
```

### Supported API Formats

The component automatically handles various API response formats:

#### Format 1: Direct Array
```javascript
[
  { day: "Mon", present: 85, absent: 10, leave: 5 },
  { day: "Tue", present: 88, absent: 8, leave: 4 }
]
```

#### Format 2: Nested Structure
```javascript
{
  "attendance_data": [
    {
      "day_of_week": "Monday",
      "employees_present": 85,
      "employees_absent": 10,
      "employees_on_leave": 5
    }
  ]
}
```

#### Format 3: With Metadata
```javascript
{
  "data": [
    { "date": "2024-01-15", "present": 85, "absent": 10, "leave": 5 }
  ],
  "meta": {
    "total_employees": 100,
    "department": "Engineering"
  }
}
```

## Utility Functions

### transformAttendanceData(apiResponse)

Automatically converts various API formats to the expected format:

```javascript
import { transformAttendanceData } from './utils/attendanceUtils';

const apiResponse = {
  attendance_data: [
    { day_of_week: "Monday", employees_present: 85, employees_absent: 10 }
  ]
};

const normalized = transformAttendanceData(apiResponse);
// Result: [{ day: "Monday", present: 85, absent: 10, leave: 0 }]
```

### validateAttendanceData(data)

Validates data structure and returns detailed validation results:

```javascript
import { validateAttendanceData } from './utils/attendanceUtils';

const validation = validateAttendanceData(data);
console.log(validation.isValid);     // Boolean
console.log(validation.errors);      // Array of error messages
console.log(validation.warnings);    // Array of warning messages
```

### calculateAttendanceStats(data)

Computes statistical summaries:

```javascript
import { calculateAttendanceStats } from './utils/attendanceUtils';

const stats = calculateAttendanceStats(data);
console.log(stats.presentRate);      // "85.2%"
console.log(stats.averagePresent);   // 85
console.log(stats.totalEmployees);   // 100
```

## States

### Loading State
```jsx
<AttendanceChart data={[]} isLoading={true} />
```
Shows a spinner with "Loading attendance data..." message.

### Error State
```jsx
<AttendanceChart data={[]} error="Failed to load data" />
```
Shows an error icon with the error message and retry suggestion.

### Empty State
```jsx
<AttendanceChart data={[]} />
```
Shows a "No attendance data available" message with an icon.

## Customization

### Custom Colors
The component uses Tailwind CSS classes that can be customized:

```css
/* Customize colors in your CSS */
.attendance-chart .bg-purple-300 { @apply bg-blue-300; }
.attendance-chart .bg-purple-500 { @apply bg-blue-500; }
.attendance-chart .bg-purple-800 { @apply bg-blue-800; }
```

### Custom Scale
```jsx
<AttendanceChart 
  data={data}
  maxHeight={100}  // Scale to 100% instead of 120%
/>
```

### Hide Legend
```jsx
<AttendanceChart 
  data={data}
  showLegend={false}
/>
```

## Advanced Usage

### Custom Hook Integration

```javascript
// hooks/useAttendanceData.js
export function useAttendanceData(dateRange = 'week') {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch(`/api/attendance?range=${dateRange}`);
      const result = await response.json();
      setState({
        data: transformAttendanceData(result),
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Usage in component
function Dashboard() {
  const { data, isLoading, error, refetch } = useAttendanceData('week');
  
  return (
    <AttendanceChart 
      data={data}
      isLoading={isLoading}
      error={error}
      title="Weekly Team Attendance"
    />
  );
}
```

### Real-time Updates

```javascript
function RealTimeAttendance() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/attendance');
    
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(transformAttendanceData(newData));
    };
    
    return () => ws.close();
  }, []);
  
  return <AttendanceChart data={data} title="Live Attendance" />;
}
```

## Performance

- **Memoized calculations**: Percentage calculations are cached
- **Efficient re-renders**: Only updates when data or props change
- **Optimized DOM**: Minimal DOM nodes with CSS transforms
- **Responsive images**: SVG icons for crisp display at any size

## Accessibility

- **ARIA labels**: Proper labeling for screen readers
- **Keyboard navigation**: Tab-accessible interactive elements
- **Color contrast**: High contrast colors for visibility
- **Tooltips**: Descriptive hover information

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Migration from v1

If upgrading from an older version:

```javascript
// Old usage
<AttendanceChart attendance={data} />

// New usage
<AttendanceChart data={data} />
```

The `attendance` prop has been renamed to `data` for consistency.

## Troubleshooting

### Common Issues

**1. Data not displaying**
- Check data format with `validateAttendanceData()`
- Ensure data array is not empty
- Verify all required fields are present

**2. Incorrect percentages**
- Check for negative values in data
- Ensure totals are greater than 0
- Validate data types (numbers vs strings)

**3. Layout issues**
- Check parent container has defined height
- Ensure Tailwind CSS is properly loaded
- Verify responsive classes are applied

### Debug Mode

```javascript
// Enable detailed logging
const validation = validateAttendanceData(data);
console.log('Validation:', validation);

const stats = calculateAttendanceStats(data);
console.log('Stats:', stats);
```

## Contributing

When contributing to this component:

1. Maintain visual design accuracy
2. Preserve API compatibility
3. Add comprehensive tests
4. Update documentation
5. Follow existing code patterns

## License

MIT License - feel free to use in your projects!
