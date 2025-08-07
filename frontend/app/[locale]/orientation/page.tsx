// app/[locale]/orientation/page.tsx
"use client";

import type { FC } from 'react';
import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';

// Importer tous les sous-composants de la page
import GuidanceBanner from './components/GuidanceBanner';
import RegionExplorer from './components/RegionExplorer';
import RecommendedCareers from './components/RecommendedCareers';
import Testimonials from './components/Testimonials';
import ActionCards from './components/ActionCards';

const OrientationPage: FC = () => {
    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                <DashboardHeader />
                
                <div className="space-y-4 mt-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-orange-500">ORIENTATION+</h1>
                    <p className="text-gray-500 dark:text-gray-400">Guidance Pro</p>
                </div>

                {/* Disposition de la page avec une grille */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Colonne de gauche (2/3 de la largeur) */}
                    <div className="lg:col-span-2 space-y-8">
                        <GuidanceBanner />
                        <RegionExplorer />
                        <RecommendedCareers />
                        <Testimonials />
                    </div>
                    
                    {/* Colonne de droite (1/3 de la largeur) */}
                    <div className="lg:col-span-1 space-y-8">
                        <ActionCards />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default OrientationPage;