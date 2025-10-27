import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const hardcodedUserId = 1;

  try {
    // Récupère TOUTES les wallets du user (pas de filtre currency ici)
    const holdings = await prisma.wallet.findMany({
      where: { userId: hardcodedUserId },
      select: { id: true, userId: true, currency: true, balance: true, updatedAt: true }
    });

    console.log("📦 holdings bruts:", holdings);

    // Normaliser : supprimer tout caractère non alphanumérique, trim et uppercase
    const normalized = holdings.map(h => {
      const raw = String(h.currency ?? "");
      // retire guillemets, espaces invisibles, caractères non alphanumériques
      const cleaned = raw.replace(/[^A-Za-z0-9]/g, "").trim().toUpperCase();
      const balanceNum = h.balance != null ? Number(h.balance.toString()) : 0;
      return { id: h.id, currencyRaw: raw, currency: cleaned, balance: balanceNum, updatedAt: h.updatedAt };
    });

    console.log("🔍 holdings normalisés:", normalized);

    // Construire map et fallback si cleaned est vide (utiliser substring search)
    const balancesMap: Record<string, number> = {};
    for (const h of normalized) {
      if (h.currency) {
        balancesMap[h.currency] = h.balance;
      } else {
        // si cleaned vide, essayer d'extraire EUR/BTC depuis currencyRaw
        const rawUp = h.currencyRaw.toUpperCase();
        if (rawUp.includes("EUR")) balancesMap["EUR"] = h.balance;
        if (rawUp.includes("BTC")) balancesMap["BTC"] = h.balance;
      }
    }

    const responseData = {
      cash: { balance: balancesMap["EUR"] ?? 0.0, currency: "EUR" },
      crypto: { balance: balancesMap["BTC"] ?? 0.0, currency: "BTC" }
    };

    console.log("✅ responseData:", responseData);

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    });

  } catch (err) {
    console.error("❌ Erreur API wallets:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
