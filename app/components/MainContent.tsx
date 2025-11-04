// components/MainContent.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import ThemeSwitcher from './ThemeToggle';
import ThemeToggle from './ThemeToggle';
import LineChart from './LineChart';
import { motion } from "framer-motion";
import { itemVariants,  containerVariants} from "../lib/Fonction";
import { DollarSign, ArrowUp, Bitcoin, TrendingUp, Repeat2 } from 'lucide-react'; 
import { useState, useEffect } from 'react';
import CountUp from "react-countup";
import AllocationChart from './Allocation';


interface TransactionData {
  id: number;
  type: string;
  assetTicker: string;
  assetQuantity: number;
  totalAmountEUR: number;
  solde_actuel: number;
  executedAt: Date; 

}
const MainContent = () => {
    const [transact, setTransact] = useState<TransactionData[]>([]); 
      const [isLoadings, setIsLoadings] = useState(true);
  
      useEffect(() => {
          async function fetchTransactions() {
              try {
    const res = await fetch("/api/transaction", { method: "GET" }); 
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Erreur inconnue sans corps JSON." }));
      console.error(`Erreur ${res.status} lors de la récupération :`, errorData.message);
      return; 
    }
    
    const rawData = await res.json();
  
  
  
    // Vérifier le premier élément
    if (rawData.length > 0) {
      console.log("Premier élément - executedAt:", rawData[0].executedAt, "type:", typeof rawData[0].executedAt);
    }
  
    const data: TransactionData[] = rawData.map((item: any) => {
      let executedAtDate = null;
      if (item.executedAt) {
        // Conversion directe
        executedAtDate = new Date(item.executedAt);
        if (isNaN(executedAtDate.getTime())) {
          // Essaie de remplacer l'espace par 'T'
          const isoString = item.executedAt.replace(' ', 'T');
          executedAtDate = new Date(isoString);
          if (isNaN(executedAtDate.getTime())) {
            console.warn(`Date invalide: ${item.executedAt}`);
            executedAtDate = null;
          }
        }
      }
      return {
        ...item,
        executedAt: executedAtDate
      };
    });
  
    // Afficher les données converties
    console.log("Données converties:", data);
  
    setTransact(data);
    
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
  }
  
               finally {
                  setIsLoadings(false);
              }
          }
  
          fetchTransactions();
      }, []);
  
  
           const [wallet, setWallet] = useState<{ cash: { balance: number, currency: string }, crypto: { balance: number, currency: string } } | null>(null);
           const [isLoading, setIsLoading] = useState(true);
           const [error, setError] = useState<string | null>(null); // Ajout de la gestion d'erreur
           
           // 2. Récupération des données utilisateur au montage du composant
           useEffect(() => {
             // Fonction asynchrone pour utiliser try/catch
             const fetchWalletData = async () => {
               setIsLoading(true);
               setError(null); // Réinitialiser l'erreur
       
               try {
                 const res = await fetch("/api/wallet");
                 const data = await res.json(); 
       
                 if (!res.ok) {
                   // Utilisation du message d'erreur du backend pour un meilleur diagnostic
                   const errorMessage = data.error || data.details || "Erreur serveur inconnue.";
                   throw new Error(`Erreur API (${res.status}): ${errorMessage}`);
                 }
       
                 // L'API renvoie { cash: { balance, currency }, crypto: { balance, currency } }
                 if (data && data.cash && data.crypto) {
                   // Les balances sont déjà des nombres si le backend les a bien formatées
                   setWallet({
                     cash: {
                       balance: parseFloat(data.cash.balance), 
                       currency: data.cash.currency
                     },
                     crypto: {
                       balance: parseFloat(data.crypto.balance), 
                       currency: data.crypto.currency
                     },
                   });
                 } else {
                   // Si les données ne sont pas au bon format ou sont vides
                   setError("Format de données du portefeuille inattendu.");
                   setWallet(null);
                 }
                 
               } catch (err) {
                 console.error("Erreur lors de la récupération du portefeuille:", err);
                 setError(err instanceof Error ? err.message : "Erreur inconnue de la connexion.");
                 setWallet(null);
               } finally {
                 setIsLoading(false); // Fin du chargement, que ce soit un succès ou un échec
               }
             };
       
             fetchWalletData();
           }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage
           
           // 3. Logique d'affichage (gestion des états Chargement/Erreur/Affichage)
           // Pour l'affichage principal 'f', nous utilisons le solde cash (EUR).
           const f = isLoading 
             ? "..." 
             : error
               ? "Erreur de chargement"
               : wallet?.cash.balance !== undefined
                   ? `${wallet.cash.balance.toFixed(2)} ${wallet.cash.currency}`
                   : "Invité / Données indisponibles";
           const c = isLoading
  ? "..."
  : error
  ? "Erreur de chargement"
  : wallet?.crypto.balance !== undefined
  ? `${Number(wallet.crypto.balance).toFixed(4)} ${wallet.crypto.currency}`
  : "Invité / Données indisponibles";


       const performanceData = [
  {
    title: 'Solde Total',
    icon: <DollarSign size={24} className="text-green-500" />,
    value: f,
    change: '+1.45% (24h)',
    changeColor: 'text-[#5686FE]',
  },
  {
    title: 'BTC Prix actuel',
    icon: <Bitcoin size={24} className="text-yellow-500" />,
      value: c,

    change: '+1.123',
    changeColor: 'text-[#5686FE]',
  },
  {
    title: 'Performance Portefeuille',
    icon: <TrendingUp size={24} className="text-green-500" />,
    value: '+1.4578',
    change: 'vs. Performance d\'hier',
    changeColor: 'text-[#5686FE]',
  },
  {
    title: 'Volume Transactions 24H',
    icon: <Repeat2 size={24} className="text-blue-500" />,
    value: '4,120 ',
    change: 'Haute Liquidité',
    changeColor: 'text-gray-400',
  },
];

  return (
<main className="flex-1  md:p-12">
  {/* Header avec la barre de recherche */}
 

      {/* Balance par devise */}
<motion.section 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" 
    variants={containerVariants}
    initial="initial"
    animate="animate"
>
    {performanceData.map((item, index) => (
        <motion.div 
            key={index} 
            variants={containerVariants}
            className=" bg-white  p-4 rounded-xl flex flex-col justify-between  border border-[#5686FE]/20
         
           transition-shadow duration-100   dark:bg-[#142636]  shadow-[0_0_5px_2px_rgba(0,0,0,0.4)]  hover:shadow-[#5686FE]/10
           ">
            {/* L'ordre est inversé : Titre à gauche, Icône à droite */}
            <motion.div className="flex justify-between items-center mb-4" variants={containerVariants}>
                <span className="font-bold text-lg text-[#5686FE]/80 dark:text-[#5686FE]/70">{item.title}</span> 
                <span className="text-2xl">
                    {item.icon}
                </span>
            </motion.div>
            
            {/* Valeur Principale */}
                <p className="text-3xl font-extrabold text-gray-700 dark:text-white "> 
                <CountUp
                  start={0}
                  end={
                    parseFloat(
                      String(item.value)
                        .replace(",", ".") // remplace la virgule par un point
                        .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                    )
                  }
                  duration={1.5}
                  decimals={4}
                  separator=","
                  suffix={
                    " " +
                    (String(item.value).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                  }
                />
                </p>    
            {/* Changement / Statut */}
            <span className={`text-sm ${item.changeColor}`}>{item.change}</span>
        </motion.div>
    ))}
  </motion.section>
    <motion.div className="h-full flex flex-col lg:flex-row gap-4 " variants={containerVariants}
    initial="initial"
    animate="animate">

    {/* Première section : Bienvenue et les boutons */}
    <motion.section className="w-full lg:w-3/5 h-full" variants={containerVariants}>
    <div className="dark:bg-white bg-[#142636] rounded-xl flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 
    transition-shadow duration-100 shadow-[0_0_5px_2px_rgba(0,0,0,0.2)]">
        <div className="w-full flex-grow">
          {/* Simulation du graphique */}
          <div className="w-full h-80 bg-white rounded-xl border border-[#5686FE]/20 flex items-center justify-center text-sm text-gray-400 dark:bg-[#142636] dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
            <AllocationChart/>
          </div>
        </div>
      </div>
      
    </motion.section>
  
      {/* Deuxième section : Balance et graphique */}
      <motion.section className="w-full lg:w-2/5 h-full"  variants={containerVariants}
    initial="initial"
    animate="animate">
        <motion.div className="bg-[#142636] rounded-xl flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8" variants={containerVariants}>
          
          <div className="w-full">
            {/* Simulation du graphique */}
            <div className="w-full h-80 bg-white rounded-lg border border-[#5686FE]/20 flex items-center justify-center text-sm text-gray-400 dark:bg-[#142636] dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
              Graphique de  sèrie
              <LineChart />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
    <br />

      {/* Tableau des tokens */}
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#142636] col-span-2 bg-gray-800 rounded-xl p-6 shadow-md border border-[#5686FE]/20">
        <h3 className="text-xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Activité récente</h3>
        <div className="space-y-4">
          <div className="p-3 bg-[#203445] rounded-md flex justify-between items-center hover:bg-[#2c4056] transition-colors">
            <div className="flex items-center">
              <span className="mr-3 text-lg text-green-400">🛒</span>
              <div>
                <p className="text-gray-200 font-semibold">Nouvelle commande #456789</p>
                <p className="text-sm text-gray-400">Client: Marie Dupond</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-green-400">+$125.00</span>
          </div>
          <div className="p-3 bg-[#203445] rounded-md flex justify-between items-center hover:bg-[#2c4056] transition-colors">
            <div className="flex items-center">
              <span className="mr-3 text-lg text-red-400">❌</span>
              <div>
                <p className="text-gray-200 font-semibold">Remboursement traité</p>
                <p className="text-sm text-gray-400">Commande: #456788</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-red-400">-$35.50</span>
          </div>
          <div className="p-3 bg-[#203445] rounded-md flex justify-between items-center hover:bg-[#2c4056] transition-colors">
            <div className="flex items-center">
              <span className="mr-3 text-lg text-yellow-400">📝</span>
              <div>
                <p className="text-gray-200 font-semibold">Article mis à jour</p>
                <p className="text-sm text-gray-400">"Chaussures de running"</p>
              </div>
            </div>
            <span className="text-sm text-gray-400">il y a 2h</span>
          </div>
        </div>
      </div>
      {/* ACTIVITES RECENTS */}
      <div className="bg-white dark:bg-[#142636]  shadow-[0_0_5px_2px_rgba(0,0,0,0.6)]  col-span-1 border border-[#5686FE]/20 p-4 rounded-xl">
        <h3 className="text-[#5686FE] text-center font-bold text-lg">Recent Transaction</h3>

          <table>
            <tbody >
              {transact
              .slice(-4)
              .map((tx, index) => {
                  // Logique conditionnelle pour les styles et le montant
                  const isAchat = tx.type === 'Achat';
                  const amountColorClass = isAchat ? 'text-green-500' : 'text-green-500';
                  const badgeColorClass = isAchat ? 'bg-green-500/10 text-green-700' : 'bg-green-500/10 text-green-700';
                  
                  // Correction de type et ajout du signe
                  // FIX: Remplacement de <div> par <tr>
                  // On utilise flex et flex-col pour que le <tr> agisse comme une carte sur mobile
                  return (
                      <tr
                          key={tx.id || index}
                          className="w-full flex flex-col md:table-row border border-gray-700/50 md:border-none rounded-xl bg-white dark:bg-[#1a2333] text-white"
                        >
                          <td className="w-full flex items-center  rounded-2xl justify-between p-2">
                            {/* ==== GAUCHE ==== */}
                            <div className="flex items-center space-x-3">
                              {/* Icône */}
                              {isAchat ? (
                                <div className="p-2 rounded-full flex-shrink-0 bg-orange-500/10">
                                  <TrendingUp className="w-5 h-5 text-orange-500" />
                                </div>
                              ) : (
                                <div className="p-2 rounded-full flex-shrink-0 bg-red-500/10">
                                  <ArrowUp className="w-5 h-5 text-red-500" />
                                </div>
                              )}

                              {/* Type et Quantité */}
                              <div className="flex flex-col">
                                <span className="text-gray-700 dark:text-white text-sm font-medium">
                                  {tx.type} de {tx.assetTicker}
                                </span>
                                <span className="text-gray-400 text-xs">{tx.assetQuantity}</span>
                              </div>
                            </div>

                            {/* ==== DROITE ==== */}
                            <div className="flex flex-col items-end">
                              <span className="font-semibold text-base text-right  text-[#5686FE]/80 rounded-full bg-[#5686FE]/10 px-3 py-1">
                                {Number(tx.totalAmountEUR).toFixed(2)} £
                              </span>
                              <span className="text-gray-400 dark:text-gray-500 text-right text-xs mt-1">
                                {tx.executedAt
                                  ? new Date(tx.executedAt).toLocaleString("fr-FR", {
                                      year: "numeric",
                                      month: "numeric",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "N/A"}
                              </span>
                            </div>
                          </td>
                        </tr>

                  );
              })}
            </tbody>
          </table>
        </div>
    
    </div>
  </main>
    
  );
};

export default MainContent;