import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number").max(30),
  destination: z.string().max(120).optional().default(""),
  message: z.string().min(5, "Please add a short message").max(2000),
  // Honeypot — should stay empty.
  company: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    const { company, ...data } = parsed.data;
    if (company) {
      // Bot filled the honeypot — pretend success, save nothing.
      return NextResponse.json({ ok: true });
    }

    await prisma.contactSubmission.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
