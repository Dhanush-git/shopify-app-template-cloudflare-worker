# Shopify app on Cloudflare Workers

Template for a [Shopify app](https://shopify.dev/docs/apps) built with [React Router](https://reactrouter.com/), deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/), with session storage on [D1](https://developers.cloudflare.com/d1/) via [Drizzle ORM](https://orm.drizzle.team/).

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [Shopify Partner account](https://partners.shopify.com/) and a development store
- [Cloudflare account](https://dash.cloudflare.com/)

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/YOUR_ORG/YOUR_REPO.git
cd YOUR_REPO
npm install
```

### 2. Cloudflare Worker and D1

1. Log in: `npx wrangler login`
2. Optional: change the Worker name in `wrangler.jsonc` (`name` field).
3. Create a D1 database and add its `database_id` to `wrangler.jsonc` under `d1_databases`:

   ```bash
   npx wrangler d1 create app-db
   ```

4. Apply migrations locally and remotely:

   ```bash
   npm run db:migrate:local
   npm run db:migrate:remote
   ```

### 3. Shopify app configuration

1. Create a new app in the Partner Dashboard (or use the CLI).
2. Link this project to your app:

   ```bash
   npx shopify app config link
   ```

   Or edit `shopify.app.toml`: set `client_id`, `name`, `application_url`, and `auth.redirect_urls` to match your app and deployed Worker URL.

3. Copy environment templates and fill in secrets:

   ```bash
   cp .dev.vars.example .dev.vars
   cp .env.example .env
   ```

4. Set production secrets on Cloudflare (required for deploy):

   ```bash
   npx wrangler secret put SHOPIFY_API_KEY
   npx wrangler secret put SHOPIFY_API_SECRET
   npx wrangler secret put SHOPIFY_APP_URL
   npx wrangler secret put SCOPES
   ```

   `SHOPIFY_APP_URL` must be your Worker URL (e.g. `https://your-worker.your-subdomain.workers.dev`). `SCOPES` should match `shopify.app.toml` (comma-separated, no spaces).

### 4. Develop

```bash
npm run dev
```

Press `p` in the Shopify CLI to open the app in your dev store. With `automatically_update_urls_on_dev = true`, tunnel URLs are updated during local development.

### 5. Deploy

```bash
npm run deploy
```

Update `application_url` and `auth.redirect_urls` in `shopify.app.toml` (and Partner Dashboard app URLs) to your production Worker URL if they differ from dev.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Local development with HMR |
| `npm run build` | Production build |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run typecheck` | Wrangler types, React Router typegen, TypeScript |
| `npm run db:migrate:local` | Apply D1 migrations locally |
| `npm run db:migrate:remote` | Apply D1 migrations on Cloudflare |

## Project structure

- `app/` — React Router routes and Shopify server setup
- `workers/app.ts` — Cloudflare Worker entry
- `drizzle/` — Session schema
- `migrations/` — D1 SQL migrations
- `shopify.app.toml` — Shopify CLI app config (replace placeholders before use)
- `wrangler.jsonc` — Cloudflare Worker config

## Security

Do not commit `.env`, `.dev.vars`, or `.shopify/`. If you fork this template, use your own API credentials and rotate any secrets that were ever exposed.

## License

[MIT](LICENSE)
