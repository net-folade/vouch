import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/report
// Body: { seller_name, seller_location, qr_code?, price_paid?, notes?, reporter_role? }
// Files a counterfeit report. Status defaults to 'new' in the DB.
export async function POST(request: Request) {
  let body: {
    seller_name?: string;
    seller_location?: string;
    qr_code?: string | null;
    price_paid?: number | string | null;
    notes?: string | null;
    reporter_role?: "consumer" | "mechanic";
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const seller_name = body.seller_name?.trim();
  const seller_location = body.seller_location?.trim();
  if (!seller_name || !seller_location) {
    return NextResponse.json(
      { error: "seller_name and seller_location are required." },
      { status: 400 }
    );
  }

  const price =
    body.price_paid === null || body.price_paid === undefined || body.price_paid === ""
      ? null
      : Number(body.price_paid);

  const { data, error } = await supabase
    .from("reports")
    .insert({
      qr_code: body.qr_code?.trim() || null,
      seller_name,
      seller_location,
      price_paid: Number.isFinite(price as number) ? price : null,
      notes: body.notes?.trim() || null,
      reporter_role: body.reporter_role ?? "consumer",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
