
 "use client";


import { useState, useEffect, Suspense } from 'react';
import type { FC } from 'react';
import Script from 'next/script';
import styles from './CourseStyles.module.css';
import api from '@/utils/axios'; // Assurez-vous que ce chemin est correct
import { useCallback } from 'react';

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


// ==========================================================
// NOUVEAU COMPOSANT : La carte de sélection de matière
// ==========================================================
interface MatiereCardProps {
  name: string;
  icon: string; // Chemin vers une icône SVG dans votre dossier /public
  colorClasses: string;
  onClick: () => void;
  isLoading: boolean;
}


const MatiereCard: FC<MatiereCardProps> = ({ name, icon, colorClasses, onClick, isLoading }) => (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className={`relative w-full p-6 text-left rounded-xl shadow-lg border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-wait ${colorClasses} ${isLoading ? 'animate-pulse' : 'hover:-translate-y-2'}`}
    >
        <div className="flex items-center">
            <img src={icon} alt={`${name} icon`} className="w-10 h-10 mr-4" />
            <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-sm text-white/80">Générer un cours personnalisé</p>
            </div>
        </div>
        {isLoading && <div className="absolute top-2 right-2 h-4 w-4 animate-spin rounded-full border-2 border-dashed border-white"></div>}
    </button>
);
// --- COMPOSANT LOGIQUE PRINCIPAL ---

// --- COMPOSANT LOGIQUE PRINCIPAL (fortement modifié) ---
const GenerateCourseLogic = () => {
    // On garde ces 3 états pour gérer le résultat
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Commence à `false`
    const [error, setError] = useState<string | null>(null);
    const [selectedMatiere, setSelectedMatiere] = useState<string | null>(null);

    const handleMatiereClick = useCallback(async (matiere: string) => {
        setIsLoading(true);
        setSelectedMatiere(matiere);
        setError(null);
        setCourseData(null);
        
        try {
            // L'endpoint est générique, on envoie la matière dans le body
            const endpoint = '/api/generate-course/';
            

            const response = await api.post<CourseData>(`/api/generate-course/${matiere}/`);

            if (response.data && response.data.course_content) {
                setCourseData(response.data);
            } else {
                setError("La réponse du serveur est dans un format inattendu.");
            }
        } catch (e: any) {
            const errorMessage = e.response?.data?.error || e.message;
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            setSelectedMatiere(null);
        }
    }, []);
    
    // Le useEffect pour MathJax s'active quand courseData change
    useEffect(() => {
        if (courseData && (window as any).MathJax) {
            (window as any).MathJax.typesetPromise();
        }
    }, [courseData]);
    
    return (
        <main className="max-w-4xl mx-auto p-4 md:p-8">
            <header className="text-center mb-12 p-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Générateur de Cours IA</h1>
                <p className="text-lg text-gray-300 mt-2">Choisissez une matière pour démarrer un cours personnalisé basé sur votre progression.</p>
            </header>
            
            {/* ========================================================== */}
            {/* Section de sélection des matières */}
            {/* ========================================================== */}
            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MatiereCard 
                        name="Mathématiques"
                        icon="/icons/math-icon.svg" // Assurez-vous d'avoir ces icônes
                        colorClasses="bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 ring-blue-500/50"
                        onClick={() => handleMatiereClick('Mathématiques')}
                        isLoading={isLoading && selectedMatiere === 'Mathématiques'}
                    />
                    <MatiereCard 
                        name="Physique-Chimie"
                        icon="/icons/physics-icon.svg"
                        colorClasses="bg-gradient-to-br from-purple-500 to-violet-600 border-purple-400 ring-purple-500/50"
                        onClick={() => handleMatiereClick('physique')}
                        isLoading={isLoading && selectedMatiere === 'physique'}
                    />
                     <MatiereCard 
                        name="SVT"
                        icon="/icons/svt-icon.svg"
                        colorClasses="bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 ring-green-500/50"
                        onClick={() => handleMatiereClick('svt')}
                        isLoading={isLoading && selectedMatiere === 'svt'}
                    />
                </div>
            </section>
            
            {/* ========================================================== */}
            {/* Section d'affichage du résultat */}
            {/* ========================================================== */}
            <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[300px]">
                {isLoading && <LoadingSpinner topic={selectedMatiere || 'votre cours'} />}
                {error && <ErrorDisplay message={error} />}
                {courseData && <CourseDisplay data={courseData} />}
                {!isLoading && !error && !courseData && (
                    <div className="text-center text-gray-400">Le cours généré apparaîtra ici.</div>
                )}
            </section>

            <footer className="text-center mt-12 text-gray-500">
                <p>© Tamtech pour l'Éducation</p>
            </footer>
        </main>
    );
};

// ==========================================================
// EXPORT PRINCIPAL (on peut simplifier, plus besoin de Suspense ici)
// ==========================================================
const GenerateCoursePage: FC = () => {
    return (
        <>
            <Script id="MathJax-script" async strategy="afterInteractive" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
            <GenerateCourseLogic />
        </>
    );
};

export default GenerateCoursePage;