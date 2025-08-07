// app/[locale]/orientation/components/ActionCards.tsx
import type { FC } from 'react';
import { FiPlay } from 'react-icons/fi';

const PersonalityTestCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Test de Personnalité</h3>
        <div className="text-center my-4">
            <p className="text-3xl font-bold text-orange-500">13/20</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Questions complétées</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" style={{ width: `${(13/20)*100}%` }}></div>
        </div>
        <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-blue-700 transition">
             <FiPlay/> Continuer le test
        </button>
    </div>
);

const DailyQuizCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
         <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Quiz du Jour</h3>
         <p className="font-semibold text-orange-500 mb-3">Quel type d'intelligence as-tu ?</p>
         <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Découvre tes forces cognitives en 5 minutes</p>
         <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-blue-700 transition">
             <FiPlay/> Commencer le quiz
        </button>
    </div>
);


const ActionCards: FC = () => (
    <div className="space-y-8">
        <PersonalityTestCard />
        <DailyQuizCard />
    </div>
);

export default ActionCards;