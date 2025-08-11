// app/[locale]/tutoring/components/quiz.tsx
"use client"; // "use client" peut être utile si vous ajoutez des interactions

import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';

// --- Définition des données pour les cartes ---
type Module = {
  name: string;
  description: string;
  href: string;
  icon: string;
  color: string;
};

const modulesData: Module[] = [
  {
    name: 'Mathématiques',
    description: 'Explorez la logique, l\'algèbre et l\'analyse pour aiguiser votre esprit critique.',
    href: '/fr/quiz/math',
    icon: '/icons/math-icon.svg',
    color: 'blue',
  },
  {
    name: 'Physique-Chimie',
    description: 'Découvrez les lois de l\'univers, de l\'atome aux galaxies.',
    href: '/fr/quiz/physique',
    icon: '/icons/physics-icon.svg',
    color: 'purple',
  },
  {
    name: 'SVT',
    description: 'Plongez dans les sciences de la vie et de la Terre.',
    href: '/fr/quiz/svt',
    icon: '/icons/svt-icon.svg',
    color: 'green',
  },
    {
    name: 'Cours Personnalisé',
    description: 'Générez un cours sur mesure avec notre intelligence artificielle.',
    href: '/fr/generate-course',
    icon: '/icons/course-icon.svg', // Assurez-vous d'avoir cette icône
    color: 'orange',
  },
];

const QuizSelection: FC = () => {
  // Map de couleurs pour la compatibilité avec la purge de Tailwind en production
  const colorClassMap: { [key: string]: string } = {
      blue: 'hover:shadow-blue-500/30 text-blue-600',
      purple: 'hover:shadow-purple-500/30 text-purple-600',
      green: 'hover:shadow-green-500/30 text-green-600',
      orange: 'hover:shadow-orange-500/30 text-orange-600'
  }

  // Ce composant ne retourne que la section de sélection, sans le layout de la page
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md">
        {/* --- En-tête de la section --- */}
        <header className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0d2d57] dark:text-white mb-3">
              Choisissez Votre Terrain de Jeu
            </h2>
            <p className="text-md text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Chaque matière est une nouvelle aventure. Sélectionnez celle que vous souhaitez conquérir aujourd'hui.
            </p>
        </header>

        {/* --- Grille des Modules --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {modulesData.map((module, index) => (
                <Link
                  href={module.href}
                  key={module.name}
                  className={`
                    group block bg-slate-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center
                    border border-slate-200 dark:border-gray-700 shadow-lg shadow-slate-200/50 dark:shadow-black/20
                    transition-all duration-300 ease-out 
                    hover:-translate-y-2 hover:shadow-2xl
                    ${colorClassMap[module.color] || 'hover:shadow-gray-500/30 text-gray-800'}
                  `}
                >
                    {/* Icône */}
                    <div className="mb-5 flex justify-center">
                      <div className="bg-slate-200 dark:bg-gray-800 p-4 rounded-full transition-colors duration-300 group-hover:bg-current">
                          <Image 
                            src={module.icon} 
                            alt={`${module.name} icon`}
                            width={40}
                            height={40}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                      </div>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
                        {module.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                        {module.description}
                    </p>
                    
                    {/* CTA */}
                    <span className="inline-block font-semibold transition-colors duration-300 group-hover:text-white">
                        Commencer
                        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 ml-1.5">→</span>
                    </span>
                </Link>
            ))}
        </div>
    </section>
  );
}

export default QuizSelection;