import React from 'react';
// Importation des icônes Lucide pertinentes pour le trading et la finance
import { Mail, TrendingUp, Zap, Shield, Globe, User, Clock, Briefcase, DollarSign, Target, Settings } from 'lucide-react';

// --- Données Fictives pour le Profil de Trader ---
const traderData = {
    name: "Alexandre Dubois",
    title: "Gestionnaire de Portefeuille Quantitatif",
    strategy: "Arbitrage haute fréquence et Swing Trading",
    aum: "12.5 M€", // Assets Under Management (Actifs sous gestion)
    joined: "05/01/2018",
    bio: "Trader expérimenté avec plus de 6 ans sur les marchés actions et devises. Spécialisé dans l'application de modèles quantitatifs pour identifier les inefficiences du marché. Adepte d'une approche disciplinée axée sur la préservation du capital et l'amélioration continue des algorithmes."
};

const performanceMetrics = [
    { label: "P&L Annuel", value: "+24.5%", icon: TrendingUp, color: "text-green-400" },
    { label: "Sharpe Ratio", value: "1.85", icon: Zap, color: "text-indigo-400" },
    { label: "Drawdown Max.", value: "-8.1%", icon: Shield, color: "text-red-400" },
    { label: "Score de Risque", value: "B+", icon: Target, color: "text-yellow-400" },
];

const activityLog = [
    { time: "Il y a 2 heures", description: "Clôture de position long EUR/USD (+0.8%)" },
    { time: "Hier 14:30", description: "Ajustement du Risk/Reward sur la stratégie 'Phoenix'" },
    { time: "Hier 10:15", description: "Ouverture d'une position short sur l'indice DOW (0.5% du capital)" },
];

const strategyDetails = [
    { label: "Marchés", value: "Forex, Indices US & EU" },
    { label: "Horizon Temporel", value: "Intraday à Swing" },
    { label: "Technologies", value: "Python (Pandas, Scikit), MetaTrader 5" },
    { label: "Capital Minimum", value: "10 000 €" },
];

// --- Composants de Réutilisation ---

// Composant de Carte sombre et professionnelle
const Card = ({ children, title, icon: Icon, className = "" }) => (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 ${className}`}>
        {Icon && (
            <div className="flex items-center text-indigo-400 mb-4 border-b border-gray-700 pb-3">
                <Icon className="w-5 h-5 mr-3" />
                <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
        )}
        {!Icon && <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>}
        <div>{children}</div>
    </div>
);

// Composant pour afficher une métrique clé
const MetricTile = ({ label, value, icon: Icon, color }) => (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner flex flex-col items-start transition duration-300 hover:bg-gray-600">
        <Icon className={`w-6 h-6 mb-2 ${color}`} />
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
        <div className="flex items-center text-gray-400">
            <Icon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-semibold text-white">{value}</span>
    </div>
);


const HistoryPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-10 font-sans text-white">
            <div className="max-w-6xl mx-auto">
                
                {/* --- HEADER de Profil (Sombre et Épuré) --- */}
                <Card className="mb-8 p-6 md:p-8 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 bg-gray-800 shadow-xl border-t-4 border-indigo-500">
                    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold border-4 border-indigo-400">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-3xl font-bold mb-0.5 text-indigo-300">{traderData.name}</h1>
                        <h2 className="text-lg font-light text-gray-400">{traderData.title}</h2>
                    </div>

                    <div className="flex flex-col space-y-1 text-sm text-gray-300 mt-4 md:mt-0 md:text-right">
                        <div className="flex items-center md:justify-end">
                            <Briefcase className="w-4 h-4 mr-2 text-indigo-400" />
                            <span>Stratégie: {traderData.strategy}</span>
                        </div>
                        <div className="flex items-center md:justify-end">
                            <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                            <span>Membre depuis: {traderData.joined}</span>
                        </div>
                    </div>
                </Card>

                {/* --- Section Métriques Clés de Performance --- */}
                <h3 className="text-xl font-semibold text-indigo-400 mb-4">Performance Clé (365 jours)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {performanceMetrics.map(metric => (
                        <MetricTile key={metric.label} {...metric} />
                    ))}
                </div>

                {/* --- Bio, Stratégie et Journal d'Activité (Disposition à deux colonnes) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    
                    {/* Colonne 1 & 2: Bio et Détails de la Stratégie */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card title="Philosophie de Trading" icon={Globe}>
                            <p className="text-gray-300 leading-relaxed text-base">
                                {traderData.bio}
                            </p>
                            <div className="mt-6">
                                <h3 className="text-md font-semibold text-indigo-400 mb-2 border-b border-gray-700 pb-1">Détails de la Stratégie</h3>
                                <div className="space-y-1">
                                    {strategyDetails.map((detail, index) => (
                                        <DetailRow key={index} icon={Settings} label={detail.label} value={detail.value} />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Colonne 3: Journal d'Activité Récent */}
                    <div className="lg:col-span-1">
                        <Card title="Activité Récente" icon={Clock}>
                            <div className="space-y-4">
                                {activityLog.map((activity, index) => (
                                    <div key={index} className="border-l-2 border-green-500 pl-3">
                                        <p className="text-xs text-gray-400">{activity.time}</p>
                                        <p className="text-sm text-gray-200">{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 text-sm">
                                Voir le Journal Complet
                            </button>
                        </Card>
                    </div>
                </div>

                {/* --- Section Actifs Sous Gestion (AUM) --- */}
                 <div className="mb-8">
                    <Card title="Actifs Sous Gestion (AUM)" icon={DollarSign} className="bg-green-800/20 border-green-700">
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-green-400">{traderData.aum}</p>
                            <p className="text-green-300 mt-1">Gérés avec des objectifs de risque et de rendement stricts.</p>
                        </div>
                    </Card>
                </div>
                
                {/* --- Pied de Page --- */}
                <footer className="text-center text-gray-500 text-xs mt-10 pt-4 border-t border-gray-700">
                    Les performances passées ne préjugent pas des résultats futurs.
                </footer>
            </div>
        </div>
    );
};

export default HistoryPage;
