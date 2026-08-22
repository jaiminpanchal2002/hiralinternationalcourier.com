import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Inbound lead webhook — connect Facebook Lead Ads, WhatsApp Business, a
 * chatbot or Zapier/Make here so new leads land straight in the CRM.
 *
 * Security: send a shared secret as `?token=...` or header `x-webhook-secret`,
 * matching LEAD_WEBHOOK_SECRET in your environment.
 *
 * Accepts a flexible JSON body, e.g.:
 *   { "name": "...", "phone": "...", "email": "...", "source": "Facebook",
 *     "destination": "...", "message": "...", "external_id": "..." }
 * Facebook Lead Ads `field_data` arrays are also parsed automatically.
 */

const SOURCES = ["Website", "WhatsApp", "Facebook", "Instagram", "Phone", "Manual", "Referral"];

function pick(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return "";
}

// Flatten Facebook Lead Ads `field_data: [{name, values:[...]}]` into a map.
function fromFieldData(body: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  const fd = body.field_data;
  if (Array.isArray(fd)) {
    for (const f of fd) {
      const name = (f?.name ?? "").toString().toLowerCase();
      const val = Array.isArray(f?.values) ? f.values[0] : f?.values;
      if (name && val != null) out[name] = String(val);
    }
  }
  return out;
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const token =
      url.searchParams.get("token") ||
      request.headers.get("x-webhook-secret") ||
      "";
    const secret = process.env.LEAD_WEBHOOK_SECRET;

    if (!secret || token !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const merged = { ...body, ...fromFieldData(body) };

    const name = pick(merged, ["name", "full_name", "full name", "fullName"]) || "Unknown Lead";
    const phone = pick(merged, ["phone", "phone_number", "phone number", "mobile", "whatsapp"]);
    const email = pick(merged, ["email", "email_address", "e-mail"]);
    let source = pick(merged, ["source", "platform", "channel"]) || "Facebook";
    source = SOURCES.find((s) => s.toLowerCase() === source.toLowerCase()) || source;
    const destination = pick(merged, ["destination", "country", "city"]);
    const message = pick(merged, ["message", "note", "enquiry", "comments", "text"]);
    const external = pick(merged, ["external_id", "id", "leadgen_id", "lead_id"]);

    const lead = await prisma.lead.create({
      data: { name, phone, email, source, status: "New", destination, message, external },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Lead webhook failed:", error);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// Facebook webhook verification handshake (GET with hub.challenge).
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token && token === process.env.LEAD_WEBHOOK_SECRET) {
    return new Response(challenge ?? "", { status: 200 });
  }
  return NextResponse.json({ ok: true, message: "Hiral lead webhook is live" });
}
