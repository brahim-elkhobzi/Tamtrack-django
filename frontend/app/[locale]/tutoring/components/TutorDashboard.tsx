// app/[locale]/tutoring/components/TutorDashboard.tsx
import type { FC } from 'react';
import { FiPlay, FiStar, FiClipboard, FiTarget, FiAward } from 'react-icons/fi';
import { MathJax } from "better-react-mathjax";

// --- SOUS-COMPOSANTS DU DASHBOARD ---

const ProgressionCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center h-full">
        <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-200">Ta Progression</h3>
        <p className="text-4xl font-bold text-orange-500">Niveau 7</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Expert en Maths</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2,450 points</span>
            <span>Prochain niveau: 3,000</span>
        </div>
    </div>
);

const BadgesCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md h-full">
        <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-200">Badges Culturels</h3>
        <ul className="space-y-3">
            <li className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/60 rounded-lg text-gray-700 dark:text-gray-200 font-medium">
                <FiAward className="text-orange-400" /> Maître du Calcul
            </li>
            <li className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/60 rounded-lg text-gray-700 dark:text-gray-200 font-medium">
                <FiClipboard className="text-orange-400" /> Génie en Géométrie
            </li>
            <li className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/60 rounded-lg text-gray-700 dark:text-gray-200 font-medium">
                <FiStar className="text-orange-400" /> Expert d'Algèbre
            </li>
        </ul>
    </div>
);

const ExerciseCard: FC<{ title: string; difficulty: string; tagColor: string; points: number }> = 
    ({ title, difficulty, tagColor, points }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700 flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${tagColor}`}>{difficulty}</span>
            <span className="text-xs font-semibold text-gray-400">© {points}</span>
        </div>
        <div className="font-semibold text-gray-800 dark:text-gray-100 flex-grow"><MathJax>{title}</MathJax></div>
        <button className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 bg-gray-800 dark:bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-gray-900 dark:hover:bg-blue-700 transition">
            <FiPlay /> Commencer
        </button>
    </div>
);

// --- COMPOSANT D'ASSEMBLAGE PRINCIPAL ---
// Ce composant contient la grille pour la partie inférieure
const TutorDashboard: FC = () => (
    <div className="space-y-8">
        {/* Grille pour la progression et les badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProgressionCard />
            <BadgesCard />
        </div>
        
        {/* Section pour les exercices */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Exercices Adaptatifs du Jour</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">5 exercices personnalisés selon ton niveau</p>
            {/* Grille pour les 3 cartes d'exercices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <ExerciseCard title="Résoudre `$x^2 - 4x + 3 = 0$`" difficulty="Facile" tagColor="bg-green-500" points={10} />
                 <ExerciseCard title="Factoriser `$2x^2 + 7x + 3$`" difficulty="Moyen" tagColor="bg-yellow-500" points={10} />
                 <ExerciseCard title="Discriminant de `$3x^2 - 2x + 1$`" difficulty="Difficile" tagColor="bg-red-500" points={10} />
            </div>
        </div>
    </div>
);

export default TutorDashboard;