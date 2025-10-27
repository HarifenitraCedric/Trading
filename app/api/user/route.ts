import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // CORRECTION : Nous utilisons 'username' au lieu de 'name' car 'name' n'existe pas
    // dans le schéma Prisma de la table User, mais 'username' oui.
    const users = await prisma.user.findMany({
      select: { id: true, username: true }, 
    });

    return NextResponse.json(users);
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
