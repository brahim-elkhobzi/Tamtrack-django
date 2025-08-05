// File: [locale]/home/components/DashboardHeader.js
import React from 'react';
import { FiSearch, FiBell, FiSun } from 'react-icons/fi';

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <div className="relative w-2/5">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Rechercher un module, une capsule, un événement..." className="w-full pl-12 pr-4 py-2 border rounded-full bg-white shadow-sm" />
      </div>
      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <button>Français ⌄</button>
        <button className="relative">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-[#f4f6f9]"></span>
        </button>
        <button className="flex items-center p-0.5 border-2 border-gray-400 rounded-full">
          <FiSun size={20} className="text-white bg-blue-500 rounded-full p-0.5" />
        </button>
        <button>Salma ⌄</button>
      </div>
    </header>
  );
};

export default DashboardHeader;