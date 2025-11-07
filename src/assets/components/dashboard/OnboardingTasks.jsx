import React, { useState } from 'react';

export default function OnboardingTasks({ tasks }) {
  const [taskStates, setTaskStates] = useState(
    tasks.reduce((acc, task) => {
      acc[task.id] = task.completed;
      return acc;
    }, {})
  );

  const completed = Object.values(taskStates).filter(Boolean).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const handleTaskToggle = (taskId) => {
    setTaskStates(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm h-fit max-h-80" style={{ border: '1px solid #D9D9D9' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-light">Onboarding Tasks</h3>
        <span className="text-2xl font-bold text-purple-600">{progress}%</span>
      </div>
      <div className="space-y-1">
        {tasks.map((task) => {
          const isCompleted = taskStates[task.id];
          return (
            <div 
              key={task.id} 
              className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-0 cursor-pointer rounded-lg px-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg--50 border-purple-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleTaskToggle(task.id)}
            >
              <div>
                <p className={`text-base font-normal transition-all duration-300 ${
                  isCompleted 
                    ? 'text-gray-900' 
                    : 'text-gray-900'
                }`}>
                  {task.title}
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {task.date}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isCompleted 
                  ? 'bg-purple-600 border-purple-600 scale-110' 
                  : 'border-gray-300 hover:border-purple-400'
              }`}>
                {isCompleted && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}