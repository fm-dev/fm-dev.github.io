# Muhammad Fajri Afriyansyah

A static portfolio for GitHub Pages. Serve this folder with a static HTTP server (for example, `npx serve .`) for local preview; the animation modules require HTTP. No application dependencies or build step are required.

- `index.html`: profile, four employment records, projects, GitHub activity, education, skills, and contact details.
- `assets/`: the required, unchanged Taste 2.5.1 layout, system, motion, and word-highlight runtime files.
- `css/portfolio.css`: portfolio content styles and responsive adaptations.
- `tokens.css`: the dealt cool-grey-cobalt palette, Albert Sans typography, dark theme, and calendar token aliases.
- `js/github-activity.js`: contribution data, calendar rendering, period selection, and daily exploration.
- `js/portfolio.js`: keyboard focus containment and background isolation for the kit's mobile menu. Content and native project disclosures remain accessible without JavaScript.
- `js/color-mode.js`: light/dark mode, using the device preference until the visitor chooses a theme. The navigation toggle saves that choice in local storage and applies it before styles load.

Employment details were supplied by the profile owner from LinkedIn on 3 November 2026. Academic contributions include links to official PCR sources. Fonts are loaded from Google Fonts with local fallback fonts.

Original template files, including `base.css`, are retained but are not loaded by the main page. Local verification, plans, and screenshots are stored in the ignored `.taste-skill/` and `.hallmark/` folders.

Motion follows Taste's system: one hero entrance, pointer feedback, and a word-highlight moment in the education section. Ordinary content stays readable while scrolling. Reduced motion, touch input, and disabled JavaScript have static fallbacks. The original contact links and user-controlled light/dark mode are retained; disclosures can expand beyond the default section height to keep all content accessible.

Local verification: content/link preservation, menu focus checks, copy lint, and performance checks passed. Taste's three-round design gate finished at `OPEN 7`: image coverage in the text-based experience/skills sections, an 11px shortfall against the prescribed bottom padding, and three strict mobile screen-framing findings remain. The full five-width consistency audit exceeded its time limit; the separate layout check, final gate, and performance checks completed. The detailed findings, five justified waivers, and final desktop/mobile previews are in `.taste-skill/verification.md` and `.taste-skill/shots/` locally. No deployment was performed.

Inovindo Academy is featured in Projects with a locally stored screenshot (`img/projects/inovindo-academy.webp`) and a link to [the live website](https://inovindoacademy.com/). The preview was captured on 10 November 2026; the contribution description refers to the owner's March–June 2023 internship. The image loads without embedding or contacting the external site.

BKK SMKN 2 Pekanbaru is featured as a freelance project with a locally stored screenshot (`img/projects/bkk-smkn2-pekanbaru.webp`) and a link to [the live job portal](https://bkksmkn2pku.pocari.id/). The preview was captured on 10 November 2026 and loads without embedding the external site.

GitHub activity uses the public contribution calendar for `fm-dev` through [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api). No token or build step is required. The calendar offers the last 12 months and individual years, adapts to both themes, and includes daily counts with keyboard navigation. Data is fetched on page load; the upstream service caches results for about an hour. If the service fails, the section offers retry and a direct profile link. Private contribution counts only appear when the GitHub profile makes them visible.
