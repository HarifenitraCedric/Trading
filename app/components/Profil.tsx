"use client";
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Profil = () => {
 

  const user = {
    name: "Robert",
    email: "robert@email.com",
    bio: "Développeur passionné par la finance décentralisée et la technologie.",
    avatar: "https://placehold.co/150x150/0A141E/EAEFF5?text=R",
    stats: {
      totalFunds: "$54,123.50",
      tradingVolume: "$12,450.00",
      transactionCount: 234
    }
  };

  const recentTransactions = [
    { id: 1, type: "Achat", token: "ETH", amount: "1.2 ETH", date: "2023-10-25" },
    { id: 2, type: "Vente", token: "BTC", amount: "0.05 BTC", date: "2023-10-24" },
    { id: 3, type: "Dépôt", token: "USD", amount: "$1000", date: "2023-10-23" },
    { id: 4, type: "Achat", token: "SOL", amount: "5 SOL", date: "2023-10-22" },
  ];

  return (
    <main className="flex-1  md:p-12">
    <div className="flex font-sans min-h-screen bg-[#0A141E] dark:bg-[#0A141E] text-gray-300 dark:text-gray-300 transition-colors duration-300">
      
      {/* Sidebar - Same as Dashboard */}
     

      {/* Main content */}
      <div className="flex-1 ">

        {/* User Profile Section */}
        <section className="bg-[#142636] rounded-xl p-6 mb-8 shadow-md transition-colors duration-300">
          <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <img 
              src={user.avatar}
              alt={`Profil de ${user.name}`}
              className="w-24 h-24 rounded-full border-4 border-green-500"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-100">{user.name}</h2>
              <p className="text-md text-gray-400">{user.email}</p>
              <p className="text-sm mt-2 text-gray-300 max-w-lg">{user.bio}</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#142636] p-6 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300">
            <span className="text-sm text-gray-400">Total des fonds</span>
            <p className="text-3xl font-bold text-white my-2">{user.stats.totalFunds}</p>
          </div>
          <div className="bg-[#142636] p-6 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300">
            <span className="text-sm text-gray-400">Volume de trading</span>
            <p className="text-3xl font-bold text-white my-2">{user.stats.tradingVolume}</p>
          </div>
          <div className="bg-[#142636] p-6 rounded-xl flex flex-col justify-between shadow-md transition-colors duration-300">
            <span className="text-sm text-gray-400">Transactions</span>
            <p className="text-3xl font-bold text-white my-2">{user.stats.transactionCount}</p>
          </div>
        </section>

        {/* Recent Transactions Table */}
        <section className="bg-[#142636] rounded-xl p-6 shadow-md transition-colors duration-300">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Transactions récentes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 text-left text-gray-400 font-medium">Date</th>
                  <th className="py-2 text-left text-gray-400 font-medium">Type</th>
                  <th className="py-2 text-left text-gray-400 font-medium">Token</th>
                  <th className="py-2 text-left text-gray-400 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-700 hover:bg-[#203445] transition-colors">
                    <td className="py-4 whitespace-nowrap text-gray-300">{tx.date}</td>
                    <td className="py-4 whitespace-nowrap text-gray-300">{tx.type}</td>
                    <td className="py-4 whitespace-nowrap text-green-500">{tx.token}</td>
                    <td className="py-4 whitespace-nowrap text-white">{tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </main>
  );
};

export default Profil;
