import React from 'react';

const Setting = () => {
  return (
    <main className="flex-1  md:p-12">
    <div className="flex-1  text-gray-300">
      <section className="bg-[#142636] rounded-xl p-6 shadow-md transition-colors duration-300 mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Paramètres du compte</h2>
        <p className="text-gray-400 mb-6">
          Gérez les informations de votre profil, la sécurité, les préférences de notification et le thème de l'application.
        </p>

        {/* Section Profil */}
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
            <span className="mr-2 text-2xl">👤</span>
            Informations du profil
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">Nom</label>
              <input
                type="text"
                id="name"
                defaultValue="Robert"
                className="w-full mt-1 p-3 rounded-md bg-[#203445] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">Adresse email</label>
              <input
                type="email"
                id="email"
                defaultValue="robert@email.com"
                className="w-full mt-1 p-3 rounded-md bg-[#203445] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>
            <button className="p-3 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors">
              Sauvegarder les modifications
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 my-6"></div>

        {/* Section Sécurité */}
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
            <span className="mr-2 text-2xl">🔒</span>
            Sécurité du compte
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#203445] p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-200">Changer le mot de passe</p>
                <p className="text-sm text-gray-400">Maintenez votre compte en sécurité.</p>
              </div>
              <button className="p-2 rounded-md border border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white transition-colors">
                Changer le mot de passe
              </button>
            </div>
            <div className="flex justify-between items-center bg-[#203445] p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-200">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-400">Ajoutez une couche de sécurité supplémentaire.</p>
              </div>
              <button className="p-2 rounded-md bg-gray-600 text-gray-300 font-semibold hover:bg-gray-700 transition-colors">
                Activer
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 my-6"></div>

        {/* Section Préférences */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-green-400 flex items-center mb-2">
            <span className="mr-2 text-2xl">⚙️</span>
            Préférences de l'application
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#203445] p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-200">Mode sombre</p>
                <p className="text-sm text-gray-400">Activez le mode sombre pour une meilleure lisibilité.</p>
              </div>
              {/* Le bouton de bascule de thème doit être ajouté ici si vous le souhaitez */}
              <button className="p-2 rounded-full bg-gray-700 text-gray-200">
                🌙
              </button>
            </div>
            <div className="flex justify-between items-center bg-[#203445] p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-200">Notifications par email</p>
                <p className="text-sm text-gray-400">Recevez les mises à jour et les alertes importantes.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};

export default Setting;
