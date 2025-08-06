// app/[locale]/home/page.tsx
"use client";

import React from 'react';
import type { FC } from 'react';
import { FiCalendar, FiTrendingUp, FiAward, FiPlayCircle, FiEdit, FiLayers, FiBookOpen, FiZap, FiTarget } from 'react-icons/fi';
import Sidebar from './components/Sidebar'; // En supposant que Sidebar est mis à jour
import DashboardHeader from './components/DashboardHeader'; // Et que le Header est correct
import Link from 'next/link';

// --- Interfaces pour les données (bonne pratique avec TypeScript) ---
interface Exercise {
    subject: string;
    completed: string;
    progress: number; // 0 à 100
    color: string;
}

interface Event {
    title: string;
    time: string;
    type: 'exam' | 'seminar' | 'project';
}

interface Achievement {
    icon: React.ElementType;
    title: string;
    description: string;
}

// --- SOUS-COMPOSANTS POUR CHAQUE CARTE SPÉCIFIQUE ---

// Le "header" orange de bienvenue
const WelcomeBanner: FC = () => (
    <div className="bg-orange-500/90 dark:bg-orange-600/90 text-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 shadow-lg">
        <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Bonjour Salma !</h1>
            <p className="text-orange-100">Prêt pour une nouvelle journée d'apprentissage ?</p>
        </div>
        <div className="flex justify-between md:justify-around text-lg">
            <div className="flex items-center gap-2">
                <FiZap className="opacity-80"/>
                <span>7 jours consécutifs</span>
            </div>
            <div className="flex items-center gap-2">
                <FiAward className="opacity-80"/>
                <span>2450 points</span>
            </div>
        </div>
    </div>
);

// Carte de Progression Globale (à droite)
const GlobalProgressCard: FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md h-full">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Progression Globale</h2>
        <div className="text-center my-6">
            <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">78%</p>
            <p className="text-gray-500 dark:text-gray-400">Objectifs atteints</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
            <div className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full" style={{ width: '78%' }}></div>
        </div>
        <div className="flex justify-between text-center">
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Modules actifs</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">85</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Exercices réussis</p>
            </div>
        </div>
    </div>
);

// Carte des exercices du jour
const DailyExercisesCard: FC = () => {
    const exercises: Exercise[] = [
        { subject: 'Mathématiques', completed: '2/3 complétés', progress: 66, color: 'bg-blue-500' },
        { subject: 'Physique', completed: '1/2 complétés', progress: 50, color: 'bg-green-500' },
        { subject: 'Français', completed: '4/4 complétés', progress: 100, color: 'bg-purple-500' },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <FiEdit className="text-blue-600 dark:text-blue-400" size={24}/>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Exercices du Jour</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">3 nouveaux exercices adaptés à ton niveau !</p>
                </div>
            </div>
            <div className="space-y-4 my-6">
                {exercises.map(ex => (
                    <div key={ex.subject} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700 dark:text-gray-200">{ex.subject}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{ex.completed}</span>
                        </div>
                        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                            <div className={`${ex.color} h-2 rounded-full`} style={{ width: `${ex.progress}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full bg-gray-800 dark:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-blue-700 transition">
                <FiPlayCircle/>
                <span>Commencer les exercices</span>
            </button>
        </div>
    );
};

// Carte des prochains événements
const UpcomingEventsCard: FC = () => {
    const events: Event[] = [
        { title: 'Contrôle de Maths', time: 'Demain 10h', type: 'exam' },
        { title: 'Séminaire IA', time: 'Vendredi 14h', type: 'seminar' },
        { title: 'Projet Français', time: 'Lundi', type: 'project' },
    ];
    const tagStyles = {
        exam: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300',
        seminar: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300',
        project: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300',
    };
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <FiCalendar className="text-blue-600 dark:text-blue-400" size={24}/>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Prochains Événements</h2>
            </div>
            <div className="space-y-4 my-6">
                {events.map(event => (
                    <div key={event.title} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-200">{event.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${tagStyles[event.type]}`}>
                            {event.type}
                        </span>
                    </div>
                ))}
            </div>
            <button className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <FiCalendar />
                <span>Voir l'agenda complet</span>
            </button>
        </div>
    );
};

// Section "Réalisations Récentes"
const RecentAchievementsSection: FC = () => {
    const achievements: Achievement[] = [
        { icon: FiTarget, title: 'Maître du Calcul', description: 'Complété 50 exercices de maths' },
        { icon: FiTrendingUp, title: 'Streak de 7 jours', description: 'Apprentissage quotidien' },
        { icon: FiAward, title: 'Expert en Géométrie', description: 'Score parfait en géométrie' },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <FiAward className="text-blue-600 dark:text-blue-400" size={24}/>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Réalisations Récentes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {achievements.map(ach => (
                    <div key={ach.title} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center gap-4">
                        <ach.icon className="text-orange-500" size={24}/>
                        <div>
                            <p className="font-bold text-gray-800 dark:text-white">{ach.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{ach.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Section "Accès Rapide"
// app/[locale]/home/page.tsx



// --- ENSUITE, LE COMPOSANT QuickAccessSection MIS À JOUR ---

const QuickAccessSection: FC = () => {
    // 1. Transformer 'links' en un tableau d'objets.
    // Chaque objet a un 'label' pour le texte du bouton et un 'href' pour la destination.
    const quickLinks = [
        { label: 'TUTORING+', href: '/fr/quiz' },
        { label: 'ORIENTATION+', href: '/fr/orientation' },
        { label: 'SEMINARS+', href: '/fr/seminars' },
        { label: 'COMPLEXE+', href: '/fr/complexe' },
        { label: 'SCHOLARSHIPS+', href: '/fr/scholarships' }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <FiLayers className="text-blue-600 dark:text-blue-400" size={24} />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Accès Rapide</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Accède rapidement à tes modules favoris</p>
            <div className="flex flex-wrap gap-3">
                {/* 2. Mettre à jour la méthode .map() pour utiliser les nouvelles propriétés */}
                {quickLinks.map((link) => (
                    <Link 
                        key={link.label} 
                        href={link.href} 
                        className="bg-gray-800 dark:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-900 dark:hover:bg-blue-700 transition text-sm"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};


// ---- COMPOSANT PRINCIPAL DE LA PAGE ----
const HomePage: FC = () => {
  return (
    // On garde le layout principal flexible avec le fond adaptable au dark mode
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar activePage="Accueil" />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* On importe le header avec les contrôles */}
        <DashboardHeader />
        
        {/* La nouvelle grille du contenu */}
        <div className="space-y-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <WelcomeBanner />
                </div>
                <div className="lg:col-span-1 row-span-2">
                    <GlobalProgressCard />
                </div>
                <div className="lg:col-span-1">
                     <DailyExercisesCard />
                </div>
                 <div className="lg:col-span-1">
                     <UpcomingEventsCard />
                </div>
            </div>
            
            <RecentAchievementsSection />
            <QuickAccessSection />
        </div>
      </main>
    </div>
  );
};

export default HomePage;