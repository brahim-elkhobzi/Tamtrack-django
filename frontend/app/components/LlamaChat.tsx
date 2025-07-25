// L'interaction utilisateur rend ce composant client
"use client";

import { useState, FormEvent } from 'react';

const LlamaChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      // Étape clé : appeler VOTRE backend Django, pas l'API Groq
      const apiResponse = await fetch('http://127.0.0.1:8000/api/chat/', { // Assurez-vous que l'URL est correcte
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si vous avez besoin d'authentification (ex: JWT), ajoutez le header ici
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Erreur HTTP: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResponse(data.response);

    } catch (err: any) {
      console.error("Erreur lors de la récupération de la réponse :", err);
      setError("Désolé, une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Discuter avec TamTrach</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre question ici..."
          rows={4}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      
      {isLoading && <p className="mt-4 text-center">Le modèle réfléchit...</p>}

      {response && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="font-bold mb-2">Réponse :</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default LlamaChat;