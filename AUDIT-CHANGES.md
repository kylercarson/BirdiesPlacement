# September 2026 audit: implementation report

Reviewed against the supplied audit on October 6, 2026. Source: repository main, commit d971eca.

## Changes and audit coverage

| Audit finding | Implementation | Status |
| --- | --- | --- |
| Placeholder owner bios | Current repository already contains complete bios. Preserved them; corrected the owners page heading to one H1. | Already addressed; heading fixed |
| Missing local signals | Preserved existing Lubbock titles, descriptions, homepage H1, about/contact/footer wording. Added service-specific Lubbock metadata and copy. No unconfirmed town pages. | Addressed in code |
| Dead Privacy / Terms | Added `/privacy/` and `/terms/`; updated every public page footer. Privacy explains Formspree, GitHub Pages, Google Fonts, contact information and requests. | Implemented; owners should review accuracy before publication |
| Sensitive form details | Added privacy/contact note, discouragement of health records and identifiers, autocomplete, message length limit. Removed reliance on an unverified `_next` redirect parameter; ordinary Formspree submission remains. | Addressed in code; live submission still needs verification |
| Only one service landing page | Added six core care pages using clean directory URLs, each with unique content, costs-to-confirm guidance, questions, disclosure, and top/bottom contact actions. Linked related care options and the touring guide. | Addressed; no unverified local prices |
| Duplicate service lists | Replaced hero list with process highlights; turned homepage service section into six fully clickable cards. | Addressed |
| Missing family guides | Added `/guides/touring-checklist/`. | One guide added; additional evidence-based guides remain optional |
| Professional referral resource | Added `/for-professionals/`, with permission-based contact guidance, role limits and direct calls. | Addressed |
| Missing owner photo on homepage | Added existing owner photo plus background summary and link to complete bios. | Addressed |
| Missing experience signals | Used experience and degrees already present in the owner bios. | Addressed without invented credentials |
| FAQ gaps | Added service area, price comparisons, discharge timing, Medicaid questions and transparent referral-fee discussion. No coverage or response-time guarantees. | Addressed |
| Missing canonical tags | Added self-canonicals, homepage `/` links, retained old owners-page canonical/refresh compatibility page. | Addressed; refresh is not a server 301 |
| Missing structured data | Added ProfessionalService JSON-LD with existing name, domain, logo, Lubbock service area and labeled owner contacts. | Valid JSON; external Google validation remains |
| Missing sharing previews | Added Open Graph metadata, Twitter card type, and 1200×630 brand image. | Addressed |
| Missing icons | Created 32px favicon and 180px Apple touch icon from existing feather artwork. | Addressed |
| Image size/layout shift | Generated WebP assets; all public-page images have intrinsic dimensions and async decoding. Below-fold art, footer logos and homepage owner photo lazy-load. Original PNGs retained as sources. | Addressed |
| Navigation outside header | Moved navigation into header on public pages. | Addressed |
| Accessibility/mobile | Improved muted text contrast, focus indicators, 16px form controls, FAQ open/close markers, reduced-motion support, mobile navigation and logo sizing. Added normal text line spacing. | Implemented; real-device/browser check remains |
| Sitemap / robots | Added 12 canonical URLs to sitemap, robots sitemap reference and Legacy crawl exclusion. Added `.nojekyll`. | Addressed |
| Missing 404 | Added branded not-found page with call, consultation and home links; marked noindex. | Addressed |
| Analytics / call tracking | Shared JS updates footer year and includes disabled GA4 setup plus `phone_click` events. | Prepared, not enabled |
| Footer wording | Replaced “assisted livings” with “assisted living communities”; shared business/service-area footer includes both labeled owner contacts. | Addressed |
| Facebook share link | Kept existing supplied link rather than guessing a profile identity. | Needs verified direct page URL |
| Main business number / GBP consistency | Kept both existing owner numbers and labels. JSON-LD uses Tricia's existing number with both contacts. | Owner must confirm GBP primary or supply business line |
| Reviews / memberships | No fabricated ratings, reviews, association memberships or testimonials. | Needs genuine material and permission |

## Verification performed

- `python3 scripts/check_site.py`: 14 non-Legacy HTML files passed checks for local links/anchors, one H1 on content pages, viewport/description/canonical presence, image dimensions/alt, parsable JSON-LD, and sitemap XML.
- `node --check assets/site.js`: passed.
- `git diff --check`: passed.
- Browser screenshots were attempted with Playwright, but no Chromium executable is installed in this environment. Mobile rendering, actual layout shift, form delivery and PageSpeed are not claimed as verified.
- No live GitHub changes or deployment were made. Account-only Search Console, analytics, DNS redirects, Google Business Profile and Google Rich Results checks were not performed.

## Owner/deployment follow-up

1. Review legal text against actual business practices, especially data sharing and retention; obtain legal advice if desired. These pages document website behavior and are not a claim of legal compliance.
2. Confirm service coverage, the Google Business Profile primary phone and direct Google/Facebook profile URLs. Add verified profile URLs to `sameAs` in JSON-LD only after confirmation.
3. Provide approved testimonials/reviews and any relevant membership information.
4. To enable GA4, configure the real measurement ID in `assets/site.js`, update the privacy notice and any required consent handling, then mark `phone_click` as a key event in the analytics account. No tracking ID is fabricated.
5. Confirm the Formspree endpoint still belongs to Birdie's, submit a test inquiry and verify receipt.
6. Submit `https://birdiesplacement.com/sitemap.xml` in Search Console; inspect new pages after deployment. Check HTTPS/domain redirects and run mobile PageSpeed and real-device checks.

## Structure

Existing root CSS, images, homepage and owners URLs are retained to reduce deployment disruption. New care, guide, legal and referral pages use `folder/index.html`. `assets/site.js` holds shared behavior; `scripts/check_site.py` verifies the output. Legacy files remain unchanged and are excluded in robots.txt. These are plain static files: no build system is required. Repeated header/footer/schema blocks must be kept synchronized when editing pages.

## Requested revision

Restored the first delivered ZIP as the baseline. Changed the favicon and Apple touch icon to the existing basket-of-eggs artwork. Added 15 matching Call Sarah buttons immediately after Call Tricia buttons, with identical styling. Static link/metadata checks, JavaScript syntax and whitespace checks passed; each Tricia call button was checked for its adjacent Sarah call button.
