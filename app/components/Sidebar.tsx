"use client";

import { FaChartPie, FaComment, FaChartArea, FaStore, FaCoins, FaWallet, FaStar, FaFire, FaLeaf,  FaChartLine, FaQuestionCircle, FaLink, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdInsights, MdNotifications } from "react-icons/md";
import { AiOutlineRobot } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { motion } from "framer-motion";
import { itemVariants,  containerVariants} from "../lib/Fonction";
import Link from "next/link";


type SidebarProps = {
  active: string;
  onSelect: (name: string) => void;
};
export default function Sidebar({ active, onSelect }: SidebarProps)  {


  const menuItems = [
    { name: "Dashboard", icon: <FaChartPie />, href: "/" },   
    { name: "Market", icon: <FaStore />, href: "/Market" },
    { name: "Trading", icon: <FaChartLine />, href: "/Trading" },
    { name: "Wallet", icon: <FaWallet />, href: "/smart-money" }, 
    { name: "Advanced Charts", icon: <FaChartArea />, href: "/Advanced Charts" }, 
    { name: "Profile", icon: <FaUser />, href: "/Profil" },
    { name: "Settings", icon: <FaCog />, href: "/Settings" },
    { name: "Aide", icon: <FaQuestionCircle  />, href: "/Aide" },
    { name: "Notifications", icon: <MdNotifications />, href: "/notifications" },
    { name: "Test", icon: <FaComment />, href: "/" },
    { name: "ChatBoot", icon: <FaComment />, href: "/" },
    { name: "Logout", icon: <FaSignOutAlt />, href: "/" },

  ];
  const getItemClasses = (item) => {
    return `w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
      ${active === item.name 
        ? "bg-white/20 text-[#5686FE] border border-[#5686FE]" 
        : "hover:bg-[#5686FE]/10 hover:text-[#5686FE] "}`;
  };

  const userItems = [
  
  ];

  return (
    <motion.aside className="h-screen w-60 bg-white backdrop-blur-md text-gray-200   border border-[#5686FE]/20 flex flex-col dark:bg-black dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)] "
      variants={containerVariants}
      initial="initial"
      animate="animate"
>
      {/* Logo */}
      <motion.div className="flex items-center justify-center h-20 border-b border-[#5686FE]/40 bg-white dark:bg-[#142636]" variants={containerVariants}>
        <span className="text-[#5686FE] text-2xl font-bold">PREDICTINVEST</span>
      </motion.div>

      {/* Menu principal */}
   <motion.nav className="flex-1 px-4 py-6 space-y-2  text-gray-700 bg-[#5686FE]/30 dark:bg-[#142636] dark:text-white" variants={containerVariants} initial="initial" 
  animate="animate">
      {menuItems.map((item) => {
        
        // La condition clé : Si l'élément est 'Logout', on utilise <Link>
        if (item.name === "Logout") {
          return (
            // Utilisation du composant Link pour la navigation Next.js
           <motion.div key={item.name} variants={itemVariants}>
            <Link 
              
              href={item.href} // Chemin d'URL pour la déconnexion
              className={getItemClasses(item)}
               // Applique les styles
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          </motion.div>
          );
        }

        // Pour tous les autres éléments (Dashboard, Profile), on utilise un <button>
        // pour déclencher le changement de contenu local via `onSelect`.
        return (
          <motion.button
            key={item.name}
            onClick={() => onSelect(item.name)} 
            className={getItemClasses(item)}
            variants={itemVariants} // Applique les styles
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm text-font-medium">{item.name}</span>
          </motion.button>
        );
      })}
    </motion.nav>
       

    </motion.aside>
  );
}
