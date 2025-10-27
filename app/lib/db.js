// lib/db.js
import 'server-only'; // <-- AJOUTEZ CETTE LIGNE

import { Pool } from 'pg';

// Configurez votre connexion à la base de données
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function fetchUserWalletData() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT
          u.username,
          w.balance,
          w.currency
      FROM
          "User" u
      INNER JOIN 
          Wallet w ON u.id = w.user_id;
    `;
    
    // Exécutez la requête
    const result = await client.query(query);
    
    // 'rows' contient le tableau de résultats
    return result.rows; 
    
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    // Lancez l'erreur pour que le composant puisse la gérer
    throw new Error('Impossible de récupérer les données du tableau de bord.');
  } finally {
    // Relâchez le client pour le remettre dans le pool
    client.release();
  }
}