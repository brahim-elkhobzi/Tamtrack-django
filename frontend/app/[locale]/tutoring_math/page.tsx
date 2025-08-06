// File: app/math-tutor/page.js
"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

// Composant pour l'icône (vous pouvez utiliser react-icons si vous préférez)
const Icon = ({ path }) => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>;

const MathTutorPage = () => {
    // États
    const [problemText, setProblemText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [solution, setSolution] = useState(null);
    const [displayedProblem, setDisplayedProblem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [similarProblems, setSimilarProblems] = useState([]);
    const [isFindingSimilar, setIsFindingSimilar] = useState(false);
    const [similarError, setSimilarError] = useState('');
    
    // Effet pour MathJax (ne change pas)
    useEffect(() => {
        if (solution || similarProblems.length > 0) {
            if (typeof window.MathJax !== 'undefined') {
                const timer = setTimeout(() => {
                    try { window.MathJax.typesetPromise(); } catch (e) { console.error("MathJax Error:", e); }
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [solution, similarProblems]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!problemText.trim() && !imageFile) { alert("Veuillez entrer un problème."); return; }
        setIsLoading(true);
        setError('');
        setSolution(null);
        setDisplayedProblem('');
        setSimilarProblems([]);
        setSimilarError('');

        const formData = new FormData();
        formData.append('problem_text', problemText);
        if (imageFile) formData.append('problem_image', imageFile);

        try {
            const apiResponse = await fetch('http://127.0.0.1:8000/api/solve/', { method: 'POST', body: formData });
            if (!apiResponse.ok) {
                const errData = await apiResponse.json();
                throw new Error(errData.error || `Erreur HTTP: ${apiResponse.status}`);
            }
            const data = await apiResponse.json();
            setDisplayedProblem(data.problem);
            setSolution(data.solution);
        } catch (err) {
            setError(err.message || "Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFindSimilar = async () => {
        if (!displayedProblem) return;
        setIsFindingSimilar(true);
        setSimilarError('');
        setSimilarProblems([]);

        try {
            const apiResponse = await fetch('http://127.0.0.1:8000/api/solve/similar/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problem_text: displayedProblem }),
            });
            if (!apiResponse.ok) {
                const errData = await apiResponse.json();
                throw new Error(errData.error || `Erreur HTTP: ${apiResponse.status}`);
            }
            const data = await apiResponse.json();
            setSimilarProblems(data.similar_problems || []);
        } catch (err) {
            setSimilarError(err.message || "Erreur lors de la génération.");
        } finally {
            setIsFindingSimilar(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const renderProcessedContent = (text) => {
        if (!text) return null;
        let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, '<div class="math-display my-4 text-lg p-4 bg-gray-900/50 border-l-4 border-cyan-400 overflow-x-auto">\\[$1\\]</div>').replace(/(?<!\\)\$([^$]+?)\$/g, '\\($1\\)').replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-cyan-300">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br />');
        return { __html: processed };
    };

    return (
        <>
            <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
            
            <nav className="w-full bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-20 flex justify-center items-center gap-8 py-4">
                <Link href="/home" className="text-white/80 hover:text-white font-semibold transition">Accueil</Link>
                <Link href="/select-level" className="text-white/80 hover:text-white font-semibold transition">Niveau</Link>
                <Link href="/profile" className="text-white/80 hover:text-white font-semibold transition">Profil</Link>
                <Link href="/logout" className="text-red-400/80 hover:text-red-400 font-semibold transition">Déconnexion</Link>
            </nav>

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
                <header className="text-center mb-12 p-10 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                        Tuteur IA en Mathématiques
                    </h1>
                    <p className="text-lg text-gray-300">Solutions détaillées pour problèmes complexes.</p>
                </header>
                
                <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <aside className="md:col-span-1">
                        <div className="p-6 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl h-full">
                            <h2 className="text-xl font-bold mb-4 text-purple-300">Historique</h2>
                            <div className="text-gray-400 text-sm">L'historique des conversations sera affiché ici.</div>
                        </div>
                    </aside>
                    
                    <div className="md:col-span-2 space-y-8">
                        <section className="p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:border-cyan-400/50 transition-colors duration-300">
                            <form onSubmit={handleSubmit}>
                                {/* Formulaire complet ici */}
                                <div className="mb-6">
                                    <label htmlFor="problem-text" className="block mb-2 font-semibold text-cyan-400">Entrez votre problème</label>
                                    <textarea id="problem-text" value={problemText} onChange={(e) => setProblemText(e.target.value)} placeholder="Ex: Intégrale de x^2 dx de 0 à 1" rows="4" className="w-full p-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition resize-none"/>
                                </div>
                                <div className="relative text-center my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div><div className="relative flex justify-center"><span className="px-4 bg-[#14142c] text-gray-400">OU</span></div></div>
                                <div>
                                    <label htmlFor="problem-image" className="block mb-2 font-semibold text-cyan-400">Téléchargez une image</label>
                                    <input type="file" id="problem-image" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-300 hover:file:bg-cyan-500/20 cursor-pointer"/>
                                    {imagePreview && <div className="mt-4 p-2 border border-dashed border-gray-600 rounded-lg inline-block"><img src={imagePreview} alt="Aperçu" className="max-h-40 rounded-md" /></div>}
                                </div>
                                <div className="mt-8 text-center">
                                    <button type="submit" disabled={isLoading} className="px-10 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform">
                                        {isLoading ? 'Résolution...' : 'Résoudre le Problème'}
                                    </button>
                                </div>
                            </form>
                        </section>
                        
                        {isLoading && <div className="text-center"><div className="inline-block w-8 h-8 border-4 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div></div>}
                        {error && <div className="p-4 text-center text-red-400 bg-red-500/10 border border-red-400/30 rounded-lg">{error}</div>}

                        {solution && (
                            <section className="p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl animate-fadeIn">
                                <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700 text-purple-300">Solution Détaillée</h2>
                                <div className="mb-6"><h3 className="font-semibold text-lg text-cyan-300 mb-2">Problème :</h3><div className="p-4 bg-gray-900/50 rounded-md" dangerouslySetInnerHTML={renderProcessedContent(displayedProblem)} /></div>
                                <div><h3 className="font-semibold text-lg text-cyan-300 mb-2">Étapes de résolution :</h3><div className="prose prose-sm md:prose-base prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={renderProcessedContent(solution)} /></div>
                                
                                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                                    <button onClick={handleFindSimilar} disabled={isFindingSimilar} className="px-8 py-2 font-semibold text-cyan-200 bg-cyan-500/10 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/20 disabled:opacity-50 transition">
                                        {isFindingSimilar ? 'Génération...' : 'Trouver des problèmes similaires'}
                                    </button>
                                </div>
                                
                                {isFindingSimilar && <div className="text-center mt-6"><div className="inline-block w-6 h-6 border-2 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div></div>}
                                {similarError && <div className="mt-6 p-3 text-center text-red-400 bg-red-500/10 border border-red-400/30 rounded-lg text-sm">{similarError}</div>}
                                {similarProblems.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-xl font-bold text-purple-300 mb-4">Problèmes similaires :</h3>
                                        <ul className="space-y-4">
                                            {similarProblems.map((prob, index) => <li key={index} className="p-4 bg-gray-900/40 rounded-md border border-gray-700 text-gray-300" dangerouslySetInnerHTML={renderProcessedContent(prob.replace(/^\d+\.\s*/, ''))} />)}
                                        </ul>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default MathTutorPage;