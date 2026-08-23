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

## Option B — Everything on Hostinger (VPS) — full guide

> Requires a **Hostinger VPS** (KVM plan). Shared "Premium/Business Web Hosting"
> cannot run Node.js and will not work. On a VPS, the app **and** its PostgreSQL
> database both live on the one Hostinger server.

### 1. Buy the VPS
hPanel → **VPS → Get VPS** → **KVM 1** is enough (1 vCPU, 4 GB RAM).
OS template: **Ubuntu 24.04** (plain). Set a **root password**. Note the **VPS IP**.

### 2. Connect (SSH)
hPanel → VPS → **Browser terminal**, or from your PC:
```bash
ssh root@YOUR_VPS_IP
```

### 3. Install Node.js 20, git, Nginx, PostgreSQL
```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx postgresql
npm install -g pm2
node -v            # should print v20.x
```

### 4. Create the database
```bash
sudo -u postgres psql <<'SQL'
CREATE DATABASE hiral;
CREATE USER hiraluser WITH ENCRYPTED PASSWORD 'ChangeThisStrongPass';
GRANT ALL PRIVILEGES ON DATABASE hiral TO hiraluser;
\c hiral
GRANT ALL ON SCHEMA public TO hiraluser;
SQL
```
Connection string:
`postgresql://hiraluser:ChangeThisStrongPass@localhost:5432/hiral?schema=public`

### 5. Get the code
```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/jaiminpanchal2002/hiralinternationalcourier.com.git
cd hiralinternationalcourier.com
```

### 6. Environment file
```bash
nano .env
```
Paste (edit the values):
```
DATABASE_URL="postgresql://hiraluser:ChangeThisStrongPass@localhost:5432/hiral?schema=public"
AUTH_SECRET="a-long-random-string-30-chars-plus"
NEXT_PUBLIC_SITE_URL="https://hiralinternationalcourier.com"
LEAD_WEBHOOK_SECRET="another-random-string"
ADMIN_EMAIL="admin@hiralinternational02.com"
ADMIN_PASSWORD="your-strong-admin-password"
ADMIN_NAME="Hiral Admin"
```
Save: `Ctrl+O`, `Enter`, `Ctrl+X`.

### 7. Build & seed
```bash
npm install
npx prisma db push      # creates all tables
npm run db:seed         # loads content + admin user
npm run build
```

### 8. Run with PM2 (keeps it alive + auto-starts on reboot)
```bash
pm2 start "npm run start" --name hiral
pm2 save
pm2 startup             # run the command it prints back
```
The app now runs on `http://localhost:3000` on the server.

### 9. Nginx reverse proxy (port 80 → 3000)
```bash
nano /etc/nginx/sites-available/hiral
```
Paste:
```nginx
server {
    listen 80;
    server_name hiralinternationalcourier.com www.hiralinternationalcourier.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable it:
```bash
ln -s /etc/nginx/sites-available/hiral /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

### 10. Point the domain at the VPS
hPanel → **Domains → hiralinternationalcourier.com**. If it says *Pending
setup*, click **Set up** and choose **use Hostinger nameservers**. Then
**DNS / Nameservers** → add:
- **A** record: `@` → `YOUR_VPS_IP`
- **A** record: `www` → `YOUR_VPS_IP`

### 11. Enable HTTPS (free SSL)
Once DNS points to the VPS (check with `ping hiralinternationalcourier.com`):
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d hiralinternationalcourier.com -d www.hiralinternationalcourier.com
```
Choose "redirect HTTP → HTTPS". Auto-renewal is configured.

### 12. Firewall (optional but recommended)
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

✅ Live at **https://hiralinternationalcourier.com**, admin at **/admin**.

### Updating later
```bash
cd /var/www/hiralinternationalcourier.com
git pull
npm install
npx prisma db push
npm run build
pm2 restart hiral
```

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
