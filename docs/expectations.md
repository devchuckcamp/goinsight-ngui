# What to Expect When Running This Project

This document describes what the frontend does and what is required to run it locally.

## Overview

An Angular 20 + Angular Material frontend that integrates with the [GoInsight backend](https://github.com/devchuckcamp/goinsight) to ask natural-language questions about feedback data and (optionally) create JIRA tickets from suggested actions.

## Prerequisites

- Node.js (18+ recommended) and npm available on PATH.
- The GoInsight backend running (default URL: `http://localhost:8080`).
- Optionally a JIRA instance if you want to test ticket creation.

## Environment Configuration

Environment settings are defined in `src/environments/` and swapped at build time via `angular.json` file replacements.

| File | Purpose |
|------|---------|
| `src/environments/environment.ts` | Production defaults |
| `src/environments/environment.development.ts` | Development overrides |

Key values:

- `apiBaseUrl` — base URL for the GoInsight API (default: `http://localhost:8080`).
- `jiraProjectKey` — JIRA project key used when creating tickets (default: `SASS`).

## How to Run

```bash
npm install
ng serve
```

The dev server starts at `http://localhost:4200`.

## What the UI Does

- Provides a form to ask questions (POST `/api/ask` to the backend).
- Shows an insight summary, data preview table, and recommendations.
- Lets you select suggested actions and create JIRA tickets for them (POST `/api/jira-tickets`).

## Important Behaviour & Limitations

- A functional HTTP interceptor (`api-base-url.interceptor.ts`) prepends `environment.apiBaseUrl` to all `/api/` requests, so components use relative URLs.
- A second interceptor (`api-error.interceptor.ts`) normalizes HTTP errors into a consistent `ApiError` shape.
- The backend may return `null` instead of empty arrays for `data_preview`, `recommendations`, and `actions` — the frontend handles this with null-safe checks.
- Authentication for the backend/JIRA is not included by default — add your own auth integration if required.
