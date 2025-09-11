import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
  <>
  <div className="relative min-h-screen bg-black overflow-hidden font-sans">
      

      {/* Background Effect - Simulation avec un dégradé ou une image de fond si vous en avez une */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
           style={{
            backgroundImage: 'url(/musika.jpg)', // Un dégradé vert-noir pour simuler
             // Ou utilisez une image de fond : backgroundImage: 'url(/path/to/your-background-image.jpg)',
             // backgroundSize: 'cover',
             // backgroundPosition: 'center',
           }}
      >
        {/* Vous pourriez ajouter un div avec un fond vert foncé pour les lignes verticales si vous avez une image */}
        {/* Exemple de simulation des lignes (très basique) */}
        <div className="absolute inset-0 grid grid-cols-6 gap-x-2 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-green-500 w-full h-full animate-pulse-slow"></div>
          ))}
        </div>
      </div>

      {/* Conteneur principal avec le border arrondi et le "glow" */}
      <div className="relative z-10 mx-auto mt-8 mb-8 max-w-7xl border-2 border-green-500 rounded-3xl p-6 lg:p-10
                      shadow-lg shadow-green-500/50 backdrop-blur-sm bg-black/60">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* Icône du logo - simuler avec un cercle et un texte */}
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">C</div>
            <span className="text-white text-xl font-bold tracking-wider">PREDICTINVEST</span>
          </div>

          {/* Navigation */}
                  <nav className="hidden lg:flex space-x-8 text-gray-300">
          {/* Remplacez <a> par <Link> */}
        <Link href="/apropos" className="hover:text-green-400 transition-colors duration-200">
          ACCUEIL
        </Link>
        <Link href="/" className="hover:text-green-400 transition-colors duration-200">
            PREDICTION
        </Link>
        <Link href="/" className="hover:text-green-400 transition-colors duration-200">
          TABLEAU DE BORD
        </Link>
        <Link href="/" className="hover:text-green-400 transition-colors duration-200">
          A PROPOS
        </Link>
        </nav>

          {/* Actions à droite */}
          <div className="flex items-center space-x-4">
            {/* Langue */}
            <div className="flex items-center space-x-1 text-gray-300 hover:text-green-400 cursor-pointer">
              {/* Icône Globe - utiliser une icône SVG réelle ici */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008.852 6H5a1 1 0 00-1 1v4a1 1 0 001 1h.774l.439 1.547A1 1 0 007 14h.001c.038 0 .074-.015.1-.04L9 12.04l1.898 1.91c.026.026.06.04.098.04H11a1 1 0 00.957-.79l.439-1.547h.774a1 1 0 001-1V7a1 1 0 00-1-1h-3.852a1 1 0 00-.703 1.168z" clipRule="evenodd" />
              </svg>
              <span>EN</span>
              {/* Icône Flèche bas - utiliser une icône SVG réelle ici */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Bouton Connect Wallet */}
            <button className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200">
              CONNECT WALLET
            </button>
          </div>
        </header>

        {/* Contenu principal Hero */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-20rem)] pb-20">
          {/* Texte principal et CTA */}
          <div className="text-white">
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Financial Markets – Anticipate
            </h2>
            <div className="flex items-center space-x-2 mb-8">
              {/* Simulateur de barre de progression Ethereum */}
              <div className="w-48 h-8 bg-gray-700 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-green-500 w-3/4"></div> {/* 75% rempli */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-green-700 rounded-full p-1 border-2 border-white flex items-center justify-center">
                   {/* Icône Ethereum - utiliser un SVG réel ici */}
                   <Image src="/ethereum-logo.png" alt="Ethereum" width={24} height={24} className="rounded-full" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-gray-200">
             Analyze & Predict with AI
            </h2>
            <p className="text-gray-400 max-w-md mb-8">
              EXPLOITEZ L'IA POUR ANALYSER, PREVOIR ET COMPRENDRE LES TENDANCES DES MARCHES FINANCIERS;
            </p>
            <button className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200">
              COMMENCER L'ANALYSE
            </button>
          </div>

          {/* Visuels Droite */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Icône Bitcoin Flottante */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce-slow">
              {/* Icône B de Bitcoin - utiliser un SVG réel ici */}
              <span className="text-black text-3xl font-bold">₿</span>
            </div>

            {/* Forme 3D verte au centre (simulée) */}
            <div className="absolute w-64 h-64 bg-green-600 rounded-full opacity-30 animate-spin-slow"></div>
            <div className="absolute w-56 h-56 bg-green-400 rounded-full opacity-40 animate-spin-slow-reverse"></div>
            {/* Pour simuler la forme abstraite, vous auriez besoin d'un SVG complexe ou d'une image */}
            {/* <Image src="/abstract-3d-form.png" alt="Abstract Form" layout="fill" objectFit="contain" /> */}

            {/* Icône Ethereum Flottante */}
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce-slow-reverse">
              {/* Icône Ethereum - utiliser un SVG réel ici */}
              <Image src="/ethereum-logo.png" alt="Ethereum" width={32} height={32} className="rounded-full" />
            </div>

            {/* Texte "Lightning-fast..." */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-right text-gray-400 text-sm">
              <p>LIGHTNING-FAST</p>
              <p>TRANSACTIONS. 0.0%</p>
              <p>COMMISSION</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>

  );
}
