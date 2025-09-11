// pages/index.tsx

import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';


export default function Home() {
  return (
    <>
      <Head>
        <title>App Dashboard</title>
      </Head>
        <div className="flex w-full">
      <Sidebar />
      <MainContent />
    </div> </>
  );
}