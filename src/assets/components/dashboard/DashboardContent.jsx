import React, { useState } from 'react';
import StatsCard from './StatsCard';
import OnboardingTasks from './OnboardingTasks';
import TimeTrackerChart from './TimeTrackerChart';
import AttendanceChart from './AttendanceChart';
import RecentActivity from './RecentActivity';
import Mytools from "./Mytools";
import { dashboardData } from '../../../data/mockData';
import { transformAttendanceData, validateAttendanceData } from '../../../utils/attendanceUtils';
import totalemployee_icon from '../../../assets/icons/totalemployee_icon.svg';
import presentToday_icon from '../../../assets/icons/presentToday_icon.svg';
import absentToday_icon from '../../../assets/icons/absentToday_icon.svg';
import activeTask_icon from '../../../assets/icons/activeTask_icon.svg';
import pendingLeave_icon from '../../../assets/icons/pendingLeave_icon.svg';


export default function DashboardContent() {
  const { stats, onboardingTasks, timeTracker, attendance, recentActivity, tools } = dashboardData;
  const [selectedCard, setSelectedCard] = useState('presentToday');

  // Process and validate attendance data
  const processedAttendance = transformAttendanceData(attendance);
  const validationResult = validateAttendanceData(processedAttendance);
  
  // For demonstration: simulate loading and error states
  const [isAttendanceLoading] = useState(false);
  const [attendanceError] = useState(null);
  
  // Log validation warnings in development
  if (process.env.NODE_ENV === 'development' && validationResult.warnings.length > 0) {
    console.warn('Attendance data warnings:', validationResult.warnings);
  }

  const statsCards = [
    { id: 'totalEmployees', icon: totalemployee_icon, title: 'Total Employees', value: '534', subtitle: '10% decrease from last month' },
    { id: 'presentToday', icon: presentToday_icon, title: 'Present Today', value: `${stats.presentToday.current}/${stats.presentToday.total}`, subtitle: '10% decrease from last month' },
    { id: 'absentToday', icon: absentToday_icon, title: 'Absent Today', value: `${stats.absentToday.current}/${stats.absentToday.total}`, subtitle: '10% decrease from last month' },
    { id: 'activeTasks', icon: activeTask_icon, title: 'Active Tasks', value: `${stats.activeTasks.current}/${stats.activeTasks.total}` },
    { id: 'pendingLeave', icon: pendingLeave_icon, title: 'Pending leave requests', value: stats.pendingLeave }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {statsCards.map((card) => (
          <StatsCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            highlighted={selectedCard === card.id}
            onClick={() => setSelectedCard(card.id)}
            gradient="linear-gradient(132.57deg, #7D1EDB 17.8%, #FFFDFD 107.19%)"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <OnboardingTasks tasks={onboardingTasks} />
        <TimeTrackerChart data={timeTracker} />
        <AttendanceChart 
          data={processedAttendance}
          isLoading={isAttendanceLoading}
          error={attendanceError}
          title="Weekly Attendance Overview"
          maxHeight={120}
          showLegend={true}
        />
      </div>

{/* Bottom Section: Recent Activity (left) + MyTools (right, compact) */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 ">
  {/* Recent Activity: Takes ~70% width (8/12 columns) */}
  <div className="lg:col-span-6">
    <RecentActivity activities={recentActivity} />
  </div>

  {/* MyTools: Takes ~30% width (4/12 columns), compact */}
  <div className="lg:col-span-3">
    <div className="h-full">
      <Mytools tools={tools} />
    </div>
  </div>
</div>
    </>
  );
}