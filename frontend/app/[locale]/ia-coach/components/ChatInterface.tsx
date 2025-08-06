// app/[locale]/ia-coach/components/ChatInterface.tsx
"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import LearningProfileCard from './LearningProfileCard';

// Le type 'content' est bien ReactNode
type Message = {
    role: 'user' | 'assistant';
    content: ReactNode;
};

// Initialisation vide, plus propre pour une conversation réelle
const initialMessages: Message[] = [
     { role: 'assistant', content: "Bonjour  ! Je suis votre IA Coach. Posez-moi une question ou demandez-moi d'analyser votre profil d'apprentissage." },
];

const ChatInterface: FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: input };
        const newMessages = [...messages, newUserMessage]; // Préparer le nouveau message
        setMessages(newMessages); // Afficher immédiatement le message de l'utilisateur
        setInput('');
        setIsLoading(true);
        
        const historyForApi = newMessages
            .filter(msg => typeof msg.content === 'string')
            .map(msg => ({ role: msg.role, content: msg.content as string }));

        try {
            const apiResponse = await fetch('http://127.0.0.1:8000/api/chat/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input, history: historyForApi.slice(0, -1) }), // Envoyer l'historique AVANT le nouveau message
            });
            if (!apiResponse.ok) throw new Error("Erreur réseau");
            
            const data = await apiResponse.json();
            let assistantResponse: Message;

            if (data.response.trim() === '**[ANALYSE_PROFIL]**') {
                assistantResponse = { role: 'assistant', content: <LearningProfileCard /> };
            } else {
                assistantResponse = { role: 'assistant', content: data.response };
            }
            
            setMessages(prev => [...prev, assistantResponse]);
            
        } catch (error) {
            const errorResponse: Message = { role: 'assistant', content: "Désolé, une erreur est survenue." };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col h-full">
            {/* Header du chat (pas de changement) */}
            <div className="p-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">TAMTRACK IA</h3>
                <p className="text-xs text-green-500">En ligne</p>
            </div>

            {/* Corps du chat */}
            <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && typeof msg.content === 'string' && (
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 flex-shrink-0"><FiUser/></div>
                        )}
                        
                        <div className={typeof msg.content === 'string' ? `max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}` : 'w-full'}>
                           <div className="text-sm">{msg.content}</div>
                        </div>
                    </div>
                ))}
                
                {/* 
                =======================================================
                LA CORRECTION EST ICI. Le JSX de l'indicateur de 
                chargement a été restauré.
                =======================================================
                */}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 flex-shrink-0">
                            <FiUser/>
                        </div>
                        <div className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                            <span className="animate-pulse">...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Formulaire de saisie (pas de changement) */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 flex items-center gap-2">
                 <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tapez votre message..." className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
                 <button type="submit" className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50" disabled={isLoading || !input.trim()}><FiSend /></button>
            </form>
        </div>
    );
};

export default ChatInterface;