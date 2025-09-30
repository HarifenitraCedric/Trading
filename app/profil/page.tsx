// pages/index.tsx
'use client';

import Head from 'next/head';

import Profil from '../components/Profil';



export default function Home() {
  
 
  return (
    <>
      
        <div className="flex w-full bg-[#F3F4F6] dark:bg-gradient-to-br dark:from-gray-900 dark:to-black">
      {/* <Sidebar /> */}
            <Profil/>

        </div> </>
  );
  }
