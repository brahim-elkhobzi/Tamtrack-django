// app/[locale]/tutoring/components/TutorChat.tsx
"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import { MathJax } from "better-react-mathjax";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

// Conversation initiale de la maquette
const initialMessages: Message[] = [
    { role: 'assistant', content: "Salam ! Je suis Ahmed, ton tuteur IA. Comment puis-je t'aider aujourd'hui ?" },
    ];

const TutorChat: FC = () => {
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
        const history = [...messages, newUserMessage];
        setMessages(history);
        setInput('');
        setIsLoading(true);

        try {
            const apiResponse = await fetch('http://127.0.0.1:8000/api/tutoring/', { // <-- NOTE: URL pour le tuteur
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input, history: messages }), // On envoie l'ancien historique
            });
            if (!apiResponse.ok) throw new Error("Erreur réseau");
            
            const data = await apiResponse.json();
            const assistantResponse: Message = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, assistantResponse]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur est survenue." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col h-[80vh]">
            <div className="p-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">Ahmed - Ton Tuteur IA</h3>
                <p className="text-xs text-green-500">En ligne</p>
            </div>
            <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 flex-shrink-0"><FiUser/></div>}
                        <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                           <p className="text-sm"><MathJax>{msg.content}</MathJax></p>
                        </div>
                    </div>
                ))}
                 {isLoading && <div className="animate-pulse">...</div>}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 flex items-center gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pose ta question à Ahmed..." className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <button type="submit" className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50" disabled={isLoading || !input.trim()}><FiSend /></button>
            </form>
        </div>
    );
};

export default TutorChat;