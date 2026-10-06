# Birdie's Senior Living Solutions

Static website for senior living referral and placement guidance in Lubbock and surrounding areas. Designed for GitHub Pages at **https://birdiesplacement.com/**.

## Preview and validate

From the repository root:

```sh
python3 -m http.server 8000
python3 scripts/check_site.py
node --check assets/site.js
```

Visit `http://localhost:8000/`. Use a web server rather than opening files directly, because links intentionally start at the domain root.

## Deploy

Keep `index.html`, `style.css`, `CNAME`, `.nojekyll`, `404.html`, `robots.txt`, `sitemap.xml`, and all page/asset folders in the repository root. Replace the files with this updated version, commit, and push to your chosen Pages branch. Keep the existing custom-domain settings. This package has not been pushed or deployed automatically.

Directory URLs such as `/memory-care-lubbock/` resolve to their `index.html`. The old `/meet-the-owners.html` file preserves its existing canonical and browser redirect; it is not an HTTP 301. The custom domain is expected: root-relative paths do not support a GitHub project URL with a `/BirdiesPlacement/` prefix.

## Maintenance

- Review `AUDIT-CHANGES.md` for implemented fixes, limitations and owner follow-up.
- Edit shared colors/layout in `style.css` and shared behavior in `assets/site.js`.
- Analytics is disabled until a real measurement ID and privacy/consent configuration are provided.
- Keep titles, descriptions, canonical/social tags, structured data and sitemap consistent when adding pages.
- Keep headers, footers, business contact details and JSON-LD synchronized across static pages.
- Original PNG images remain as source assets; public pages use smaller WebP versions.
- Existing owner bios and phone numbers are retained. No testimonials, credentials or price estimates have been invented.
