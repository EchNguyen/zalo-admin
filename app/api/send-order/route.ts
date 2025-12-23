import { NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
    }
  });
}

export async function POST(req: Request) {
  try {
    const { userInfo, messageToken, data } = await req.json();

    console.log("📦 userInfo:", JSON.stringify(userInfo, null, 2));
    console.log("🔑 messageToken:", messageToken);
    console.log("🧾 data:", JSON.stringify(data, null, 2));

    const response = await fetch("https://jyvgikwgrzhjrwqljkns.supabase.co/functions/v1/send-order-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      },
      body: JSON.stringify({ userInfo, messageToken, data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Supabase error:", errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const result = await response.json();
    console.log("✅ Supabase response:", JSON.stringify(result, null, 2));

    return NextResponse.json(result, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      }
    });
  } catch (err) {
    console.error("🔥 Proxy error:", err);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
