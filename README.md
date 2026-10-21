# Oleh Hashenko — portfolio

Astro 5 + Tailwind 4. Black & white, mono, single column.

```sh
npm run dev        # http://localhost:4321 (next free port if taken)
npm run build      # static site in dist/
```

- **Copy** — everything lives in `src/data/site.ts`.
- **GitHub activity** — fetched at build time (`src/lib/github.ts`). Set `GITHUB_TOKEN`
  to use the GraphQL API (includes private contributions if enabled on your profile).
- **Case videos** — Remotion project in `video/`:

```sh
cd video
npm run studio                 # edit animations live
npm run render                 # all → public/previews/*.mp4 + poster .jpg
npm run render -- baseout      # just one
```
