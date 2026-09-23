<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FlakeForge website

Read `IDEA.md` first. It explains what the site is, who it is for, and the design, motion, and content decisions. This file covers how to work in the code.

## Stack

| Concern         | Tool                                                                |
| --------------- | ------------------------------------------------------------------- |
| Framework       | Next.js 16 App Router, React 19, TypeScript strict                  |
| Styling         | Tailwind CSS v4, semantic tokens in `src/shared/styles/globals.css` |
| Primitives      | `@base-ui/react`                                                    |
| Animation       | GSAP (ScrollTrigger, SplitText) and Lenis                           |
| i18n            | `next-intl` with `en`, `ru`, `uz`                                   |
| Content         | MDX through `@next/mdx`, statically generated                       |
| Icons           | `@phosphor-icons/react`                                             |
| Validation      | `zod`                                                               |
| Lint and format | `oxlint` (type-aware through `oxlint-tsgolint`) and `oxfmt`         |
| Task runner     | `just` (see `justfile`)                                             |
| Git hooks       | `lefthook`                                                          |
| Code health     | `react-doctor`, `knip`, Lighthouse CI                               |
| Package manager | pnpm                                                                |
| Deploy          | Docker, `output: 'standalone'`, port 8080                           |

## Commands

Run `just` to list every recipe. The ones you need most:

| Recipe                                     | What it does                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `just dev`                                 | Dev server                                                                      |
| `just check`                               | `oxfmt --check`, `oxlint`, `tsc`, and `knip`. Run it before you call work done. |
| `just fmt` / `just lint-fix`               | Format and apply safe lint fixes                                                |
| `just doctor`                              | `react-doctor` scan, telemetry off                                              |
| `just ci`                                  | `check`, `doctor`, and a production build                                       |
| `just lighthouse`                          | Build and run Lighthouse CI on the key pages                                    |
| `just post <slug>` / `just project <slug>` | Scaffold a draft post or case study                                             |
| `just docker-build` / `just docker-run`    | Build and run the production image                                              |

The `package.json` scripts stay for tools that expect them; the justfile is the entry point for people.

## Tooling

- **oxlint** reads `.oxlintrc.json`. Type-aware rules run through `oxlint-tsgolint`, which uses the TypeScript 7 compiler, so `tsconfig.json` must stay TS7-compatible: no `baseUrl`, and every `paths` entry starts with `./`. `eslint-plugin-security` runs as an oxlint JS plugin.
- **oxfmt** reads `.oxfmtrc.json`. It sorts imports (react and next first, then packages, then the `@` aliases, then relative paths) and Tailwind classes, including inside `cn()`. Never sort by hand.
- **lefthook** (`lefthook.yml`) formats and lints staged files on commit, enforces Conventional Commits, and runs `typecheck` and `knip` before push.
- **react-doctor** reads `doctor.config.json`. The ignores there are reviewed false positives; add one only with the reason in the commit message.
- **knip** reads `knip.json`. Delete what it reports instead of silencing it.
- **pnpm** refuses packages younger than a day and trust downgrades (`pnpm-workspace.yaml`). Only the pre-provenance `semver` versions are excluded.

## Project structure

The code follows Feature-Sliced Design. A layer may import only from layers below it.

```
content/             MDX for blog posts and case studies
messages/            next-intl messages: en.json, ru.json, uz.json
src/
  app/               Next.js routes only; files stay thin
    [locale]/        every page lives under the locale segment
    layouts/         shared layout shell
    providers/       client providers (smooth scroll)
  modules/           one folder per page; composes widgets, features, entities
  widgets/           large reusable blocks: header, footer
  features/          user actions: contact form, locale switcher, blog locale filter
  entities/          domain models and their UI: post, project
  shared/
    ui/              design-system components built on Base UI
    lib/             framework-free helpers: gsap, i18n, content, telegram
    config/          site constants, navigation, services
    styles/          globals.css and tokens
```

Order, top to bottom: `app` > `modules` > `widgets` > `features` > `entities` > `shared`. Use the path aliases from `tsconfig.json` (`@shared/*`, `@entities/*`, `@features/*`, `@widgets/*`, `@modules/*`, `@lib/*`, `@config/*`, `@content/*`).

Each slice exposes its public API through `index.ts`. Import from the slice root, not from files inside it.

## Code rules

- No inline comments (`//` or `/* */`) in application code. Name things so the code explains itself.
- JSDoc is allowed only on exported functions in `src/shared/lib` and on helper functions. Keep it short: what the function does, its parameters, what it returns.
- Server Components by default. Add `'use client'` only to leaf components that need state, effects, or browser APIs. Animation components are always client leaves.
- Components are `FC` arrow functions with a `displayName`, matching the existing files.
- No `any`. Type the props, the frontmatter, and the messages.
- Every user-facing string comes from `messages/*.json` through `next-intl`. No hardcoded text in components, including `aria-label` and `alt`.
- When you add a message key, add it to all three locale files in the same change.

## Styling rules

- Use semantic tokens only: `bg-surface`, `text-fg`, `text-fg-muted`, `border-line`, `text-accent`. Never raw hex values and never Tailwind palette colors like `zinc-900`.
- Color tokens are defined once in `globals.css` with `light-dark()`. The inline script in the root layout sets `data-theme` on `<html>` before paint; `color-scheme` follows it. Do not write `dark:` variants, and do not add a token without both values.
- `accent` is the UI accent (darker in light mode for contrast). `brand` is Forge Orange in both themes and is used only for the logo and the flake mark.
- Theme state lives in `@lib/theme`. Change it through `switchThemeMode`, which also runs the circular View Transition.
- Shape is sharp: no `rounded-*` except `rounded-[2px]` on small controls.
- Full-height sections use `min-h-dvh`, never `h-screen`.
- Page width comes from the shared `Container` component.
- z-index values come from the scale in `globals.css` (`z-header`, `z-overlay`, `z-grain`).

## Brand rules

- The brand kit lives in `FlakeForge_Brandkit/` (gitignored). `IDEA.md` summarizes it.
- Render the logo with `BrandLockup`, `Wordmark`, or `FlakeMark` from `@shared/ui`. Never type "FlakeForge" as a logo in a web font.
- Never rotate or stretch the flake symbol, in CSS or in GSAP. Moving its six modules along their own axis is allowed.
- Symbol at least 32px, full lockup at least 180px wide.

## Motion rules

- GSAP only. Do not add `motion`, `framer-motion`, or `three`.
- Import GSAP and its plugins from `@lib/gsap`. It registers the plugins once.
- Use `useGSAP` from `@gsap/react` with a `scope` ref, so cleanup is automatic.
- Never `window.addEventListener('scroll')`. Use ScrollTrigger.
- Animate `transform` and `opacity` only.
- Check reduced motion with `gsap.matchMedia()` and render the final state when it is on.
- Text that animates in on page load carries `data-reveal`. CSS hides it until the animation sets `data-revealed`, with a 2.5s CSS fallback in case scripts fail.
- Split headlines with `SplitText` using `mask: 'lines'` and `linesClass: 'split-line'`. The `.split-line-mask` rule keeps descenders from being clipped.
- Base UI parts animate with CSS transitions on `data-starting-style` and `data-ending-style`.

## i18n rules

- Locales live in `src/shared/lib/i18n/config.ts`. The URL always carries a locale prefix.
- Use `Link` and `usePathname` from `@lib/i18n`, not from `next/link` or `next/navigation`. If you need `redirect` or `useRouter`, add them to the `createNavigation` export in `src/shared/lib/i18n/navigation.ts` first.
- Server Components read the locale with `next/root-params` or `getLocale()`. Server Actions cannot use root params, so pass the locale as a form field.

## Content rules

- A post or case study is a folder: `content/<type>/<slug>/<locale>.mdx`. `en.mdx` is required.
- Frontmatter is validated by the zod schemas in `src/shared/lib/content`. Add a field to the schema before using it.
- MDX elements map to components in `src/mdx-components.tsx`.
- Content routes export `generateStaticParams` and `dynamicParams = false`.

## Copy and docs

- Docs, commit messages, and code identifiers are in English.
- Visible copy follows the `humanize` skill in `.agents/skills/humanize`: no em or en dashes, no AI vocabulary, no invented facts. Write `TODO` where a fact is missing.
- Russian and Uzbek copy is written for native readers, not translated word for word. Uzbek uses the Latin script.

## Skills to use

The skills live in `.agents/skills`. Read the relevant one before the work it covers.

| Work                               | Skill                                                    |
| ---------------------------------- | -------------------------------------------------------- |
| Any visible text or doc            | `humanize`                                               |
| Layout, sections, visual decisions | `design-taste-frontend`                                  |
| New or changed animation           | `animate`, `fixing-motion-performance`                   |
| Forms, dialogs, menus              | `fixing-accessibility`                                   |
| Metadata, OG, sitemap              | `fixing-metadata`                                        |
| Next.js APIs                       | `next-best-practices` and `node_modules/next/dist/docs/` |

## Before you finish

1. `just check` passes.
2. `just build` passes and prerenders every locale.
3. The page works with `prefers-reduced-motion: reduce` and in both themes.
4. No em or en dash in any visible string or in the docs (the managed Next.js block above is exempt).
5. All three message files have the same keys.
