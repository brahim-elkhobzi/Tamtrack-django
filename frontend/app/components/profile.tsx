// Since we are using useState for the tabs, this must be a Client Component.
"use client";

import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

// --- DATA STRUCTURES (BEST PRACTICE) ---

// 1. For the content of the tabs
type Profile = {
  id: string;
  name: string;
  title: string;
  features: string[];
};

const profilesData: Profile[] = [
  {
    id: 'student',
    name: 'Élève/Étudiant',
    title: "Révélez votre potentiel avec un parcours d'apprentissage 100% personnalisé",
    features: [
      'Tutorat IA adaptatif qui identifie vos forces et lacunes',
      'Orientation intelligente vers les filières d\'avenir',
      'Gamification motivante avec récompenses culturellement pertinentes',
      'Support multilingue pour un apprentissage inclusif',
    ],
  },
  {
    id: 'parent',
    name: 'Parent',
    title: 'Suivez et soutenez le parcours de votre enfant en toute sérénité',
    features: [
      'Tableaux de bord pour suivre les progrès en temps réel',
      'Notifications sur les forces et les points à améliorer',
      'Communication directe et simplifiée avec les enseignants',
      'Ressources pour accompagner votre enfant à la maison',
    ],
  },
  {
    id: 'teacher',
    name: 'Enseignant',
    title: "Optimisez votre enseignement et personnalisez l'apprentissage",
    features: [
        "Analytics pour identifier les difficultés de chaque élève",
        "Outils IA pour générer des exercices adaptés",
        "Suivi de classe centralisé",
        "Rapports de progrès automatisés"
    ]
  },
  {
    id: 'recruiter',
    name: 'Recruteur',
    title: "Identifiez les talents de demain basés sur les compétences",
    features: [
      "Accès à un vivier de talents qualifiés",
      "Profils de compétences détaillés et vérifiés",
      "Outils de recherche pour trouver le candidat idéal",
      "Réduction du temps et des coûts de recrutement"
    ]
  },
  {
    id: 'institution',
    name: 'Institution',
    title: "Améliorez les résultats et le prestige de votre établissement",
    features: [
        "Plateforme complète pour gérer l'écosystème éducatif",
        "Augmentation mesurable des performances académiques",
        "Meilleure insertion professionnelle de vos diplômés",
        "Analytics pour des décisions stratégiques éclairées"
    ]
  }
];

// 2. For the statistics bar
type Stat = {
  icon: string;
  value: string;
  line1: string;
  line2?: string;
};

const statsData: Stat[] = [
  { icon: '/icons/stat-users.svg', value: '50000+', line1: 'Utilisateurs actifs' },
  { icon: '/icons/stat-building.svg', value: '200', line1: 'Établissements', line2: 'partenaires' },
  { icon: '/icons/stat-star.svg', value: '95%', line1: 'de satisfaction' },
  { icon: '/icons/stat-globe.svg', value: '4', line1: 'Langues supportées' },
  { icon: '/icons/stat-graph.svg', value: '85%', line1: 'd\'amélioration', line2: 'des résultats' },
];


const UserProfiles: NextPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const activeProfile = profilesData.find(p => p.id === activeTab);

  return (
    <div className="font-sans">
      {/* Upper section with tabs and the card */}
      <section className="bg-[#fcfaf6] px-4 sm:px-6 lg:px-8">
        {/* --- WIDTH ADJUSTMENT --- */}
        {/* We wrap the content in a div with a maximum width and centered. */}
        <div className="max-w-7xl mx-auto py-12">
          {/* Titles */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">
              Profils Utilisateurs
            </h2>
            <p className="text-xl text-[#0d2d57] italic">
              Une solution adaptée à chaque acteur de l'écosystème éducatif
            </p>
          </div>

          {/* Interactive tabs */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {profilesData.map(profile => (
              <button
                key={profile.id}
                onClick={() => setActiveTab(profile.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  activeTab === profile.id
                    ? 'bg-orange-500 shadow-lg transform scale-105' // Active tab style
                    : 'bg-[#1e2a3a] hover:bg-opacity-80' // Inactive tab style
                }`}
              >
                {profile.name}
              </button>
            ))}
          </div>

          {/* Dynamic content card */}
          {activeProfile && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center text-[#0d2d57] mb-8">
                {activeProfile.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {activeProfile.features.map(feature => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-1">
                      <Image src="/icons/check-green.svg" alt="Checkmark" width={20} height={20} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lower section with statistics */}
      <section className="bg-[#0d2d57] text-white py-12 px-4 sm:px-6 lg:px-8">
        {/* --- WIDTH ADJUSTMENT --- */}
        {/* Same technique here for the stats bar. */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 text-center">
          {statsData.map(stat => (
            <div key={stat.line1} className="flex flex-col items-center">
              <div className="mb-2">
                 <Image src={stat.icon} alt={stat.line1} width={40} height={40} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-300">
                {stat.line1}
                {stat.line2 && <br />} {stat.line2}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserProfiles;