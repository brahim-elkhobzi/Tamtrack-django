import React from 'react';

const ModulesGrid = () => {
  const modules = [
    {
      title: "TUTORING+",
      description: "Votre tuteur IA personnel, disponible 24h/24",
      icon: "📚"
    },
    {
      title: "ORIENTATION+",
      description: "Découvrez votre voie avec l'IA prédictive",
      icon: "🎓"
    },
    {
      title: "INSERTION+",
      description: "Votre passerelle vers l'emploi de demain",
      icon: "💼"
    },
    {
      title: "COMPLEXE+",
      description: "Gestion d'établissement nouvelle génération",
      icon: "🏫"
    },
    {
      title: "ANALYTICS+",
      description: "Transformez vos données en décisions éclairées",
      icon: "📊"
    },
    {
      title: "PARENTS+",
      description: "Accompagnez votre enfant en temps réel",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "MOBILE+",
      description: "TAMTRACK dans votre poche",
      icon: "📱"
    },
    {
      title: "GAMIFICATION+",
      description: "Apprenez en jouant, progressez en vous amusant",
      icon: "🎮"
    },
    {
      title: "MULTILINGUE+",
      description: "Une plateforme, quatre langues, mille possibilités",
      icon: "🌐"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-orange-500">Modules TAMTRACK</h1>
      <p className="text-xl text-center mb-8">Découvrez notre écosystème complet d'outils éducatifs innovants</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{module.icon}</div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">{module.title}</h2>
            <p className="text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
          Découvrir tous les modules
        </button>
      </div>
    </div>
  );
};

export default ModulesGrid;
