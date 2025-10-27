import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, walletUpdates, transaction } = body; // <-- ajout de transaction

    if (!userId || !walletUpdates || !Array.isArray(walletUpdates)) {
      return NextResponse.json(
        { error: "Champs manquants dans la requête." },
        { status: 400 }
      );
    }

    // 1️⃣ — Mise à jour ou création du wallet
    for (const update of walletUpdates) {
      if (!update.currency || update.balance === undefined || update.balance === null) {
        return NextResponse.json(
          { error: "Champs manquants pour une mise à jour de wallet." },
          { status: 400 }
        );
      }

      await prisma.wallet.upsert({
        where: { userId_currency: { userId, currency: update.currency } },
        update: { balance: update.balance },
        create: { userId, currency: update.currency, balance: update.balance },
      });
    }

    // 2️⃣ — Enregistrement de la transaction (achat ou vente)
    if (transaction) {
      const { type, assetTicker, assetQuantity, totalAmountEUR,solde_actuel } = transaction;

      if (!type || !assetTicker || !assetQuantity) {
        return NextResponse.json(
          { error: "Champs manquants pour la transaction." },
          { status: 400 }
        );
      }

      await prisma.transaction.create({
        data: {
          userId,
          type, 
          assetTicker,
          assetQuantity,
          totalAmountEUR,
          solde_actuel,
        },
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json(
      { error: "Erreur serveur", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
