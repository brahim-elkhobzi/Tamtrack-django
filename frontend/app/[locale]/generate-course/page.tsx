// // app/[locale]/generate-course/page.tsx
// "use client";

// import { useState, useEffect, Suspense } from 'react';
// import type { FC } from 'react';
// import Script from 'next/script';
// import { useSearchParams } from 'next/navigation';
// import styles from './CourseStyles.module.css';

// // ---- INTERFACES & TYPES ----
// interface CourseData {
//     level: string;
//     starting_point: string;
//     content: string;
// }

// type ParsedSection = {
//     type: 'h2' | 'p' | string;
//     content: string;
// };

// // ---- SOUS-COMPOSANTS ----

// const LoadingSpinner: FC<{ topic: string }> = ({ topic }) => (
//     <div className={styles.loadingContainer}>
//         <div className={styles.mathLoading}>
//             <div className={styles.loadingCircle}></div>
//             <div className={styles.loadingCircle}></div>
//             <div className={styles.loadingCircle}></div>
//             <div className={styles.loadingSymbol}>∑</div>
//         </div>
//         <p className={styles.loadingText}>Génération de votre cours sur "{topic}"...</p>
//     </div>
// );

// const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
//     <div className="text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
//         <p className="font-bold mb-2">Une erreur est survenue</p>
//         <p className="text-sm">{message}</p>
//     </div>
// );

// const CourseDisplay: FC<{ data: CourseData }> = ({ data }) => {
//     const parseContent = (content: string): ParsedSection[] => {
//         if (!content) return [];
//         const sections: ParsedSection[] = [];
//         const lines = content.split('\n');
//         const patterns: { [key: string]: string } = {
//             'Définition': styles.definition, 'Definition': styles.definition,
//             'Théorème': styles.theorem, 'Theorem': styles.theorem,
//             'Preuve': styles.proof, 'Proof': styles.proof,
//             'Exemple': styles.example, 'Example': styles.example,
//             'Remarque': styles.remark, 'Remark': styles.remark,
//         };
//         for (const line of lines) {
//             let matchFound = false;
//             if (line.match(/^\s*\*\*(.+?)\*\*\s*$/)) {
//                 sections.push({ type: 'h2', content: line.replace(/\*\*/g, '').trim() });
//                 continue;
//             }
//             for (const key in patterns) {
//                 const regex = new RegExp(`^\\s*\\*\\*${key}\\*\\*:?\\s*(.*)`, 'i');
//                 const match = line.match(regex);
//                 if (match) {
//                     sections.push({ type: patterns[key], content: match[1].trim() });
//                     matchFound = true;
//                     break;
//                 }
//             }
//             if (matchFound) continue;
//             if (line.trim()) sections.push({ type: 'p', content: line.trim() });
//         }
//         return sections;
//     };
    
//     const parsedSections = parseContent(data.content);

//     return (
//         <div>
//             <header className={styles.courseHeader}>
//                 <h2 className={styles.courseTitle}>{data.starting_point}</h2>
//                 <div className={styles.courseLevel}>{data.level}</div>
//             </header>
//             <div className={`${styles.courseContentBody} space-y-4`}>
//                 {parsedSections.map((section, index) => {
//                     const sectionContentHtml = { __html: section.content.replace(/\n/g, '<br />') };
//                     if (section.type === 'h2') return <h2 key={index}>{section.content}</h2>;
//                     if (section.type === 'p') return <p key={index} dangerouslySetInnerHTML={sectionContentHtml} />;
//                     return (
//                         <div key={index} className={`${styles.mathEnv} ${section.type}`}>
//                             <span className={styles.mathEnvTitle}>{Object.keys(styles).find(key => styles[key] === section.type)?.replace('math-', '')}</span>
//                             <div className={styles.mathEnvContent} dangerouslySetInnerHTML={sectionContentHtml} />
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// // --- COMPOSANT LOGIQUE PRINCIPAL ---
// // Ce composant contient la logique mais n'affiche rien directement.
// // Il lit les paramètres d'URL et les passe au composant d'affichage.
// const GenerateCourseLogic = () => {
//     const searchParams = useSearchParams();

//     // Définir des valeurs par défaut robustes
//     const defaultLevel = "Terminale";
//     const defaultTopic = "Les Nombres Complexes";

//     const currentLevel = searchParams.get('level') || defaultLevel;
//     const currentTopic = searchParams.get('topic') || defaultTopic;

//     const [courseData, setCourseData] = useState<CourseData | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchCourse = async (level: string, starting_point: string) => {
//         setIsLoading(true);
//         setError(null);
//         setCourseData(null);
//         try {
//             const apiUrl = 'http://127.0.0.1:8000/api/generate-course/';
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ level, starting_point })
//             });
//             if (!response.ok) {
//                 try {
//                     const errData = await response.json();
//                     throw new Error(errData.error || `Erreur serveur: ${response.status}`);
//                 } catch (jsonError) {
//                     throw new Error(`Réponse inattendue du serveur: ${response.status}`);
//                 }
//             }
//             const data: CourseData = await response.json();
//             setCourseData(data);
//         } catch (e: any) {
//             setError(e.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         fetchCourse(currentLevel, currentTopic);
//     }, [currentLevel, currentTopic]);

//     useEffect(() => {
//         if (courseData && typeof window.MathJax !== 'undefined') {
//             const timer = setTimeout(() => {
//                 window.MathJax.typesetPromise().catch(err => console.error("Erreur de rendu MathJax:", err));
//             }, 100);
//             return () => clearTimeout(timer);
//         }
//     }, [courseData]);

//     const renderContent = () => {
//         if (isLoading) return <LoadingSpinner topic={currentTopic} />;
//         if (error) return <ErrorDisplay message={error} />;
//         if (courseData) return <CourseDisplay data={courseData} />;
//         return null;
//     };

//     return (
//         <main className="max-w-4xl mx-auto p-4 md:p-8">
//             <header className="text-center mb-12 p-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
//                 <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Générateur de Cours IA</h1>
//                 <p className="text-lg text-gray-300 mt-2">Expériences d'Apprentissage Personnalisées</p>
//             </header>
//             <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[300px]">
//                 {renderContent()}
//             </section>
//             {courseData && (
//                 <div className="space-y-8 mt-8">
//                     <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
//                         <h2 className="text-2xl font-bold text-center text-cyan-400">Questions sur ce cours</h2>
//                     </section>
//                     <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
//                         <h2 className="text-2xl font-bold text-center text-cyan-400">Évaluez-vous (QCM)</h2>
//                     </section>
//                 </div>
//             )}
//             <footer className="text-center mt-12 text-gray-500">
//                 <p>© Tamtech pour l'Éducation</p>
//             </footer>
//         </main>
//     );
// };

// // ---- EXPORT PRINCIPAL DE LA PAGE ----
// // On enveloppe le composant logique dans <Suspense>
// // C'est une bonne pratique de Next.js quand on utilise `useSearchParams`.
// const GenerateCoursePage: FC = () => {
//     return (
//         <>
//             <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
//             <Suspense fallback={<LoadingSpinner topic="Chargement..." />}>
//                 <GenerateCourseLogic />
//             </Suspense>
//         </>
//     );
// };

// export default GenerateCoursePage;'use client';
 "use client";


import { useState, useEffect, Suspense } from 'react';
import type { FC } from 'react';
import Script from 'next/script';
import styles from './CourseStyles.module.css';
import api from '@/utils/axios'; // Assurez-vous que ce chemin est correct

// ---- INTERFACES & TYPES ----
interface CourseData {
    level_used: string;
    recommendation_used: string;
    course_content: string;
}

type ParsedSection = {
    type: 'h2' | 'p' | string;
    content: string;
};

// ---- SOUS-COMPOSANTS D'AFFICHAGE ----

const LoadingSpinner: FC<{ topic: string }> = ({ topic }) => (
    <div className={styles.loadingContainer}>
        <div className={styles.mathLoading}>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingCircle}></div>
            <div className={styles.loadingSymbol}>∑</div>
        </div>
        <p className={styles.loadingText}>Génération de votre cours sur "{topic}"...</p>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
        <p className="font-bold mb-2">Une erreur est survenue</p>
        <p className="text-sm">{message}</p>
    </div>
);

const CourseDisplay: FC<{ data: CourseData }> = ({ data }) => {
    
    const parseContent = (content: string): ParsedSection[] => {
        try {
            if (!content || typeof content !== 'string') {
                console.error("DEBUG (parseContent): Le contenu est invalide.");
                return [{ type: 'p', content: 'Le contenu du cours reçu est invalide ou vide.' }];
            }

            console.log("DEBUG (parseContent): Début du parsing...");
            const sections: ParsedSection[] = [];
            const lines = content.split('\n');
            
            const patterns: { [key: string]: string } = {
                'Définition': styles.definition, 'Definition': styles.definition,
                'Théorème': styles.theorem, 'Theorem': styles.theorem,
                'Preuve': styles.proof, 'Proof': styles.proof,
                'Exemple': styles.example, 'Example': styles.example,
                'Remarque': styles.remark, 'Remark': styles.remark,
                'Lemme': styles.definition,
                'Corollaire': styles.theorem,
            };

            for (const line of lines) {
                if (line.trim() === '') continue;

                let match = line.match(/^\s*\*\*(.+?)\*\*\s*$/);
                if (match) {
                    sections.push({ type: 'h2', content: match[1].trim() });
                    continue;
                }

                let matchFound = false;
                for (const key in patterns) {
                    const regex = new RegExp(`^\\s*\\*\\*${key}\\*\\*:?\\s*(.*)`, 'i');
                    match = line.match(regex);
                    if (match) {
                        sections.push({ type: patterns[key], content: match[1].trim() });
                        matchFound = true;
                        break;
                    }
                }

                if (matchFound) continue;
                sections.push({ type: 'p', content: line.trim() });
            }

            console.log("DEBUG (parseContent): Parsing réussi. Sections trouvées:", sections.length);
            return sections;
        } catch (error) {
            console.error("ERREUR CRITIQUE dans parseContent:", error);
            return [{ type: 'p', content: 'Une erreur est survenue lors de l\'affichage du cours.' }];
        }
    };
    
    const parsedSections = parseContent(data.course_content);

    const patternsForTitle: { [key: string]: string } = {
        [styles.definition]: 'Définition', [styles.theorem]: 'Théorème',
        [styles.proof]: 'Preuve', [styles.example]: 'Exemple', [styles.remark]: 'Remarque'
    };
    
    return (
        <div>
            <header className={styles.courseHeader}>
                <h2 className={styles.courseTitle}>{data.recommendation_used}</h2>
                <div className={styles.courseLevel}>{data.level_used}</div>
            </header>
            <div className={`${styles.courseContentBody} space-y-4`}>
                {parsedSections.map((section, index) => {
                    const sectionContentHtml = { __html: section.content.replace(/\n/g, '<br />') };
                    if (section.type === 'h2') {
                        return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-white">{section.content}</h2>;
                    }
                    if (section.type === 'p') {
                        return <p key={index} dangerouslySetInnerHTML={sectionContentHtml} className="text-gray-300 leading-relaxed" />;
                    }
                    
                    const titleKey = patternsForTitle[section.type] || 'Info';
                    return (
                        <div key={index} className={`${styles.mathEnv} ${section.type}`}>
                            <span className={styles.mathEnvTitle}>{titleKey}</span>
                            <div className={styles.mathEnvContent} dangerouslySetInnerHTML={sectionContentHtml} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- COMPOSANT LOGIQUE PRINCIPAL ---
const GenerateCourseLogic = () => {
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingTopic, setLoadingTopic] = useState("votre cours personnalisé");

    const fetchCustomizedCourse = async () => {
        setIsLoading(true);
        setError(null);
        setCourseData(null);
        try {
            // Note: assurez-vous que cette URL est correcte dans vos fichiers urls.py
            const response = await api.post<CourseData>('/api/generate-course/');
            
            console.log("DEBUG: Données BRUTES reçues du backend :", response.data);

            if (response.data && response.data.course_content) {
                setCourseData(response.data);
                setLoadingTopic(response.data.recommendation_used);
            } else {
                console.error("DEBUG: La réponse du backend est valide (200 OK) mais le format est incorrect.");
                setError("La réponse du serveur est dans un format inattendu.");
            }
        
        } catch (e: any) {
            const errorMessage = e.response?.data?.error || e.response?.data?.detail || e.message || 'Une erreur inconnue est survenue.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCustomizedCourse();
    }, []);

    useEffect(() => {
        if (courseData && (window as any).MathJax) {
            const timer = setTimeout(() => {
                try {
                    (window as any).MathJax.typesetPromise();
                } catch (err) {
                    console.error("Erreur de rendu MathJax:", err);
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [courseData]);

    const renderContent = () => {
        if (isLoading) {
            return <LoadingSpinner topic={loadingTopic} />;
        }
        if (error) {
            return <ErrorDisplay message={error} />;
        }
        if (courseData) {
            return <CourseDisplay data={courseData} />;
        }
        return <ErrorDisplay message="Aucun contenu n'a pu être chargé." />; // Message final si tout échoue
    };

    return (
        <main className="max-w-4xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12 p-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Générateur de Cours IA</h1>
                <p className="text-lg text-gray-300 mt-2">Votre cours sur mesure, basé sur votre progression.</p>
            </header>
            <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[300px]">
                {renderContent()}
            </section>
            {courseData && (
                <div className="space-y-8 mt-8">
                    <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-center text-cyan-400">Questions sur ce cours</h2>
                        {/* Implémentation future ici */}
                    </section>
                    <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-center text-cyan-400">Évaluez-vous (QCM)</h2>
                        {/* Implémentation future ici */}
                    </section>
                </div>
            )}
            <footer className="text-center mt-12 text-gray-500">
                <p>© Tamtech pour l'Éducation</p>
            </footer>
        </main>
    );
};

// ---- EXPORT PRINCIPAL DE LA PAGE ----
const GenerateCoursePage: FC = () => {
    return (
        <>
            <Script id="MathJax-script" async strategy="afterInteractive" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
            <Suspense fallback={<LoadingSpinner topic="Chargement..." />}>
                <GenerateCourseLogic />
            </Suspense>
        </>
    );
};

export default GenerateCoursePage;