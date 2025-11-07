export const dashboardData = {
  stats: {
    totalEmployees: 534,
    presentToday: { current: 95, total: 534 },
    absentToday: { current: 24, total: 100534 },
    activeTasks: { current: 15, total: 35 },
    pendingLeave: 15,
  },
  onboardingTasks: [
    { id: 1, title: 'Interview-Frontend Developer', date: 'Aug 10, 04:30', completed: true },
    { id: 2, title: 'Team meeting-Fun Friday', date: 'Aug 10, 04:30', completed: false },
    { id: 3, title: 'Meeting-Project Update', date: 'Aug 10, 04:30', completed: false },
  ],
  timeTracker: [
    { day: 'Mon', hours: 7 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 6 },
    { day: 'Thu', hours: 9 },
    { day: 'Fri', hours: 7 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 0 },
  ],
  attendance: [
    { day: 'Mon', present: 85, absent: 10, leave: 5 },
    { day: 'Tue', present: 88, absent: 8, leave: 4 },
    { day: 'Wed', present: 82, absent: 12, leave: 6 },
    { day: 'Thu', present: 86, absent: 9, leave: 5 },
    { day: 'Fri', present: 80, absent: 13, leave: 7 },
    { day: 'Sat', present: 75, absent: 15, leave: 10 },
    { day: 'Sun', present: 70, absent: 18, leave: 12 },
  ],
  recentActivity: [
    { id: 1, text: "Jane Doe's Leave request was approved", time: '2 hrs ago' },
    { id: 2, text: "John Smith completed onboarding", time: '3 hrs ago' },
    { id: 3, text: "New task assigned to Dev Team", time: '5 hrs ago' },
  ],
};