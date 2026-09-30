# Snippet Studio

**Turn code into clean, shareable images for LinkedIn, Twitter, slides and docs.**

Paste your code, pick a theme and a background, and export a sharp PNG or copy it straight to your clipboard. It's free, has no sign-up and no watermark, and runs entirely in your browser. Your code never leaves your machine.

**▶ Use it:** https://jackthecoder17.github.io/snippet-studio/

Built with **Next.js**, **TypeScript**, **Tailwind CSS** and **shadcn/ui**.

---

## Features

- **Edit in place:** click the code in the preview and type, or paste. Tab inserts two spaces.
- **Syntax highlighting for 19 languages,** or let it auto-detect the language.
- **4 editor themes:** Midnight, Neon, Ember and Paper (light).
- **10 backgrounds:** gradients, a solid colour, or transparent for slides and docs.
- **Sized for social:** one click for Twitter 16:9, LinkedIn 1:1 or a 4:5 portrait. The code stays centred.
- **4 coding fonts:** JetBrains Mono, Fira Code, IBM Plex Mono and Source Code Pro.
- **Adjustable:** font size, padding, line numbers, window shadow, and an editable file name in the title bar.
- **Retina export** at 1×, 2× or 3×.
- **Copy to clipboard** so you can paste the image directly into a post.
- **Keyboard shortcuts:** `⌘/Ctrl + S` to export, `⌘/Ctrl + Shift + C` to copy.
- **Remembers your settings** between visits (stored in your own browser).
- **Light and dark mode** for the app itself.

## Tech stack

| | |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router, static export) |
| UI | [shadcn/ui](https://ui.shadcn.com) with Base UI primitives: Select, Slider, Switch, Toggle Group, Tooltip, Button, Kbd, Sonner toasts |
| Styling | Tailwind CSS v4 |
| Highlighting | [highlight.js](https://highlightjs.org) |
| Export | [html-to-image](https://github.com/bubkoo/html-to-image) |
| Fonts | `next/font` (self-hosted Google Fonts) |
| Theming | next-themes |

## How it works

The preview is regular HTML. A transparent `<textarea>` sits exactly on top of a highlighted `<pre>`, so you type into the textarea while highlight.js colours the copy underneath on every keystroke. To export, html-to-image draws the frame onto a canvas at the chosen pixel ratio, with the fonts embedded, and the textarea is left out.

The aspect-ratio presets measure the window and grow the frame along one axis until it hits the target ratio, so nothing is cropped or stretched.

## Project structure

```
app/
  layout.tsx            fonts, theme provider, toaster
  page.tsx              renders <SnippetStudio />
  globals.css           shadcn tokens, editor overlay, syntax colours
components/
  snippet-studio.tsx    state, export and copy, keyboard shortcuts
  snippet-preview.tsx   the frame that gets exported
  snippet-controls.tsx  the settings panel
  theme-toggle.tsx
  ui/                   shadcn/ui components
lib/
  snippet.ts            themes, backgrounds, sizes, languages, defaults
```

## Run it locally

```bash
git clone https://github.com/jackthecoder17/snippet-studio.git
cd snippet-studio
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

`npm run build` writes a static site to `out/`. Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds with `BASE_PATH=/snippet-studio` and publishes to GitHub Pages. To host it somewhere else at the root of a domain (Vercel, Netlify, Cloudflare Pages), build without `BASE_PATH`.

## Customise it

| What | Where |
| --- | --- |
| Editor themes | `THEMES` in `lib/snippet.ts` |
| Backgrounds | `BACKGROUNDS` (any CSS background works) |
| Size presets | `RATIOS` |
| Languages in the menu | `LANGUAGES` |
| Starting snippet | `SAMPLE` |
| App accent colour | `--primary` in `app/globals.css` |

## License

MIT
