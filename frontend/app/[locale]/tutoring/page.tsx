// app/[locale]/tutoring/page.tsx
"use client";

import type { FC } from 'react';
import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';
import TutorChat from './components/TutorChat';
import TutorDashboard from './components/TutorDashboard';
import { MathJaxContext } from "better-react-mathjax";


import QuizSelection from './components/quiz'; 

const TutoringPage: FC = () => {
    // La configuration MathJax est nécessaire pour afficher le LaTeX
    const mathjaxConfig = {
        loader: { load: ["input/tex", "output/chtml"] },
        tex: { 
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        }
    };
    
    return (
        <MathJaxContext config={mathjaxConfig}>
            <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
                <Sidebar />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <DashboardHeader />
                    <div className="space-y-4 mt-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">TUTORING+</h1>
                        <p className="text-gray-500 dark:text-gray-400">Tuteur IA</p>
                    </div>

                    {/*
                    ========================================================================
                    LA CORRECTION PRINCIPALE EST ICI : 
                    On utilise un conteneur simple `space-y-8` pour empiler 
                    les composants verticalement, au lieu d'une grille complexe.
                    ========================================================================
                    */}
                    <div className="mt-8 space-y-8 max-w-5xl mx-auto">
                       <QuizSelection />
                       <TutorChat />
                       <TutorDashboard />
                    </div>
                </main>
            </div>
        </MathJaxContext>
    );
};

export default TutoringPage;