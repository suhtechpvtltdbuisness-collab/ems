import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

import dashboard_icon from '../../icons/dashboard_icon.svg';
import employees_icon from '../../icons/employees_icon.svg';
import attendance_icon from '../../icons/attendance_icon.svg';
import leavemanagement_icon from "../../icons/leavemanagement_icon.svg";
import reports_icon from '../../icons/report_icon.svg';
import tasks_icon from '../../icons/tasks_icon.svg';
import my_profile_icon from '../../icons/myprofile_icon.svg';
import settings_icon from '../../icons/settings_icon.svg';
import support_icon from '../../icons/support_icon.svg';
import announcements_icon from '../../icons/Announcements_icon.svg';
import message_icon from '../../icons/message_icon.svg';

import logo from '../../../assets/images/mainhome_logo.svg';


const menuItems = [
  { icon: dashboard_icon, label: 'Dashboard', color: 'text-purple-600 bg-purple-50' },
  { icon: employees_icon, label: 'Employees' },
  { icon: attendance_icon, label: 'Attendance' },
  { icon: tasks_icon, label: 'Tasks' },
  { icon: leavemanagement_icon, label: 'Leave Management' },
  { icon: reports_icon, label: 'Reports' },
  { icon: announcements_icon, label: 'Announcements' },
  { icon: message_icon, label: 'Messages' },
  { icon: my_profile_icon, label: 'My Profile' },
  { icon: settings_icon, label: 'Settings' },
  { icon: support_icon, label: 'Support' },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white h-screen border-r border-gray-200 flex flex-col transition-all duration-300 fixed left-0 top-0 z-50`}>
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-32 h-8" />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-gray-100 rounded-lg">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveItem(item.label)}
            className={`w-full flex items-center gap-3 px-5 py-3 transition-colors ${
              activeItem === item.label
                ? 'text-purple-600 bg-purple-50 border-r-4 border-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <img src={item.icon} alt={`${item.label} icon`} className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-5 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}