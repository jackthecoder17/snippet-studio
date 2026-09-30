# Snippet Studio

**Turn code into clean, shareable images for LinkedIn, Twitter, slides and docs.**

Paste your code, pick a theme and a background, and export a sharp PNG or copy it straight to your clipboard. It's free, has no sign-up and no watermark, and runs entirely in your browser. Your code never leaves your machine.

**▶ Use it:** https://jackthecoder17.github.io/snippet-studio/

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
- **Light and dark mode** follow your system.

## How it works

The preview is regular HTML. A transparent `<textarea>` sits exactly on top of a highlighted `<pre>`, so you type into the textarea while [highlight.js](https://highlightjs.org/) colours the copy underneath on every keystroke. To export, [html-to-image](https://github.com/bubkoo/html-to-image) draws the frame onto a canvas at the chosen pixel ratio, with the web fonts embedded, and the textarea is left out.

The aspect-ratio presets measure the window and grow the frame along one axis until it hits the target ratio, so nothing is cropped or stretched.

## Run it locally

```bash
git clone https://github.com/jackthecoder17/snippet-studio.git
cd snippet-studio
python3 -m http.server 8000
```

Then open http://localhost:8000. Any static server works. There's no build step.

## Customise it

Everything is in `index.html`:

| What | Where |
| --- | --- |
| Editor themes | the `THEMES` object |
| Backgrounds | the `BGS` array (any CSS background works) |
| Size presets | the `RATIOS` array |
| Languages in the menu | the `LANGS` array |
| Starting snippet | `SAMPLE` |

## Tech

HTML · CSS · vanilla JavaScript · highlight.js · html-to-image · Google Fonts

## License

MIT
