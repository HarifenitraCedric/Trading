"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants } from "../lib/Fonction"; 
import { MdNotifications } from "react-icons/md";


export default function Navbar() {
  // 1. État local pour stocker les données de l'utilisateur et l'état de chargement
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Récupération des données utilisateur au montage du composant
  useEffect(() => {
    // Appel de l'API pour récupérer l'utilisateur
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur de réseau ou de serveur.");
        }
        return res.json();
      })
      .then((data) => {
        // L'API renvoie un tableau, on prend le premier élément
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]);
        } else {
          setUser(null); // Utilisateur non trouvé ou tableau vide
        }
        setIsLoading(false); // Fin du chargement
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        // En cas d'erreur (réseau, serveur, etc.), on affiche "Invité" après le délai
        setIsLoading(false); 
      });
  }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage

  // 3. Logique d'affichage (gestion des états Chargement/Nom/Invité)
  const displayName = isLoading 
    ? "Chargement..." 
    : user?.username || "Invité";

  return (
    <motion.header 
      className="flex flex-col md:flex-row items-center justify-center p-4" 
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Barre de Recherche */}
      <motion.div className="relative w-full md:w-auto flex-1 " variants={containerVariants}>
        <motion.input
          type="text"
          placeholder="Rechercher quelque chose..."
          className="w-5/6 bg-white text-gray-400 border border-[#5686FE]/20 rounded-md pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5686FE] dark:bg-[#142636] ml-12"
          variants={containerVariants} 
        />
        {/* Icône de recherche */}
        <motion.div className="absolute inset-y-0 left-0 flex items-center pl-16 pointer-events-none text-gray-400" variants={containerVariants}>
          🔍
        </motion.div>
      </motion.div>

      {/* Infos Utilisateur et Paramètres */}
      <motion.div className="flex items-center space-x-4 mt-4 md:mt-0 " variants={containerVariants}>
        <ThemeToggle />
        <motion.span className="text-2xl cursor-pointer text-gray-700 dark:text-gray-300" variants={containerVariants}>
          <MdNotifications />

        </motion.span>
        
        {/* Profil et Nom d'Utilisateur */}
        <motion.div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" variants={containerVariants}>
          <Image
            src="/ragnarlot.jpg" // Chemin vers votre image
            alt="Profil utilisateur"
            width={37}
            height={37}
            className="rounded-full object-cover"
          />
          {/* AFFICHAGE DU NOM DE L'UTILISATEUR ICI */}
          <motion.span 
            className="font-semibold text-gray-800 dark:text-white truncate max-w-[120px]"
            variants={containerVariants}
          >
            {displayName}
          </motion.span>
          <motion.span className="text-lg text-gray-500 dark:text-gray-400" variants={containerVariants}>🔽</motion.span>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
