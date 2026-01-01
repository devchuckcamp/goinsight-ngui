# TensInsight Web UI

Angular frontend for the [GoInsight](https://github.com/devchuckcamp/goinsight) feedback analytics platform. Users ask natural-language questions about feedback data; the backend returns AI-powered insights.

## Prerequisites

- Node.js 18+
- [GoInsight backend](https://github.com/devchuckcamp/goinsight) running on `http://localhost:8080`

## Getting Started

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/`.

## Available Commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start development server |
| `ng build` | Production build to `dist/` |
| `ng test` | Run unit tests (Karma) |

## Architecture

```
src/app/
  core/                 # Singleton services, interceptors, layout
    interceptors/       # Functional HTTP interceptors
    layout/             # App shell (toolbar, footer)
    services/           # API service, state management
  features/
    ask/                # Insight flow feature
      components/       # QuestionForm, InsightSummary, DataPreviewTable, etc.
  shared/
    models/             # TypeScript interfaces for API contracts
```

### Key Patterns

- **Standalone components** — No NgModules
- **Angular Signals** — State management via `signal()`, `computed()`
- **Functional interceptors** — HTTP interceptors as pure functions
- **OnPush change detection** — All components
- **`inject()` DI** — Modern dependency injection
- **`ti-` prefix** — All component selectors

### Data Flow

```
QuestionForm → GoinsightApiService → POST /api/ask → InsightStateService (Signals)
                                                              ↓
                InsightSummary / DataPreviewTable / RecommendationsList / ActionsAccordion
```

JIRA ticket creation: `ActionsAccordion → GoinsightApiService → POST /api/jira-tickets`

## Tech Stack

- Angular 20
- Angular Material + CDK
- Reactive Forms
- RxJS
- SCSS + Material Theme
- Karma + Jasmine (testing)

## Environment Configuration

Edit `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  jiraProjectKey: 'SASS',
};
```
