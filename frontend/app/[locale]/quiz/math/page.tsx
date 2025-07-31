// frontend/app/quiz/math/page.tsx

"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import api from '@/utils/axios';

// --- Interfaces (La structure est bonne, gardons-la) ---
interface Question {
  question: string;
  options: string[];
  topic: string; 
}
interface FullQuizData {
  [topic: string]: Question[];
}
interface Feedback {
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
}
type ScoresByTopic = {
  [topic: string]: { score: number; total: number };
};

// --- Composant séparé pour l'arrière-plan ---
const AnimatedBackground = () => (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="shape w-20 h-20 bg-white/10 rounded-full absolute top-[10%] left-[10%] animate-float"></div>
        <div className="shape w-16 h-16 bg-white/10 rounded-lg absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="shape w-12 h-12 bg-white/10 absolute bottom-[10%] left-[20%] animate-float" style={{ animationDelay: '4s', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
    </div>
);

// --- LE COMPOSANT DE LA PAGE PRINCIPALE ---
export default function MathGuidedQuizPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    
    // États React (aucune modification majeure nécessaire)
    const [fullQuizData, setFullQuizData] = useState<FullQuizData | null>(null);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [scoresByTopic, setScoresByTopic] = useState<ScoresByTopic>({});
    const [loading, setLoading] = useState(true);

    // Correction 1: Utiliser `useMemo` pour dériver l'état `topics` de `fullQuizData`
    // Cela garantit qu'ils sont toujours synchronisés et évite les erreurs de décalage.
    const topics = useMemo(() => fullQuizData ? Object.keys(fullQuizData) : [], [fullQuizData]);

    // Chargement initial des données du quiz
    useEffect(() => {
        if (authLoading || !user) return; // Attendre que l'utilisateur soit chargé
        
        const fetchFullQuiz = async () => {
            try {
                const response = await api.get('/quiz/get-full-quiz/');
                const data = response.data;
                
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    setFullQuizData(data);
                    // Pas besoin de setTopics, `useMemo` s'en occupe
                    const fetchedTopics = Object.keys(data);
                    const initialScores: ScoresByTopic = {};
                    fetchedTopics.forEach(topic => { initialScores[topic] = { score: 0, total: 0 }; });
                    setScoresByTopic(initialScores);
                } else {
                    setFullQuizData({}); // Mettre à jour avec un objet vide si pas de données
                }
            } catch (error) {
                console.error("Impossible de charger le parcours guidé:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFullQuiz();
    }, [authLoading, user]);

    // --- Correction 2 : Sécurisation des Fonctions ---
    // Logique de soumission de la réponse
    const handleAnswerSubmit = async () => {
        const currentTopic = topics[currentTopicIndex];
        const currentQuestion = fullQuizData?.[currentTopic]?.[currentQuestionIndex];
        
        // La garde `if` doit être au tout début
        if (!selectedOption || !currentQuestion) return;
        
        try {
            
            const urlToCall = `/quiz/submit/${encodeURIComponent(currentTopic)}/${encodeURIComponent(currentQuestion.question)}/`;
            const response = await api.post(urlToCall, { answer: selectedOption });
            setFeedback(response.data);

            setScoresByTopic(prevScores => {
                const newScores = { ...prevScores }; // Bonne pratique pour ne pas muter l'état
                newScores[currentTopic].total += 1;
                if (response.data.is_correct) {
                    newScores[currentTopic].score += 1;
                }
                return newScores;
            });
            
        } catch (error) { console.error("Error submitting answer:", error); }
    };
    
    // Logique de progression
    const handleNext = () => {
        setFeedback(null);
        setSelectedOption(null);
        if (!fullQuizData) return;

        const currentTopic = topics[currentTopicIndex];
        const questionsInCurrentTopic = fullQuizData[currentTopic];
        
        if (currentQuestionIndex < questionsInCurrentTopic.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } 
        else if (currentTopicIndex < topics.length - 1) {
            setCurrentTopicIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        } 
        else {
            console.log("Scores finaux par chapitre :", scoresByTopic);
            router.push('/modules'); // Rediriger à la fin
        }
    };

    // --- Correction 3 : Gestion robuste des états de chargement ---
    if (loading || authLoading) {
        return <div className="gradient-bg min-h-screen flex items-center justify-center text-white text-xl">Préparation de votre parcours...</div>;
    }
    
    if (topics.length === 0) {
        return <div className="gradient-bg min-h-screen flex items-center justify-center text-white text-xl text-center p-4">Aucun chapitre n'a été trouvé pour votre niveau.</div>;
    }
    
    // --- Sécurisation de l'accès aux variables pour le rendu ---
    const currentTopic = topics[currentTopicIndex];
    const currentQuestion = fullQuizData?.[currentTopic]?.[currentQuestionIndex];
    
    if (!currentQuestion) {
        return <div className="gradient-bg min-h-screen flex items-center justify-center text-white">Chargement...</div>;
    }
    
    const totalQuestionsInTopic = fullQuizData![currentTopic].length;
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestionsInTopic) * 100;
    
    // Définition des classes du bouton de manière explicite pour plus de clarté
    const isSubmitDisabled = !selectedOption;
    const submitButtonClasses = `
        w-full text-black font-semibold py-3 px-6 rounded-xl text-lg 
        transition-all duration-300 transform
        ${isSubmitDisabled 
            ? 'bg-gray-400 cursor-not-allowed opacity-70' // Style quand il est désactivé
            : 'gradient-btn-green hover:scale-105 hover:shadow-lg animate-pulse-btn' // Style quand il est activé
        }
    `;

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4 font-sans">
            <AnimatedBackground />

            <div className="glass-effect rounded-3xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 relative z-10">
                <header className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Parcours : {currentTopic}</h1>
                    <p className="text-gray-600">Question {currentQuestionIndex + 1} sur {totalQuestionsInTopic}</p>
                </header>

                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease-out' }}></div>
                </div>

                {feedback && (
                    <div className={`animate-slideIn mb-6 p-4 rounded-xl border-l-4 ${feedback.is_correct ? 'bg-green-50 border-green-400 text-green-700' : 'bg-red-50 border-red-400 text-red-700'}`}>
                        <h3 className="font-bold">{feedback.is_correct ? 'Correct !' : 'Incorrect.'}</h3>
                        <p className="text-sm mt-1">{feedback.explanation}</p>
                    </div>
                )}
                
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                    </div>
                </div>
                
                <div className="space-y-4 mb-8">
                    {currentQuestion.options.map((optionText, index) => {
                         const isSelected = selectedOption === optionText;
                         const isCorrect = feedback?.correct_answer === optionText;
                         const wasWronglySelected = isSelected && !isCorrect && feedback;
 
                         let cardStyle = "border-gray-300 hover:border-indigo-400";
                         if(feedback) {
                             if(isCorrect) cardStyle = "border-green-500 bg-green-50 font-bold";
                             else if(wasWronglySelected) cardStyle = "border-red-500 bg-red-50";
                             else cardStyle = "border-gray-200 text-gray-400";
                         } else if (isSelected) {
                             cardStyle = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300";
                         }

                        return (
                          <div
                            key={index}
                            onClick={() => !feedback && setSelectedOption(optionText)}
                            className={`block cursor-pointer bg-white rounded-xl p-4 border-2 transition-all duration-200 ${cardStyle}`}
                           >
                                <span className="font-medium text-gray-700">{optionText}</span>
                          </div>
                        );
                    })}
                </div>
                
                <div className="h-20 flex items-center">
                    {feedback ? (
                      <button onClick={handleNext} className="w-full text-black font-semibold py-3 px-6 rounded-xl text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90">
                        Continuer
                      </button>
                    ) : (
                      <button 
                        onClick={handleAnswerSubmit} 
                        disabled={isSubmitDisabled} 
                        className={submitButtonClasses} // Utilisation de nos classes dynamiques
                      >
                        Soumettre
                      </button>
                    )}
                </div>
            </div>
        </div>
    );
}