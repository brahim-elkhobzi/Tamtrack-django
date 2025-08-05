// File: [locale]/home/page.js
import React from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import InfoCard from './components/InfoCard';
import { FiAward, FiCalendar, FiCpu, FiTrendingUp, FiBookOpen, FiClipboard, FiMessageCircle, FiBarChart2 } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="flex bg-[#f4f6f9] min-h-screen">
      <Sidebar activePage="home" />

      <main className="flex-1 p-8">
        <DashboardHeader />

        {/* Message de bienvenue */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500">Bonjour Salma !</h1>
          <p className="text-gray-600 text-lg">Prête pour une nouvelle journée d'apprentissage ?</p>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne de contenu (2/3 de la largeur) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-43 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-[#0a2540]">Votre progression aujourd'hui</h2>
              <div className="flex items-center space-x-4 my-4">
                <span className="border px-4 py-1 rounded-full text-sm font-semibold text-gray-700">3ème année collège</span>
                <span className="text-orange-500 font-semibold text-sm">7 jours consécutifs</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">75% des objectifs quotidiens atteints</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#0a2540] h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2540] mb-4 ">Actions rapides</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition-colors"><span>Continuer le cours</span></button>
                <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition-colors"><span>Faire un quiz</span></button>
                <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition-colors"><span>Parler à l'IA</span></button>
                <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition-colors"><span>Voir ma progression</span></button>
              </div>
            </div>
          </div>

          {/* Colonne d'information (1/3 de la largeur) */}
          <div className="lg:col-span-1 space-y-6">
            <InfoCard icon={<FiAward size={24} className="text-orange-500" />} title="Badges récents" subtitle="Mathématiques Expert" time="Il y a 2h" />
            <InfoCard icon={<FiCalendar size={24} className="text-orange-500" />} title="Prochain événement" subtitle="Webinaire IA & Éducation" time="Demain 14h" />
            <InfoCard icon={<FiCpu size={24} className="text-orange-500" />} title="Recommandation IA" subtitle="Réviser les équations" time="Priorité haute" />
            <InfoCard icon={<FiTrendingUp size={24} className="text-orange-500" />} title="Micro-parcours" subtitle="Physique Quantique" time="15 min restantes" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;