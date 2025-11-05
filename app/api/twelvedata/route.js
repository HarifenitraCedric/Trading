import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const interval = searchParams.get("interval") || "1min";

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol parameter" }, { status: 400 });
  }

  try {
    const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=${process.env.TWELVE_API_KEY}&outputsize=1`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "error") {
      return NextResponse.json({ error: data.message }, { status: 500 });
    }

    const latest = data.values ? data.values[0] : null;

    return NextResponse.json({
      symbol,
      price: latest ? parseFloat(latest.close) : null,
      datetime: latest ? latest.datetime : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
