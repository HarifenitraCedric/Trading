// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import { MessageSquare, Send, Bot, User, X, Loader, CornerDownLeft, AlertCircle } from 'lucide-react';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { role: 'bot', text: "Bonjour ! Je suis ZenithBot, votre assistant IA personnel. Comment puis-je vous aider à naviguer dans l'application ou répondre à vos questions sur le trading ?" },
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Configuration du modèle Gemini
//   const GEMINI_MODEL = "gemini-2.5-flash-preview-05-20";
//   const apiKey = ""; 

//   // Prompt système pour personnaliser le chatbot
//   const systemPrompt = "Vous êtes 'ZenithBot', un assistant IA professionnel et encourageant pour une application moderne de trading et de crypto-monnaies. Votre objectif est de guider les utilisateurs à travers les fonctionnalités de l'application (Trading, Taux en Temps Réel, Tableau de Bord) et de fournir des solutions claires et concises aux problèmes courants ou aux messages d'erreur simulés. Utilisez un ton de soutien et restez formel, et répondez toujours en français.";
  
//   // Faire défiler vers le bas chaque fois que les messages changent
//   useEffect(() => {
//     if (messagesEndRef.current) {
//         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);


//   // Fonction pour simuler la réponse de l'IA (avec gestion des erreurs personnalisée)
//   const getBotResponse = async (userQuery) => {
//     // 1. Détection des erreurs spécifiques demandées par l'utilisateur
//     if (userQuery.toLowerCase().includes("module not found") || userQuery.toLowerCase().includes("erreur recharts") || userQuery.toLowerCase().includes("lucide-react")) {
//         return "Je comprends que vous rencontrez une erreur de type **'Module not found'**. Ce type d'erreur se produit lorsque votre projet tente d'utiliser une librairie qui n'a pas été installée. Si l'erreur concerne 'recharts' ou 'lucide-react', vous devez l'installer via votre terminal en utilisant `npm install [nom-du-module]` ou `yarn add [nom-du-module]`. Cela devrait résoudre le problème de construction (Build Error).";
//     }

//     // 2. Préparation de l'historique et du payload
//     const chatHistory = messages.slice(1).map(msg => ({ // Exclure le message initial du bot pour le contexte
//         role: msg.role === 'user' ? 'user' : 'model',
//         parts: [{ text: msg.text }]
//     }));
//     chatHistory.push({ role: 'user', parts: [{ text: userQuery }] });

//     const payload = {
//         contents: chatHistory,
//         systemInstruction: {
//             parts: [{ text: systemPrompt }]
//         },
//     };

//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

//     // 3. Appel de l'API avec Backoff Retry (Max 3 tentatives)
//     const MAX_RETRIES = 3;
//     for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 if (response.status === 403) {
//                     // C'est ici que nous gérons l'erreur 403 sans bloquer l'interface
//                     console.error("Erreur 403: Clé API invalide ou manquante. Utilisation d'une réponse de secours simulée.");
//                     // Retourne une réponse de secours pour ne pas casser l'application
//                     return "Je suis désolé, mon accès aux serveurs d'IA est actuellement bloqué (Erreur 403 - Clé invalide). En attendant que mon administrateur rétablisse l'accès, voici une astuce de trading : 'N'investissez jamais plus que ce que vous êtes prêt à perdre !' ";
//                 }
//                 throw new Error(`Erreur HTTP! Statut: ${response.status}`);
//             }

//             const result = await response.json();
//             const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas pu générer de réponse pour le moment. Veuillez réessayer.";
//             return text;

//         } catch (error) {
//             if (error.message.includes('403')) {
//                 // Si l'erreur 403 a été levée, le message de secours sera déjà retourné ci-dessus.
//                 return error.message; 
//             }
//             if (attempt < MAX_RETRIES - 1) {
//                 // Attendre de manière exponentielle avant de réessayer
//                 const delay = Math.pow(2, attempt) * 1000;
//                 await new Promise(resolve => setTimeout(resolve, delay));
//             } else {
//                 console.error("Gemini API call failed after multiple retries:", error);
//                 // Retourner le message d'erreur spécifique en cas d'échec
//                 return "Je rencontre des difficultés à me connecter au serveur d'IA. Veuillez vérifier votre connexion ou réessayer plus tard.";
//             }
//         }
//     }
//   };

//   // Gestion de l'envoi du message
//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userQuery = input.trim();
//     const newUserMessage = { role: 'user', text: userQuery };

//     // 1. Mettre à jour l'historique avec le message de l'utilisateur
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInput('');
//     setIsLoading(true);

//     // 2. Obtenir la réponse du bot
//     try {
//         const botResponseText = await getBotResponse(userQuery);
//         const newBotMessage = { role: 'bot', text: botResponseText };
//         setMessages((prev) => [...prev, newBotMessage]);
//     } catch (error) {
//         // Le catch est principalement là pour les erreurs de connexion/réseau non gérées par la fonction getBotResponse
//         const errorMessage = { role: 'bot', text: "Une erreur réseau inattendue est survenue. Veuillez consulter la console pour les détails." };
//         setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   // Composant pour un seul message
//   const MessageBubble = ({ message }) => {
//     const isUser = message.role === 'user';
//     const baseClasses = "max-w-[85%] px-4 py-3 rounded-xl shadow-md mb-3";
    
//     // Détecter si c'est la réponse de secours 403 pour ajouter une alerte visuelle
//     const isFallback403 = message.role === 'bot' && message.text.includes('Erreur 403');

//     return (
//       <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//         <div className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
//           {!isUser && (
//             <div className="p-2 mr-2 rounded-full bg-green-500 text-white">
//               <Bot size={16} />
//             </div>
//           )}
//           <div className={`${baseClasses} ${isUser 
//             ? 'bg-green-600 text-white rounded-br-none' 
//             : isFallback403 ? 'bg-red-900 border border-red-700 text-gray-200 rounded-tl-none' : 'bg-[#203445] text-gray-200 rounded-tl-none'}`}
//           >
//             {isFallback403 && <AlertCircle size={20} className="inline mr-2 text-red-400" />}
//             <p className="whitespace-pre-wrap">{message.text}</p>
//           </div>
//           {isUser && (
//             <div className="p-2 ml-2 rounded-full bg-gray-500 text-white">
//               <User size={16} />
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     // Conteneur principal fixe en bas à droite
//     <div className="fixed bottom-6 right-6 z-50 font-sans">
      
//       {/* 1. Fenêtre de Chat */}
//       {isOpen && (
//         <div className="bg-[#141a29] rounded-2xl shadow-2xl flex flex-col w-full max-w-sm md:max-w-md h-[500px] border border-gray-700 overflow-hidden">
          
//           {/* En-tête */}
//           <div className="flex justify-between items-center p-4 bg-[#1a2333] border-b border-gray-700">
//             <h3 className="text-xl font-bold text-green-500 flex items-center">
//               <Bot size={24} className="mr-2" /> ZenithBot
//             </h3>
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="p-1 rounded-full text-gray-400 hover:bg-gray-700 transition-colors"
//               aria-label="Fermer le Chat"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Corps des Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
//             {messages.map((msg, index) => (
//               <MessageBubble key={index} message={msg} />
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="flex items-center space-x-2 bg-[#203445] text-gray-200 px-4 py-2 rounded-xl rounded-tl-none shadow-md">
//                   <Loader size={16} className="animate-spin text-green-500" />
//                   <span className="text-sm">ZenithBot est en train d'écrire...</span>
//                 </div>
//               </div>
//             )}
//             {/* Div pour maintenir le défilement automatique vers le bas */}
//             <div ref={messagesEndRef} id="end-of-messages" />
//           </div>

//           {/* Champ de Saisie */}
//           <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-[#1a2333]">
//             <div className="flex items-center bg-[#203445] rounded-xl overflow-hidden">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Posez votre question (ex: 'Comment acheter BTC ?')"
//                 className="w-full bg-transparent p-3 text-white placeholder-gray-500 focus:outline-none"
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim() || isLoading}
//                 className={`p-3 transition-colors ${
//                   !input.trim() || isLoading
//                     ? 'text-gray-600 cursor-not-allowed'
//                     : 'bg-green-600 text-white hover:bg-green-700'
//                 }`}
//                 aria-label="Envoyer"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-1 flex items-center">
//                 <CornerDownLeft size={12} className="mr-1"/> Appuyez sur Entrée pour envoyer
//             </p>
//           </form>
//         </div>
//       )}
      
//       {/* 2. Bouton Bascule (Floating Button) */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`p-4 rounded-full shadow-lg transition-all transform ${
//           isOpen 
//             ? 'bg-red-600 hover:bg-red-700 text-white rotate-90' 
//             : 'bg-green-600 hover:bg-green-700 text-white'
//         }`}
//         aria-label={isOpen ? 'Fermer le Chat' : 'Ouvrir le Chat'}
//       >
//         {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
//       </button>

//       {/* Styles personnalisés pour la scrollbar (optionnel) */}
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #1a2333;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #374151;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #4b5563;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Chatbot;
