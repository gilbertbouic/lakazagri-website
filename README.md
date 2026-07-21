# LakazAgri Phase 1 — Marketing website

Professional single-page site for **Phase 1** of the LakazAgri Android app: farm-to-buyer coordination (register, post availability, post demand, browse demand).

**Live (GitHub Pages):** https://gilbertbouic.github.io/lakazagri-website/

**Custom domain (after DNS):** https://lakazagri.mu/

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Full marketing page |
| `styles.css` | Brand design (greens + gold from logo) |
| `script.js` | Sticky header, mobile nav, pilot form → mailto |
| `assets/` | Logo + Phase 1 app screenshots |
| `.nojekyll` | Required so GitHub Pages serves files as-is |

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## GitHub Pages (already set up on this repo)

Site is published from the **`main`** branch, folder **`/` (root)**.

After every push to `main`, Pages rebuilds automatically (usually within 1–2 minutes).

### Update the site later

```bash
git clone git@github.com:gilbertbouic/lakazagri-website.git
cd lakazagri-website
# edit files…
git add -A
git commit -m "Update marketing copy"
git push
```

## Point lakazagri.mu at this site (Dynadot)

### Option A — GitHub Pages only (simplest)

1. Open repo **Settings → Pages**.
2. Under **Custom domain**, enter `lakazagri.mu` and save (GitHub may also suggest `www`).
3. In **Dynadot → Manage DNS** for `lakazagri.mu` (while still using Dynadot nameservers), add:

   | Type | Host | Value |
   |------|------|--------|
   | **A** | `@` (or blank) | `185.199.108.153` |
   | **A** | `@` | `185.199.109.153` |
   | **A** | `@` | `185.199.110.153` |
   | **A** | `@` | `185.199.111.153` |
   | **CNAME** | `www` | `gilbertbouic.github.io` |

4. Wait for DNS (minutes to a few hours). In GitHub Pages, tick **Enforce HTTPS** once the certificate is ready.
5. Optional: add a `CNAME` file in this repo containing only:

   ```
   lakazagri.mu
   ```

   (GitHub usually creates this when you set the custom domain in the UI.)

### Option B — Cloudflare DNS (recommended long-term)

1. Add `lakazagri.mu` to Cloudflare (free).
2. Change **nameservers in Dynadot** to the two Cloudflare nameservers.
3. In Cloudflare DNS, add the same A records + `www` CNAME as above (or use Cloudflare proxy carefully with GitHub Pages).
4. Set custom domain on the GitHub Pages settings page.

Keep **Dynadot only as the registrar** (renewal). Host the site on GitHub Pages; fix email separately (Cloudflare Email Routing or Zoho/Google).

## Contact used on the site

- gilbert@mkweli.tech  
- +230 5479 6356  
- Phase 1 APK: [GitHub release](https://github.com/gilbertbouic/lakazAgri/releases/download/phase-1.v1.0/lakazagri-phase-1-v1.0.apk)

## Licence

Marketing site for LakazAgri. All rights reserved unless otherwise noted.
