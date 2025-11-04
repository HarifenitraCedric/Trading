import React, { useState, useCallback, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import ThemeSwitcher from './ThemeToggle';
import ThemeToggle from './ThemeToggle';

// --- 1. INTERFACE DES DONNÉES ---
interface AssetAllocation {
    name: string;
    value: number; // Valeur monétaire (en EUR ou USD) de l'actif détenu
    percentage: number; // Pourcentage du portefeuille total
    color: string; // Couleur de la tranche dans le graphique
}

// --- 2. DONNÉES FICTIVES (À REMPLACER) ---


// --- 3. CUSTOM TOOLTIP (INFOBULLE) ---
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload as AssetAllocation;
        
        return (
            <motion.div 
                className="bg-white p-3 border border-gray-200 rounded-lg shadow-xl text-gray-800"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="font-bold text-lg" style={{ color: data.color }}>{data.name}</p>
                <p className="text-sm">Valeur: <span className="font-semibold">{data.value.toLocaleString()} €</span></p>
                <p className="text-sm">Allocation: <span className="font-semibold">{data.percentage.toFixed(1)}%</span></p>
            </motion.div>
        );
    }
    return null;
};

// --- 4. COMPOSANT PRINCIPAL ---
const AllocationChart: React.FC = () => {
     const [wallet, setWallet] = useState<{ cash: { balance: number, currency: string }, crypto: { balance: number, currency: string } } | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null); // Ajout de la gestion d'erreur
        
        // 2. Récupération des données utilisateur au montage du composant
        useEffect(() => {
          // Fonction asynchrone pour utiliser try/catch
          const fetchWalletData = async () => {
            setIsLoading(true);
            setError(null); // Réinitialiser l'erreur
    
            try {
              const res = await fetch("/api/wallet");
              const data = await res.json(); 
    
              if (!res.ok) {
                // Utilisation du message d'erreur du backend pour un meilleur diagnostic
                const errorMessage = data.error || data.details || "Erreur serveur inconnue.";
                throw new Error(`Erreur API (${res.status}): ${errorMessage}`);
              }
    
              // L'API renvoie { cash: { balance, currency }, crypto: { balance, currency } }
              if (data && data.cash && data.crypto) {
                // Les balances sont déjà des nombres si le backend les a bien formatées
                setWallet({
                  cash: {
                    balance: parseFloat(data.cash.balance), 
                    currency: data.cash.currency
                  },
                  crypto: {
                    balance: parseFloat(data.crypto.balance), 
                    currency: data.crypto.currency
                  },
                });
              } else {
                // Si les données ne sont pas au bon format ou sont vides
                setError("Format de données du portefeuille inattendu.");
                setWallet(null);
              }
              
            } catch (err) {
              console.error("Erreur lors de la récupération du portefeuille:", err);
              setError(err instanceof Error ? err.message : "Erreur inconnue de la connexion.");
              setWallet(null);
            } finally {
              setIsLoading(false); // Fin du chargement, que ce soit un succès ou un échec
            }
          };
    
          fetchWalletData();
        }, []); // Le tableau vide [] assure que cela ne s'exécute qu'une seule fois au montage
        
        // 3. Logique d'affichage (gestion des états Chargement/Erreur/Affichage)
        // Pour l'affichage principal 'f', nous utilisons le solde cash (EUR).
        const f = isLoading 
          ? "Chargement..." 
          : error
            ? "Erreur de chargement"
            : wallet?.cash.balance !== undefined
                ? `${wallet.cash.balance.toFixed(2)} ${wallet.cash.currency}`
                : "Invité / Données indisponibles";
        const cashBalance = wallet?.cash.balance ?? 0;
        const cryptoBalance = wallet?.crypto.balance ?? 0;
        const crypto = cryptoBalance * 93000;

    const mockData: AssetAllocation[] = [
    { name: 'Bitcoin (BTC)', value: crypto, percentage: 5, color: '#F7931A' },
    { name: 'Ethereum (ETH)', value: 30, percentage: 15, color: '#8A92B2' },
    { name: 'Solana (SOL)', value: 50, percentage: 25, color: '#9945FF' },
    { name: 'Liquidités (EUR)', value: cashBalance, percentage: 55, color: '#16A085' },
];

const totalValue = mockData.reduce((sum, item) => sum + item.value, 0);
       
    const [activeIndex, setActiveIndex] = useState(-1); // -1 indique aucun actif actif
    
    // Gère le survol de la souris sur une tranche ou une légende
    const handleMouseEnter = useCallback((_, index: number) => {
        setActiveIndex(index);
    }, []);

    // Réinitialise l'index actif lorsque la souris quitte
    const handleMouseLeave = useCallback(() => {
        setActiveIndex(-1);
    }, []);

    const formattedTotal = totalValue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

    return (
        <motion.div 
            className="bg-white dark:bg-[#142636] p-6 rounded-2xl shadow-lg w-full h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold text-center text-[#5686FE]  mb-0">Allocation d'Actifs</h2>
            
            {/* CONTAINER PRINCIPAL FLEX : Diagramme à gauche, Légende et Total à droite */}
            <div className="flex-grow w-full flex flex-col items-center lg:flex-row lg:justify-center">
                
                {/* 4.1. SECTION DU GRAPHIQUE (LEFT/TOP) */}
                <div 
                    className="w-full h-60 lg:w-1/2 lg:h-full relative flex items-center justify-center"
                    onMouseLeave={handleMouseLeave}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={mockData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%" 
                                cy="50%" 
                                innerRadius={60} 
                                outerRadius={95} 
                                paddingAngle={3}
                                onMouseEnter={handleMouseEnter} // Gère le survol sur le graphique
                            >
                                {mockData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.color} 
                                        // Animation au survol
                                        style={{ 
                                            opacity: activeIndex === index || activeIndex === -1 ? 1 : 0.4,
                                            transition: 'opacity 0.2s'
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Total affiché au centre */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <p className="text-sm text-gray-500 dark:text-white font-medium">Portefeuille</p>
                        <p className="text-xl font-extrabold text-gray-900 dark:text-white">{formattedTotal}</p>
                    </div>
                </div>

                {/* 4.2. SECTION LÉGENDE ET DESCRIPTION (RIGHT/BOTTOM) */}
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-6">
                    
                    <div className="space-y-2">
                        {mockData.map((entry, index) => (
                            <motion.div 
                                key={entry.name}
                                className="flex justify-between items-center p-0 rounded-lg cursor-pointer"
                                style={{ 
                                    backgroundColor: activeIndex === index ? entry.color + '15' : 'transparent',
                                    border: activeIndex === index ? `1px solid ${entry.color}70` : '1px solid transparent',
                                }}
                                onMouseEnter={() => handleMouseEnter(null, index)} // Gère le survol sur la légende
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="flex items-center">
                                    {/* Petit cercle de couleur */}
                                    <span 
                                        className="w-3 h-3 rounded-full mr-3" 
                                        style={{ backgroundColor: entry.color }}
                                    ></span>
                                    <span className="font-medium dark:text-gray-300 text-gray-800">{entry.name}</span>
                                </div>
                                
                                {/* Pourcentage et Valeur */}
                                <div className="text-right">
                                    <span className="font-bold dark:text-gray-400 text-gray-800">{entry.percentage.toFixed(1)}%</span>
                                    <span className="ml-2 text-sm text-gray-500">({entry.value.toLocaleString()} €)</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bloc du total en bas (Déjà inclus au centre du graphique, mais peut être déplacé ici si préféré) */}
                </div>
            </div>
        </motion.div>
    );
};

export default AllocationChart;
