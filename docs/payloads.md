# Payload Examples

Example payloads and notes for the two main API interactions used by the frontend.

## 1. POST `/api/ask`

**Request:**

```json
{
  "question": "Show me critical issues from enterprise customers"
}
```

**Response (successful):**

```json
{
  "question": "Show me critical issues from enterprise customers",
  "data_preview": [
    {
      "id": "fb-001",
      "created_at": "2025-12-01T00:00:00Z",
      "customer_tier": "enterprise",
      "priority": 5,
      "product_area": "billing",
      "region": "NA",
      "sentiment": "negative",
      "source": "zendesk",
      "summary": "Refund processing delayed for over 30 days",
      "topic": "refund processing"
    }
  ],
  "summary": "The data reveals that enterprise customers are experiencing critical issues...",
  "recommendations": [
    "Prioritize resolving refund processing issues",
    "Enhance security features including SOC2 compliance"
  ],
  "actions": [
    {
      "title": "Resolve Refund Processing Issues",
      "description": "Investigate and resolve the refund processing issues promptly...",
      "magnitude": 8
    }
  ]
}
```

**Notes:**

- `data_preview`, `recommendations`, and `actions` may be `null` when the backend has no data to return. The frontend guards against this with optional chaining.
- `magnitude` on actions is optional and represents the estimated impact score.
- The `data_preview` items use union-typed fields (e.g. `customer_tier` is one of `enterprise`, `professional`, `starter`, `free`). See `src/app/shared/models/goinsight.model.ts` for the full type definitions.

## 2. POST `/api/jira-tickets`

**Request (built by the frontend from selected actions):**

```json
{
  "question": "Show me critical issues from enterprise customers",
  "data_preview": [],
  "summary": "The data reveals that enterprise customers...",
  "recommendations": ["Prioritize resolving refund processing issues"],
  "actions": [
    {
      "title": "Resolve Refund Processing Issues",
      "description": "Investigate and resolve the refund processing issues promptly..."
    }
  ],
  "meta": {
    "project_key": "SASS"
  }
}
```

**Response (successful):**

```json
{
  "ticket_specs": [],
  "created_tickets": [
    {
      "action_title": "Resolve Refund Processing Issues",
      "ticket_key": "SASS-123",
      "ticket_url": "https://your-jira-instance/browse/SASS-123"
    }
  ]
}
```

**Notes:**

- The `meta.project_key` is read from `environment.jiraProjectKey`.
- The frontend sends the full context (question, summary, data_preview, recommendations) along with only the selected actions.
- On success, the frontend shows a snackbar with the count of created tickets.
