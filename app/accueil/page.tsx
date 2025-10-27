"use client";
export const dynamic = "force-dynamic";

import { useRouter } from 'next/navigation'; 
import { useState, useEffect  } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ThemeSwitcher from '../components/ThemeToggle';
import Profil from '../components/Profil';
import Aide from '../components/Aide';
import Navbar from '../components/Navbar';
import Setting from '../components/Setting';
import PredictionPage from '../components/Advanced_charts';
import { motion } from "framer-motion";
import TradingPage from '../components/Trading';
import TauxDeChange from '../components/Market';
import WalletPage from '../components/Wallet';
import HistoryPage from '../components/Test';
// NOTE : Il n'est pas nécessaire d'importer prisma ici car c'est un composant client.
// L'import 'prisma' est une erreur courante dans les composants client.

// Supposons que ces imports existent, sinon ils peuvent causer des erreurs :
// import { itemVariants, containerVariants} from "../lib/Fonction";
const itemVariants = {}; 
const containerVariants = {};


export default function Home() {
  // L'état 'user' doit être un objet ou null
 

  // État de chargement pour un meilleur UX
  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useState('light'); 
  const [activePage, setActivePage] = useState("Dashboard");
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
    useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  }, [activePage]);



  return (
    <>
      <Head>
        <title>App Dashboard</title>
      </Head>
      <div className="flex w-full h-screen bg-[#5686FE]/20 dark:from-gray-900 dark:bg-[url('/izy.png')]">
        {/* Sidebar fixe à gauche */}
        <Sidebar active={activePage} onSelect={setActivePage} />

        {/* Conteneur principal (Navbar + contenu) */}
        <motion.div className="flex flex-col flex-1 pt-4">
          {/* Navbar en haut */}
          <Navbar 
          active={activePage} onSelect={setActivePage} // On passe le nom d'utilisateur à la Navbar
          />

          {/* Contenu qui change */}
          <main className="flex-1 overflow-y-auto "> {/* Ajout de padding ici pour l'esthétique */}
            
            
            {activePage === "Dashboard" && <MainContent />}
            {activePage === "Profile" && <Profil />}
            {activePage === "Aide" && <Aide />}
            {activePage === "Settings" && <Setting />}
            {activePage === "Advanced Charts" && <PredictionPage />}
            {activePage === "Trading" && <TradingPage />}
            {activePage === "Market" && <TauxDeChange />}
            {activePage === "Wallet" && <WalletPage />}
            {activePage === "Test" && <HistoryPage />}
          </main>
        </motion.div>
      </div>
    </>
  );
}
