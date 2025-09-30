import { Variants } from 'framer-motion';

export const itemVariants : Variants =  {
  // L'état de départ pour tous les enfants
  initial: { y: 40, opacity: 0 }, // Commence 20px plus bas et est invisible
  // L'état d'arrivée pour tous les enfants
  animate: { y: 0, opacity: 1 }, // Arrive à sa position finale et devient visible
};

// 2. DÉFINITION DE L'ANIMATION DU CONTENEUR (C'est ici qu'on ajoute la cascade)
export const containerVariants : Variants = {
  // L'état initial du conteneur (invisible)
  initial: { opacity: 0 },
  // L'état animate déclenche la cascade (staggerChildren)
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.7, // Le conteneur apparaît après 0.5s
      staggerChildren: 0.08, // Chaque enfant commence son animation 80ms après le précédent
    },
  },
};
