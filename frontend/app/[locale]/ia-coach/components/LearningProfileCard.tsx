// app/[locale]/ia-coach/components/LearningProfileCard.tsx
import type { FC } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiBarChart2, FiBookOpen, FiZap } from 'react-icons/fi';

const LearningProfileCard: FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md h-full space-y-6">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Votre profil d'apprentissage</h2>
    
    <div>
      <h3 className="font-semibold mb-3 text-gray-600 dark:text-gray-300">Style dominant</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center"><span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">Visuel</span> <span className="font-bold">7</span></div>
        <div className="flex justify-between items-center"><span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Kinesthésique</span> <span className="font-bold">4</span></div>
        <div className="flex justify-between items-center"><span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold">Auditif</span> <span className="font-bold">3</span></div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <h3 className="font-semibold mb-3 text-gray-600 dark:text-gray-300">Points forts</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
          <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Logique mathématique</li>
          <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Résolution de problèmes</li>
          <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Mémorisation visuelle</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-3 text-gray-600 dark:text-gray-300">Axes d'amélioration</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-200">
          <li className="flex items-center gap-2"><FiAlertTriangle className="text-yellow-500" /> Expression écrite</li>
          <li className="flex items-center gap-2"><FiAlertTriangle className="text-yellow-500" /> Conjugaisons</li>
          <li className="flex items-center gap-2"><FiAlertTriangle className="text-yellow-500" /> Concentration prolongée</li>
        </ul>
      </div>
    </div>

    <div>
      <h3 className="font-semibold mb-3 text-gray-600 dark:text-gray-300">Insights IA</h3>
      <div className="space-y-2">
        <p className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">Votre pic de concentration est entre 9h et 11h</p>
        <p className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">Sessions d'étude optimales : 25 minutes</p>
        <p className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">Motivation maximale avec les défis gamifiés</p>
      </div>
    </div>
  </div>
);

export default LearningProfileCard;