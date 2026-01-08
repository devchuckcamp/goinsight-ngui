# Deployment Notes

Build and deployment notes for serving the app in different environments.

## Local Preview

```bash
ng build
npx http-server dist/tens-insight-web-ui/browser -p 4200
```

## Production Build

```bash
ng build --configuration production
```

Build artifacts are placed in `dist/tens-insight-web-ui/browser/`.

## Static Hosting (Netlify / Vercel / S3)

1. Build the app with `ng build`.
2. Upload the contents of `dist/tens-insight-web-ui/browser/` to your static host.
3. Configure the host to rewrite all routes to `index.html` for client-side routing.

## Docker (Static Server)

```Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/tens-insight-web-ui/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Configuration

Environment values (`apiBaseUrl`, `jiraProjectKey`) are set at build time via the files in `src/environments/`. Angular's file replacement mechanism in `angular.json` swaps `environment.ts` with `environment.development.ts` for dev builds.

To target a different backend in production, update `src/environments/environment.ts` before building:

```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-production-api.example.com',
  jiraProjectKey: 'SASS',
};
```

## Security Notes

- This frontend does not include authentication; avoid pointing it at production backends without proper auth.
- Do not embed secrets in client-side code.
