import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") || "AAPL"; // par défaut: Apple
  const apiKey = process.env.FINNHUB_API_KEY;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur Finnhub:", error);
    return NextResponse.json({ error: "Erreur de récupération des données" }, { status: 500 });
  }
}
