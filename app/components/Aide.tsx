import React from 'react';

const HelpPage = () => {
  return (
    <main className="flex-1  md:p-12">
    <div className="flex-1  text-gray-300">
      <section className="bg-[#142636] rounded-xl p-6 shadow-md transition-colors duration-300 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Centre d'aide et de support</h2>
        <div className="space-y-6">
          <div className="bg-[#203445] p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
              <span className="mr-2 text-2xl">💡</span>
              Questions fréquentes (FAQ)
            </h3>
            <p className="text-gray-300 mt-2">
              Trouvez des réponses aux questions les plus courantes sur l'utilisation du tableau de bord, la gestion de votre portefeuille, et bien plus encore.
            </p>
            <a href="#" className="text-green-500 hover:underline mt-2 inline-block font-medium">
              Voir toutes les FAQ
              <span className="ml-1">→</span>
            </a>
          </div>
          <div className="bg-[#203445] p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
              <span className="mr-2 text-2xl">📞</span>
              Contactez le support
            </h3>
            <p className="text-gray-300 mt-2">
              Si vous n'avez pas trouvé de réponse, notre équipe est là pour vous aider.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <a href="#" className="flex items-center justify-center p-3 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors">
                <span className="mr-2">📧</span>Envoyer un email
              </a>
              <a href="#" className="flex items-center justify-center p-3 rounded-md border border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white transition-colors">
                <span className="mr-2">💬</span>Ouvrir un chat
              </a>
            </div>
          </div>
          <div className="bg-[#203445] p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
              <span className="mr-2 text-2xl">📖</span>
              Documentation et guides
            </h3>
            <p className="text-gray-300 mt-2">
              Consultez notre documentation complète pour des guides détaillés sur toutes les fonctionnalités de l'application.
            </p>
            <a href="#" className="text-green-500 hover:underline mt-2 inline-block font-medium">
              Accéder à la documentation
              <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#142636] rounded-xl p-6 shadow-md transition-colors duration-300">
        <h3 className="text-xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Dernières annonces</h3>
        <div className="space-y-4">
          <div className="p-3 bg-[#203445] rounded-md flex justify-between items-center hover:bg-[#2c4056] transition-colors">
            <div>
              <p className="text-gray-200 font-semibold">Maintenance du système</p>
              <p className="text-sm text-gray-400">Maintenance prévue le 28 octobre à 23h00 (UTC).</p>
            </div>
            <span className="text-xs text-gray-500">il y a 2 jours</span>
          </div>
          <div className="p-3 bg-[#203445] rounded-md flex justify-between items-center hover:bg-[#2c4056] transition-colors">
            <div>
              <p className="text-gray-200 font-semibold">Nouvelle fonctionnalité : 'Smart Segments'</p>
              <p className="text-sm text-gray-400">Découvrez comment utiliser les segments intelligents pour une analyse plus poussée.</p>
            </div>
            <span className="text-xs text-gray-500">il y a 5 jours</span>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};

export default HelpPage;
