# FOLDER_RULES — 05_CODE_FOR_WEBSITE

This folder contains active website code only.

Allowed:

- Next.js website app
- Supabase schema/migration files for website lead capture
- website code QA files
- code-specific implementation documentation; active project controls remain in `01_WEBSITE/00_CONTROL`

Not allowed:

- local app code
- global strategy docs
- old prototypes
- duplicate website copy source-of-truth docs

`01_WEBSITE` remains the source for website content, service page planning, SEO, legal copy and quote-flow specifications.


## Active Next.js structure

No active `src` folder is used in this project. Website code should use root-level folders:

```text
app/
components/
config/
content/
lib/
types/
```

`@/*` imports map to the project root.

## Website design rules

- Primary website colour is Brightshore teal `#0F766E`, with restrained green accents.
- Preserve the approved local, practical Brighton & Hove design and copy.
- Header must remain mobile-first.
- Do not add navigation links to routes that do not exist.
- Do not add a Blog link until a real blog route exists.
- Do not add area pages before service pages are strong.

## Required code QA

The code folder may include tests that verify:

- root-level App Router structure
- no active `src/` folder
- design primary colour token
- mobile-first header behaviour
- quote form lead validation
- Supabase lead schema compatibility
