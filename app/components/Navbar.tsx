"use client";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Navbar() {


  return (
    

  <header className="flex flex-col md:flex-row items-center justify-center  ">

          <div className="relative w-full md:w-auto flex-1 ">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-5/6 bg-white text-gray-400 rounded-md pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#142636] ml-12"
            />
            {/* Icône de recherche */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              🔍
            </div>
          </div>
  
          <div className="flex items-center space-x-4 mt-4 md:mt-0 ">
            <ThemeToggle />
            <span className="text-2xl cursor-pointer">🌐</span>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Image
                src="/ragnarlot.jpg" // Chemin vers votre image dans le dossier public
                alt="Profil de Robert"
                width={37} // Largeur en pixels (équivalent à w-8)
                height={37} // Hauteur en pixels (équivalent à h-8)
                className="rounded-full object-cover" // Rend l'image ronde et assure qu'elle couvre la zone
              />
              <span>Ragnar</span>
              <span className="text-lg">🔽</span>
            </div>
          </div>
        </header>
  );
}