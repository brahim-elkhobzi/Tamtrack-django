"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import api from '@/utils/axios';
import Link from 'next/link';

// Types pour notre tableau de bord
interface QuizScore {
  topic: string;
  score: number;
  date: string;
}

interface RecommendationData {
  text: string;
  topic: string;
}

interface UserStats {
  totalQuizzes: number;
  averageScore: number;
  bestTopic: string;
  needsImprovement: string;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupérer les scores des quiz
        const scoresResponse = await api.get('/api/quiz/user-scores/');
        const recommendationsResponse = await api.get('/api/quiz/recommendations/');
        
        setScores(scoresResponse.data);
        setRecommendations(recommendationsResponse.data);

        // Calculer les statistiques
        if (scoresResponse.data.length > 0) {
          const totalScore = scoresResponse.data.reduce((acc: number, curr: QuizScore) => acc + curr.score, 0);
          const avgScore = totalScore / scoresResponse.data.length;
          
          // Trouver le meilleur sujet et celui à améliorer
          const topicScores: { [key: string]: number[] } = {};
          scoresResponse.data.forEach((score: QuizScore) => {
            if (!topicScores[score.topic]) topicScores[score.topic] = [];
            topicScores[score.topic].push(score.score);
          });

          const topicAverages = Object.entries(topicScores).map(([topic, scores]) => ({
            topic,
            average: scores.reduce((a, b) => a + b) / scores.length
          }));

          const bestTopic = topicAverages.reduce((a, b) => a.average > b.average ? a : b).topic;
          const needsImprovement = topicAverages.reduce((a, b) => a.average < b.average ? a : b).topic;

          setStats({
            totalQuizzes: scoresResponse.data.length,
            averageScore: avgScore,
            bestTopic,
            needsImprovement
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement de votre tableau de bord...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du tableau de bord */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenue, {user?.first_name || 'Étudiant'}
              </h1>
              <p className="mt-1 text-lg text-gray-600">
                Niveau: <span className="font-semibold">{user?.level || 'Non défini'}</span>
              </p>
            </div>
            <Link
              href="/quiz"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Commencer un nouveau quiz
            </Link>
          </div>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-600">Quiz complétés</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{stats?.totalQuizzes || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-600">Score moyen</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats?.averageScore ? `${Math.round(stats.averageScore)}%` : '0%'}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-600">Meilleur sujet</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.bestTopic || 'N/A'}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-600">À améliorer</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{stats?.needsImprovement || 'N/A'}</p>
          </div>
        </div>

        {/* Historique des quiz et recommandations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Historique des scores */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">Historique des quiz</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sujet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scores.map((score, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {score.topic}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {score.score}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(score.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recommandations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommandations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-900">{rec.topic}</h3>
                    <p className="mt-1 text-sm text-indigo-700">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
