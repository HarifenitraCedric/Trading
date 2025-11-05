'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function Chat() {
  // Gère l'état de la saisie localement pour plus de contrôle
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Récupère les messages, l'état de chargement et la fonction d'envoi du Hook
  const {
    messages,
    sendMessage,
    status, stop
    // On n'utilise PAS l'input, handleInputChange, ni handleSubmit du hook
  } = useChat({
    onData:(data)=>{
      console.log(data.data)
    },
    onFinish:()=>{
      console.log("Prompt OK")
    }
  });

  // Fonction de soumission personnalisée
  const handleSubmission =async (e:any) => {
    e.preventDefault(); // <-- IMPÉRATIF : Empêche le rechargement de la page

    // 1. Vérifie si l'input est vide (protection contre l'envoi de messages vides)
    if (!input.trim()) return;
    setInput('');
    // 2. Envoie le message via le Hook
    await sendMessage({ text: input,});

    // 3. Vide le champ après l'envoi
  };

  // Condition pour désactiver le bouton (robuste contre 'undefined')
  const isButtonDisabled = isLoading || !String(input ?? '').trim();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch h-screen">
      

      {(status === 'submitted' || status === 'streaming') && (
        <div>
          {status === 'submitted' && "Veuiller attendre"}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}  

      {/* -------------------- Affichage des Messages -------------------- */}
      <div className="flex-grow overflow-y-auto space-y-4 p-4 mb-20">
        {messages.map(message => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap p-3 rounded-lg max-w-[85%] ${message.role === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-gray-800 mr-auto dark:bg-zinc-800 dark:text-gray-200'
              }`}
          >
            {message.parts.map((part, i) => {
              if (part.type === 'text') {
                return <p key={`${message.id}-${i}`}>{part.text}</p>;
              }
              return null;
            })}
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <div className="text-gray-500 italic">L'IA est en train d'écrire...</div>
        )}
      </div>

      {/* -------------------- Formulaire de Saisie -------------------- */}
      <form
        onSubmit={handleSubmission} // Utilisation de notre fonction qui fait e.preventDefault()
        className="fixed bottom-0 w-full max-w-md p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex space-x-2">
          <input
            className="flex-grow p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"

            // L'input est contrôlé par l'état local
            value={input}
            placeholder="Dites bonjour à votre chatbot..."

            // Met à jour l'état local 'input'
            onChange={e => setInput(e.currentTarget.value)}

            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isButtonDisabled} // Utilisation de la condition robuste
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}