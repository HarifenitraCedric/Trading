"use client";
import React, { useState,useEffect } from 'react';
import {TrendingDown, ArrowUp,TrendingUp, DollarSign, Send, PlusCircle, MinusCircle, Briefcase, BarChart3, Wallet, Clock, ArrowDown, Loader, Repeat } from 'lucide-react';

import CountUp from "react-countup";
import { TbX } from 'react-icons/tb';


interface TransactionData {
  id: number;
  type: string;
  assetTicker: string;
  assetQuantity: number;
  totalAmountEUR: number;
  solde_actuel: number;
  executedAt: Date; 

}
type CurrencyKey = 'EUR' | 'USD' | 'MGA'; 

// 2. Définissez l'objet avec ce type (si ce n'est pas déjà fait)
const CONVERSION_RATES: Record<CurrencyKey, number> = {
    EUR: 1,
    USD: 1.08,
    MGA: 5200
};

// --- Composant Principal Wallet ---
const WalletPage = () => {

  
  
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

    

// 1. Mise à jour du type de l'état `wallet` pour correspondre à la réponse API
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
      ? "Chargement..." 
      : error
        ? "Erreur de chargement"
        : wallet?.cash.balance !== undefined
            ? `${wallet.cash.balance.toFixed(2)} ${wallet.cash.currency}`
            : "Invité / Données indisponibles";
    const cashBalance = wallet?.cash.balance ?? 0;
    const cryptoBalance = wallet?.crypto.balance ?? 0;
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');

    const [displayAmount, setDisplayAmount] = useState(cashBalance);
    const [displayCurrency, setDisplayCurrency] = useState('EUR');
    useEffect(() => {
  if (wallet?.cash?.balance !== undefined) {
    setDisplayAmount(wallet.cash.balance);
  }
}, [wallet]);

   const convert = (targetCurrency: CurrencyKey) => {
    setSelectedCurrency(targetCurrency);

    const rate = CONVERSION_RATES[targetCurrency];
    if (!rate) return; // sécurité si la devise n’existe pas

    // Exemple de conversion (selon ton cashBalance initial)
    const convertedAmount = cashBalance * rate;

    setDisplayAmount(convertedAmount);
    setDisplayCurrency(targetCurrency);
    };
     const displayOverride = isLoading 
            ? <span className="text-3xl text-gray-500 flex items-center"><Loader className="animate-spin mr-3" size={32} /> Chargement...</span> 
            : error 
                ? <span className="text-3xl text-red-500">Erreur de données</span>
                : null;



    return (
    <div className="flex-1  md:p-12">
        <div className=" bg-white dark:bg-[#142636] rounded-xl p-6 shadow-md transition-colors duration-300 mb-6">
            {/* Contenu Principal du Portefeuille */}
            <div className="p-8 overflow-y-auto ">
                <div className="max-w-6xl mx-auto rounded-xl">
                    <h1 className="text-4xl font-extrabold text-[#5686FE] mb-6 flex items-center">
                        <Wallet size={32} className="mr-3 text-[#5686FE]" /> Gestion du Portefeuille
                    </h1>
                    <p className="text-gray-400 dark:text-gray-100 mb-8">Gérez vos fonds, effectuez des dépôts et des retraits, et vérifiez vos soldes d'actifs.</p>

                    {/* Synthèse du Solde Total */}
                    <div className="mb-10 p-8 bg-[#5686FE]/30 dark:bg-[#1a2333] rounded-2xl shadow-2xl border border-[#5686FE]/50 flex justify-between items-center flex-wrap gap-4">
                        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
                            <div className="flex-1 space-y-4">                
                                <p className="text-xl font-medium text-gray-500 mb-2 flex items-center">
                                        <DollarSign size={20} className="mr-2 text-green-500" /> Valeur Nette Totale
                                    </p>
                                    <p className="text-5xl font-extrabold text-gray-700 dark:text-white">
                                        {displayOverride || (
                                        <CountUp
                                            start={0}
                                            end={displayAmount} // valeur à animer
                                            duration={1}
                                            decimals={2} // ✅ deux chiffres après la virgule
                                            >
                                            {({ countUpRef }) => (
                                                <span id="amount" ref={countUpRef} className="tabular-nums" />
                                            )}
                                            </CountUp>
                                            )}

                                        <span id="currency" className="ml-2 text-3xl">{displayCurrency}</span> 
                                    </p>

                        <div className="flex space-x-2 items-center flex-wrap">
                            <span className="text-sm text-gray-400 mr-2 shrink-0">Afficher en:</span>
                            {['EUR', 'USD', 'MGA'].map(currency => (
                            <button
                                key={currency}
                                className={`px-3 py-1 mx-1 text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg
                                ${selectedCurrency === currency
                                    ? 'bg-bleu text-white'
                                    : 'bg-[#5686FE] text-white hover:bg-white hover:text-[#5686FE]'
                                }`}
                                onClick={() => convert(currency)}
                            >
                                {currency}
                            </button>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 md:w-56">        
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-[1.01]">
                        <PlusCircle size={24} className="mr-2" /> Déposer des Fonds
                    </button>
                    <button className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-300 transition duration-300 transform hover:scale-[1.01]">
                                <MinusCircle size={24} className="mr-2" /> Retirer des Fonds                           
                    </button>
                </div>
            </div>
       {/* Détail des Soldes d'Actifs */}
                <h2 className="text-2xl font-bold text-[#5686FE] mb-6 flex items-center">
                    <Briefcase size={24} className="mr-2 text-[#5686FE]" /> Soldes par Devise/Actif
                </h2>
            <div className="flex flex-wrap justify-between gap-4 w-full mt-6 ">
                     {/* BTC */}
                <div className="flex-1 min-w-[120px] bg-[#5686FE]/30 dark:bg-[#1a2333] text-white p-4 rounded-xl shadow-md flex flex-col items-center border border-[#5686FE]/50">
                    <span className="text-xl  dark:text-gray-300 text-gray-700">Bitcoin (BTC)</span>
                    <span className="text-xl font-semibold mt-2">
                    <CountUp
                start={0}
                end={
                  parseFloat(
                    String(cryptoBalance)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(cryptoBalance).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              />
                    </span>
                </div>

                {/* Ethereum */}
                <div className="flex-1 min-w-[120px] bg-[#5686FE]/30 dark:bg-[#1a2333] text-white p-4 rounded-xl shadow-md flex flex-col items-center border border-[#5686FE]/50">
                    <span className="text-xl dark:text-gray-300 text-gray-700">Ethereum (ETH)</span>
                    <span className="text-xl font-semibold mt-2">
                        <CountUp 
                        start={0}
                        end={50}
                        duration={2.5}
                        decimals={4}
                        />
                    </span>
                </div>

                {/* Solana */}
                <div className="flex-1 min-w-[120px] bg-[#5686FE]/30 dark:bg-[#1a2333] text-white p-4 rounded-xl shadow-md flex flex-col items-center border border-[#5686FE]/50">
                    <span className="text-xl dark:text-gray-300 text-gray-700">Solana (SOL)</span>
                    <span className="text-xl font-semibold mt-2">
                         <CountUp 
                        start={0}
                        end={30}
                        duration={2.5}
                        decimals={4}
                        />
                    </span>
                </div>
                </div>
                <br />

                    {/* Historique des transact */}
                    <h2 className="text-2xl font-bold text-[#5686FE] mb-4 flex items-center">
                            <Clock size={24} className="mr-2 text-[#5686FE]" /> Historique des transact Récemment
                        </h2>
                    <div className="mt-7 p-6 bg-[#5686FE]/40 dark:bg-[#1a2333] rounded-xl border border-[#5686FE]/50">
                        <table className="w-full border-separate bg-white  dark:bg-[#1a2333] border-spacing-0">
                            <thead className="w-full ">
                                {/* En-tête Desktop */}
                                <tr className="hidden md:table-row bg-gray-300/40 text-xs font-semibold uppercase text-gray-300  rounded-lg">
                                    <th className="w-1/4 px-6 py-6 text-center text-gray-700 dark:text-white">Transaction</th>
                                    <th className="w-1/4 px-6 py-6 text-center text-gray-700 dark:text-white">Quantite</th>
                                    <th className="w-1/4 px-6 py-6 text-center  text-gray-700 dark:text-white">Date</th>
                                    <th className="w-1/4 px-6 py-6 text-right text-gray-700 dark:text-white">Montant</th>
                                    <th className="w-1/4 px-6 py-6 text-right text-gray-700 dark:text-white">Solde Actuel</th>
                                </tr>
                            </thead>

                            <tbody >
                                {transact.map((tx, index) => {
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
                                            className={`flex flex-col md:table-row mb-4 md:mb-0 border border-gray-700/50 md:border-none rounded-xl className="bg-white  dark:bg-[#1a2333]" text-white`}
                                        >
                                            
                                            {/* COLONNE 1: Transaction (Icone + Type) - DOIT être un <td> */}
                                            <td className="px-4 py-3 md:py-6 md:px-6 w-full md:w-1/4 flex items-center justify-between md:justify-start">
                                                {/* Icône */}
                                                {isAchat ? (
                                                    <div className="p-3 rounded-full flex-shrink-0 bg-orange-500/10">
                                                        <TrendingUp className="w-5 h-5 text-orange-500" />
                                                    </div>
                                                ) : (
                                                    <div className="p-3 rounded-full flex-shrink-0 bg-red-500/10">
                                                        <ArrowUp className="w-5 h-5 text-red-500" />
                                                    </div>
                                                )}
                                                {/* Type de transaction */}
                                                <div className="text-gray-700 dark:text-white font-semibold ml-4 whitespace-nowrap">
                                                    {tx.type} de {tx.assetTicker}
                                                </div>

                                                {/* Montant Mobile (affiché ici dans le <td> de la transaction pour la vue 'carte') */}
                                                <div className="md:hidden flex flex-col items-end">
                                                    <p className={`font-bold text-base ${amountColorClass}`}>
                                                        {Number(tx.totalAmountEUR).toFixed(2)}
                                                    </p>
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${badgeColorClass}`}>
                                                        Terminé
                                                    </span>
                                                </div>
                                            </td>

                                            {/* COLONNE 2: Quantite - DOIT être un <td> (Masqué sur mobile) */}
                                            <td className="hidden md:table-cell px-6 py-6 text-center w-1/4">
                                                <span className="font-semibold text-[#5686FE] rounded-full bg-[#5686FE]/10 p-2">
                                                    {tx.assetQuantity}
                                                </span>
                                            </td>

                                            {/* COLONNE 3: Date - DOIT être un <td> (Masqué sur mobile) */}
                                            <td className="hidden md:table-cell px-6 py-6 text-center w-1/4">
                                                <span className="text-sm text-gray-400">
                                                    {tx.executedAt ? tx.executedAt.toLocaleString("fr-FR", {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit' // Optionnel : pour afficher les secondes
                                                }) : "N/A"}
                                                </span>
                                            </td>

                                            {/* COLONNE 4: Montant et Statut - DOIT être un <td> (Masqué sur mobile, affiché sur desktop) */}
                                         
                                             <td className="hidden md:table-cell px-6 py-6 text-center w-1/4">
                                                <span className="font-semibold text-[#5686FE] rounded-full bg-[#5686FE]/10 p-2">
                                                    {Number(tx.totalAmountEUR).toFixed(2)} £
                                                </span>
                                            </td>  
                                             <td className="hidden md:table-cell px-6 py-6 text-right w-1/4">
                                                <div className="flex flex-col items-end">
                                                    <p className={`font-bold text-base ${amountColorClass}`}>
                                                        {Number (tx.solde_actuel).toFixed(2)}£
                                                    </p>
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${badgeColorClass}`}>
                                                        Terminé
                                                    </span>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                        <button className="mt-4 text-sm text-green-500 hover:text-green-400 transition-colors flex items-center">
                            Consulter l'historique complet <Send size={16} className="ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
   
    );
};

export default WalletPage;
