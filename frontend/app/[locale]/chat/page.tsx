// // L'interaction utilisateur rend ce composant client
// "use client";

// import { useState, FormEvent } from 'react';

// const LlamaChat = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     setError('');
//     setResponse('');

//     try {
//       // Étape clé : appeler VOTRE backend Django, pas l'API Groq
//       const apiResponse = await fetch('http://127.0.0.1:8000/api/chat/', { // Assurez-vous que l'URL est correcte
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Si vous avez besoin d'authentification (ex: JWT), ajoutez le header ici
//           // 'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!apiResponse.ok) {
//         throw new Error(`Erreur HTTP: ${apiResponse.status}`);
//       }

//       const data = await apiResponse.json();
//       setResponse(data.response);

//     } catch (err: any) {
//       console.error("Erreur lors de la récupération de la réponse :", err);
//       setError("Désolé, une erreur est survenue. Veuillez réessayer.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto font-sans">
//       <h1 className="text-3xl font-bold text-center mb-6">Discuter avec TamTrach</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Entrez votre question ici..."
//           rows={4}
//           className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           disabled={isLoading}
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//         >
//           {isLoading ? 'Envoi...' : 'Envoyer'}
//         </button>
//       </form>

//       {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      
//       {isLoading && <p className="mt-4 text-center">Le modèle réfléchit...</p>}

//       {response && (
//         <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
//           <h2 className="font-bold mb-2">Réponse :</h2>
//           <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LlamaChat;
'use client';

import { useState, useRef, useEffect, FormEvent, FC } from 'react';
import api from '@/utils/axios'; // Assurez-vous d'importer votre instance Axios configurée

// ==========================================================
// INTERFACES POUR UN CODE PROPRE
// ==========================================================
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ==========================================================
// COMPOSANT PRINCIPAL DE L'INTERFACE DE CHAT
// ==========================================================
const LlamaChat: FC = () => {
  // --- Gestion des États (State) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Référence pour le défilement automatique
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Effet de défilement automatique
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // --- Logique d'envoi de message ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const prompt = userInput.trim();
    if (!prompt) return;

    // Mise à jour optimiste : affiche le message de l'utilisateur instantanément
    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    
    setUserInput('');
    setIsLoading(true);
    setError('');

    try {
      // Étape clé : appeler votre backend Django, pas l'API Groq directement
      const response = await api.post('/api/chat/conversation/', {
          prompt: prompt
      });

      if (!response.data || !response.data.response) {
          throw new Error("La réponse du serveur est invalide.");
      }

      const aiMessage: Message = { role: 'assistant', content: response.data.response };
      // Ajoute la réponse de l'IA à l'historique
      setMessages(prev => [...prev, aiMessage]);

    } catch (err: any) {
      console.error("Erreur lors de la récupération de la réponse :", err);
      setError("Désolé, une erreur de communication est survenue.");
      // Optionnel : supprimer le dernier message utilisateur qui a échoué
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 font-sans">
        
        {/* En-tête du chat */}
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 text-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Discuter avec TamTrack IA</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Votre coach d'apprentissage personnel</p>
        </header>

        {/* Fenêtre des messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-md p-3 rounded-lg shadow-sm whitespace-pre-wrap ${
                            msg.role === 'user' 
                                ? 'bg-orange-500 text-white rounded-br-none' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                        }`}
                    >
                        {msg.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                        <div className="flex items-center space-x-1">
                           <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                           <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                           <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef}></div>
        </div>
        
        {/* Formulaire de saisie */}
        <footer className="border-t border-gray-200 dark:border-gray-700 p-4">
            {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Posez votre question à Ahmed..."
                    disabled={isLoading}
                    className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    aria-label="Envoyer le message"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </form>
        </footer>
    </div>
  );
};

export default LlamaChat;