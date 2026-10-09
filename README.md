# LakazAgri - Marketing website

Professional product site for the **LakazAgri** Android app: farm-to-buyer coordination, with accountability by Hyperledger Fabric verification of the batch (origin, quality photos, payment proof).

**Live (GitHub Pages):** https://lakazagri.mkweli.tech/

## Status

The marketing site stays on GitHub Pages at https://lakazagri.mkweli.tech/.

The shared cloud is paused. The page asks visitors to request a demo at gilbert@mkweli.tech. It does not link to the web app, the API, or a pilot APK.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | Full marketing page |
| `styles.css` | Brand design (greens + gold from logo) |
| `script.js` | Sticky header, mobile nav, pilot form → mailto |
| `assets/` | Logo + app screenshots |
| `docs/` | Trust layer feature matrix |
| `.nojekyll` | Required so GitHub Pages serves files as-is |

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## GitHub Pages

Site is published from the **`main`** branch, folder **`/` (root)**.

After every push to `main`, Pages rebuilds automatically (usually within 1-2 minutes).

```bash
git clone https://github.com/gilbertbouic/lakazagri-website.git
cd lakazagri-website
# edit files…
git add -A
git commit -m "Update marketing copy"
git push
```

## Contact used on the site

- gilbert@mkweli.tech  
- +230 5479 6356  
- Demo by appointment (the public APK and web app links are paused)

## Licence

Marketing site for LakazAgri. All rights reserved unless otherwise noted.
