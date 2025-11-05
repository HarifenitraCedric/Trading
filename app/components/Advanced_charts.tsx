import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const NGROK_URL = "https://nontragical-nonconcentrical-alexandra.ngrok-free.dev";

const PredictionPage = () => {
  const [whatIfValue, setWhatIfValue] = useState(10);
  const [predictedRevenue, setPredictedRevenue] = useState(4500);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictionHistory, setPredictionHistory] = useState([]); // Historique des prédictions
  const [chartData, setChartData] = useState({
    btc: [],
    eth: [],
    aapl: [],
    msft: []
  });

  const symbols = [
    { key: 'btc', symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
    { key: 'eth', symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
    { key: 'aapl', symbol: 'AAPL', name: 'Apple' },
    { key: 'msft', symbol: 'MSFT', name: 'Microsoft' }
  ];

  const fetchData = async (key, symbol) => {
    try {
      const res = await fetch(`/api/finnhub?symbol=${symbol}`);
      const json = await res.json();
      
      if (json.c && json.c !== 0) {
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          price: json.c
        };
        
        setChartData(prev => ({
          ...prev,
          [key]: [...prev[key].slice(-20), newPoint]
        }));
      }
    } catch (err) {
      console.error(`Erreur ${symbol}:`, err);
    }
  };

  const fetchAllData = () => {
    symbols.forEach(({ key, symbol }) => {
      fetchData(key, symbol);
    });
  };

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔄 Fetching prediction from:", `${NGROK_URL}/test-prediction`);
      
      const res = await fetch(`${NGROK_URL}/test-prediction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      console.log("📡 Response status:", res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error response:", errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      const data = await res.json();
      console.log("✅ Prediction data:", data);
      
      setPrediction(data);
      
      // Ajouter à l'historique avec timestamp
      const timestamp = new Date().toLocaleTimeString();
      const newHistoryPoint = {
        time: timestamp,
        confidence: (data.confidence * 100).toFixed(2),
        positionSize: data.position_size,
        actionValue: data.action === 'BUY' ? 100 : data.action === 'SELL' ? -100 : 0,
        actionLabel: data.action, // Pour le tooltip
      };
      
      setPredictionHistory(prev => [...prev.slice(-20), newHistoryPoint]); // Garde les 20 derniers points
      
      setError(null);
    } catch (err) {
      console.error("❌ Erreur complète:", err);
      setError(`Erreur: ${err.message}`);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
    fetchAllData();
    
    const interval1 = setInterval(fetchAllData, 5000);
    const interval2 = setInterval(fetchPrediction, 5000);
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <main className="flex-1 md:p-12">
      <div className="flex-1 text-gray-300">
        <h2 className="text-3xl font-bold text-white mb-6">Prédictions de Trading</h2>
        
        {/* Section Prédictions BNN */}
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md mb-8">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Prédictions BNN - Temps Réel</h3>

          {/* État de chargement */}
          {loading && predictionHistory.length === 0 && (
            <div className="flex items-center space-x-3 text-blue-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
              <p>Chargement de la prédiction...</p>
            </div>
          )}

          {/* Affichage des erreurs */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-400 font-semibold">❌ {error}</p>
              <button
                onClick={fetchPrediction}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Réessayer
              </button>
            </div>
          )}
        
          {/* Affichage de la dernière prédiction */}
          {!loading && !error && prediction && (
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-6 space-y-3 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Action</p>
                  <p className="text-xl font-bold text-white">{prediction.action}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Prédiction</p>
                  <p className="text-xl font-bold text-green-400">{prediction.prediction}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Confiance</p>
                  <p className="text-xl font-bold text-blue-400">
                    {(prediction.confidence * 100).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Niveau de confiance</p>
                  <p className="text-xl font-bold text-yellow-400">{prediction.confidence_tier}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Taille de position</p>
                  <p className="text-xl font-bold text-purple-400">{prediction.position_size}x</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm">Message</p>
                  <p className="text-white">{prediction.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Graphique de l'évolution des prédictions */}
          {predictionHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-200 mb-4">📊 Évolution des prédictions en temps réel</h4>
              
              {/* Légende explicative */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 font-semibold">🎯 Confiance</p>
                  <p className="text-gray-400 text-xs">Niveau de certitude du modèle (0-100%)</p>
                </div>
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
                  <p className="text-amber-400 font-semibold">💰 Position Size</p>
                  <p className="text-gray-400 text-xs">Combien investir (ex: 2x = 200% du capital)</p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold">📍 Signal</p>
                  <p className="text-gray-400 text-xs">BUY = +100 | HOLD = 0 | SELL = -100</p>
                </div>
              </div>

              <div className="w-full h-96">
                <ResponsiveContainer>
                  <LineChart data={predictionHistory}>
                    <defs>
                      <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorPosition" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorAction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9ca3af" 
                      tick={{ fontSize: 11 }} 
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="#10b981" 
                      tick={{ fontSize: 11 }} 
                      domain={[0, 100]}
                      label={{ value: 'Confiance (%)', angle: -90, position: 'insideLeft', fill: '#10b981', style: { fontSize: 12 } }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="#f59e0b" 
                      tick={{ fontSize: 11 }}
                      label={{ value: 'Position (x)', angle: 90, position: 'insideRight', fill: '#f59e0b', style: { fontSize: 12 } }}
                    />
                    <YAxis 
                      yAxisId="action"
                      orientation="right"
                      stroke="#3b82f6" 
                      tick={{ fontSize: 11 }}
                      domain={[-100, 100]}
                      ticks={[-100, 0, 100]}
                      tickFormatter={(value) => {
                        if (value === 100) return 'BUY';
                        if (value === -100) return 'SELL';
                        return 'HOLD';
                      }}
                      dx={50}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15,23,42,0.95)",
                        border: "1px solid rgba(59,130,246,0.5)",
                        borderRadius: "10px",
                        color: "#f3f4f6",
                      }}
                      formatter={(value, name, props) => {
                        if (name === "Signal") {
                          return [props.payload.actionLabel, name];
                        }
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="confidence"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                      name="Confiance (%)"
                      isAnimationActive={true}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="positionSize"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', r: 4 }}
                      name="Position Size (x)"
                      isAnimationActive={true}
                    />
                    <Line
                      yAxisId="action"
                      type="stepAfter"
                      dataKey="actionValue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 5 }}
                      name="Signal"
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-gray-400 text-sm mt-3">
                Mise à jour automatique toutes les 20 s • {predictionHistory.length} points enregistrés
              </p>
            </div>
          )}

          {!loading && !error && !prediction && predictionHistory.length === 0 && (
            <p className="text-gray-500">Aucune prédiction disponible</p>
          )}
        </div>

        {/* Graphiques des actifs */}
        <div className="space-y-6">
          {symbols.map(({ key, symbol, name }) => (
            <div
              key={key}
              className="relative p-4 rounded-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(25,35,52,0.95) 100%)",
                boxShadow: "0 0 25px rgba(59,130,246,0.15)",
              }}
            >
              <h2 className="text-center text-sky-400 font-semibold mb-3 tracking-wide text-lg">
                📈 {name} ({symbol}) — {today}
              </h2>
              <div className="w-full h-80">
                <ResponsiveContainer>
                  <LineChart data={chartData[key]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-gray-400 text-sm mt-3">
                Mise à jour automatique toutes les 30 s
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PredictionPage;