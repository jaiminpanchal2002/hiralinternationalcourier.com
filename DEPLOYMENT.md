# Deploying Hiral International Courier

This is a **full Next.js app** (live server + database): admin panel, shipment
tracking, lead CRM, contact API and server actions. It needs a **Node.js host**.

> ⚠️ **Hostinger _Premium Web Hosting_ (shared) cannot run this app.** Shared
> hosting only serves static files / PHP — there is no persistent Node.js
> server, and a static export can't include the admin, database or APIs.

You have two real options:

| Option | Where the app runs | Domain | Cost |
|--------|--------------------|--------|------|
| **A. Vercel + your Hostinger domain** ⭐ | Vercel (free) | stays on Hostinger, pointed to Vercel | **Free** |
| **B. Upgrade Hostinger** | Hostinger **VPS** or **Cloud** (Node.js) | Hostinger | paid upgrade |

Recommended: **Option A** — free, fast, made for Next.js, and you keep your
domain with Hostinger.

---

## Option A — Vercel + Hostinger domain (recommended)

### 1. Create a production database (2 min, free)
Vercel is serverless, so the local SQLite file won't persist. Use a free
managed Postgres:

1. Go to **neon.tech** → sign up → **Create project**.
2. Copy the **connection string** (looks like
   `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`).

### 2. Prisma is already set to Postgres ✅
`prisma/schema.prisma` uses `provider = "postgresql"` and the build runs
`prisma generate` automatically. Nothing to change.

### 3. Push code to GitHub
Already done → https://github.com/jaiminpanchal2002/hiralinternationalcourier.com

### 4. Deploy on Vercel
1. Go to **vercel.com** → sign in **with GitHub**.
2. **Add New → Project** → import the `hiralinternationalcourier.com` repo.
3. Add **Environment Variables** (Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | your Neon connection string |
   | `AUTH_SECRET` | a long random string (`openssl rand -hex 32`) |
   | `NEXT_PUBLIC_SITE_URL` | `https://hiralinternationalcourier.com` |
   | `LEAD_WEBHOOK_SECRET` | a random string |
   | `ADMIN_EMAIL` | `admin@hiralinternational02.com` |
   | `ADMIN_PASSWORD` | a strong password |
   | `ADMIN_NAME` | `Hiral Admin` |

4. Click **Deploy**. You'll get a temporary `*.vercel.app` URL.

### 5. Initialise the database (once)
From your PC, pointing at the Neon DB:

```bash
# put the Neon URL in .env as DATABASE_URL, then:
npx prisma db push     # creates all tables in the Neon database
npm run db:seed        # loads starter content + admin user
```

### 6. Point your Hostinger domain to Vercel
1. In Vercel: **Project → Settings → Domains → Add** `hiralinternationalcourier.com`.
   Vercel shows the exact DNS records.
2. In **Hostinger hPanel → Domains → DNS / Nameservers**, add:
   - **A record** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
   (Use whatever Vercel displays — it's authoritative.)
3. Wait for DNS to propagate (minutes to a few hours). Vercel auto-issues HTTPS.

Done — your site is live on your domain, on a free plan that scales.

---

## Option B — Hostinger VPS / Cloud (if you upgrade)

1. Upgrade to a **VPS** or **Cloud** plan (these include Node.js).
2. On the server: install Node 20+, clone the repo, `npm install`.
3. Set the same environment variables (use MySQL/Postgres, not SQLite).
4. `npx prisma migrate deploy && npm run db:seed && npm run build`.
5. Run with **PM2**: `pm2 start "npm run start" --name hiral` (port 3000).
6. Put **Nginx** in front as a reverse proxy (80/443 → 3000) with SSL
   (Certbot / Hostinger SSL).
7. Point the domain's A record to the VPS IP.

Ask me and I'll provide the exact Nginx config and PM2 setup.

---

## After deploying — connect live leads (optional)
In your CRM, leads already arrive from the website form. To pull **Facebook /
WhatsApp** leads automatically, point them at:

```
POST https://hiralinternationalcourier.com/api/webhooks/lead?token=YOUR_LEAD_WEBHOOK_SECRET
```

- **Facebook Lead Ads:** connect via a Meta App (Webhooks → leadgen) or, more
  simply, **Zapier/Make**: "New Lead (Facebook) → Webhook POST" to the URL above.
- **WhatsApp:** WhatsApp Business API or a chatbot → same webhook.
- The endpoint already understands Facebook's `field_data` format and the
  verification handshake.
