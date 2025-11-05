"use client";
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { itemVariants,  containerVariants} from "../lib/Fonction";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaEnvelope, FaHome, FaPhone, FaInfoCircle, FaFileAlt } from 'react-icons/fa';
import {  Zap, 
    Shield, Settings, Lock, Bell 
} from 'lucide-react'; 

const Profil = () => {
 
  const SettingButton = ({ label, icon: Icon, action = "Gérer" }) => (
    <button className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-[#1A2E40] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-[#5686FE] hover:text-white dark:hover:bg-[#456ceb] transition-all duration-200 group text-center">
        <Icon className="w-6 h-6 text-[#5686FE] group-hover:text-white transition-colors" />
        <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">{label}</span>
        <span className="text-xs text-[#5686FE] group-hover:text-white transition-colors italic mt-1">{action}</span>
    </button>
);

  const user = {
    name: "Ragnar Lodbrok",
    email: "ragnar@gmail.com",
    bio: "Développeur passionné par la finance décentralisée et la technologie.",
    avatar: "https://placehold.co/150x150/0A141E/EAEFF5?text=R",
    stats: {
      totalFunds: "$54,123.50",
      tradingVolume: "$12,450.00",
      transactionCount: 234
    }
  };

  const recentTransactions = [
    { id: 1, type: "Achat", token: "ETH", amount: "1.2 ETH", date: "2023-10-25" },
    { id: 2, type: "Vente", token: "BTC", amount: "0.05 BTC", date: "2023-10-24" },
    { id: 3, type: "Dépôt", token: "USD", amount: "$1000", date: "2023-10-23" },
    { id: 4, type: "Achat", token: "SOL", amount: "5 SOL", date: "2023-10-22" },
  ];

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

  return (
    <main className="flex-1  md:p-12">
    <motion.div className="flex font-sans min-h-screen  text-gray-300 dark:text-gray-300 transition-colors duration-300"
    >
      
      {/* Sidebar - Same as Dashboard */}
     

      {/* Main content */}
      <motion.div className="flex-1 " >

        {/* User Profile Section */}
        <motion.section className="bg-white dark:bg-[#142636] rounded-xl border border-[#5686FE]/20 p-6 mb-8 shadow-md transition-colors duration-300 dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]" variants={containerVariants}
      initial="initial"
      animate="animate">
          <motion.div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8" variants={containerVariants}>
            <img 
              src="/ragnarlot.jpg"
              alt={`Profil de ${user.name}`}
              className="w-24 h-24 rounded-full border-4 border-[#5686FE]"
            />
            <div>
              
              <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-100">
                {user.name}
              </h2>
              
              <div className="flex items-center gap-3 mt-2">
                <FaEnvelope className="text-blue-500 text-xl" />
                <p className="text-md text-gray-700 dark:text-gray-100">{user.email}</p>
               </div>
               <div className="flex items-center gap-3 mt-2">
                <FaPhone className="text-blue-500 text-xl" />
                <p className="text-md text-gray-700 dark:text-gray-100">032 12 373 29</p>
               </div>
              <div className="flex items-center gap-3 mt-2"> 
                <FaHome className="text-blue-500 text-xl" />
                <p className="text-md text-gray-700 dark:text-gray-100">Antananarivo, Madagascar</p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <FaInfoCircle  className="text-blue-500 text-xl" />
                <p className="text-sm  text-gray-700 dark:text-gray-100">{user.bio}</p>
              </div>
             
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" variants={containerVariants}
      initial="initial"
      animate="animate">
          <motion.div className="bg-white dark:bg-[#142636] p-6  border border-[#5686FE]/20 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300 dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]" variants={containerVariants}>
            <span className=" font-bold text-lg text-[#5686FE]">Total des fonds</span>
            <p className="text-3xl font-bold text-gray-700 dark:text-white my-2"><CountUp
                start={0}
                end={
                  parseFloat(
                    String(f)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(f).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              />
</p>
          </motion.div>
          <motion.div className="bg-white dark:bg-[#142636] border border-[#5686FE]/20 p-6 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300 dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]" variants={containerVariants}>
            <span className=" font-bold text-lg text-[#5686FE]">Volume de trading</span>
            <p className="text-3xl font-bold text-gray-700 dark:text-white my-2">
              <CountUp
                start={0}
                end={
                  parseFloat(
                    String(user.stats.tradingVolume)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(user.stats.tradingVolume).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              />
              EUR
            </p>
          </motion.div>
          <motion.div className="bg-white dark:bg-[#142636] border border-[#5686FE]/30 p-6 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300 dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]" variants={containerVariants}>
            <span className=" font-bold text-lg text-[#5686FE]">Transactions</span>
            <p className="text-3xl font-bold text-gray-700 dark:text-white my-2">
              <CountUp
                start={0}
                end={
                  parseFloat(
                    String(user.stats.transactionCount)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(user.stats.transactionCount).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              />
            </p>
          </motion.div>
        </motion.section>

        {/* Recent Transactions Table */}
            <motion.section className="bg-[#142636] rounded-xl  transition-colors duration-300 border border-[#5686FE]/30"
              variants={containerVariants}
              initial="initial"
              animate="animate">
                <motion.section 
                      className="bg-white dark:bg-[#142636] rounded-xl  p-6 shadow-xl" 
                      variants={itemVariants}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2"><Settings className='w-6 h-6 text-[#5686FE]'/> Réglages Rapides</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <SettingButton label="Changer Mot de Passe" icon={Lock} action="Sécurité" />
                        <SettingButton label="Activer 2FA" icon={Zap} action="Sécurité" />
                        <SettingButton label="Gestion des Alertes" icon={Bell} action="Préférences" />
                        <SettingButton label="Niveau KYC" icon={Shield} action="Mettre à Jour" />
                    </div>
                </motion.section>
        </motion.section>
      </motion.div>
    </motion.div>
  </main>
  );
};

export default Profil;
