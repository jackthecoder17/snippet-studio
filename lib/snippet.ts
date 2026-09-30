export type EditorTheme = {
  bg: string
  fg: string
  muted: string
  sel: string
  comment: string
  keyword: string
  string: string
  number: string
  func: string
  type: string
  attr: string
}

export const THEMES: Record<string, EditorTheme> = {
  Midnight: { bg: "#0f1420", fg: "#d6deeb", muted: "#8b98ad", sel: "rgba(130,170,255,0.25)",
    comment: "#637777", keyword: "#c792ea", string: "#addb67", number: "#f78c6c", func: "#82aaff", type: "#ffcb8b", attr: "#7fdbca" },
  Neon: { bg: "#1e1b2e", fg: "#f8f8f2", muted: "#9a94c0", sel: "rgba(255,121,198,0.25)",
    comment: "#6c75a8", keyword: "#ff79c6", string: "#f1fa8c", number: "#bd93f9", func: "#50fa7b", type: "#8be9fd", attr: "#ffb86c" },
  Ember: { bg: "#1c1512", fg: "#eadbc8", muted: "#a08b7a", sel: "rgba(255,122,89,0.25)",
    comment: "#806c5d", keyword: "#ff7a59", string: "#c3d98a", number: "#f5b86b", func: "#ffd27a", type: "#f59f8b", attr: "#e7c3a0" },
  Paper: { bg: "#fbfaf7", fg: "#2b2d33", muted: "#8a8d96", sel: "rgba(64,120,242,0.18)",
    comment: "#a0a1a7", keyword: "#a626a4", string: "#50a14f", number: "#986801", func: "#4078f2", type: "#c18401", attr: "#e45649" },
}

export const BACKGROUNDS = [
  "linear-gradient(135deg, #ff9a5a 0%, #ff5e62 50%, #c2185b 100%)",
  "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
  "linear-gradient(135deg, #f7d774 0%, #f28a3b 100%)",
  "linear-gradient(140deg, #a1c4fd 0%, #c2e9fb 100%)",
  "radial-gradient(120% 120% at 0% 0%, #5b247a 0%, #1bcedf 100%)",
  "linear-gradient(135deg, #232526 0%, #414345 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
  "#f4f1ec",
  "transparent",
]

export const RATIOS = [
  { label: "Auto", ratio: 0 },
  { label: "Twitter 16:9", ratio: 16 / 9 },
  { label: "LinkedIn 1:1", ratio: 1 },
  { label: "Portrait 4:5", ratio: 4 / 5 },
]

export const FONTS = {
  "var(--font-jetbrains)": "JetBrains Mono",
  "var(--font-fira)": "Fira Code",
  "var(--font-plex)": "IBM Plex Mono",
  "var(--font-source)": "Source Code Pro",
}

export const LANGUAGES = {
  auto: "Auto-detect",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  go: "Go",
  rust: "Rust",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  ruby: "Ruby",
  sql: "SQL",
  bash: "Shell",
  xml: "HTML / XML",
  css: "CSS",
  json: "JSON",
  yaml: "YAML",
  markdown: "Markdown",
}

export const SAMPLE = `// Wait until the user stops typing before firing
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((q: string) => fetchResults(q), 250);`

export type Settings = {
  theme: string
  background: number
  ratio: number
  scale: number
  language: string
  font: string
  fontSize: number
  padding: number
  lineNumbers: boolean
  shadow: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: "Midnight",
  background: 0,
  ratio: 0,
  scale: 2,
  language: "auto",
  font: "var(--font-jetbrains)",
  fontSize: 15,
  padding: 56,
  lineNumbers: true,
  shadow: true,
}
