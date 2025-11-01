// // app/api/chat/route.ts

// import { streamText, convertToModelMessages } from 'ai';
// import { createProvider, Model } from '@ai-sdk/core'; // Assurez-vous d'avoir bien installé ce package
// import { NextResponse } from 'next/server'; 

// export const maxDuration = 30;

// // 1. DÉFINITION MANUELLE DU FOURNISSEUR OPENROUTER
// const openrouter = createProvider({
//   id: 'openrouter',
//   baseURL: 'https://openrouter.ai/api/v1',
//   headers: {
//     // Lis la clé depuis la variable OPENROUTER_API_KEY
//     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//   },
//   // Liste simplifiée des modèles pour la compatibilité
//   getModels: async () => {
//     return [
//       { id: 'nousresearch/nous-hermes-2-mixtral-8x7b-dpo' } as Model,
//       { id: 'mistralai/mistral-7b-instruct' } as Model,
//     ];
//   },
// });


// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json(); 

//     const result = streamText({
//       // 2. UTILISATION DU MODÈLE GRATUIT OPENROUTER
//       model: openrouter('nousresearch/nous-hermes-2-mixtral-8x7b-dpo'), 
//       messages: convertToModelMessages(messages), 
//     });

//     return result.response; 
    
//   } catch (error) {
//     console.error("ERREUR CRITIQUE DANS L'API OpenRouter:", error); 
    
//     return NextResponse.json(
//       { 
//         error: "Échec de la route. Vérifiez si votre clé OpenRouter est bien chargée." 
//       }, 
//       { status: 500 }
//     );
//   }
// }