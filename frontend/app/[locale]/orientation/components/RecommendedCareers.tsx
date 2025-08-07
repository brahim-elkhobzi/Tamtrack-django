// app/[locale]/orientation/components/RecommendedCareers.tsx
import type { FC } from 'react';
import { FiTrendingUp, FiDollarSign, FiArrowRight } from 'react-icons/fi';

type Career = {
    title: string;
    salary: string;
    growth: string;
    compatibility: number;
};

const CareerItem: FC<{ career: Career }> = ({ career }) => (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/60 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        <div className="space-y-1">
            <h4 className="font-bold text-lg text-gray-800 dark:text-white">{career.title}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><FiDollarSign size={14} /> {career.salary}</span>
                <span className="flex items-center gap-1"><FiTrendingUp size={14} /> {career.growth}</span>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-xl text-orange-500">{career.compatibility}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Compatibilité</p>
        </div>
        <button className="p-2 ml-4 rounded-full bg-white dark:bg-gray-800 hover:bg-orange-100">
            <FiArrowRight className="text-orange-500"/>
        </button>
    </div>
);

const RecommendedCareers: FC = () => {
    const careers: Career[] = [
        { title: 'Développeur d\'applications', salary: '8,000-15,000 DH', growth: 'Forte croissance', compatibility: 92 },
        { title: 'Ingénieur Data', salary: '10,000-20,000 DH', growth: 'Très forte croissance', compatibility: 88 },
        { title: 'Designer UX/UI', salary: '7,000-12,000 DH', growth: 'Croissance', compatibility: 85 },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Carrières Recommandées pour Toi</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Basé sur tes tests de personnalité et aptitudes</p>
            <div className="space-y-4">
                {careers.map(career => <CareerItem key={career.title} career={career} />)}
            </div>
        </div>
    );
};

export default RecommendedCareers;