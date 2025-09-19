'use client';

import { useState, useRef } from 'react';
import type { FC } from 'react';
import Script from 'next/script';
import { FiMic, FiX, FiUploadCloud } from 'react-icons/fi';
import api from '@/utils/axios'; // Votre client Axios configuré
import { MathJax, MathJaxContext } from 'better-react-mathjax';

import Sidebar from '@/app/[locale]/home/components/Sidebar';
import DashboardHeader from '@/app/[locale]/home/components/DashboardHeader';

// Configuration MathJax (vous l'aviez déjà, c'est parfait)
const mathJaxConfig = {
  // ... votre config ...
};

interface SolutionData {
  problem: string;
  solution: string;
}

// ---- COMPOSANT PRINCIPAL DE LA PAGE ----
const AISolverPage: FC = () => {
    const [problemText, setProblemText] = useState('');
    const [problemImage, setProblemImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProblemImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClear = () => {
        setProblemText('');
        setProblemImage(null);
        setImagePreview(null);
        setSolutionData(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!problemText.trim() && !problemImage) {
            alert("Veuillez entrer un problème ou télécharger une image.");
            return;
        }

        setIsLoading(true);
        setSolutionData(null);
        setError(null);

        const formData = new FormData();
        formData.append('problem_text', problemText);
        if (problemImage) {
            formData.append('problem_image', problemImage);
        }

        try {
            const response = await api.post<SolutionData>('/api/solve/solve/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSolutionData(response.data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || "Une erreur est survenue.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Le JSX réplique votre design avec Tailwind CSS et des composants React
    return (
        <div className="flex  min-h-screen">
            <Sidebar />
            
            <div className="container mx-auto p-5 relative z-10">
                <DashboardHeader />
                <header className="text-center mb-10 p-10 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-xl">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                        Tuteur Mathématique IA
                    </h1>
                    <p className="text-lg text-slate-300">
                        Résolvez vos problèmes mathématiques avec des solutions détaillées étape par étape.
                    </p>
                </header>

                <main>
                    {/* Section d'entrée */}
                    <section className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl shadow-lg p-8 mb-6">
                        <form onSubmit={handleSubmit}>
                            {/* Input texte */}
                            <div className="mb-6">
                                <label htmlFor="problem-text" className="block mb-2 font-semibold text-accent-color text-lg">Entrez votre problème :</label>
                                <div className="flex items-center gap-2">
                                    <textarea 
                                        id="problem-text" 
                                        value={problemText}
                                        onChange={(e) => setProblemText(e.target.value)}
                                        placeholder="Ex: Résoudre pour x: 2x + 3 = 7" 
                                        rows={5}
                                        className="w-full p-4 border-2 border-border-color rounded-lg bg-white/5 text-slate-200 backdrop-blur-md focus:border-accent-color focus:outline-none resize-vertical transition"
                                    />
                                    <button type="button" title="Parler" className="p-4 rounded-full bg-accent-color text-white shrink-0"><FiMic size={20} /></button>
                                    <button type="button" onClick={handleClear} title="Effacer" className="p-4 rounded-full bg-error-color text-white shrink-0"><FiX size={20} /></button>
                                </div>
                            </div>
                            
                            <div className="relative text-center my-8">
                                <span className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-border-color to-transparent"></span>
                                <span className="relative z-10 bg-[#121228] px-4 text-accent-color font-semibold">OU</span>
                            </div>

                            {/* Input image */}
                            <div>
                                <label htmlFor="problem-image" className="block mb-2 font-semibold text-accent-color text-lg">Téléchargez une image :</label>
                                <input type="file" id="problem-image" onChange={handleImageChange} ref={fileInputRef} accept="image/*" className="hidden"/>
                                <label htmlFor="problem-image" className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-accent-color rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition backdrop-blur-md">
                                    <FiUploadCloud size={30} className="mb-2 text-accent-color" />
                                    <span>{problemImage ? problemImage.name : "Cliquez pour choisir un fichier"}</span>
                                </label>
                                {imagePreview && (
                                     <div className="mt-4 p-2 border border-border-color rounded-lg bg-black/20 flex justify-center">
                                         <img src={imagePreview} alt="Aperçu du problème" className="max-h-40 rounded"/>
                                     </div>
                                )}
                            </div>

                            <button type="submit" disabled={isLoading} className="mt-8 w-full bg-gradient-to-r from-primary-color to-secondary-color text-white font-bold py-4 px-8 rounded-lg text-lg hover:opacity-90 disabled:bg-gray-600 transition">
                                {isLoading ? "Résolution en cours..." : "Résoudre le Problème"}
                            </button>
                        </form>
                    </section>
                    
                    {/* Section de la solution (s'affiche conditionnellement) */}
                    {isLoading && (
                        <div className="text-center p-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color mx-auto"></div>
                            <p className="mt-4">Résolution de votre problème...</p>
                        </div>
                    )}

                    {error && <div className="p-4 text-center bg-error-color/20 border border-error-color/30 rounded-lg">{error}</div>}

                    {solutionData && (
                        <section className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl shadow-lg p-8 animate-slideInUp">
                            <h2 className="text-3xl font-bold mb-4 border-b border-border-color pb-4">Solution Détaillée</h2>
                            <div className="mb-6 bg-black/20 p-4 rounded-lg">
                                <h3 className="font-semibold text-accent-color mb-2">Votre problème :</h3>
                                <MathJax hideUntilTypeset={"first"}><span>{solutionData.problem}</span></MathJax>
                            </div>
                            <div className="prose prose-invert max-w-none prose-p:text-slate-300">
                               <MathJax hideUntilTypeset={"first"}><span>{solutionData.solution}</span></MathJax>
                            </div>
                        </section>
                    )}
                </main>

                 <footer className="text-center mt-12 text-slate-500">
                    <p>© Tamtech for Education</p>
                </footer>
            </div>
        </div>
    );
};


// Il est nécessaire d'envelopper la page dans MathJaxContext et Suspense
const AISolverPageWithProvider = () => {
    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async strategy="afterInteractive" />
            <MathJaxContext config={mathJaxConfig}>
                <AISolverPage />
            </MathJaxContext>
        </>
    );
};

export default AISolverPageWithProvider;