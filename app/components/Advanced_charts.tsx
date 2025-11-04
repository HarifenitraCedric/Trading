import React, { useEffect ,useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { createChart } from "lightweight-charts";
import { a } from 'framer-motion/client';
// Données fictives pour le graphique
// La partie prédite est indiquée par 'isPrediction: true'
/*const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Fév', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Avr', revenue: 2780, users: 3908 },
  { name: 'Mai', revenue: 1890, users: 4800 },
  { name: 'Juin', revenue: 2390, users: 3800 },
  { name: 'Juil', revenue: 3490, users: 4300 },
  { name: 'Août (P)', revenue: 3800, users: 4500, isPrediction: true },
  { name: 'Sep (P)', revenue: 4200, users: 4800, isPrediction: true },
  { name: 'Oct (P)', revenue: 4500, users: 5100, isPrediction: true },
];*/

const PredictionPage = () => {
  const [whatIfValue, setWhatIfValue] = useState(10);
  const [predictedRevenue, setPredictedRevenue] = useState(4500);
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [eurData, setEurData] = useState([]);
  const [gbpData, setGbpData] = useState([]);
  const [aaplData, setAaplData] = useState([]);
  const [msftData, setMsftData] = useState([]);
  const symbol_1 = "BTC-USD"; // tu peux changer ou le passer en prop
  const symbol_2 = "ETH-USD"; // tu peux changer ou le passer en prop
  const symbol_3 = "EUR/USD"; // tu peux changer ou le passer en prop
  const symbol_4 = "GBP/USD"; // tu peux changer ou le passer en prop
  const symbol_5 = "AAPL"; // tu peux changer ou le passer en prop
  const symbol_6 = "MSFT"; // tu peux changer ou le passer en prop

  const fetchDatabtc = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_1}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setBtcData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const fetchDataEthUsd = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_2}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setEthData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const fetchDataEurUsd = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_3}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setEurData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const fetchDataGbpUsd = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_4}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setGbpData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const fetchDataAAPL = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_5}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setAaplData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const fetchDataMSFT = async () => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol_6}`);
      const json = await res.json();
      console.log("Finnhub data:", json);

      // On crée un point simple (time + current price)
      const newPoint = {
        time: new Date().toLocaleTimeString(),
        price: json.c, // "c" = current price selon Finnhub
      };

      setMsftData((prev) => [...prev.slice(-20), newPoint]); // garde les 20 derniers points
    } catch (err) {
      console.error("Erreur:", err);
    }
  };


  useEffect(() => {
    fetchDatabtc(); // premier chargement
    fetchDataEthUsd();
    fetchDataEurUsd();
    fetchDataGbpUsd();
    fetchDataAAPL();
    fetchDataMSFT();


    const interval_1 = setInterval(fetchDatabtc, 30000); // recharge toutes les 30 secondes
    const interval_2 = setInterval(fetchDataEthUsd, 30000);
    const interval_3 = setInterval(fetchDataEurUsd, 30000);
    const interval_4 = setInterval(fetchDataGbpUsd, 30000);
    const interval_5 = setInterval(fetchDataAAPL, 30000);
    const interval_6 = setInterval(fetchDataMSFT, 30000);
    
    return () => {
      clearInterval(interval_1);
      clearInterval(interval_2);
      clearInterval(interval_3);
      clearInterval(interval_4);
      clearInterval(interval_5);
      clearInterval(interval_6);
    };
  }, []);

  const today = new Date().toLocaleDateString(); // ex: 31/10/2025
  
  // Fonction de base pour simuler l'analyse "What-if"
  const handlePredict = () => {
    // Logique de prédiction simulée :
    // Augmente le revenu prédit en fonction de l'input utilisateur.
    const newPrediction = data[data.length - 1].revenue * (1 + whatIfValue / 100);
    setPredictedRevenue(newPrediction.toFixed(2));
  };

  return (
    <main className="flex-1  md:p-12">
    <div className="flex-1 text-gray-300">
      <h2 className="text-3xl font-bold text-white mb-6">Prédictions</h2>
      
      {/* Indicateurs de prédiction */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
          <p className="text-sm font-semibold text-gray-400">Revenu prévu (Prochain mois)</p>
          <p className="text-3xl font-bold text-green-400 mt-2">$3,800</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
          <p className="text-sm font-semibold text-gray-400">Nouveaux utilisateurs (Prochain mois)</p>
          <p className="text-3xl font-bold text-green-400 mt-2">1,500</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:bshadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
          <p className="text-sm font-semibold text-gray-400">Taux de conversion</p>
          <p className="text-3xl font-bold text-green-400 mt-2">3.4%</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:shadow-[0_0_20px_5px_rgba(0,0,0,0.6)]">
          <p className="text-sm font-semibold text-gray-400">Meilleure performance (Produit)</p>
          <p className="text-xl font-bold text-green-400 mt-2">Chaussures de sport</p>
        </div>
      </div>

      {/* Graphique de prédiction */}
      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_1} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={btcData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>
      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_2} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={ethData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>
      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_3} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={eurData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>
      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_4} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={gbpData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>

      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_5} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={aaplData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>

      <div
        className="relative p-4 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
          boxShadow: "0 0 25px rgba(59,130,246,0.15)",
        }}
      >
        <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
          📈 Évolution du cours de {symbol_6} — {today}
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={msftData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(59,130,246,0.5)",
                  borderRadius: "10px",
                  color: "#f3f4f6",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-gray-400 text-sm mt-3">
          Mise à jour automatique toutes les 30 s
        </p>
      </div>
      {/* Aperçus clés et analyse de scénario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Aperçus clés</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>La croissance des revenus devrait se stabiliser à environ **$4,500** par mois au cours du prochain trimestre.</li>
            <li>Le nombre de nouveaux utilisateurs devrait augmenter pour atteindre **5,100** d'ici octobre.</li>
            <li>L'augmentation du nombre d'utilisateurs suggère une opportunité d'optimisation des revenus.</li>
          </ul>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Analyse de scénario</h3>
          <p className="text-sm text-gray-400 mb-4">
            Testez l'impact d'une augmentation hypothétique de votre budget marketing.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={whatIfValue}
              onChange={(e) => setWhatIfValue(e.target.value)}
              className="w-1/3 bg-[#203445] text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: 10"
            />
            <p className="text-gray-300">% d'augmentation</p>
            <button
              onClick={handlePredict}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Prédire
            </button>
          </div>
          <p className="mt-4 text-gray-300">
            Revenu prévu avec cette augmentation: <span className="text-green-400 font-bold">${predictedRevenue}</span>
          </p>
        </div>
      </div>

      {/* Tableau des prédictions */}
      <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Prédictions détaillées</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase font-semibold">
                <th scope="col" className="py-3 px-6">Mois</th>
                <th scope="col" className="py-3 px-6">Revenu prévu</th>
                <th scope="col" className="py-3 px-6">Nouveaux clients</th>
                <th scope="col" className="py-3 px-6">Taux de conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-4 px-6">Août 2024</td>
                <td className="py-4 px-6 text-green-400 font-semibold">$3,800</td>
                <td className="py-4 px-6 text-green-400 font-semibold">1,500</td>
                <td className="py-4 px-6 text-green-400 font-semibold">3.2%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-4 px-6">Septembre 2024</td>
                <td className="py-4 px-6 text-green-400 font-semibold">$4,200</td>
                <td className="py-4 px-6 text-green-400 font-semibold">1,650</td>
                <td className="py-4 px-6 text-green-400 font-semibold">3.4%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-4 px-6">Octobre 2024</td>
                <td className="py-4 px-6 text-green-400 font-semibold">$4,500</td>
                <td className="py-4 px-6 text-green-400 font-semibold">1,800</td>
                <td className="py-4 px-6 text-green-400 font-semibold">3.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
  );
};

export default PredictionPage;
