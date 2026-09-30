"use client"

import * as React from "react"
import hljs from "highlight.js/lib/common"

import { cn } from "@/lib/utils"
import { BACKGROUNDS, RATIOS, THEMES, type Settings } from "@/lib/snippet"

type Props = {
  code: string
  onCodeChange: (code: string) => void
  filename: string
  onFilenameChange: (name: string) => void
  settings: Settings
  frameRef: React.RefObject<HTMLDivElement | null>
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!)
}

export function SnippetPreview({ code, onCodeChange, filename, onFilenameChange, settings, frameRef }: Props) {
  const theme = THEMES[settings.theme] ?? THEMES.Midnight

  const html = React.useMemo(() => {
    let value: string
    try {
      value =
        settings.language === "auto"
          ? hljs.highlightAuto(code).value
          : hljs.highlight(code, { language: settings.language, ignoreIllegals: true }).value
    } catch {
      value = escapeHtml(code)
    }
    // A trailing newline needs a visible character or the <pre> collapses that last line.
    return value + (code.endsWith("\n") || code === "" ? " " : "")
  }, [code, settings.language])

  const lineCount = code.split("\n").length

  // Grow the frame along one axis until it hits the chosen aspect ratio, keeping the window centred.
  React.useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return
    const fit = () => {
      el.style.width = ""
      el.style.height = ""
      const ratio = RATIOS[settings.ratio]?.ratio ?? 0
      if (!ratio) return
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (w / h < ratio) el.style.width = `${Math.ceil(h * ratio)}px`
      else el.style.height = `${Math.ceil(w / ratio)}px`
    }
    fit()
    document.fonts.ready.then(fit)
  }, [frameRef, code, settings])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") return
    e.preventDefault()
    const t = e.currentTarget
    t.setRangeText("  ", t.selectionStart, t.selectionEnd, "end")
    onCodeChange(t.value)
  }

  const windowStyle = {
    "--w-bg": theme.bg,
    "--w-fg": theme.fg,
    "--w-muted": theme.muted,
    "--w-sel": theme.sel,
    "--t-comment": theme.comment,
    "--t-keyword": theme.keyword,
    "--t-string": theme.string,
    "--t-number": theme.number,
    "--t-func": theme.func,
    "--t-type": theme.type,
    "--t-attr": theme.attr,
  } as React.CSSProperties

  return (
    <div
      ref={frameRef}
      className="flex flex-none items-center justify-center"
      style={{ padding: settings.padding, background: BACKGROUNDS[settings.background] ?? BACKGROUNDS[0] }}
    >
      <div
        className={cn(
          "min-w-[300px] max-w-[1100px] overflow-hidden rounded-xl sm:min-w-[440px]",
          settings.shadow &&
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_-12px_rgba(0,0,0,0.45),0_8px_20px_-8px_rgba(0,0,0,0.3)]"
        )}
        style={{ ...windowStyle, background: "var(--w-bg)", color: "var(--w-fg)" }}
      >
        <div className="grid grid-cols-[60px_1fr_60px] items-center px-4 pt-3.5 pb-1">
          <div className="flex gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <input
            value={filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            aria-label="File name"
            spellCheck={false}
            className="w-full bg-transparent py-0.5 text-center font-sans text-[13px] font-medium outline-none"
            style={{ color: "var(--w-muted)" }}
          />
          <span />
        </div>

        <div
          className="grid grid-cols-[auto_1fr] pt-3.5 pr-6 pb-5.5 pl-[18px] leading-[1.6]"
          style={{ fontFamily: `${settings.font}, ui-monospace, Menlo, monospace`, fontSize: settings.fontSize }}
        >
          {settings.lineNumbers ? (
            <div className="pr-[18px] text-right whitespace-pre opacity-55 select-none" style={{ color: "var(--w-muted)" }} aria-hidden>
              {Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}
            </div>
          ) : (
            <span />
          )}
          <div className="snippet-editor relative min-w-0">
            <pre className="pointer-events-none" style={{ color: "var(--w-fg)" }}>
              <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
            <textarea
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Code"
              data-export-ignore
            />
          </div>
        </div>
      </div>
    </div>
  )
}
