# Sepideh Mansouri Portfolio

This repository contains a data-driven personal portfolio website built with Eleventy for a UI/UX designer. The public site, HTML resume, and downloadable PDF resume are generated from shared structured content.

## Stack

- Eleventy
- Nunjucks
- JSON Resume data
- Playwright for PDF export

## Project structure

- `src/` — site templates, pages, styles, and project content
- `src/projects/` — data-driven case-study entries
- `src/_data/` — global site data and normalized resume data
- `cv/resume.json` — canonical resume source
- `build/` — generated site output for deployment
- `tools/generate_resume_pdf.mjs` — build-time PDF export

## Local development

Install dependencies:

```bash
npm install
```

Install the Playwright browser once:

```bash
npx playwright install chromium
```

Start the local dev server:

```bash
npm run dev
```

Build the site and resume PDF:

```bash
npm run build
```

## Content workflow

- Update resume content in `cv/resume.json`
- Update site-wide biography/contact content in `src/_data/site.json`
- Add or edit case studies in `src/projects/`

The resume page and downloadable PDF are both generated from the same resume source file.
