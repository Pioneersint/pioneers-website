# Pioneers International - Domain Setup Guide

## Option 2 (Recommended): Netlify DNS + Nameservers

This gives Netlify full control of DNS, automatic SSL, and fastest CDN.

---

## Step 1: Change Nameservers on Name.com

1. Go to **Name.com** and sign in: https://www.name.com/account
2. Find **pioneersint.com** in your domain list
3. Click **Manage** or **DNS/Nameservers**
4. Look for **Nameservers** section
5. Change from current nameservers to:

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

6. Click **Save**

> Note: Nameserver changes take 24-48 hours to fully propagate.

---

## Step 2: Add Custom Domains in Netlify

1. Go to **Netlify Dashboard**: https://app.netlify.com
2. Select your site: **pioneers-website**
3. Go to **Site Settings** (top menu)
4. Click **Domain Management** in left sidebar
5. Under **Custom Domains**, click **Add Custom Domain**
6. Enter: `pioneersint.com`
7. Click **Verify** then **Add Domain**
8. Add another domain: `www.pioneersint.com`
9. Set `pioneersint.com` as **Primary Domain**

Netlify will automatically:
- Request SSL certificates (HTTPS)
- Configure DNS records
- Set up redirects

---

## Step 3: Add Subdomains as Domain Aliases

In the same **Domain Management** section:

1. Click **Add Custom Domain**
2. Enter: `njpi-macs.pioneersint.com`
3. Click **Verify** then **Add Domain**
4. Repeat for:
   - `consulting.pioneersint.com`
   - `hccs.pioneersint.com`

Netlify will automatically create DNS records for these subdomains.

---

## Alternative: Keep cPanel + Change DNS Records Only

If you prefer to keep using cPanel for DNS:

### In cPanel > Domains > Zone Editor:

| Type | Host | Points To | TTL |
|------|------|-----------|-----|
| A | @ | 75.2.60.5 | 600 |
| CNAME | www | regal-manatee-13b43c.netlify.app | 600 |
| CNAME | njpi-macs | regal-manatee-13b43c.netlify.app | 600 |
| CNAME | consulting | regal-manatee-13b43c.netlify.app | 600 |
| CNAME | hccs | regal-manatee-13b43c.netlify.app | 600 |

### Wait for DNS Propagation:
- Usually 5 minutes to 48 hours
- Check at: https://whatsmydns.net
- Enter pioneersint.com and select A record to see propagation

---

## Step 4: Verify Everything Works

After setup, test these URLs:

| URL | Expected Result |
|-----|----------------|
| https://pioneersint.com | Main Pioneers website |
| https://www.pioneersint.com | Redirects to pioneersint.com |
| https://njpi-macs.pioneersint.com | NJPI-MACS Learning Platform |
| https://consulting.pioneersint.com | Consulting Services Page |
| https://hccs.pioneersint.com | Healthcare Compliance System |
| https://pioneersint.com/api/health | JSON: {"status":"ok"} |

---

## Troubleshooting

### SSL Certificate Issues
If you see SSL errors:
1. In Netlify: Go to Site Settings > SSL/TLS certificate
2. Click **Verify DNS configuration**
3. Click **Renew certificate**
4. Wait 10-15 minutes

### Domain Not Working
1. Check DNS propagation: https://whatsmydns.net
2. Clear browser cache / try incognito mode
3. Try different network (mobile data)

### Functions Returning HTML (404)
This was fixed in the latest deployment. If it happens:
1. Check Netlify deploy log for build errors
2. Ensure `netlify/functions/` folder exists in repo
3. Verify `netlify.toml` has correct build command

---

## Architecture Summary

```
pioneersint.com ────────────────→ Main Website
├── njpi-macs.pioneersint.com → NJPI-MACS Platform (Blue theme)
├── consulting.pioneersint.com → Consulting Services (Red theme)
├── hccs.pioneersint.com ─────→ Healthcare Compliance (Green theme)
└── api/* ────────────────────→ Netlify Functions (Backend)
    ├── /api/contact → Contact form handler
    ├── /api/payment → PayTabs payment processing
    ├── /api/otp ────→ OTP verification
    └── /api/health ─→ Health check
```

All 4 domains point to the same Netlify site. The React app detects the subdomain
from window.location.hostname and renders the appropriate landing page.
