# Muhammad Fajri Afriyansyah

A static portfolio for GitHub Pages. Serve this folder with a static HTTP server (for example, `npx serve .`) for local preview; the animation modules require HTTP. No application dependencies or build step are required.

- `index.html`: profile, four employment records, projects, GitHub activity, education, skills, and contact details.
- `assets/`: the required, unchanged Taste 2.5.1 layout, system, motion, and word-highlight runtime files.
- `css/portfolio.css`: portfolio content styles and responsive adaptations.
- `tokens.css`: the dealt cool-grey-cobalt palette, Albert Sans typography, dark theme, and calendar token aliases.
- `js/github-activity.js`: contribution data, calendar rendering, period selection, and daily exploration.
- `js/portfolio.js`: keyboard focus containment and background isolation for the tablet menu, plus the active section indicator for phone bottom tabs. Below 640px, four icon-and-label links stay at the bottom with safe-area spacing; the language and theme controls remain in a small top row. Desktop uses the floating pill navbar. Content, bottom navigation, and native project disclosures remain accessible without JavaScript.
- `js/color-mode.js`: light/dark mode, using the device preference until the visitor chooses a theme. The navigation toggle saves that choice in local storage and applies it before styles load.
- `js/i18n.js`: Indonesian and English translations for page content, accessible labels, metadata, theme controls, and the GitHub calendar. The ID/EN buttons switch language without reloading and save the choice in local storage. On a first visit, an Indonesian browser preference selects Indonesian; other browsers use English. Without JavaScript, the original English content remains readable. To update copy, edit the matching `en` and `id` entries and the English fallback in `index.html`.

Language switching also works when opening `index.html` directly, even though browser restrictions prevent the animation modules from loading over `file://`.

Run `node tests/i18n.mjs` with Node 22+ and Chrome/Chromium to verify actual pointer clicks over HTTP and local files, persistence, accessible labels, theme integration, contribution calendar states, and responsive navigation. Set `CHROME_PATH` if the browser is installed outside the common locations. The check uses fixture contribution data and a disposable browser profile.

Employment details were supplied by the profile owner from LinkedIn on 3 November 2026. Academic contributions include links to official PCR sources. Fonts are loaded from Google Fonts with local fallback fonts.

Original template files, including `base.css`, are retained but are not loaded by the main page. Local verification, plans, and screenshots are stored in the ignored `.taste-skill/` and `.hallmark/` folders.

Motion follows Taste's system: one hero entrance, pointer feedback, and a word-highlight moment in the education section. Ordinary content stays readable while scrolling. Reduced motion, touch input, and disabled JavaScript have static fallbacks. The original contact links and user-controlled light/dark mode are retained; disclosures can expand beyond the default section height to keep all content accessible.

Local verification: content/link preservation, menu focus checks, copy lint, and performance checks passed. Taste's three-round design gate finished at `OPEN 7`: image coverage in the text-based experience/skills sections, an 11px shortfall against the prescribed bottom padding, and three strict mobile screen-framing findings remain. The full five-width consistency audit exceeded its time limit; the separate layout check, final gate, and performance checks completed. The detailed findings, five justified waivers, and final desktop/mobile previews are in `.taste-skill/verification.md` and `.taste-skill/shots/` locally. No deployment was performed.

Inovindo Academy is featured in Projects with a locally stored screenshot (`img/projects/inovindo-academy.webp`) and a link to [the live website](https://inovindoacademy.com/). The preview was captured on 10 November 2026; the contribution description refers to the owner's March–June 2023 internship. The image loads without embedding or contacting the external site.

BKK SMKN 2 Pekanbaru is featured as a freelance project with a locally stored screenshot (`img/projects/bkk-smkn2-pekanbaru.webp`) and a link to [the live job portal](https://bkksmkn2pku.pocari.id/). The preview was captured on 10 November 2026 and loads without embedding the external site.

Kos Uni Salma is featured as a freelance project with room information, rental cost comparison, and WhatsApp visit enquiries. Its locally stored screenshot (`img/projects/kost-uni-salma.webp`) was captured on 11 November 2026 and links to [the live website](https://kost-uni-salma.vercel.app/), without embedding the external site.

GitHub activity uses the public contribution calendar for `fm-dev` through [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api). No token or build step is required. The calendar offers the last 12 months and individual years, adapts to both themes, and includes daily counts with keyboard navigation. Data is fetched on page load; the upstream service caches results for about an hour. If the service fails, the section offers retry and a direct profile link. Private contribution counts only appear when the GitHub profile makes them visible.
