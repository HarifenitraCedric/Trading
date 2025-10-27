import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GiExecutionerHood } from "react-icons/gi";

export async function GET() {
  try {
    // CORRECTION : Nous utilisons 'username' au lieu de 'name' car 'name' n'existe pas
    // dans le schéma Prisma de la table User, mais 'username' oui.
    const trans = await prisma.transaction.findMany({
      select: { userId: true, type: true, assetTicker: true,   assetQuantity: true,  totalAmountEUR: true, solde_actuel:true, executedAt: true}, 
    });

    return NextResponse.json(trans);
  } catch (error) {
    console.error("Erreur Prisma DÉTAILLÉE lors de l'accès aux utilisateurs :", error); 
    
    // Garder le message détaillé pour le débogage
    return NextResponse.json(
      { 
        error: "Erreur de connexion à la base de données (probablement une erreur de schéma maintenant)", 
        details: error instanceof Error ? error.message : "Erreur inconnue"
      }, 
      { status: 500 }
    );
  }
}
