// app/[locale]/home/components/WelcomeBanner.tsx

"use client"; // Doit être un composant client pour utiliser des hooks

import { FC, useEffect, useState } from 'react';
import { FiZap, FiAward } from 'react-icons/fi';
import api from '@/utils/axios'; // Importez votre instance axios
import { useAuth } from '@/app/context/AuthContext'; // On l'utilise pour savoir SI un utilisateur est connecté

const WelcomeBanner: FC = () => {
    // 1. `useAuth` est utilisé uniquement pour savoir si un utilisateur est authentifié (`user` n'est pas `null`)
    const { user } = useAuth();
    
    // 2. Un état local pour gérer le message d'accueil et les statistiques
    const [welcomeMessage, setWelcomeMessage] = useState('Bonjour !'); // Message par défaut
    const [userStats, setUserStats] = useState<{ streak: number; points: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 3. `useEffect` s'exécute quand le composant est monté ou quand l'état `user` change
    useEffect(() => {
        const fetchUserProfile = async () => {
            // 4. On ne fait l'appel que si un utilisateur est bien connecté.
            if (!user) {
                setWelcomeMessage('Bonjour !');
                setIsLoading(false);
                return;
            }

            try {
                // 5. Appel à un endpoint qui retourne les données du profil de l'utilisateur connecté
                //    J'utilise '/api/profiles/me/' comme convention, mais vous pouvez l'adapter.
                const response = await api.get('/api/user/profile/');

                const firstName = response.data.first_name;
                
                // 6. On met à jour l'état avec le prénom, avec des alternatives en cas de données manquantes
                if (firstName) {
                    setWelcomeMessage(`Bonjour ${firstName} !`);
                } else if (user.full_name) {
                    // Si `full_name` est dans le token, on l'utilise comme fallback
                    setWelcomeMessage(`Bonjour ${user.full_name.split(' ')[0]} !`);
                } else {
                    // En dernier recours, on utilise l'email
                    setWelcomeMessage(`Bonjour ${user.email.split('@')[0]} !`);
                }
                
                // Ici, vous pourriez aussi mettre à jour les statistiques depuis l'API
                // set_userStats({ streak: response.data.streak, points: response.data.points });

            } catch (error) {
                console.error('Échec de la récupération du profil pour le WelcomeBanner:', error);
                // Si l'appel échoue, on utilise le nom du token s'il existe
                if (user && user.full_name) {
                     setWelcomeMessage(`Bonjour ${user.full_name.split(' ')[0]} !`);
                } else {
                     setWelcomeMessage('Bonjour !');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [user]); // L'effet se déclenche dès que l'état d'authentification est connu.

    return (
        <div className="bg-orange-500/90 dark:bg-orange-600/90 text-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 shadow-lg">
            <div className="md:col-span-2">
                {/* 7. Le h1 affiche l'état local. En cas de chargement, il pourrait afficher un skeleton. */}
                {isLoading ? (
                     <div className="h-10 bg-white/20 rounded-md w-3/4 animate-pulse"></div>
                ) : (
                     <h1 className="text-3xl md:text-4xl font-bold mb-2">{welcomeMessage}</h1>
                )}
                <p className="text-orange-100">Prêt pour une nouvelle journée d'apprentissage ?</p>
            </div>
            
            <div className="flex justify-between md:justify-around text-lg">
                <div className="flex items-center gap-2">
                    <FiZap className="opacity-80"/>
                    {/* Les stats seront aussi mises à jour dynamiquement */}
                    <span>{userStats ? userStats.streak : '...'} jours consécutifs</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiAward className="opacity-80"/>
                    <span>{userStats ? userStats.points : '...'} points</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBanner;