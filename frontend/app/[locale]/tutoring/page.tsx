// app/[locale]/tutoring/page.tsx
"use client";

import type { FC } from 'react';
import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';
import TutorChat from './components/TutorChat';
import TutorDashboard from './components/TutorDashboard';
import { MathJaxContext } from "better-react-mathjax";
import Image from 'next/image';

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
            <div className="flex  min-h-screen">
                <Sidebar />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <DashboardHeader />
                    <div className="space-y-1 mt-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">TUTORING+</h1>
                        <p className="text-gray-500 dark:text-gray-400">Tuteur IA</p>
                    </div>
<div className="absolute top-28 right-4 sm:right-6 lg:right-8">
  <a 
    href="/solve"
    className="inline-flex items-center p-4 bg-gray-100 rounded-full dark:bg-gray-800 shadow-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 group transition-all duration-300 transform hover:scale-110"
    title="Résoudre un problème"
  >
    <Image
  src='/tutoring/logoo.png' 
  alt="Icône pour résoudre un problème"
  width={32}  
  height={32} 
  className="animate-[gentle-rotate_1s_linear_infinite] group-hover:filter group-hover:brightness-125 transition-all" 
/>
    <span className="ml-2 text-gray-800 dark:text-white font-medium whitespace-nowrap">
      Résoudre un problème étape par étape
    </span>
  </a>
</div>
                    {/*
                   
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