# Competitive Analysis & Free Ranking Plan

> Goal: out-rank the main HEIC-converter competitors **without spending money**, by
> exploiting their weaknesses (thin content, fragmented single-format sites, English-only,
> server-side uploads) with our strengths (client-side privacy, all-in-one formats,
> multi-language, rich guides).

---

## 1. Competitor scorecard

| Competitor | Monthly visits | Bounce | Pages/visit | Duration | Global rank | Domain age | Formats covered | Languages | Conversion model |
|---|---|---|---|---|---|---|---|---|---|
| **heic.online** | 305.7K | **52.65%** (best) | 1.82 | 26s | 167,558 | n/a | JPG / PNG / BMP | EN only | **Server upload** (deleted after 1h) |
| **heictojpg.com** | **2M** (largest) | 65.95% | 2.03 | 46s | 32,052 | **8.88 yrs** (2017) | **JPG only** | EN only | Server-side (likely) |
| **heictopng.com** | 626 (tiny) | 64.03% | 1.06 | 0s | – | 6.41 yrs (2020) | **PNG only** | EN only | **Client-side WASM** (no upload) |

### Per-competitor read
- **heic.online** — Content-rich (comparison table, how-tos, FAQ, affiliate software).
  *Weakness:* files are **uploaded to a server** (privacy risk), only JPG/PNG/BMP (**no WebP/PDF**),
  English-only. → We beat it on **privacy + WebP + PDF + i18n**.
- **heictojpg.com** — The traffic giant, but it ranks on **domain age + exact-match domain +
  backlinks**, not content. The page is essentially a title + dropzone (almost no SEO copy,
  no FAQ, no guides). Single format. → We beat it on **content depth + format breadth + i18n**.
  We will NOT win the exact head term "heic to jpg" quickly; we win the long tail.
- **heictopng.com** — Technically our clone (client-side WASM, no upload, privacy-first) and
  it even has decent copy. Yet only **626 visits** — proof that tech alone doesn't rank.
  You need content + links, which it skipped. → We emulate its privacy positioning but
  actually do the SEO it neglected.

---

## 2. What we already win on (don't waste it)
- ✅ **100% client-side / no upload** — heic.online's deadliest weakness.
- ✅ **All-in-one**: JPG + PNG + WebP + PDF in one site (competitors are fragmented, one domain per format).
- ✅ **Multi-language** de / ja / zh — all three rivals are English-only (blue ocean).
- ✅ **5 guides + FAQ structured data + sitemap (40 URLs) + hreflang** already in place.

---

## 3. What I (the agent) can execute for free — vs — what needs you

### ✅ I can do now (code / content I generate)
| Action | Status |
|---|---|
| Unify Header + Footer nav from one `TOOL_LINKS` source (fixes the mismatch) | **Done this session** |
| Add per-page internal links: `FormatLinks` on tool pages + contextual CTA on blog | **Done this session** |
| Keep privacy messaging in metadata/hero across all pages | Already live |
| Draft new comparison/guide articles (heic vs webp, heic vs png, Windows/Mac/Android tips) | On request |
| Add `HowTo` / richer `Breadcrumb` schema to format pages | On request |
| Translate guide **bodies** into de / ja / zh (UI already translated) | On request |
| Keep sitemap & `/doc → /blog` 301 redirects in sync | Already live |
| Generate copy for free backlink/directory submissions | `SUBMISSION_COPY.md`, `FREE_BACKLINKS_10.md`, `DIRECTORY_SUBMISSION.md` exist |

### 👤 You must do (requires accounts / manual action)
- Submit the **10 free backlinks** and directory listings (AlternativeTo, Product Hunt, DevHunt, etc.) — needs your login.
- Re-submit the sitemap (40 `/blog/` URLs) in **Google Search Console** and **Bing Webmaster**.
- Earn editorial backlinks (outreach, communities, comments) — slow but high value.
- Publish/share any new content I draft.

---

## 4. Unified internal-linking plan (per page)

Single rule: **the same 4 format links appear in both Header and Footer** (sourced from
`src/lib/nav.ts → TOOL_LINKS`), so navigation can never drift again.

| Page | In-body internal links | Nav (Header/Footer) |
|---|---|---|
| **Home `/`** | IconRow → 4 format pages · GuideLinks → 5 guides · FormatLinks → 4 formats | Header: 4 formats · Footer: Home + 4 formats + 5 guides |
| **`/heic-to-jpg`** | GuideLinks → 5 guides · FormatLinks → **png / webp / pdf** (excludes self) · FAQ | Header: 4 formats (jpg active) · Footer: all |
| **`/heic-to-png`** | GuideLinks → 5 guides · FormatLinks → **jpg / webp / pdf** · FAQ | Header: 4 formats (png active) · Footer: all |
| **`/heic-to-webp`** | GuideLinks → 5 guides · FormatLinks → **jpg / png / pdf** · FAQ | Header: 4 formats (webp active) · Footer: all |
| **`/heic-to-pdf`** | GuideLinks → 5 guides · FormatLinks → **jpg / png / webp** · FAQ | Header: 4 formats (pdf active) · Footer: all |
| **`/blog/<slug>`** | Guide-related → other 4 guides (siblings) · **1 contextual CTA → relevant format page** (e.g. heic-to-pdf guide → `/heic-to-pdf`) | Header: 4 formats · Footer: all. **No converter widget** in the article body (per earlier request) |

Why this works:
- Every format page links to the other three → the 4 format pages form an **evenly linked cluster**, distributing link equity and signaling topical authority to Google.
- Blog articles stay converter-free (editorial), but still pass authority to the tool pages via one contextual CTA + the footer.
- Header and Footer are identical sets → no more "they don't match" inconsistency.

---

## 5. Free differentiation roadmap (priority order)
1. **Lead with privacy everywhere** — title/description/guides hammer "no upload · 100% in-browser". Write one guide explicitly contrasting client-side vs server-upload converters (targets heic.online).
2. **Mine the long tail** the giants ignore: `heic to jpg no upload`, `open heic on windows 11`, `heic to pdf for print`, `heic to jpg bulk zip`, `heic vs webp`.
3. **Localize guides into de / ja / zh** bodies — near-zero competition for "HEIC konvertieren" / "HEIC 変換" / "HEIC 转换".
4. **Cluster content**: add `heic vs webp` / `heic vs png` comparison hubs; add `HowTo` schema.
5. **Execute the free backlinks + directories** prepared earlier, at 1–3/day (steady beats bursts).
6. **Lower bounce / raise pages-per-visit** via the internal-link cluster above.

## 6. Realistic expectation
heictojpg.com's 2M is propped up by an 8.88-year domain + backlinks; we won't take the
exact "heic to jpg" head term soon. But we can steadily own: privacy-intent queries,
non-English queries, comparison/scenario long-tail, and the "all formats in one tool" intent —
all low-competition and compounding. **Privacy + all-formats + i18n + content depth** is the
free way around their domain-age moat.
