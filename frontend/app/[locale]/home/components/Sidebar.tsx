// app/[locale]/home/components/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link'; // 1. Importer le composant Link
import { usePathname } from 'next/navigation'; // 2. Importer le hook pour détecter la page actuelle

// 3. Transformer `navItems` en un tableau d'objets pour plus de clarté et de flexibilité
const navItems = [
    { id: 'accueil', label: "Accueil", href: "/fr/home" },
    { id: 'progression', label: "Ma progression", href: "/fr/progression" },
    { id: 'ia-coach', label: "Mon IA Coach", href: "/fr/ia-coach" },
    { id: 'tutoring', label: "Tutoring+", href: "/fr/tutoring" },
    { id: 'orientation', label: "Orientation+", href: "/fr/orientation" },
    { id: 'seminars', label: "Seminars+", href: "/fr/seminars" },
    { id: 'complexe', label: "Complexe+", href: "/fr/complexe" },
    { id: 'scholarships', label: "Scholarships+", href: "/fr/scholarships" },
    { id: 'insertion', label: "Insertion+", href: "/fr/insertion" },
    { id: 'microlearning', label: "Microlearning+", href: "/fr/microlearning" },
    { id: 'agenda', label: "Mon Agenda", href: "/fr/agenda" },
    { id: 'notifications', label: "Notifications", href: "/fr/notifications" },
    { id: 'parametres', label: "Paramètres", href: "/fr/parametres" },
    { id : "math", label: "math" , href:"/fr/quiz"}
];

// Il n'est plus nécessaire de passer la prop "activePage", on va la déduire de l'URL
const Sidebar = () => {
    // 4. Le hook `usePathname` nous donne l'URL actuelle. Ex: '/fr/home'
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#0a2540] text-white p-6 flex-shrink-0 min-h-screen">
            <div className="mb-12">
                <h1 className="text-3xl font-bold">TamTrack</h1>
                <p className="text-sm text-gray-300">One Journey, A Lifetime</p>
            </div>
            <nav>
                <ul>
                    {navItems.map((item) => {
                        // 5. On détermine si le lien est actif en comparant son `href` avec l'URL actuelle
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.id} className="mb-2">
                                {/* 6. Remplacer `<a>` par `<Link>` */}
                                <Link
                                    href={item.href}
                                    className={`block p-2 rounded-lg text-lg transition-colors duration-200 ${
                                        isActive
                                            ? "text-orange-400 font-bold bg-white/5" // Style actif plus visible
                                            : "text-gray-300 hover:bg-white/10" // Style par défaut et au survol
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;