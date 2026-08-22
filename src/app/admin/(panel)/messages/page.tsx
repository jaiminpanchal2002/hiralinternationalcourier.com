import { prisma } from "@/lib/prisma";
import { MessagesList } from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
          Enquiries
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.length} total · {unread} unread — quote requests from your contact form.
        </p>
      </div>
      <MessagesList
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          phone: m.phone,
          destination: m.destination,
          message: m.message,
          read: m.read,
          createdAt: m.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
