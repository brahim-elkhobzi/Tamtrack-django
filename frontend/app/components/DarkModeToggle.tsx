// app/components/DarkModeToggle.tsx
"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggle: FC = () => {
    // On initialise le thème à null, ce qui nous permet de savoir que nous n'avons pas encore vérifié le client.
    const [theme, setTheme] = useState< 'light' | 'dark' | null >(null);

    // Ce useEffect s'exécute UNE SEULE FOIS côté client, après le premier rendu.
    useEffect(() => {
        // C'est seulement ici qu'on lit le localStorage en toute sécurité.
        const savedTheme = localStorage.getItem('theme');
        // On vérifie que la valeur est valide avant de l'appliquer.
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setTheme(savedTheme);
        } else {
            setTheme('light'); // Valeur par défaut si rien n'est sauvegardé ou si la valeur est invalide.
        }
    }, []); // Le tableau de dépendances vide garantit une seule exécution côté client.

    // Ce useEffect met à jour l'HTML et le localStorage chaque fois que le thème change.
    useEffect(() => {
        if (theme) { // On s'assure que le thème a été initialisé
            const root = document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
    };

    // Rendu conditionnel pour éviter l'erreur d'hydratation
    // Si `theme` est `null`, cela signifie que nous sommes soit côté serveur,
    // soit lors du tout premier rendu client avant que le useEffect ait pu s'exécuter.
    // On rend un placeholder pour éviter un décalage de layout.
    if (theme === null) {
        return <div className="w-9 h-9" />; // Un carré vide de la même taille que le futur bouton.
    }

    // Une fois le thème déterminé côté client, on rend le vrai bouton.
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Changer le thème"
        >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
    );
};

export default DarkModeToggle;