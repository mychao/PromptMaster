# PromptMaster — Prompt Generation & Optimization Workbench

A React + Gemini web app for building and improving prompts. Give it a short brief and it
generates a structured, best-practice prompt; paste an existing prompt and it rewrites it
with concrete improvements — under a chosen scenario and language.

## Features

- **Generator** — turns a short brief (task, audience, constraints) into a complete prompt
- **Optimizer** — analyses an existing prompt and returns an improved version plus the reasoning
- **Scenario presets** — general, RAG, code, writing, data analysis, persona, PRD, HR
- **Framework-aware** — applies CO‑STAR / RTF structure, and scenario-specific rules
  (for example: for RAG, "use ONLY the provided context, cite sources, avoid hallucinations")
- **Structured output** — model responses are schema-validated through `@google/genai` typed output,
  so the UI always receives well-formed fields
- **Template library** — a bundled set of starting-point templates (`data/templates.ts`)
- **Multi-language UI** — language context switches both interface strings and generated output language

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| Model | `@google/genai` (Gemini) with typed/structured output |
| State | React context (`contexts/LanguageContext.tsx`) |

## Project layout

```
components/   Generator.tsx, Optimizer.tsx, Templates.tsx, ui/
contexts/     LanguageContext.tsx
data/         templates.ts
services/     geminiService.ts (system prompts, scenario rules, structured generation)
App.tsx       tab shell: generate / optimize / templates
```

## Run locally

```bash
npm install
# create .env.local with:
# GEMINI_API_KEY=your_key_here
npm run dev
```

## Design notes

- Scenario instructions live in one map (`SCENARIO_INSTRUCTIONS`) so adding a new use case is a
  one-line change.
- Generation and optimisation share the same client and error handling; both fail loudly when the
  API key is missing instead of returning an empty result.
- Structured output keeps the UI decoupled from prompt wording — the model returns fields, not prose.

## License

MIT
