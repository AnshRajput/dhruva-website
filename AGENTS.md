## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Dhruva project context

This is the official website for Dhruva AI — the open-source on-device AI app
(github.com/AnshRajput/dhruva-app). Astro static site, deployed to GitHub
Pages from `main` via .github/workflows/deploy.yml.

Rules for agents:
- ALL coordination happens on the app repo's blackboard:
  dhruva-app/orchestra/ (read PROTOCOL.md there). Website PRs link their
  blackboard thread.
- Theme comes EXCLUSIVELY from design-tokens.json fetched from the dhruva-app
  repo pinned to a tag — never invent colors. A CI check fails on drift.
- Performance budget: <1s LCP on 4G, Lighthouse 95+, dark mode required,
  full meta/OG/sitemap.
- Build: `npm run build` · Dev: `npm run dev`.
