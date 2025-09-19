// app/[locale]/ia-coach/page.tsx
import type { FC } from 'react';
import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';
import ChatInterface from './components/ChatInterface'; // Mettez les chemins corrects
import LearningProfileCard from './components/LearningProfileCard'; // Mettez les chemins corrects

const IACoachPage: FC = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto ml-72">
                <DashboardHeader />
                <div className="space-y-4 mt-8 pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-orange-500">Mon IA Coach</h1>
                    <p className="text-gray-500 dark:text-gray-400">Votre assistant personnel pour un apprentissage optimisé</p>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Colonne de gauche pour le chat, prend 2/3 de la largeur sur grand écran */}
                    <div className="lg:col-span-2 h-[75vh]">
                       <ChatInterface />
                    </div>
                    
                    {/* Colonne de droite pour le profil, prend 1/3 */}
                    <div className="lg:col-span-1">
                        <LearningProfileCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IACoachPage;