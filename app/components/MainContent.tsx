// components/MainContent.tsx
'use client';

import React from 'react';

const MainContent = () => {
  return (
    <main className="flex-1 p-6 md:p-12">
      {/* Header avec la barre de recherche */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="relative w-full md:w-auto flex-1 md:mr-4">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-[#142636] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {/* Icône de recherche */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            🔍
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <span className="text-2xl cursor-pointer">🌐</span>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <span>Robert</span>
            <span className="text-lg">🔽</span>
          </div>
        </div>
      </header>

      {/* Section Portfolio Overview */}
      <section className="bg-[#142636] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Market Prediction Dashboard</h2>
            <p className="text-sm text-gray-500">Global Market Sentiment</p>
          </div>
          <div className="flex items-center space-x-2 text-green-500">
            <button className="hidden sm:block">+ Add Payment</button>
            <button className="hidden sm:block">↑ Send Invoice</button>
            <button className="sm:hidden text-2xl">+</button>
            <button className="sm:hidden text-2xl">↑</button>
          </div>
        </div>

        {/* Balance et graphique */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl text-gray-400">Total Balance</h3>
            <p className="text-3xl lg:text-5xl font-extrabold text-white my-2">$32,2013.16</p>
            <span className="text-green-500">+2.25%</span>
          </div>
          <div className="w-full lg:w-2/3">
            {/* Simulation du graphique */}
            <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-400">
              Graphique de série temporelle ici (Chart.js ou Recharts)
            </div>
          </div>
        </div>
      </section>

      {/* Balance par devise */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {['USD', 'EUR', 'GBP', 'JPY'].map((currency) => (
          <div 
            key={currency} 
            className="bg-[#142636] p-6 rounded-xl flex flex-col justify-between hover:bg-[#203445] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl">
                {currency === 'USD' ? '💲' : currency === 'EUR' ? '💶' : currency === 'GBP' ? '💷' : '💴'}
              </span>
              <span className="font-bold text-lg">{currency}</span>
              <span className="text-green-500">↗️</span>
            </div>
            <p className="text-2xl font-bold text-white my-2">£8,923</p>
            <span className="text-green-500 text-sm">+40,225</span>
          </div>
        ))}
      </section>

      {/* Tableau des tokens */}
      <section className="bg-[#142636] rounded-xl p-6">
        
      </section>
    </main>
  );
};

export default MainContent;