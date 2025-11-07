export default function TimeTrackerChart({ data }) {
  // Fixed heights to match the image design
  const barHeights = ['60%', '80%', '50%', '90%', '70%', '30%', '20%']; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
      <h3 className="text-2xl font-light mb-6">Time Tracker</h3>
      <div className="flex gap-4">
        {/* Y-axis labels on the left */}
        <div className="flex flex-col justify-between h-44 py-1">
          {['10h', '8h', '6h', '4h', '2h', '0'].map((label, idx) => (
            <span key={idx} className="text-sm text-gray-500 text-right pr-2">{label}</span>
          ))}
        </div>
        
        {/* Chart bars */}
        <div className="flex items-end justify-between gap-4 h-44 flex-1 mb-4">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-full mb-3">
                <div
                  className={`w-full rounded-full transition-all duration-300 ${
                    idx === 3 ? 'bg-purple-600' : 'bg-purple-200'
                  }`}
                  style={{ 
                    height: barHeights[idx] || '20%',
                    minHeight: '20px'
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-700 font-medium mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}