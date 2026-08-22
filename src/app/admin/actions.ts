"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => parseInt(String(fd.get(k) ?? "0"), 10) || 0;
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";

function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------------- Settings ---------------- */
export async function updateSettings(fd: FormData) {
  await requireAdmin();
  await prisma.setting.update({
    where: { id: 1 },
    data: {
      companyName: str(fd, "companyName"),
      tagline: str(fd, "tagline"),
      description: str(fd, "description"),
      phonePrimary: str(fd, "phonePrimary"),
      phoneSecondary: str(fd, "phoneSecondary"),
      email: str(fd, "email"),
      addressLine: str(fd, "addressLine"),
      mapEmbedUrl: str(fd, "mapEmbedUrl"),
      businessHours: str(fd, "businessHours"),
      whatsapp: str(fd, "whatsapp"),
      facebook: str(fd, "facebook"),
      instagram: str(fd, "instagram"),
      metaTitle: str(fd, "metaTitle"),
      metaDescription: str(fd, "metaDescription"),
      metaKeywords: str(fd, "metaKeywords"),
    },
  });
  revalidateSite();
}

export async function changePassword(fd: FormData) {
  const session = await requireAdmin();
  const current = str(fd, "current");
  const next = str(fd, "next");
  if (next.length < 6) throw new Error("New password must be at least 6 characters");
  const admin = await prisma.admin.findUnique({ where: { id: session.sub } });
  if (!admin || !(await bcrypt.compare(current, admin.passwordHash))) {
    throw new Error("Current password is incorrect");
  }
  await prisma.admin.update({
    where: { id: session.sub },
    data: { passwordHash: await bcrypt.hash(next, 10) },
  });
}

/* ---------------- Services ---------------- */
function servicePayload(fd: FormData) {
  const features = str(fd, "features")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return {
    title: str(fd, "title"),
    slug: str(fd, "slug").toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    summary: str(fd, "summary"),
    description: str(fd, "description"),
    icon: str(fd, "icon") || "Package",
    features: JSON.stringify(features),
    order: num(fd, "order"),
    published: bool(fd, "published"),
  };
}
export async function createService(fd: FormData) {
  await requireAdmin();
  await prisma.service.create({ data: servicePayload(fd) });
  revalidateSite();
}
export async function updateService(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.service.update({ where: { id }, data: servicePayload(fd) });
  revalidateSite();
}
export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- Destinations ---------------- */
function destPayload(fd: FormData) {
  return {
    name: str(fd, "name"),
    code: str(fd, "code").toLowerCase().slice(0, 2),
    transitDays: str(fd, "transitDays"),
    popular: bool(fd, "popular"),
    order: num(fd, "order"),
    published: bool(fd, "published"),
  };
}
export async function createDestination(fd: FormData) {
  await requireAdmin();
  await prisma.destination.create({ data: destPayload(fd) });
  revalidateSite();
}
export async function updateDestination(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.destination.update({ where: { id }, data: destPayload(fd) });
  revalidateSite();
}
export async function deleteDestination(id: string) {
  await requireAdmin();
  await prisma.destination.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- Stats ---------------- */
export async function createStat(fd: FormData) {
  await requireAdmin();
  await prisma.stat.create({
    data: {
      label: str(fd, "label"),
      value: str(fd, "value"),
      suffix: str(fd, "suffix"),
      order: num(fd, "order"),
    },
  });
  revalidateSite();
}
export async function updateStat(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.stat.update({
    where: { id },
    data: {
      label: str(fd, "label"),
      value: str(fd, "value"),
      suffix: str(fd, "suffix"),
      order: num(fd, "order"),
    },
  });
  revalidateSite();
}
export async function deleteStat(id: string) {
  await requireAdmin();
  await prisma.stat.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- Testimonials ---------------- */
function testimonialPayload(fd: FormData) {
  return {
    name: str(fd, "name"),
    role: str(fd, "role"),
    quote: str(fd, "quote"),
    rating: Math.min(5, Math.max(1, num(fd, "rating") || 5)),
    order: num(fd, "order"),
    published: bool(fd, "published"),
  };
}
export async function createTestimonial(fd: FormData) {
  await requireAdmin();
  await prisma.testimonial.create({ data: testimonialPayload(fd) });
  revalidateSite();
}
export async function updateTestimonial(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.testimonial.update({ where: { id }, data: testimonialPayload(fd) });
  revalidateSite();
}
export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- FAQs ---------------- */
function faqPayload(fd: FormData) {
  return {
    question: str(fd, "question"),
    answer: str(fd, "answer"),
    category: str(fd, "category") || "General",
    order: num(fd, "order"),
    published: bool(fd, "published"),
  };
}
export async function createFaq(fd: FormData) {
  await requireAdmin();
  await prisma.faq.create({ data: faqPayload(fd) });
  revalidateSite();
}
export async function updateFaq(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.faq.update({ where: { id }, data: faqPayload(fd) });
  revalidateSite();
}
export async function deleteFaq(id: string) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- Shipments ---------------- */
function shipmentPayload(fd: FormData) {
  const est = str(fd, "estimatedDelivery");
  return {
    awb: str(fd, "awb").toUpperCase(),
    status: str(fd, "status") || "Booked",
    senderName: str(fd, "senderName"),
    receiverName: str(fd, "receiverName"),
    origin: str(fd, "origin"),
    destination: str(fd, "destination"),
    service: str(fd, "service") || "Air Cargo",
    weight: str(fd, "weight"),
    currentLocation: str(fd, "currentLocation"),
    estimatedDelivery: est ? new Date(est) : null,
  };
}
export async function createShipment(fd: FormData) {
  await requireAdmin();
  await prisma.shipment.create({ data: shipmentPayload(fd) });
  revalidateSite();
}
export async function updateShipment(id: string, fd: FormData) {
  await requireAdmin();
  await prisma.shipment.update({ where: { id }, data: shipmentPayload(fd) });
  revalidateSite();
}
export async function deleteShipment(id: string) {
  await requireAdmin();
  await prisma.shipment.delete({ where: { id } });
  revalidateSite();
}
export async function addTrackingEvent(shipmentId: string, fd: FormData) {
  await requireAdmin();
  const ts = str(fd, "timestamp");
  const status = str(fd, "status");
  const location = str(fd, "location");
  await prisma.trackingEvent.create({
    data: {
      shipmentId,
      status,
      location,
      note: str(fd, "note"),
      timestamp: ts ? new Date(ts) : new Date(),
    },
  });
  // Keep the shipment's headline status/location in sync with the latest event.
  await prisma.shipment.update({
    where: { id: shipmentId },
    data: { status, currentLocation: location },
  });
  revalidateSite();
}
export async function deleteTrackingEvent(id: string) {
  await requireAdmin();
  await prisma.trackingEvent.delete({ where: { id } });
  revalidateSite();
}

/* ---------------- Messages ---------------- */
export async function toggleMessageRead(id: string, read: boolean) {
  await requireAdmin();
  await prisma.contactSubmission.update({ where: { id }, data: { read } });
}
export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.delete({ where: { id } });
}
