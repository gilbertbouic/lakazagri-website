# LakazAgri — Marketing website

Professional product site for the **LakazAgri** Android app and cloud SaaS: farm-to-buyer coordination, multi-device sync, and trust layer (origin/batch ID, quality photos, payment proof).

**Live (GitHub Pages):** https://lakazagri.mkweli.tech/

## Production SaaS (Hetzner)

| Service | URL |
|---------|-----|
| Web app | https://app.mkweli.tech/ |
| API | https://api.mkweli.tech/ |
| Marketing (this repo) | https://lakazagri.mkweli.tech/ |

DNS for `api` / `app` points at the Hetzner VPS; this marketing site remains on GitHub Pages under `lakazagri.mkweli.tech`.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Full marketing page |
| `styles.css` | Brand design (greens + gold from logo) |
| `script.js` | Sticky header, mobile nav, pilot form → mailto |
| `assets/` | Logo + app screenshots |
| `downloads/` | Pilot APKs (v1.3-trust current) |
| `docs/` | Trust layer feature matrix |
| `.nojekyll` | Required so GitHub Pages serves files as-is |

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## GitHub Pages

Site is published from the **`main`** branch, folder **`/` (root)**.

After every push to `main`, Pages rebuilds automatically (usually within 1–2 minutes).

```bash
git clone https://github.com/gilbertbouic/lakazagri-website.git
cd lakazagri-website
# edit files…
git add -A
git commit -m "Update marketing copy"
git push
```

## Contact used on the site

- support@mkweli.tech  
- +230 5479 6356  
- Pilot APK (v1.3-trust): [download](https://lakazagri.mkweli.tech/downloads/lakazagri-phase-1-v1.3-trust.apk)  
- Web app: https://app.mkweli.tech/

## Licence

Marketing site for LakazAgri. All rights reserved unless otherwise noted.
