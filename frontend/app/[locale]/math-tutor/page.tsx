// File: app/math-tutor/page.js
"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';

const MathTutorPage = () => {
    // États pour gérer les entrées et les données
    const [problemText, setProblemText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    
    // États pour gérer la sortie et l'UI
    const [solution, setSolution] = useState(null);
    const [displayedProblem, setDisplayedProblem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- DÉBUT DE LA CORRECTION POUR MATHJAX ---
    useEffect(() => {
        // Cette fonction sera appelée chaque fois que 'solution' ou 'displayedProblem' changera.
        if ((solution || displayedProblem) && typeof window.MathJax !== 'undefined') {
            // On utilise un petit délai (setTimeout) pour garantir que le DOM de React
            // a bien été mis à jour AVANT que MathJax n'essaie de le scanner.
            // C'est la correction la plus importante.
            const timer = setTimeout(() => {
                try {
                    window.MathJax.typesetPromise();
                } catch (e) {
                    console.error("Erreur de rendu MathJax:", e);
                }
            }, 100); // 100ms est généralement suffisant.

            // Nettoyage du timer si le composant est démonté
            return () => clearTimeout(timer);
        }
    }, [solution, displayedProblem]); // Dépendances : on exécute cet effet quand ces états changent.
    // --- FIN DE LA CORRECTION POUR MATHJAX ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!problemText.trim() && !imageFile) {
            alert("Veuillez entrer un problème ou télécharger une image.");
            return;
        }
        setIsLoading(true);
        setError('');
        setSolution(null);
        setDisplayedProblem(''); // Vider l'ancien problème

        const formData = new FormData();
        formData.append('problem_text', problemText);
        if (imageFile) {
            formData.append('problem_image', imageFile);
        }
        try {
            const apiResponse = await fetch('http://127.0.0.1:8000/api/solve/', {
                method: 'POST',
                body: formData,
            });
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
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };
    
    const renderProcessedContent = (text) => {
        if (!text) return null;
        let processed = text
            .replace(/\$\$([\s\S]+?)\$\$/g, '<div class="math-display my-4 text-lg p-4 bg-gray-900/50 border-l-4 border-cyan-400 overflow-x-auto">\\[$1\\]</div>')
            .replace(/\$([^\$]+?)\$/g, '\\($1\\)')
            .replace(/\*\*([^\*]+)\*\*/g, '<strong class="font-bold text-cyan-300">$1</strong>')
            .replace(/\*([^\*]+)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />');
        return { __html: processed };
    };

    return (
        <>
            <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
            
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
                {/* ... (le reste de votre JSX reste identique) ... */}
                <header className="text-center mb-10 p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        Tuteur IA en Mathématiques
                    </h1>
                    <p className="text-lg text-gray-300">Résolvez des problèmes mathématiques avec des solutions détaillées.</p>
                </header>

                <main>
                    <section className="p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:border-cyan-400/50 transition-all duration-300">
                        <form onSubmit={handleSubmit}>
                            {/* ... (votre formulaire reste identique) ... */}
                             <div className="mb-6">
                                <label htmlFor="problem-text" className="block mb-2 font-semibold text-cyan-400">Entrez votre problème :</label>
                                <textarea 
                                    id="problem-text" 
                                    value={problemText}
                                    onChange={(e) => setProblemText(e.target.value)}
                                    placeholder="Ex: Résoudre pour x: 2x + 5 = 11" 
                                    rows="5"
                                    className="w-full p-3 bg-gray-900/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                                />
                            </div>

                            <div className="relative text-center my-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600"></div></div>
                                <div className="relative flex justify-center"><span className="px-4 bg-[#0f0f23] text-gray-400">OU</span></div>
                            </div>
                            
                            <div>
                                <label htmlFor="problem-image" className="block mb-2 font-semibold text-cyan-400">Téléchargez une image :</label>
                                <input type="file" id="problem-image" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-300 hover:file:bg-cyan-500/20 cursor-pointer"/>
                                {imagePreview && (
                                    <div className="mt-4 p-2 border border-dashed border-gray-600 rounded-lg inline-block">
                                        <img src={imagePreview} alt="Aperçu du problème" className="max-h-48 rounded-md" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8 text-center">
                                <button type="submit" disabled={isLoading} className="px-10 py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform">
                                    {isLoading ? 'Résolution...' : 'Résoudre le problème'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {isLoading && (
                        <div className="text-center mt-10">
                            <div className="inline-block w-8 h-8 border-4 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div>
                            <p className="mt-2 text-gray-400">L'IA réfléchit...</p>
                        </div>
                    )}
                    {error && <div className="mt-10 p-4 text-center text-red-400 bg-red-500/10 border border-red-400/30 rounded-lg">{error}</div>}
                    
                    {/* Cette section est maintenant correctement gérée par le useEffect */}
                    {solution && (
                        <section className="mt-10 p-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl animate-fadeIn">
                            <h2 className="text-3xl font-bold mb-6 pb-4 border-b border-gray-700 text-purple-300">Solution Détaillée</h2>
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg text-cyan-300 mb-2">Problème :</h3>
                                <div className="p-4 bg-gray-900/50 rounded-md" dangerouslySetInnerHTML={renderProcessedContent(displayedProblem)} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-cyan-300 mb-2">Étapes de résolution :</h3>
                                <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={renderProcessedContent(solution)} />
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </>
    );
};

export default MathTutorPage;