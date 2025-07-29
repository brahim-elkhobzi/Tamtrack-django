// frontend/app/quiz/math/page.tsx

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/utils/axios';
import { useAuth } from '@/app/context/AuthContext';

export default function SelectMathTopicPage() {
  const { user } = useAuth();
  
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Étape 1: Le composant se charge, prêt à appeler l'API.");

    const fetchTopics = async () => {
      try {
        const response = await api.get('/quiz/topics/');
        
        // --- LE POINT DE CONTRÔLE LE PLUS IMPORTANT ---
        console.log("Étape 2: Réponse reçue de Django ! Voici les données:", response.data);
        
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
            console.warn("Avertissement : Les données reçues sont vides ou ne sont pas un tableau. Le backend a peut-être renvoyé une réponse inattendue.");
            setError("Aucun chapitre trouvé pour votre niveau.");
        } else {
            // Mise à jour de l'état
            setTopics(response.data);
            console.log("Étape 3: L'état 'topics' a été mis à jour.");
        }

      } catch (err: any) {
        console.error("ERREUR FATALE lors de l'appel API :", err);
        // Afficher l'erreur exacte, qu'elle vienne du réseau ou d'axios
        setError(`Échec du chargement des chapitres : ${err.message || 'Erreur inconnue'}`);
      } finally {
        setLoading(false);
        console.log("Étape 4: Le chargement est terminé (loading = false).");
      }
    };
    
    fetchTopics();

  }, []); // Se lance une seule fois

  console.log("Étape 5: Rendu du composant. État actuel de 'topics':", topics);
  console.log("État actuel de 'loading':", loading);

  // Le reste de votre JSX est bon.
  if (loading) { /* ... */ }
  if (error) { /* ... */ }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0d2d57]">Chapitres de Mathématiques</h1>
            <p className="mt-2 text-lg text-slate-500">
                Disponible pour le niveau : <span className="font-semibold text-orange-600">{user?.level}</span>
            </p>
        </header>

        <div className="space-y-4">
          {/* Si `topics` est vide, ce bloc ne créera rien, même s'il n'y a pas d'erreur. */}
          {topics.map((topic, index) => (
            <Link
              href={`/quiz/session/${encodeURIComponent(topic)}`}
              key={index}
              className="block p-6 bg-white rounded-lg shadow-md border border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-orange-500 hover:scale-105"
            >
              <span className="text-lg font-semibold text-slate-800">{topic}</span>
            </Link>
          ))}
        </div>

        {/* Message d'aide si rien ne s'affiche mais qu'il n'y a pas d'erreur */}
        {!loading && !error && topics.length === 0 && (
            <div className="text-center text-slate-500 bg-white p-6 rounded-lg">
                <p>Les données ont été chargées mais aucun chapitre n'est disponible pour le moment.</p>
            </div>
        )}
      </main>
    </div>
  );
}