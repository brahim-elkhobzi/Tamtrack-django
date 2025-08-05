// [locale]/progression/page.js
import React from 'react';
import Sidebar from '../home/components/Sidebar'; // On réutilise le Sidebar de home
import DashboardHeader from '../home/components/DashboardHeader'; // Et le header
import EvolutionChart from './components/EvolutionChart';

// Données pour les cartes (vous pouvez les rendre dynamiques plus tard)
const subjects = [
  { name: 'Mathématiques', score: 92, status: 'En progression', color: 'bg-green-500' },
  { name: 'Sciences', score: 78, status: 'Stable', color: 'bg-blue-500' },
  { name: 'Langues', score: 65, status: 'À améliorer', color: 'bg-yellow-500' },
  { name: 'Histoire-Géo', score: 88, status: 'Maîtrisé', color: 'bg-purple-500' },
];

const suggestions = [
    { title: "Renforcer les langues", description: "Consacrez 20 minutes par jour aux exercices de grammaire française", link: "Accéder aux ressources →" },
    { title: "Approfondir les sciences", description: "Les expériences virtuelles vous aideront à mieux comprendre la physique", link: "Lancer une expérience →" },
    { title: "Maintenir l'excellence en maths", description: "Continuez avec les défis avancés pour rester au top niveau", link: "Nouveau défi →" }
]

const ProgressionPage = () => {
  return (
    <div className="flex bg-[#f4f6f9] min-h-screen">
      {/* On passe "Ma progression" comme page active */}
      <Sidebar activePage="Ma progression" />

      <main className="flex-1 p-8">
        <DashboardHeader />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500">Ma progression</h1>
          <p className="text-gray-600 text-lg">Suivez votre évolution et identifiez vos axes d'amélioration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="lg:col-span-1 space-y-6">
            {/* Niveau général */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-bold text-[#0a2540] mb-4">Niveau général</h3>
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center" style={{background: 'conic-gradient(rgb(251, 146, 60) 85%, #e0e0e0 0)'}}>
                  <div className="absolute bg-white w-[85%] h-[85%] rounded-full"></div>
                  <span className="relative text-4xl font-bold text-orange-500">85%</span>
              </div>
              <p className="mt-4 font-semibold">Excellent</p>
            </div>
            
            {/* Cartes de matières */}
            {subjects.map(subject => (
                <div key={subject.name} className="bg-white p-4 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-[#0a2540]">{subject.name}</span>
                        <span className="font-semibold text-sm">{subject.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${subject.color} h-2 rounded-full`} style={{ width: `${subject.score}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{subject.status}</p>
                </div>
            ))}
          </div>

          {/* Colonne de droite */}
          <div className="lg:col-span-2 space-y-6">
            <EvolutionChart />
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#0a2540] mb-4">Comparaison régionale</h3>
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2"><span>Votre moyenne</span><span className="font-bold text-green-600">85%</span></div>
                    <div className="flex justify-between border-b pb-2"><span>Moyenne régionale</span><span className="font-bold">72%</span></div>
                    <div className="flex justify-between"><span>Classement</span><span className="font-bold text-orange-500">Top 15%</span></div>
                </div>
            </div>
          </div>

          {/* Section Suggestions en bas */}
          <div className="lg:col-span-3">
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-[#0a2540] mb-4">Suggestions IA d'amélioration</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {suggestions.map(sugg => (
                        <div key={sugg.title} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold">{sugg.title}</h4>
                            <p className="text-sm text-gray-600 my-2">{sugg.description}</p>
                            <a href="#" className="text-sm text-orange-500 font-semibold">{sugg.link}</a>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressionPage;