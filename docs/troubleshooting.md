# Troubleshooting

Common issues and how to resolve them.

## 1. Dev server won't start / `node` not found

- Ensure Node.js (18+) and npm are installed and available on PATH.
- On Windows, run commands from PowerShell or CMD if your Bash environment lacks `node` on PATH.
- Run `npm install` before `ng serve` if `node_modules/` is missing.

## 2. API requests failing (CORS / network errors)

- Confirm `apiBaseUrl` in `src/environments/environment.development.ts` points to the running backend (default: `http://localhost:8080`).
- Ensure the backend allows requests from `http://localhost:4200`.
- Check the browser Network tab for the actual request URL — the `apiBaseUrlInterceptor` prepends the base URL to all `/api/` requests.

## 3. "Cannot read properties of null" on response fields

- The backend may return `null` for `data_preview`, `recommendations`, or `actions` instead of empty arrays.
- This is handled in the frontend with optional chaining (`?.`) and nullish coalescing (`??`). If you see this error, ensure you're on the latest version of the code.

## 4. JIRA ticket creation fails

- Check that the backend's JIRA integration is configured and reachable.
- Verify `jiraProjectKey` in `src/environments/environment.ts` matches a valid project in your JIRA instance.
- Open the browser Network tab and inspect the request/response for `/api/jira-tickets` to see the error details.

## 5. UI shows empty state despite a successful response

- Confirm the `/api/ask` response contains `summary`, `recommendations`, and `actions` keys.
- Check the browser console and Network tab for the exact response payload.
- The insight summary, recommendations, and actions sections only render when their respective arrays are non-null and non-empty.

## 6. Build errors after pulling latest changes

```bash
rm -rf node_modules
npm install
ng build
```

If TypeScript errors persist, check that your `node_modules` match the versions in `package-lock.json`.

## How to Collect Useful Logs

1. Open Developer Tools (F12) — Console and Network tabs.
2. Reproduce the failing request.
3. In the Network tab, inspect the request/response payloads and headers.
4. Copy the request body and response body to share with the backend maintainers.
