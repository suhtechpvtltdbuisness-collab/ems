export default function StatsCard({ icon: Icon, title, value, subtitle, highlighted, onClick, gradient }) {
  const customShadow = '0px 4px 12.1px 0px #0000000D';
  
  return (
    <div 
      className={`${
        highlighted 
          ? 'text-white transform scale-105' 
          : 'bg-white hover:shadow-md'
      } rounded-xl p-4 md:p-6 border border-gray-200 cursor-pointer transition-all duration-300 ease-in-out hover:scale-102`}
      style={{
        boxShadow: customShadow,
        ...(highlighted ? { background: gradient } : {})
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`${highlighted ? 'bg-white/20' : 'bg-gray-100'} p-2 rounded-full transition-colors duration-300`}>
          <Icon size={18} className={highlighted ? 'text-white' : 'text-gray-600'} />
        </div>
        <span className={`text-xs md:text-sm ${highlighted ? 'text-white/90' : 'text-gray-600'} transition-colors duration-300`}>
          {title}
        </span>
      </div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${highlighted ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
        {value}
      </div>
      {subtitle && (
        <p className={`text-xs ${highlighted ? 'text-white/80' : 'text-gray-500'} transition-colors duration-300`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}