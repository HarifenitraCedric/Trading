import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Données fictives pour le graphique
// La partie prédite est indiquée par 'isPrediction: true'
const data = [
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
];

const PredictionPage = () => {
  const [whatIfValue, setWhatIfValue] = useState(10);
  const [predictedRevenue, setPredictedRevenue] = useState(4500);

  // Fonction de base pour simuler l'analyse "What-if"
  const handlePredict = () => {
    // Logique de prédiction simulée :
    // Augmente le revenu prédit en fonction de l'input utilisateur.
    const newPrediction = data[data.length - 1].revenue * (1 + whatIfValue / 100);
    setPredictedRevenue(newPrediction.toFixed(2));
  };

  return (
    <main className="flex-1  md:p-12">
    <div className="flex-1 lg:p-8 text-gray-300">
      <h2 className="text-3xl font-bold text-white mb-6">Prédictions</h2>
      
      {/* Indicateurs de prédiction */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:bg-[radial-gradient(at_top_right,_#5686FE_4%,_#142636_60%,_#142636_30%)]">
          <p className="text-sm font-semibold text-gray-400">Revenu prévu (Prochain mois)</p>
          <p className="text-3xl font-bold text-green-400 mt-2">$3,800</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:bg-[radial-gradient(at_top_right,_#5686FE_4%,_#142636_60%,_#142636_30%)]">
          <p className="text-sm font-semibold text-gray-400">Nouveaux utilisateurs (Prochain mois)</p>
          <p className="text-3xl font-bold text-green-400 mt-2">1,500</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:bg-[radial-gradient(at_top_right,_#5686FE_4%,_#142636_60%,_#142636_30%)]">
          <p className="text-sm font-semibold text-gray-400">Taux de conversion</p>
          <p className="text-3xl font-bold text-green-400 mt-2">3.4%</p>
        </div>
        <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md dark:bg-[radial-gradient(at_top_right,_#5686FE_4%,_#142636_60%,_#142636_30%)]">
          <p className="text-sm font-semibold text-gray-400">Meilleure performance (Produit)</p>
          <p className="text-xl font-bold text-green-400 mt-2">Chaussures de sport</p>
        </div>
      </div>

      {/* Graphique de prédiction */}
      <div className="bg-gradient-to-t from-[#141a29] to-[#1a2333] rounded-xl p-6 shadow-md mb-8">
        <h3 className="text-xl font-bold text-gray-100 mb-4">Prévision des revenus et des utilisateurs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#E5E7EB' }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Legend wrapperStyle={{ color: '#E5E7EB' }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ stroke: '#10B981', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Revenu"
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#FBBF24"
              strokeWidth={2}
              dot={{ stroke: '#FBBF24', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              name="Utilisateurs"
            />
          </LineChart>
        </ResponsiveContainer>
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
