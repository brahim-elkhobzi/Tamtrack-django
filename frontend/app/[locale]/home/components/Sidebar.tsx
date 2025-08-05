import React from 'react';

const navItems = [
  "Accueil", "Ma progression", "Mon IA Coach", "Tutoring+", "Orientation+",
  "Seminars+", "Complexe+", "Scholarships+", "Insertion+", "Microlearning+",
  "Mon Agenda", "Notifications", "Paramètres"
];

// Accepte une prop "activePage"
const Sidebar = ({ activePage }) => {
  return (
    <aside className="w-64 bg-[#0a2540] text-white p-6 flex-shrink-0 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">TamTrack</h1>
        <p className="text-sm text-gray-300">One Journey, A Lifetime</p>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item} className="mb-2">
              <a href={item === 'Accueil' ? '/fr/home' : '/fr/progression'} /* Adaptez les liens */
                 className={`block p-2 rounded-lg text-lg transition-colors duration-200 ${
                  // Compare l'item avec la page active pour le style
                  item === activePage
                    ? "text-orange-400 font-bold"
                    : "text-gray-300 hover:bg-white/10"
                }`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;