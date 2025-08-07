// app/[locale]/orientation/components/Testimonials.tsx
import type { FC } from 'react';
import { FiPlayCircle } from 'react-icons/fi';

type Testimonial = {
    name: string;
    role: string;
    company: string;
};

const TestimonialCard: FC<{ data: Testimonial }> = ({ data }) => (
    <div className="bg-gray-100 dark:bg-gray-700/60 p-4 rounded-xl text-center">
        <div className="relative aspect-video bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-4">
            <FiPlayCircle className="text-white/70" size={40} />
            <span className="absolute top-2 right-2 text-xs bg-black/40 text-white px-2 py-0.5 rounded-full">3 min</span>
        </div>
        <h4 className="font-bold text-gray-800 dark:text-white">{data.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{data.role}</p>
        <p className="text-xs text-gray-400">{data.company}</p>
    </div>
);


const Testimonials: FC = () => {
    const people: Testimonial[] = [
        { name: 'Youssef', role: 'Ingénieur Logiciel', company: 'Google' },
        { name: 'Aicha', role: 'Médecin', company: 'CHU Rabat' },
        { name: 'Omar', role: 'Entrepreneur', company: 'Startup Tech' },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Témoignages d'Anciens Élèves</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Découvre leurs parcours inspirants</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {people.map(p => <TestimonialCard key={p.name} data={p} />)}
            </div>
        </div>
    );
};

export default Testimonials;