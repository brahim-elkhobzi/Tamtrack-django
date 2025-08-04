"use client";
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import api from '@/utils/axios';

interface Question {
  id: string;
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

const AnimatedBackground = () => (
  <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="shape bg-white/10 rounded-full absolute animate-float"
        style={{
          width: i === 0 ? '5rem' : i === 1 ? '4rem' : '3rem',
          height: i === 0 ? '5rem' : i === 1 ? '4rem' : '3rem',
          top: i === 0 ? '10%' : i === 1 ? '20%' : 'auto',
          left: i === 0 ? '10%' : i === 1 ? 'auto' : '20%',
          right: i === 1 ? '10%' : 'auto',
          bottom: i === 2 ? '10%' : 'auto',
          animationDelay: `${i + 1 * 2}s`,
          clipPath: i === 2 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
        }}
      ></div>
    ))}
  </div>
);

export default function MathGuidedQuizPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [fullQuizData, setFullQuizData] = useState<FullQuizData | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [scoresByTopic, setScoresByTopic] = useState<ScoresByTopic>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedCurrentQuestion, setHasSubmittedCurrentQuestion] = useState(false);

  const topics = useMemo(() => fullQuizData ? Object.keys(fullQuizData) : [], [fullQuizData]);

  useEffect(() => {
    setHasSubmittedCurrentQuestion(false);
    setSelectedOption(null);
    setFeedback(null);
  }, [currentTopicIndex, currentQuestionIndex]);

  useEffect(() => {
    if (!authLoading && user) fetchFullQuiz();
  }, [authLoading, user]);

  const fetchFullQuiz = async () => {
    try {
      const { data } = await api.get('/quiz/get-full-quiz/');
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setFullQuizData(data);
        const initialScores = Object.keys(data).reduce((acc, topic) => {
          acc[topic] = { score: 0, total: 0 };
          return acc;
        }, {} as ScoresByTopic);
        setScoresByTopic(initialScores);
      } else {
        setFullQuizData({});
      }
    } catch (error) {
      console.error("Impossible de charger le parcours guidé:", error);
    } finally {
      setLoading(false);
    }
  };

    const saveFinalScores = async () => {
    try {
        // Prepare the data to send to the server
        const scoresData = Object.entries(scoresByTopic).map(([topic, scoreData]) => {
        const percentage = scoreData.score ;
        alert(`Score pour ${topic}: ${percentage})`);
        return {
            topic,
            score: percentage,
            recommendation: `Recommendation based on a score of ${percentage} for ${topic}.`
        };
        });

        // Send the data to the server
        await api.post('/api/quiz/save_profile/', scoresData);

        console.log("Scores finaux enregistrés avec succès dans la base de données !");
    } catch (error) {
        console.error("Erreur lors de la sauvegarde finale des scores:", error);
    }
    };


    const handleAnswerSubmit = async () => {
        if (!selectedOption || !fullQuizData || isSubmitting || hasSubmittedCurrentQuestion) return;

        setIsSubmitting(true);
        setHasSubmittedCurrentQuestion(true);

        const currentTopic = topics[currentTopicIndex];
        const currentQuestion = fullQuizData[currentTopic][currentQuestionIndex];

        try {
        const response = await api.post(
            `/profiles/submit-answer/${encodeURIComponent(currentTopic)}/${encodeURIComponent(currentQuestion.question)}/`,
            { answer: selectedOption }
        );

        setFeedback(response.data);
        setScoresByTopic(prev => {
            const newScores = { ...prev };
            newScores[currentTopic].total++;
            if (response.data.is_correct) {
                newScores[currentTopic].score++;
                alert(`Score mis à jour pour ${currentTopic}: ${newScores[currentTopic].score}/${newScores[currentTopic].total}`);
            }
            return newScores;
        });
        } catch (error) {
        console.error("Erreur lors de la soumission :", error);
        setHasSubmittedCurrentQuestion(false);
        } finally {
        setIsSubmitting(false);
        }
    };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);

    if (!fullQuizData) return;

    const currentTopic = topics[currentTopicIndex];
    const questionsInCurrentTopic = fullQuizData[currentTopic];

    if (currentQuestionIndex < questionsInCurrentTopic.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsQuizFinished(true);
      saveFinalScores();
    }
  };

  if (loading || authLoading) {
    return <div className="gradient-bg min-h-screen flex items-center justify-center text-white text-xl">Préparation de votre parcours...</div>;
  }

  if (isQuizFinished) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4 font-sans">
        <AnimatedBackground />
        <div className="glass-effect rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative z-10 animate-slideIn">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Résultats de votre Évaluation</h1>
          <div className="space-y-4">
            {Object.entries(scoresByTopic).map(([topic, scoreData]) => {
              const percentage = scoreData.total > 0 ? Math.round((scoreData.score / scoreData.total) * 100) : 0;
              return (
                <div key={topic} className="bg-white/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center font-semibold text-gray-700">
                    <span>{topic}</span>
                    <span>{scoreData.score} / {scoreData.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${percentage}%`, transition: 'width 1s ease-out' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => router.push('/profile')} className="w-full mt-8 text-white font-semibold py-3 px-6 rounded-xl text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90">
            Voir mon Profil et mes Recommandations
          </button>
        </div>
      </div>
    );
  }

  const currentTopic = topics[currentTopicIndex];
  const currentQuestion = fullQuizData?.[currentTopic]?.[currentQuestionIndex];

  if (!currentQuestion) {
    return <div className="gradient-bg min-h-screen flex items-center justify-center text-white">Chargement...</div>;
  }

  const totalQuestionsInTopic = fullQuizData[currentTopic].length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestionsInTopic) * 100;

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
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed">{currentQuestion.question}</h2>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((optionText, index) => {
            const isSelected = selectedOption === optionText;
            const isCorrect = feedback?.correct_answer === optionText;
            const wasWronglySelected = isSelected && !isCorrect && feedback;
            let cardStyle = "border-gray-300 hover:border-indigo-400";
            if (feedback) cardStyle = isCorrect ? "border-green-500 bg-green-50 font-bold" : wasWronglySelected ? "border-red-500 bg-red-50" : "border-gray-200 text-gray-400";
            else if (isSelected) cardStyle = "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300";

            return (
              <div key={index} onClick={() => !feedback && setSelectedOption(optionText)} className={`block cursor-pointer bg-white rounded-xl p-4 border-2 transition-all duration-200 ${cardStyle}`}>
                <span className="font-medium text-gray-700">{optionText}</span>
              </div>
            );
          })}
        </div>
        <div className="h-20 flex items-center">
          {feedback ? (
            <button onClick={handleNext} disabled={isSubmitting} className="w-full text-white font-semibold py-3 px-6 rounded-xl text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 disabled:bg-gray-400">
              Continuer
            </button>
          ) : (
            <button onClick={handleAnswerSubmit} disabled={!selectedOption || isSubmitting || hasSubmittedCurrentQuestion} className={`gradient-btn-green w-full text-black font-semibold py-3 px-6 rounded-xl text-lg disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed ${selectedOption && !hasSubmittedCurrentQuestion ? 'animate-pulse-btn' : ''}`}>
              {isSubmitting ? 'Vérification...' : 'Soumettre'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
