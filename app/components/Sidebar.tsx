// components/Sidebar.tsx
'use client';

import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: '🏠', active: true },
    { name: 'AI Signs', icon: '🤖' },
    { name: 'Smart Money', icon: '💰' },
    { name: 'Profiler', icon: '📊' },
    { name: 'Tokens', icon: '🪙', new: true },
    { name: 'Hot Contracts', icon: '🔥' },
    { name: 'Insights', icon: '💡' },
    { name: 'Stake', icon: '🌱', new: true },
    { name: 'Portfolio', icon: '💼' },
    { name: 'Smart Segments', icon: '🧠' },
    { name: 'Watchlist', icon: '⭐' },
    { name: 'Chains', icon: '🔗' },
  ];

  return (
    <aside className="w-64 bg-[#142636] p-6 hidden md:block">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-12">
        <div className="w-8 h-8 rounded-md bg-green-500"></div>
        <span className="text-white text-xl font-bold">PREDICTINVEST </span>
      </div>

      {/* Navigation */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-[#203445] transition-colors ${item.active ? 'bg-[#203445] text-green-500' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
                {item.new && (
                  <span className="ml-auto text-xs bg-green-500 text-black px-2 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#203445] transition-colors">
          <span className="text-2xl">+</span>
          <span>Add a section</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;