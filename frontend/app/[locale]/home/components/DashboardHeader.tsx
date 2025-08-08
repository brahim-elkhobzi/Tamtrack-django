"use client";

import React from 'react';
import { FiSearch, FiBell } from 'react-icons/fi';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
// 1. IMPORTER LE NOUVEAU COMPOSANT
import DarkModeToggle from '@/app/components/DarkModeToggle';

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center mb-10">
      <div className="relative w-2/5">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input 
          type="text" 
          placeholder="Rechercher un module..." 
          className="w-full pl-12 pr-4 py-2 border rounded-full dark:border-gray-700 dark:text-gray-200 shadow-sm"
        />
      </div>
      <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 font-medium">
        <LanguageSwitcher />

        <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <FiBell size={22} />
          <span className="absolute -top-0 -right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
        
        {/* 2. UTILISER LE COMPOSANT ICI */}
        <DarkModeToggle />
        
        <button>Salma ⌄</button>
      </div>
    </header>
  );
};

export default DashboardHeader;