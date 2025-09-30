// pages/index.tsx
'use client';
import { useRouter } from 'next/navigation'; 

import { useState, useEffect  } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import LineChart from '../components/LineChart';
import ThemeSwitcher from '../components/ThemeToggle';
import Profil from '../components/Profil';
import Aide from '../components/Aide';
import Navbar from '../components/Navbar';
import Setting from '../components/Setting';
import PredictionPage from '../components/Prediction';
import { motion } from "framer-motion";
import { itemVariants,  containerVariants} from "../lib/Fonction";

export default function Home() {
  const [theme, setTheme] = useState('light'); // L'état du thème est ici
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
      <div className="flex w-full h-screen bg-[#F3F4F6] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black">
  {/* Sidebar fixe à gauche */}
  <Sidebar active={activePage} onSelect={setActivePage} />

  {/* Conteneur principal (Navbar + contenu) */}
  <motion.div className="flex flex-col flex-1   pt-8">
    {/* Navbar en haut */}
    <Navbar active={activePage} onSelect={setActivePage} />

    {/* Contenu qui change */}
    <main className="flex-1  overflow-y-auto">
      {activePage === "Dashboard" && <MainContent />}
      {activePage === "Profile" && <Profil />}
      {activePage === "Aide" && <Aide />}
      {activePage === "Settings" && <Setting />}
      {activePage === "Prediction" && <PredictionPage />}
    </main>
  </motion.div>
</div>
 </>
  );
  }
