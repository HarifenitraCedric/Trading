// app/components/MainLayout.tsx
'use client';

import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      // Ajout des classes pour la bordure verte et le rayon de bordure
      className="relative mx-auto my-8 max-w-screen-2xl flex 
                 rounded-3xl border-2 border-green-500 shadow-2xl overflow-hidden" // Ajout de border-2 et border-green-500
    >
      {/* Le fond du layout, qui va suivre les coins arrondis */}
      <div className="absolute inset-0 bg-[#142636]"></div> {/* Le rounded-3xl est appliqué au parent */}
      
      {/* Contenu réel de la page */}
      <div className="relative z-10 flex w-full">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;