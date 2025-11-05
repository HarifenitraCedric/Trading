 'use client'; 

import Image from "next/image";
import Link from "next/link";
import { FaHome, FaChartLine, FaTachometerAlt, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation"; // 👈 pour navigation manuelle
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
   const itemVariants = {
  // L'état de départ pour tous les enfants
  initial: { y: 40, opacity: 0 }, // Commence 20px plus bas et est invisible
  // L'état d'arrivée pour tous les enfants
  animate: { y: 0, opacity: 1 },
  exit: { y: -40, opacity: 0 }, // Arrive à sa position finale et devient visible
};

// 2. DÉFINITION DE L'ANIMATION DU CONTENEUR (C'est ici qu'on ajoute la cascade)
const containerVariants = {
  // L'état initial du conteneur (invisible)
  initial: { opacity: 0 },
  // L'état animate déclenche la cascade (staggerChildren)
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 1.2, // Le conteneur apparaît après 0.5s
      staggerChildren: 0.18, // Chaque enfant commence son animation 80ms après le précédent
    },
  },
  exit: { opacity: 0, transition: { duration: 0.8 } },
};
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(false);

  const handleLinkClick = (e) => {
    e.preventDefault(); // empêche le Link d'aller directement sur /accueil
    setIsExiting(true); // lance l’animation de disparition

    setTimeout(() => {
      setIsLoadingContent(true);
      router.push("/accueil"); // 👈 redirection après la fin de l’animation
    }, 400); 
     }// durée de ton animation
     
     
if (isLoadingContent) {
    return (
        // Classes Tailwind pour le centrage et la superposition
        // fixed inset-0 : plein écran | z-50 : au-dessus de tout | bg-black/80 : fond noir semi-transparent
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            {/* Tailwind pour le Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
            <p className="text-xl font-bold ml-3 text-[#5686FE]">Chargement...</p>
        </div>
    );
}
  return (
  <>
 <AnimatePresence mode="wait">
    {!isExiting && (
 
 
    <motion.div className=" w-screen h-screen h-[90vh] border-2 border-[#8DABED] rounded-2xl p-6 lg:p-10
                shadow-lg shadow-blue-500/50 backdrop-blur-sm bg-cover bg-center overflow-hidden
                bg-[url('/tako.jpg')]"
                variants={containerVariants} // ⬅️ Applique la logique de cascade
                initial="initial"
                animate="animate"
                
    >        
        {/* Header */}
        <motion.header className="flex justify-between items-center mb-8" variants={containerVariants}  // ⬅️ Applique la logique de cascade
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.div className="flex items-center space-x-2" variants={itemVariants}>
        <div className="w-14 h-14 bg-[#5686FE] rounded-full ">
          <motion.img 
            src="/log.ico" 
            alt="Dollar" 
            className="w-14 h-14 object-contain rounded-full" 
            variants={itemVariants}
             />
        </div>
        <span className="text-white text-xl font-bold tracking-wider">PREDICTINVEST</span>
      </motion.div>
      <motion.nav className="hidden lg:flex space-x-6 text-gray-300 font-medium" variants={itemVariants}>
        <Link
          onClick={handleLinkClick}
          href="/accueil"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 
                    hover:bg-[#5686FE]/20 hover:border-[#5686FE] hover:text-[#5686FE] 
                    transition-all duration-300"
        ><FaHome className="w-5 h-5" />
          <span>ACCUEIL</span>
        </Link>
        <Link
          href="/accueil"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 
                    hover:bg-[#5686FE]/20 hover:border-[#5686FE] hover:text-[#5686FE] 
                    transition-all duration-300"
        ><FaChartLine className="w-5 h-5" />
          <span>PREDICTION</span>
        </Link>
        <Link
          href="/accueil"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 
                    hover:bg-[#5686FE]/20 hover:border-[#5686FE] hover:text-[#5686FE] 
                    transition-all duration-300"
        ><FaTachometerAlt className="w-5 h-5" />
          <span>TABLEAU DE BORD</span>
        </Link>
        <Link
          href="/accueil"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 
                    hover:bg-[#5686FE]/20 hover:border-[#5686FE] hover:text-[#5686FE] 
                    transition-all duration-300"
        >
          <FaInfoCircle className="w-5 h-5" />
            <span>A PROPOS</span>
        </Link>
      </motion.nav>

      <button className="text-sm px-15 py-2 bg-[#12328B] text-white rounded-xl hover:bg-[#081660] ">
        CONNECT WALLET
      </button>
    </motion.header>

    {/* Contenu principal dans le rectangle */}
    <motion.main className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-[calc(90vh-5rem)]" variants={itemVariants}>
      {/* Texte gauche */}
      <motion.div className="text-white" 
          initial="initial"
          animate="animate"
          variants={itemVariants}
          exit="exit">
        <motion.h2 className="text-4xl lg:text-5xl font-extrabold mb-4">Financial Markets – Anticipate</motion.h2>
        <motion.h3 className="text-2xl font-bold mb-6 text-gray-200">Analyze & Predict with AI</motion.h3>
        <motion.p className="text-white-100 max-w-md mb-6">
          EXPLOITEZ L'IA POUR ANALYSER, PREVOIR ET COMPRENDRE LES TENDANCES DES MARCHES FINANCIERS;
        </motion.p>
        <motion.button className="px-6 py-3 border-2 border-[#8DABED] text-white-500 rounded-full hover:bg-[#081660] hover:text-white">
          COMMENCER L'ANALYSE
        </motion.button>
      </motion.div>

      {/* Visuel droite */}
     <div className="relative h-full flex items-center justify-center">
  {/* Cercles animés */}
      <div className="absolute w-64 h-64 bg-white-600 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute w-56 h-56 bg-white-400 rounded-full opacity-40 animate-spin-slow-reverse"></div>

        {/* Image Dollar centrée */}
        <motion.div className="relative flex items-center justify-center"  initial="initial"
          animate="animate"   variants={itemVariants}>
          <motion.img 
            src="/dollar.png" 
            alt="Dollar" 
            className="w-80 h-80 object-contain" 
            variants={itemVariants}
              // >>> AJOUT DE L'ANIMATION DE ROTATION ICI <<<
                animate={{ rotate: 360 }} // Fait une rotation complète de 360 degrés
                transition={{
                  duration: 1.5,           // La rotation dure 2 secondes
                  ease: "easeOut",       // Commence rapidement et décélère progressivement
                  loop: 4,               // Ne boucle pas (s'arrête après une rotation)
                  delay: 0.5             // Démarre l'animation de rotation après 0.5s du chargement de la page
                }}/>
            
        </motion.div>
      </div>
    </motion.main>
  </motion.div>
     )}
  </AnimatePresence>

</>

  );
}
