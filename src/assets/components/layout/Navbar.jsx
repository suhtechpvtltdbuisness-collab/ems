import React from 'react';
import { Search, Bell, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import search_icon from '../../icons/search_icon.svg';
import notifications_icon from '../../icons/notifications_icon.svg';
import name_icon from '../../icons/name_icon.svg';
export default function Navbar({ collapsed }) {
  const { user } = useAuth();

  return (
    <div className={`${collapsed ? 'ml-20' : 'ml-64'} bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300 fixed top-0 right-0 left-0 z-40 rounded-2xl md:rounded-3xl`}>
      <div className="flex-shrink-0">
        <h1 className="text-2xl md:text-4xl flex items-center gap-2 font-semibold font-[Poppins] bg-gradient-to-r from-[#4332A5] to-[#B887E5] bg-clip-text text-transparent">
          Good Morning, {user.name.split(' ')[0]} <span className="text-xl md:text-2xl text-[#F9CC16] ">☀️️</span>
        </h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1 hidden sm:block">Here's an overview of your work</p>
      </div>

      <div className="flex items-center gap-6 md:gap-10">
        <div className="relative w-[280px] sm:w-[350px] md:w-[500px] h-[50px] md:h-[60px] bg-[#F9FAFB] border border-[#F2F2F2] rounded-[32px] flex items-center">
          <img src={search_icon} alt="icon" className='absolute left-6 md:left-9 w-4 h-4 md:w-5 md:h-5'/>
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-full pl-12 md:pl-16 pr-6 md:pr-8 py-0.5 bg-transparent rounded-[32px] focus:outline-none focus:border-purple-600 placeholder-gray-400 text-sm md:text-base"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative p-2 bg-gray-100 rounded-3xl">
            <img src={notifications_icon} alt="notification" className="w-6 h-7 md:w-8 md:h-9" />
            <span className="absolute top-1.5 md:top-2 right-2 md:right-2.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-gray-50 rounded-lg">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-full flex items-center justify-center">
              <img src={name_icon} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-base md:text-lg font-semibold">{user.name}</p>
              <p className="text-sm md:text-base text-gray-500">{user.role}</p>
            </div>
            <ChevronRight size={20} className="hidden lg:block" />
          </button>
        </div>
      </div>
    </div>
  );
}