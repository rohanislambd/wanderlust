<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos, the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project shape

- Single Next.js 16.4.3 app — App Router under `src/app/`, React 19.3, strict TypeScript, Tailwind v4, shadcn/ui. Not a monorepo. No test runner, CI, or formatter is configured.
- npm only (`package-lock.json`); don't use pnpm/yarn/bun even though the README lists them.
- Path alias `@/*` → `src/*` (tsconfig `paths`).
- Real entrypoints: `src/app/layout.tsx` (root layout, Josefin Sans via `next/font`) and `src/app/page.tsx` — the README's `app/page.tsx` path is stale boilerplate.

## Commands

- `npm run dev` — dev server (Turbopack). Also (re)writes the auto-generated block above, so commit it rather than deleting it.
- `npm run lint` — ESLint flat config (`eslint.config.mjs`, eslint-config-next core-web-vitals + typescript).
- `npx tsc --noEmit` — typecheck; there is no npm script for it. Passes on a clean tree.
- **`npm run lint` fails at baseline** with 2 pre-existing `react-hooks/set-state-in-effect` errors in shadcn-generated files: `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't assume you caused them; only fix if that's the task at hand.

## Next.js 16 specifics that affect code here

- Bundled docs at `node_modules/next/dist/docs/` are the source of truth (see block above); they are shipped in-repo and match this exact version.
- `next.config.ts` sets `cacheComponents: true` + `partialPrefetching: true`. This app uses the Cache Components / Partial Prerendering model, **not** the classic Next caching model. The docs split caching into "with cacheComponents" vs `caching-without-cache-components` guides — only the former applies here.
- `reactCompiler: true` is enabled (babel-plugin-react-compiler); assume React Compiler rules apply to component code.

## UI and styling

- shadcn/ui, style `base-nova` (see `components.json`); ~70 primitives already vendored in `src/components/ui`. Add missing ones with `npx shadcn add <component>` instead of hand-writing them; treat those files as generated.
- Tailwind v4 is CSS-first: no `tailwind.config`/`postcss.config` — theme and tokens live in `src/app/globals.css` (`@theme inline` + CSS variables), and the CSS pipeline is the `@tailwindcss/turbopack` loader rule in `next.config.ts`. Put style changes in `globals.css`, not a new config file.

