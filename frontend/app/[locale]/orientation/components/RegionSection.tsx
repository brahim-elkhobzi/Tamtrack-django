// app/[locale]/orientation/components/RegionSection.tsx
"use client";

import { useState } from 'react';
import type { FC } from 'react';

const regions = [
  "Tanger-Tétouan...", "Oriental", "Fès-Meknès", "Rabat-Salé-Kénitra", "Casablanca-Settat",
  "Béni Mellal...", "Marrakech-Safi", "Drâa-Tafilalet", "Souss-Massa", "Guelmim-Oued Noun",
  "Laâyoune-Sakia...", "Dakhla-Oued Ed-Dahab"
];

const RegionMapCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
        <div className="h-64 md:h-80 bg-cover bg-center rounded-lg p-4 flex flex-col justify-end relative" style={{ backgroundImage: "url('/orientation-people.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg"></div>
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {regions.map((region) => (
                    <button key={region} className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold p-2 rounded-lg hover:bg-orange-500/80 transition-colors text-center">
                        {region.split('-')[0]}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const PopularJobsCard: FC = () => {
    const [selectedCity] = useState('Casablanca');
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Métiers populaires à {selectedCity}</h3>
            <div className="flex gap-6 mt-4 border-b dark:border-gray-700">
                <button className="text-orange-500 font-semibold border-b-2 border-orange-500 pb-2">Finance</button>
                <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 pb-2 transition">Business</button>
                <button className="text-gray-500 dark:text-gray-400 hover:text-orange-500 pb-2 transition">Tech</button>
            </div>
        </div>
    );
};

// Ce composant assemble les deux cartes de la colonne de gauche
const RegionSection: FC = () => {
    return (
        <div className="space-y-8">
            <RegionMapCard />
            <PopularJobsCard />
        </div>
    );
};
export default RegionSection;