// app/[locale]/orientation/page.tsx
"use client";

import type { FC } from 'react';
import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';

// Importer tous les sous-composants de la page
import GuidanceBanner from './components/GuidanceBanner';
import RegionSection from './components/RegionSection';
import ActionCards from './components/ActionCards';
import RecommendedCareers from './components/RecommendedCareers';
import Testimonials from './components/Testimonials';

const OrientationPage: FC = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar /> {/* S'assure que le bon lien "Orientation+" est actif */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto ml-72">
                <DashboardHeader />
                
                <div className="space-y-4 mt-8 pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-orange-500">ORIENTATION+</h1>
                    <p className="text-gray-500 dark:text-gray-400">Guidance Pro</p>
                </div>

                {/* Structure verticale principale de la page */}
                <div className="mt-8 space-y-8">

                    {/* Bloc 1: Bannière de progression */}
                    <GuidanceBanner />

                    {/* Bloc 2: Section principale avec grille imbriquée */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Colonne de gauche (plus large) pour la carte interactive */}
                        <div className="lg:col-span-2">
                            <RegionSection />
                        </div>
                        {/* Colonne de droite pour les tests et quiz */}
                        <div className="lg:col-span-1">
                            <ActionCards />
                        </div>
                    </div>
                    
                    {/* Bloc 3: Carrières recommandées */}
                    <RecommendedCareers />
                    
                    {/* Bloc 4: Témoignages */}
                    <Testimonials />
                    
                </div>
            </main>
        </div>
    );
};

export default OrientationPage;