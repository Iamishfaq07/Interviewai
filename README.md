# InterviewAI

A responsive interview preparation app. Paste a job description, select your level, and generate a focused interview playbook.

## Run

Requires Node.js 22.9+ (24 recommended). No dependency installation needed.

```sh
npm start
```

Open http://127.0.0.1:3000. Without credentials, the app runs in labeled demo mode: JD keyword extraction, template questions, and unscored self-review.

## Enable AI

Copy `.env.example` to `.env`, set `OPENAI_API_KEY`, and restart. Optionally change `OPENAI_MODEL` to a model available to your account supporting Responses API structured outputs. Default: `gpt-4o-mini`.

Never commit `.env` or put credentials in frontend files. AI mode sends job descriptions and answers to OpenAI with `store: false`. Implementation reference: https://developers.openai.com/api/docs/guides/structured-outputs

## Features

- JD analysis with skill extraction and role summary.
- 8, 12, or 16 questions, tailored to junior, mid-level, senior, or lead experience.
- Technical, behavioral, situational, and role-specific filters.
- Answer guides and written practice with AI feedback and improved examples.
- Practice tracking, 20 browser-local saved sessions, and text export.
- Responsive layout and accessible form labels and focus states.
- Server-only credentials, bounded requests, timeouts, origin checks, and basic in-memory rate limiting.

## Verify

```sh
npm test
node --check server.js
node --check public/app.js
```

Tests cover validation, demo generation, HTTP endpoints, source-file isolation, and origin restrictions. Live AI requires a configured key and is not exercised by default tests.

## Structure

`server.js` serves the app and AI endpoints. `lib.js` holds schemas, validation, and demo logic. `public/` contains the interface. `test/` contains Node built-in tests. CI runs tests on pushes and pull requests.

## Deployment scope

This first release runs locally. It has no login, billing, shared database, or cross-device sync. Sessions and answers are saved in localStorage on the current browser and can be deleted from Saved sessions. AI feedback is practice guidance, not a hiring assessment.

The server binds to localhost by default. Before public deployment of the paid AI endpoint, add authentication, per-user quotas, shared rate limiting, spending controls, and HTTPS through a trusted host or reverse proxy. The in-memory IP limiter is single-process protection, not a substitute for these controls. Set HOST=0.0.0.0 and PORT for hosting only after configuring access controls.
