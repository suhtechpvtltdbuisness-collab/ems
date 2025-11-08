export default function Mytools({ tools }) {
  const defaultTools = [
    { id: 1, name: 'Tool 1', icon: null },
    { id: 2, name: 'Tool 2', icon: null },
    { id: 3, name: 'Tool 2', icon: null },
    { id: 4, name: 'Tool 2', icon: null }
  ];

  const toolItems = tools || defaultTools;

  return (
    <div className="bg-white rounded-3xl w-96 p-6 shadow-sm h-fit" style={{ border: '1px solid #D9D9D9' }}>
      <h3 className="text-2xl font-normal mb-6">My Tools</h3>

      <div className="grid grid-cols-4 gap-1 mb-20">
        {toolItems.map((tool) => (
          <div key={tool.id} className="flex flex-col items-center">
            {/* Circular tool icon */}
            <div className="w-16 h-16 bg-[#C5C5C5] rounded-full mb-3 flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer">
            </div>
            {/* Tool name */}
            <span className="text-sm text-gray-700 font-medium text-center">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
