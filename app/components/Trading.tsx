'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUpRight, TrendingUp, DollarSign, Zap } from 'lucide-react';
import Swal from 'sweetalert2';
import CountUp from "react-countup";
// Données simulées d'actifs
const ASSETS = [
  { name: 'Bitcoin', symbol: 'BTC', price: 92896.63 , balance: 2.50, icon: '₿' },
  { name: 'Ethereum', symbol: 'ETH', price: 3333.89, balance: 15.00, icon: 'Ξ' },
  { name: 'Solana', symbol: 'SOL', price: 0.25, balance: 50.75, icon: '◎' },
];

// Taux de frais de transaction simulé
const FEE_RATE = 0.001; // 0.1%

const TradingPage = () => {
  const [wallet, setWallet] = useState<{
    cash: { balance: number; currency: string };
    crypto: { balance: number; currency: string };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [transactionType, setTransactionType] = useState<'Achat' | 'Vente'>('Achat');
  const [quantity, setQuantity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- Récupération du wallet ---
  useEffect(() => {
    const fetchWallet = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/wallet");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.details || "Erreur serveur");

        setWallet({
          cash: { balance: Number(data.cash.balance), currency: data.cash.currency },
          crypto: { balance: Number(data.crypto.balance), currency: data.crypto.currency },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setWallet(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallet();
  }, []);

  // --- Calculs dérivés ---
  const numericQuantity = parseFloat(quantity) || 0;
  const currentPrice = selectedAsset.price;
  const subTotal = numericQuantity * currentPrice;
  const transactionFee = subTotal * FEE_RATE;
  const finalTotal = transactionType === 'Achat' ? subTotal + transactionFee : subTotal - transactionFee;

  const cashBalance = wallet?.cash.balance ?? 0;
  const cryptoBalance = wallet?.crypto.balance ?? 0;

  const isSell = transactionType === 'Vente';
  const isQuantityValid = numericQuantity > 0;
  const isBalanceSufficient = transactionType === 'Achat' ? cashBalance >= finalTotal : numericQuantity <= cryptoBalance;
  const isOrderValid = isQuantityValid && isBalanceSufficient;



  // --- Gestion de la soumission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericQuantity = parseFloat(quantity) || 0;
    const finalAmount = finalTotal; // Votre calcul total, qui est correct

    // --- Début de la logique de calcul de transaction ---

    const isAchat = transactionType === 'Achat';
    // isSell est implicitement vrai si !isAchat (car le formulaire ne permet que 'Achat' ou 'Vente')

    // Calcul des NOUVEAUX soldes
    const newCashBalance = isAchat
      ? wallet.cash.balance - finalAmount // Achat: EUR diminue
      : wallet.cash.balance + finalAmount; // Vente: EUR augmente

    const newCryptoBalance = isAchat
      ? wallet.crypto.balance + numericQuantity // Achat: Crypto augmente
      : wallet.crypto.balance - numericQuantity; // Vente: Crypto diminue


    // 1. Détermination des mises à jour du portefeuille pour l'API
    // On utilise les NOUVEAUX soldes calculés ci-dessus pour le payload.
    const updatesPayload = [
        // Mise à jour de la devise Cash (EUR)
        { currency: "EUR", balance: parseFloat(newCashBalance.toFixed(2)) }, 
        // Mise à jour de la devise Crypto
        { currency: selectedAsset.symbol, balance: parseFloat(newCryptoBalance.toFixed(8)) }
    ];

    // --- Fin de la logique de calcul de transaction ---

    // 2. Appel fetch unique avec le payload dynamique
    // NOTE : Assurez-vous que votre API `/api/trade` prend ce payload et met à jour la base de données.
    const res = await fetch("/api/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, 
          walletUpdates: updatesPayload,
          transaction: {
            type: transactionType,        // "BUY" ou "SELL"
            assetTicker: selectedAsset.symbol,  // ex: "BTC"
            assetQuantity: numericQuantity,      // ex: 0.0025
            totalAmountEUR: finalAmount, 
            solde_actuel: newCashBalance,    // montant total de la transaction
          },
        }),
      });


    const data = await res.json();
    if (!res.ok) {
        // Affichage de l'erreur du serveur
        throw new Error(data.error || "Erreur serveur lors de l'exécution de l'ordre.");
    }

    // 3. Mise à jour de l'interface utilisateur (UI)
    // C'est ici que l'erreur se trouvait dans votre code initial. 
    // Au lieu de recalculer, on utilise les NOUVEAUX soldes pour setWallet.
    setWallet({
        cash: { ...wallet.cash, balance: newCashBalance },
        crypto: { ...wallet.crypto, balance: newCryptoBalance }
    });

    setQuantity(''); 

    // 4. Affichage de la notification de succès
    Swal.fire({
        title: 'Transaction Effectuée !',
        text: `Votre ordre ${transactionType} a été exécuté avec succès.`,
        icon: 'success', 
        confirmButtonText: 'Continuer',
        showCloseButton: true,
        timer: 8000, 
        timerProgressBar: true,
    });
    
};

  const setMaxQuantity = (percentage: number) => {
    if (isSell) {
      const max = cryptoBalance * percentage;
      setQuantity(max.toFixed(4));
    }
  };


  const cardClasses = "dark:bg-[#142636] bg-white p-6 rounded-xl shadow-lg border border-[#5686FE]/20 dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]";

  return (
    <main className="flex-1 md:p-12">
      <div className="min-h-screen font-sans">
        <h1 className="text-3xl font-bold text-[#5686FE] mb-8 border-b border-gray-700 pb-4">
          Interface d'Échange <span className="text-[#5686FE]">(Buy / Sell)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-2 space-y-8 ">
            <div className={`${cardClasses}`}>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Actif & Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type Achat/Vente */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Choisir l'Action</label>
                  <div className="flex rounded-lg bg-[#203445] p-1">
                    {['Achat', 'Vente'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTransactionType(type as 'Achat' | 'Vente');
                          setQuantity('');
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          transactionType === type
                            ? type === 'Achat' ? 'bg-[#5686FE] text-white shadow-md' : 'bg-red-600 text-white shadow-md'
                            : 'text-gray-400 hover:bg-[#2e405a]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sélecteur d'Actif */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sélectionner l'Actif</label>
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-4 py-2 bg-[#203445] text-white rounded-lg shadow-sm border border-gray-600 hover:border-green-500 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-lg font-bold">{selectedAsset.icon} {selectedAsset.symbol}</span>
                    <ChevronDown size={20} className={`text-gray-400 transform transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 rounded-lg shadow-xl bg-[#203445] border border-gray-600 max-h-48 overflow-y-auto">
                      {ASSETS.map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex items-center justify-between p-3 text-white cursor-pointer hover:bg-[#2e405a] transition-colors"
                          onClick={() => {
                            setSelectedAsset(asset);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <span className="font-medium">{asset.name} ({asset.symbol})</span>
                          <span className="text-sm text-gray-400">£{asset.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Formulaire Quantité */}
            <div className={`${cardClasses}`}>
              <h2 className="text-xl font-semibold text-white mb-4">Détails de l'Ordre</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-400 mb-2">
                    Quantité de {selectedAsset.symbol}
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-600 focus-within:ring-2 focus-within:ring-green-500 transition-shadow">
                    <input
                      id="quantity"
                      type="number"
                      step="0.0001"
                      min="0"
                      placeholder="0.0000"
                      value={quantity}
              
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-3 bg-[#203445] text-white placeholder-gray-500 focus:outline-none"
                    />
                    <span className="p-3 bg-[#2e405a] text-gray-300 font-semibold border-l border-gray-600">
                      {selectedAsset.symbol}
                    </span>
                  </div>
                  {!isBalanceSufficient && isSell && (
                    <p className="text-red-500 text-sm mt-2">Solde insuffisant. Disponible : {cryptoBalance.toFixed(4)} {selectedAsset.symbol}</p>
                  )}
                  {!isBalanceSufficient && !isSell && (
                    <p className="text-red-500 text-sm mt-2">Solde insuffisant. Disponible : {cashBalance.toFixed(2)} £</p>
                  )}
                </div>

                {/* Bouton soumission */}
                <button
                  type="submit"
                  disabled={!isOrderValid}
                  className={`w-full py-3 rounded-lg shadow-lg text-lg font-bold transition-all flex items-center justify-center space-x-2 ${
                    isOrderValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ArrowUpRight size={20} />
                  <span>{transactionType} {selectedAsset.symbol}</span>
                </button>

                {/* TOTAL ESTIMÉ */}
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-700">
                  <span className="text-white">TOTAL ESTIMÉ</span>
                  <span
                    className={`font-bold text-xl ${
                      !finalTotal || finalTotal === 0
                        ? "text-gray-500"
                        : cashBalance < finalTotal
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    €{finalTotal.toFixed(2)}
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* COLONNE DROITE: Aperçu */}
          <div className="lg:col-span-1 space-y-8">
            <div className={`${cardClasses}`}>
              <h2 className="text-xl font-semibold text-[#5686FE] mb-4">Aperçu de l'Actif</h2>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span className="text-sm text-gray-700 dark:text-white">Votre Solde:</span>
                  <span className="font-bold text-gray-500 dark:text-white"><CountUp
                start={0}
                end={
                  parseFloat(
                    String(cashBalance)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(cashBalance).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              /> €</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-sm text-gray-700 dark:text-white">Votre Solde ({selectedAsset.symbol}):</span>
                  <span className="font-bold text-gray-500 dark:text-white"><CountUp
                start={0}
                end={
                  parseFloat(
                    String(cryptoBalance)
                      .replace(",", ".") // remplace la virgule par un point
                      .match(/[\d.]+/)?.[0] || "0" // extrait juste les chiffres
                  )
                }
                duration={2.5}
                decimals={4}
                separator=","
                suffix={
                  " " +
                  (String(cryptoBalance).match(/[a-zA-Z]+$/)?.[0] || "") // récupère l’unité à la fin (ex: EUR)
                }
              /> {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="text-sm text-gray-500 dark:text-white">Changement (24h):</span>
                  <span className="font-bold text-green-500 flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +3.45%
                  </span>
                </div>
              </div>
            </div>

            <div className={`${cardClasses} h-64 flex flex-col justify-center items-center`}>
              <TrendingUp size={48} className="text-gray-600 mb-2" />
              <p className="text-gray-500 text-center">
                Graphique en temps réel <br />(Intégration future d'une librairie comme Recharts/D3)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TradingPage;
