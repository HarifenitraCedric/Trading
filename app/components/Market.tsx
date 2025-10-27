import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Shield, Zap, Bitcoin } from 'lucide-react';

// --- Données initiales des paires de devises contre l'Ariary Malagasy (MGA) ---
const initialMarketRates = [
  // Paires FOREX (Cotées en MGA/Unité)
  { symbol: 'USD', pair: 'USD/MGA', initialRate: 4500.00, currencyName: 'Dollar Américain', category: 'Forex' },
  { symbol: 'EUR', pair: 'EUR/MGA', initialRate: 5180.50, currencyName: 'Euro', category: 'Forex' },
  { symbol: 'GBP', pair: 'GBP/MGA', initialRate: 5600.75, currencyName: 'Livre Sterling', category: 'Forex' },
  
  // Paires CRYPTO (Cotées en MGA/Unité)
  // Les taux sont très élevés pour refléter la valeur réelle
  { symbol: 'BTC', pair: 'BTC/MGA', initialRate: 150000000.00, currencyName: 'Bitcoin', category: 'Crypto' },
  { symbol: 'ETH', pair: 'ETH/MGA', initialRate: 9500000.00, currencyName: 'Ethereum', category: 'Crypto' },
  { symbol: 'SOL', pair: 'SOL/MGA', initialRate: 850000.00, currencyName: 'Solana', category: 'Crypto' },
];

// Styles Tailwind CSS réutilisables
const cardClasses = "bg-white dark:bg-[#142636]  p-4 rounded-xl shadow-lg border border-[#5686FE]/20 transition-shadow duration-300 hover:shadow-[#5686FE]/20";
const headerClasses = "text-2xl font-semibold dark:text-white   text-gray-700 mb-6 border-b border-gray-700 pb-3";

const MarketDashboard = () => {
  // Initialise l'état des taux, en ajoutant la propriété `rate` et `change24h` initiale
  const [rates, setRates] = useState(
    initialMarketRates.map(item => ({
      ...item, 
      rate: item.initialRate,
      // Simule un changement initial entre -2.0% et +2.0%
      change24h: (Math.random() * 4 - 2), 
    }))
  );

  // --- Logique de simulation de flux de données en temps réel ---
  useEffect(() => {
    // Stocke les taux de base pour le calcul du changement simulé
    const baseRates = initialMarketRates.reduce((acc, curr) => {
      acc[curr.symbol] = curr.initialRate;
      return acc;
    }, {});

    const updateRates = () => {
      setRates(prevRates => prevRates.map(currency => {
        // Simule une fluctuation aléatoire (légère)
        const fluctuationPercent = (Math.random() * 0.0002 - 0.0001); 
        const fluctuation = currency.rate * fluctuationPercent;
        
        // Assure que le taux reste positif et ajoute la fluctuation
        const newRate = Math.max(100.00, currency.rate + fluctuation);

        // Calcule le changement par rapport au taux initial (simulé sur 24h)
        const initialBaseRate = baseRates[currency.symbol];
        const currentChange24h = (newRate / initialBaseRate - 1) * 100; // Changement en pourcentage

        return {
          ...currency,
          rate: newRate,
          change24h: currentChange24h,
        };
      }));
    };

    // Démarre l'intervalle de rafraîchissement (toutes les 3 secondes)
    const intervalId = setInterval(updateRates, 3000);

    // Fonction de nettoyage
    return () => clearInterval(intervalId);
  }, []); 
  
  // Filtrage des actifs
  const forexRates = rates.filter(r => r.category === 'Forex');
  const cryptoRates = rates.filter(r => r.category === 'Crypto');

  // Composant interne pour afficher une seule carte de taux de change
  const RateCard = ({ currency }) => {
    const isPositiveChange = currency.change24h >= 0;
    const changeColor = isPositiveChange ? 'text-green-500' : 'text-red-500';
    const TrendIcon = isPositiveChange ? TrendingUp : TrendingDown;

    let currencyIcon;
    switch (currency.symbol) {
        case 'BTC':
            currencyIcon = <Bitcoin size={24} className="text-orange-400" />;
            break;
        case 'ETH':
            currencyIcon = <Shield size={24} className="text-gray-400" />;
            break;
        case 'SOL':
            currencyIcon = <Zap size={24} className="text-purple-400" />;
            break;
        default:
            currencyIcon = <DollarSign size={24} className="text-blue-400" />;
    }

    return (
      <div className={`${cardClasses} flex flex-col justify-between h-48`}>
        {/* En-tête de la carte */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-lg font-medium text-gray-400">{currency.currencyName}</span>
            <h4 className="text-sm font-light text-gray-500">{currency.pair}</h4>
          </div>
          {currencyIcon}
        </div>

        {/* Taux actuel */}
        <div className="flex flex-col my-2">
          <p className="text-3xl font-extrabold tracking-tight text-gray-700 dark:text-white truncate">
            {currency.rate >= 100000 ? currency.rate.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : currency.rate.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mt-1">MGA</p>
        </div>

        {/* Variation 24h */}
        <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
          <span className="text-gray-400 text-sm">Var. (24h) :</span>
          <div className="flex items-center space-x-1">
            <TrendIcon size={16} className={changeColor} />
            <span className={`text-base font-bold ${changeColor}`}>
              {currency.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1 p-4 md:p-12 min-h-screen  text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête Global */}
        <h1 className="text-3xl font-extrabold text-[#5686FE] mb-8">
          <Clock size={30} className="inline mr-3" />
          Tableau de Bord des Marchés en Direct (MGA)
        </h1>
        
        {/* --- Section CRYPTO --- */}
        <h2 className={headerClasses}>
          <Bitcoin size={24} className="inline mr-2  text-[#142636]  dark:text-yellow-500" />
          Cryptomonnaies (Crypto-monnaies majeures)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cryptoRates.map((currency) => (
            <RateCard key={currency.symbol} currency={currency} />
          ))}
        </div>

        {/* --- Section FOREX --- */}
        <h2 className={headerClasses}>
          <DollarSign size={24} className="inline mr-2 text-blue-400" />
          Devises Fiduciaires (Forex)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forexRates.map((currency) => (
            <RateCard key={currency.symbol} currency={currency} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-12 p-4 bg-[#1a2333] rounded-lg border border-gray-700">
          *Taux simulés rafraîchis toutes les 3 secondes. Les données réelles doivent provenir d'une API de marché fiable.
        </p>
      </div>
    </main>
  );
};

export default MarketDashboard;
