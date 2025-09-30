// components/MainContent.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import ThemeSwitcher from './ThemeToggle';
import ThemeToggle from './ThemeToggle';
import LineChart from './LineChart';
import { motion } from "framer-motion";
import { itemVariants,  containerVariants} from "../lib/Fonction";
const MainContent = () => {
  return (
<main className="flex-1  md:p-12">
  {/* Header avec la barre de recherche */}
 <motion.div className="flex flex-col lg:flex-row gap-4 " variants={containerVariants}
      initial="initial"
      animate="animate">

  {/* Première section : Bienvenue et les boutons */}
  <motion.section className="w-full lg:w-2/5 h-full" variants={containerVariants}>
    <div className="w-full h-40 bg-white rounded-lg flex items-center justify-center text-sm text-gray-400 dark:bg-[radial-gradient(at_top_right,_#5686FE_1%,_#5686FE_20%,_#142636_60%,_#142636_30%)] dark:to-blue-700 dark:text-white">
      <div >
        <h2 className="text-xl font-bold">Market Prediction Dashboard</h2>
        <p className="text-sm text-gray-500">Global Market Sentiment</p>
      </div>
      <div className="flex items-center space-x-2 text-green-500">
        <button className="hidden sm:block">+ Add Payment</button>
        <button className="hidden sm:block">↑ Send Invoice</button>
        <button className="sm:hidden text-2xl">+</button>
        <button className="sm:hidden text-2xl">↑</button>
      </div>
    </div>
  </motion.section>
  
  {/* Deuxième section : Balance et graphique */}
  <section className="w-full lg:w-3/5 h-full">
    <div className="bg-[#142636] rounded-xl flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
      
      <div className="w-full">
        {/* Simulation du graphique */}
        <div className="w-full h-40 bg-white rounded-lg flex items-center justify-center text-sm text-gray-400 dark:bg-[#142636]">
          Graphique de  sèrie
          <LineChart />
        </div>
      </div>
    </div>
  </section>
</motion.div> <br />

      {/* Balance par devise */}
      <motion.section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" variants={containerVariants}
      initial="initial"
      animate="animate">
        {['USD', 'EUR', 'GBP', 'JPY'].map((currency) => (
          <motion.div 
            key={currency} 
            variants={containerVariants}
            className="bg-white p-6 rounded-xl flex flex-col justify-between hover:bg-[#5686FE] transition-colors cursor-pointer dark:bg-[radial-gradient(at_top_right,_#5686FE_4%,_#142636_60%,_#142636_30%)] dark:hover:bg-[#203445]"
          
          >
            <motion.div className="flex justify-between items-center mb-4" variants={containerVariants}>
              <span className="text-2xl">
                {currency === 'USD' ? '💲' : currency === 'EUR' ? '💶' : currency === 'GBP' ? '💷' : '💴'}
              </span>
              <span className="font-bold text-lg">{currency}</span>
              <span className="text-green-500">↗️</span>
            </motion.div>
            <p className="text-2xl font-bold text-white my-2">£8,923</p>
            <span className="text-green-500 text-sm">+40,225</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Tableau des tokens */}
      <div className="bg-[#142636] rounded-xl p-6 shadow-md">
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
    </main>
  );
};

export default MainContent;