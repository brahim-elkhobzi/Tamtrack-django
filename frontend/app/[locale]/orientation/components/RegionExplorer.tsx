// app/[locale]/orientation/components/RegionExplorer.tsx
import { useState } from 'react';
import type { FC } from 'react';

const RegionExplorer: FC = () => {
    const [selectedCity, setSelectedCity] = useState('Casablanca');

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            {/* L'image sera en arrière-plan */}
            <div className="h-64 md:h-80 bg-cover bg-center rounded-lg p-4 flex flex-col justify-between" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
                {/* Overlay pour la lisibilité */}
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                 {/* Contenu superposé */}
                 <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {/* Exemples de régions */}
                    <button className="bg-blue-600/80 backdrop-blur-sm text-white text-xs p-2 rounded-md">Tanger-Tétouan</button>
                    <button className="bg-orange-500/80 backdrop-blur-sm text-white text-xs p-2 rounded-md">Oriental</button>
                    {/* Ajoutez les autres régions ici */}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Métiers populaires à {selectedCity}</h3>
                <div className="flex gap-4 mt-2">
                    <button className="text-orange-500 font-semibold">Finance</button>
                    <button className="text-gray-500 dark:text-gray-400">Business</button>
                    <button className="text-gray-500 dark:text-gray-400">Tech</button>
                </div>
            </div>
        </div>
    );
};

export default RegionExplorer;