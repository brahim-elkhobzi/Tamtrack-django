
"use client";

import { FC, useEffect, useState, useCallback, ReactNode } from 'react';
import { FiPlay, FiX, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import api from '@/utils/axios';


type Difficulty = 'Facile' | 'Moyen' | 'Difficile';

interface Exercise {
    title: string;
    difficulty: Difficulty;
    question: string;
    options: string[];
    correct_answer: string;
}


const QuizModal: FC<{ exercise: Exercise | null; onClose: () => void; onComplete: () => void }> = ({ exercise, onClose, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

    // Réinitialise l'état quand un nouvel exercice est affiché
    useEffect(() => {
        setSelectedOption(null);
        setFeedback(null);
    }, [exercise]);

    if (!exercise) return null;

    // Logique de vérification de la réponse
    const handleCheckAnswer = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === exercise.correct_answer;
        setFeedback({
            isCorrect,
            explanation: isCorrect 
                ? "Excellent ! C'est la bonne réponse." 
                : `Incorrect. La bonne réponse est : ${exercise.correct_answer}`
        });
    };
    
    // Logique pour passer à la suite
    const handleNext = () => {
        onComplete(); 
    };

    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-slideIn">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <FiX size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4"><MathJax>{exercise.title}</MathJax></h2>
                <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-lg"><MathJax>{exercise.question}</MathJax></p>
                </div>

                <div className="space-y-3 mb-6">
                    {exercise.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        let optionStyle = 'border-gray-300 hover:border-indigo-400';
                        if (feedback) {
                            if (option === exercise.correct_answer) optionStyle = 'border-green-500 bg-green-50 font-bold';
                            else if (isSelected) optionStyle = 'border-red-500 bg-red-50';
                            else optionStyle = 'border-gray-200 text-gray-400 opacity-70';
                        } else if (isSelected) {
                            optionStyle = 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300';
                        }
                        
                        return (
                            <div key={index} onClick={() => !feedback && setSelectedOption(option)}
                                 className={`p-4 rounded-lg border-2 transition-all ${!feedback ? 'cursor-pointer' : ''} ${optionStyle}`}>
                                <MathJax>{option}</MathJax>
                            </div>
                        );
                    })}
                </div>
                
                {feedback && (
                    <div className={`p-3 rounded-lg mb-4 font-semibold ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <MathJax>{feedback.explanation}</MathJax>
                    </div>
                )}
                
                <div className="h-14 mt-4">
                  {feedback ? (
                     <button onClick={handleNext} className="w-full h-full py-3 px-6 rounded-xl text-lg bg-green-600 text-white font-semibold">
                        Exercice Suivant
                     </button>
                  ) : (
                    <button onClick={handleCheckAnswer} disabled={!selectedOption} className="w-full h-full py-3 px-6 rounded-xl text-lg bg-indigo-600 text-white font-semibold disabled:bg-gray-400">
                        Vérifier
                    </button>
                  )}
                </div>
            </div>
        </div>
    );
};


// ==========================================================
// 3. Composant pour les Cartes d'Exercice (mis à jour)
// ==========================================================
const ExerciseCard: FC<{ exercise: Exercise; onStart: () => void }> = ({ exercise, onStart }) => {
    const { title, difficulty } = exercise;
    const tagColor = difficulty === 'Facile' ? 'bg-green-500' : difficulty === 'Moyen' ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${tagColor}`}>{difficulty}</span>
                <span className="text-xs font-semibold text-gray-400">© 10 pts</span>
            </div>
            <div className="font-semibold flex-grow"><MathJax>{title}</MathJax></div>
            <button 
                onClick={onStart} 
                
                className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 bg-gray-800 text-white font-semibold text-sm rounded-lg hover:bg-gray-900 cursor-pointer"
            >
                <FiPlay /> Commencer
            </button>
        </div>
    );
};


// ==========================================================
// 4. LE COMPOSANT PRINCIPAL TutorDashboard
// (Qui assemble tout)
// ==========================================================
const TutorDashboard: FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

    const fetchExercisesAndRecs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/quiz/recommendation-exercises/');
            setExercises(response.data.exercises || []);
            setRecommendation(response.data.recommendation || 'Commence par ces exercices.');
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
            setRecommendation('Impossible de charger les exercices.');
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchExercisesAndRecs();
    }, [fetchExercisesAndRecs]);

    const handleQuizComplete = () => {
        setActiveExercise(null);
        fetchExercisesAndRecs(); // Recharge de nouveaux exercices
    };
    
    return (
        // MathJaxContext enveloppe tout pour que les formules s'affichent partout
        <MathJaxContext>
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold">Exercices Adaptatifs</h2>
                            <p className="text-sm text-gray-500">{recommendation}</p>
                        </div>
                        <button onClick={fetchExercisesAndRecs} className="p-2 rounded-full hover:bg-gray-100" title="Générer de nouveaux exercices">
                            <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    {isLoading ? (<p className="text-center p-8">Chargement...</p>) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {exercises.map((exercise, index) => (
                                <ExerciseCard key={index} exercise={exercise} onStart={() => setActiveExercise(exercise)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* La modale est appelée ici et est initialement invisible */}
            <QuizModal exercise={activeExercise} onClose={() => setActiveExercise(null)} onComplete={handleQuizComplete} />
        </MathJaxContext>
    );
};

export default TutorDashboard;