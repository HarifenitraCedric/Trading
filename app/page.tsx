"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    // Réinitialise l'erreur
    setError('');

    // Valide si les champs ne sont pas vides
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    // Si les champx w-[66%] h-4/5 shadow-2xl rounded-xls sont remplis, on simule une redirection
    window.location.href = '/apropos';
  };

  const itemVariants = {
  // L'état de départ pour tous les enfants
  initial: { y: 40, opacity: 0 }, // Commence 20px plus bas et est invisible
  // L'état d'arrivée pour tous les enfants
  animate: { y: 0, opacity: 1 }, // Arrive à sa position finale et devient visible
};

// 2. DÉFINITION DE L'ANIMATION DU CONTENEUR (C'est ici qu'on ajoute la cascade)
const containerVariants = {
  // L'état initial du conteneur (invisible)
  initial: { opacity: 0 },
  // L'état animate déclenche la cascade (staggerChildren)
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.5, // Le conteneur apparaît après 0.5s
      staggerChildren: 0.08, // Chaque enfant commence son animation 80ms après le précédent
    },
  },
};

  return (
<div className="flex w-full h-screen items-center justify-center bg-[url('/ta.jpg')]">
  <div className="flex w-full max-w-4xl h-4/5 shadow-2xl rounded-2xl overflow-hidden bg-white">
    <motion.div className=" w-full hidden lg:flex w-1/2 rounded-2xl bg-no-repeat bg-cover bg-center justify-center items-center" style={{ backgroundImage: "url('/dadatoa.jpg')" }}
                    
                    // --- PARAMÈTRES D'ANIMATION ---
                    initial={{ x: 40, opacity: 0 }} // Commence à 100px à droite et est invisible
                    animate={{ x: 0, opacity: 1 }}    // Arrive à la position finale (0 décalage) et devient visible
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }} >
      <div className="text-white p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Bienvenue !</h1>
        <p className="text-xl opacity-90">
          Connectez-vous pour accéder à votre espace personnalisé.
        </p>
      
        {/* <img src="/illustration.svg" alt="Illustration" className="mt-10 max-w-xs mx-auto" /> */}
      </div>
    </motion.div>

    {/* composant à droite*/}
    <div className="w-full lg:flex w-1/2 bg-white flex  justify-center items-center p-6 relative">
      <motion.div className="w-full max-w-sm border-2 border-black rounded-3xl p-8 bg-white 
          shadow-[0_0_20px_5px_rgba(0,0,0,0.6)] z-10" 
               // --- PARAMÈTRES D'ANIMATION ---
        variants={containerVariants} // Applique la règle de cascade
        initial="initial"
        animate="animate"> 
     {/* autre ombre
      <div className="w-full max-w-sm border-2 border-black rounded-3xl p-8 bg-white 
    shadow-[-30px_0_20px_10px_rgba(0,0,0,0.7),0_0_15px_3px_rgba(0,0,0,0.5)] z-10">*/}
         <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
          <p className="text-gray-400">Accédez à votre compte pour continuer</p>
        </motion.div>
        <motion.form className="space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#203445] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              placeholder="Votre adresse email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#203445] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Se souvenir de moi
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-[#5686FE] hover:text-green-400">
              Mot de passe oublié ?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#5686FE] hover:bg-[#568600] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </motion.form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Pas encore de compte ?{' '}
          <a href="#" className="font-medium text-[#5686FE] hover:text-green-400">
            S'inscrire
          </a>
        </p>
      </motion.div>
    </div>
    </div>
  </div>

  );
};

export default LoginPage;
