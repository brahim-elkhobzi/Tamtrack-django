// import { useState } from 'react';

// const CustomDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('fr');

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const selectLanguage = (language : string) => {
//     setSelectedLanguage(language);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <button
//           type="button"
//           className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
//           onClick={toggleDropdown}
//         >
//           {selectedLanguage === 'fr' ? (
//             <div className="flex items-center">
//               <img
//                 src="/flags/france.png" 
//                 alt="French Flag"
//                 className="w-5 h-3 mr-2"
//               />
//               Français
//             </div>
//           ) : (
//             <div className="flex items-center">
//               <img
//                 src="/flags/united_kingdom.png"
//                 alt="English Flag"
//                 className="w-5 h-3 mr-2"
//               />
//               English
//             </div>
//           )}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1" role="menu" aria-orientation="vertical">
//             <button
//               onClick={() => selectLanguage('fr')}
//               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//             >
//               <img
//                 src="/flags/france.png" 
//                 className="w-5 h-3 mr-2"
//               />
//               Français
//             </button>
//             <button
//               onClick={() => selectLanguage('en')}
//               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//             >
//               <img
//                 src="/flags/united_kingdom.png"
//                 className="w-5 h-3 mr-2"
//               />
//               English
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get the current locale from the pathname
  const currentLocale = pathname.split('/')[1];
  const isLocale = ['en', 'fr', 'ar'].includes(currentLocale);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      flag: '/flags/united_kingdom.png'
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flag: '/flags/france.png'
    },
    { 
      code: 'ar', 
      name: 'العربية', 
      flag: '/flags/morocco.png'
    }
  ];

  // Find the current language object
  const getCurrentLanguage = () => {
    if (isLocale) {
      return languages.find(lang => lang.code === currentLocale) || languages[0];
    }
    return languages[0]; // Default to English
  };

  const currentLang = getCurrentLanguage();

  // Handle language change using the logic from your document
  const changeLanguage = (locale) => {
    let newPathname = pathname;

    // If the current path includes a locale, replace it with the selected one
    if (isLocale) {
      newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    } else {
      // If no locale is present, prepend the new locale
      newPathname = `/${locale}${pathname}`;
    }

    // Navigate to the new URL, preserving query parameters
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${newPathname}?${queryString}` : newPathname;
    
    router.push(fullPath);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 text-gray-600 py-1 px-2 rounded-md hover:bg-white/10 transition-colors"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <div className="w-5 h-5 relative overflow-hidden rounded-full">
          <Image
            src={currentLang.flag}
            alt={currentLang.name}
            width={20}
            height={20}
            className="object-cover"
          />
        </div>
        <span className="hidden sm:inline">{currentLang.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm ${
                  currentLang.code === lang.code 
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                role="menuitem"
              >
                <div className="w-5 h-5 relative overflow-hidden rounded-full">
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;