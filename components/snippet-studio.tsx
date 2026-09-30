"use client"

import * as React from "react"
import { toBlob } from "html-to-image"
import { CopyIcon, DownloadIcon } from "lucide-react"
import { toast } from "sonner"

import { DEFAULT_SETTINGS, SAMPLE, type Settings } from "@/lib/snippet"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SnippetControls } from "@/components/snippet-controls"
import { SnippetPreview } from "@/components/snippet-preview"
import { ThemeToggle } from "@/components/theme-toggle"

const STORAGE_KEY = "snippet-studio"

export function SnippetStudio() {
  const [code, setCode] = React.useState(SAMPLE)
  const [filename, setFilename] = React.useState("debounce.ts")
  const [settings, setSettings] = React.useState<Settings>(DEFAULT_SETTINGS)
  const frameRef = React.useRef<HTMLDivElement>(null)

  // Restore saved settings after mount so server and client render the same first frame.
  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists after hydration
      setSettings((s) => ({ ...s, ...saved }))
    } catch {}
  }, [])

  const update = React.useCallback((patch: Partial<Settings>) => {
    setSettings((s) => {
      const next = { ...s, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const render = React.useCallback(async () => {
    const node = frameRef.current
    if (!node) throw new Error("Preview not ready")
    await document.fonts.ready
    ;(document.activeElement as HTMLElement | null)?.blur()
    const blob = await toBlob(node, {
      pixelRatio: settings.scale,
      filter: (n) => !(n instanceof HTMLElement && n.dataset.exportIgnore !== undefined),
    })
    if (!blob) throw new Error("Empty image")
    return blob
  }, [settings.scale])

  const exportPng = React.useCallback(async () => {
    const name = filename.trim().replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-") || "snippet"
    try {
      const blob = await render()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${name}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 4000)
      toast.success(`Saved ${name}.png`)
    } catch (err) {
      console.error(err)
      toast.error("Export failed. Try a different background or reload the page.")
    }
  }, [render, filename])

  const copyPng = React.useCallback(async () => {
    try {
      if (!("ClipboardItem" in window)) throw new Error("Clipboard images unsupported")
      await navigator.clipboard.write([new ClipboardItem({ "image/png": render() })])
      toast.success("Image copied. Paste it straight into your post.")
    } catch (err) {
      console.error(err)
      toast.error("This browser can't copy images. Use Export PNG instead.")
    }
  }, [render])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault()
        exportPng()
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault()
        copyPng()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [exportPng, copyPng])

  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr] lg:h-svh">
      <header className="flex flex-wrap items-center gap-2 border-b bg-card px-4 py-3 sm:px-5">
        <div className="mr-auto flex items-baseline gap-2.5">
          <h1 className="text-[17px] font-bold tracking-tight">
            Snippet<span className="text-primary">.</span>Studio
          </h1>
          <p className="hidden text-sm text-muted-foreground sm:block">Code screenshots for your next post</p>
        </div>
        <ThemeToggle />
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" onClick={copyPng} />}>
            <CopyIcon data-icon="inline-start" />
            Copy image
          </TooltipTrigger>
          <TooltipContent>
            <Kbd>⇧⌘C</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button onClick={exportPng} />}>
            <DownloadIcon data-icon="inline-start" />
            Export PNG
          </TooltipTrigger>
          <TooltipContent>
            <Kbd>⌘S</Kbd>
          </TooltipContent>
        </Tooltip>
      </header>

      <main className="grid min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section
          aria-label="Preview"
          className="stage-dots grid min-w-0 place-items-start overflow-auto px-4 py-6 sm:place-items-center sm:px-6 sm:py-10"
        >
          <SnippetPreview
            code={code}
            onCodeChange={setCode}
            filename={filename}
            onFilenameChange={setFilename}
            settings={settings}
            frameRef={frameRef}
          />
        </section>
        <aside aria-label="Settings" className="overflow-y-auto border-t bg-card p-5 lg:border-t-0 lg:border-l">
          <SnippetControls settings={settings} onChange={update} />
        </aside>
      </main>
    </div>
  )
}
