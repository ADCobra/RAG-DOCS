# Deployment

Frontend on Vercel, backend + genai on Render, database on MongoDB Atlas.

The code is deploy-ready, but nothing can go live until the three credentials in
step 1 exist. Each has a free tier that needs no payment method.

## 1. Get credentials

| Credential | Where | Notes |
| --- | --- | --- |
| `MONGO_URL` | [MongoDB Atlas](https://cloud.mongodb.com) → free M0 cluster | Under **Network Access** add `0.0.0.0/0`, otherwise Render cannot reach it. Append the database name: `...mongodb.net/rag-docs` |
| `PINECONE_API_KEY` | [Pinecone](https://app.pinecone.io) | Also create an index named **`genai-rag-docs`** — the code queries that exact name |
| `GOOGLE_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) | For `gemini-2.5-flash-lite` |

`GOOGLE_CLIENT_ID` is only needed for the "Continue with Google" button. Leave it
blank to skip; email/password login works without it.

## 2. Backend + genai on Render

1. **New → Blueprint**, select this repo. `render.yaml` defines both services.
2. Fill in the prompted variables. `FASTAPI_URL` is the genai service's own
   `.onrender.com` URL, and `API_TOKEN` on genai must equal `FASTAPI_KEY` on the
   backend — copy the generated value across.
3. Deploy genai first so you have its URL for the backend's `FASTAPI_URL`.
4. Leave `CLIENT_URL` for now; you need the Vercel URL from step 3.

Render's free tier sleeps after inactivity, so the first request after a idle
period takes ~50s.

## 3. Frontend on Vercel

1. **Add New → Project**, select this repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → the backend's Render URL, no trailing slash
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` → only if using Google login
4. Deploy.

`NEXT_PUBLIC_*` values are inlined into the bundle at **build** time. Changing
either one later requires a redeploy, not just a restart.

## 4. Close the loop

Set `CLIENT_URL` on the Render backend to the Vercel URL and let it redeploy.
Until this is done every browser request fails CORS, even though `curl` works.

## 5. Seed the guest account

"Continue as Guest" logs in with hardcoded credentials
(`frontend/src/app/login/page.tsx`) and expects the account to already exist:

```bash
curl -X POST https://<backend>.onrender.com/api/v1/user/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Guest","email":"guest@mail.com","password":"guestpassword"}'
```

Note this is a full-privilege account with publicly known credentials. Consider
restricting it before sharing the site.

## Self-hosting instead

`docker-compose.yml` runs all four services, Mongo included:

```bash
cp .env.example .env   # then fill it in
docker compose up --build
```
