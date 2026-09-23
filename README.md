# Sachin Pullakat Santosh — Portfolio

Personal portfolio built with React, TypeScript, Tailwind CSS, and Vite.

## Features
- Recruiter-first hero: name, focus area, and CTAs (Projects / GitHub / Resume / LinkedIn) above the fold
- Content lives in `src/data/*.ts` — update your info without touching components
- Featured project cards with expandable technical pipelines
- No fabricated metrics: every number shown either comes from the CV (marked VERIFIED in code comments) or is flagged as unverified
- Accessible: keyboard-navigable, visible focus states, `prefers-reduced-motion` respected
- Fully responsive, 320px–1920px

## Tech stack
React 18 · TypeScript · Tailwind CSS · Vite

## Local setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import it in Vercel — framework preset "Vite" is auto-detected.
3. No environment variables are required (no external API calls are made from this static site).
4. Deploy.

## Things you still need to do before this goes live

These are placeholders by design — nothing was invented to fill them:

1. **Resume PDF**: add your actual file at `public/resume.pdf`.
2. **Certification credential URLs**: `src/data/experience.ts` → `certifications[].url` is `null` for both
   Infosys Springboard certifications. Add the real credential links if you have them, otherwise leave as-is.
3. **Internship detail**: both experience entries in `src/data/experience.ts` have no `detail` field —
   the source material gave role/company/duration but no specific responsibilities. The site currently
   just shows role/company/duration, which is accurate but thin. Add a `detail` line yourself if you
   want more — don't let an AI invent one.
4. **Churn Prediction project**: this project and its "~75% accuracy" figure appear in your original brief
   but not in your CV. Confirm it's real and current before publishing (marked `ESTIMATE` in
   `src/data/projects.ts`), or remove it.
5. **Canonical URL**: `index.html` has a placeholder canonical link — update it once you have a domain.
6. **Profile photo**: none is included, per the brief's "no stock photos/cartoon illustrations" direction —
   add one only if you want to.

## Updating content later
Everything editable lives in `src/data/`:
- `profile.ts` — name, role, links, hero copy, stats strip
- `projects.ts` — project cards, tech stack, pipeline steps, results
- `experience.ts` — internships, certifications, achievements
- `education.ts` — degrees
- `skills.ts` — grouped skill tags

No component files need to change for routine content updates.
