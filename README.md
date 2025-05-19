<div align="center">
  <h1><samp>FlakeForge Website</samp></h1>
  <p>
    <samp>
      The official website of FlakeForge — a modern, fast, and visually engaging static site showcasing our projects, blogs, and other tech-related content. Built with best practices to deliver an exceptional user experience through clean structure, smooth animations, and high performance.
    </samp>
  </p>
</div>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-SSG%20Ready-000000?style=flat&logo=next.js&logoColor=white&labelColor=20222d" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat&logo=tailwind-css&logoColor=white&labelColor=20222d" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript&logoColor=white&labelColor=20222d" />
  <img alt="FSD" src="https://img.shields.io/badge/FSD-Architecture-orange?style=flat&labelColor=20222d&logoColor=white" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat&logo=greensock&logoColor=white&labelColor=20222d" />
  <img alt="ESLint" src="https://img.shields.io/badge/Linting-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white&labelColor=20222d" />
</p>

## Stack technologies
- [React](https://react.dev/learn) + [Typescript](https://www.typescriptlang.org/docs/) - UI library and Strict type safety
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling
- [GSAP](https://gsap.com) — Smooth, high-performance animations
- [FSD](https://feature-sliced.design) — Feature-Sliced Design architecture
- [ESLint](https://eslint.org/) — Consistent, clean code standards for linting
- [Nextjs](https://Nextjs.org/) - framework for SSG

## Basic requirements for the project

> [!NOTE]
> Version Node +v20\*

## For Developers

```bash
# Install dependencies
pnpm install
# Start the development server
pnpm dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> You need to create .env following the example of .env.example so that all parameters are

## 📁 Project Structure
```
src/
├── app/                # Next.js app directory
├── shared/             # Shared utilities, types, assets, styles
├── entities/           # Business models and domain logic
├── features/           # Independent features
├── widgets/            # UI-level connected units
└── modules/            # Static route fallback (optional)
```
> [!NOTE]
> This structure follows the Feature-Sliced Design methodology. Changes should respect this convention.

---

# 🧪 Development Tips
- Avoid using any, prefer strong typing
- Use GSAP via hooks for smoother animations
- Run eslint to ensure code quality
- Keep components atomic and reusable

---

## 📄 License
Licensed under the MIT License.

---

Let me know if you'd like to localize the README into other languages or generate a minimal version for internal use.
