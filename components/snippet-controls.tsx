"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { BACKGROUNDS, FONTS, LANGUAGES, RATIOS, THEMES, type Settings } from "@/lib/snippet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type Props = {
  settings: Settings
  onChange: (patch: Partial<Settings>) => void
}

function Field({ label, htmlFor, value, children }: { label: string; htmlFor?: string; value?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {label}
        </Label>
        {value && <span className="text-xs text-foreground tabular-nums">{value}</span>}
      </div>
      {children}
    </div>
  )
}

// Single-choice wrapper: Base UI toggle groups hold an array and allow deselecting, which we don't want here.
function Choice<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  label: string
}) {
  return (
    <ToggleGroup
      aria-label={label}
      variant="outline"
      size="sm"
      className="flex-wrap"
      value={[String(value)]}
      onValueChange={(v) => {
        const next = options.find((o) => String(o.value) === v[0])
        if (next) onChange(next.value)
      }}
    >
      {options.map((o) => (
        <ToggleGroupItem key={o.value} value={String(o.value)} className="aria-pressed:bg-foreground aria-pressed:text-background">
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export function SnippetControls({ settings, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Language">
        <Select items={LANGUAGES} value={settings.language} onValueChange={(v) => v && onChange({ language: v })}>
          <SelectTrigger className="w-full" aria-label="Language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(LANGUAGES).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Theme">
        <Choice
          label="Theme"
          value={settings.theme}
          options={Object.keys(THEMES).map((t) => ({ value: t, label: t }))}
          onChange={(theme) => onChange({ theme })}
        />
      </Field>

      <Field label="Background">
        <ToggleGroup
          aria-label="Background"
          className="grid w-full grid-cols-5 gap-2"
          value={[String(settings.background)]}
          onValueChange={(v) => v[0] !== undefined && onChange({ background: Number(v[0]) })}
        >
          {BACKGROUNDS.map((bg, i) => (
            <ToggleGroupItem
              key={i}
              value={String(i)}
              aria-label={bg === "transparent" ? "No background" : `Background ${i + 1}`}
              className={cn(
                "aspect-square h-auto w-full rounded-lg p-0 ring-1 ring-black/10 ring-inset hover:opacity-90",
                "aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2 aria-pressed:ring-offset-background",
                bg === "transparent" && "bg-[repeating-conic-gradient(#d0d4db_0%_25%,#ffffff_0%_50%)] bg-[length:12px_12px]"
              )}
              style={bg === "transparent" ? undefined : { background: bg }}
            />
          ))}
        </ToggleGroup>
      </Field>

      <Field label="Size for">
        <Choice
          label="Size"
          value={settings.ratio}
          options={RATIOS.map((r, i) => ({ value: i, label: r.label }))}
          onChange={(ratio) => onChange({ ratio })}
        />
      </Field>

      <Separator />

      <Field label="Font">
        <Select items={FONTS} value={settings.font} onValueChange={(v) => v && onChange({ font: v })}>
          <SelectTrigger className="w-full" aria-label="Font">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(FONTS).map(([value, label]) => (
              <SelectItem key={value} value={value} style={{ fontFamily: value }}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Font size" value={`${settings.fontSize}px`}>
        <Slider
          aria-label="Font size"
          min={11}
          max={24}
          value={settings.fontSize}
          onValueChange={(v) => onChange({ fontSize: v as number })}
        />
      </Field>

      <Field label="Padding" value={`${settings.padding}px`}>
        <Slider
          aria-label="Padding"
          min={0}
          max={128}
          step={8}
          value={settings.padding}
          onValueChange={(v) => onChange({ padding: v as number })}
        />
      </Field>

      <Field label="Export scale">
        <Choice
          label="Export scale"
          value={settings.scale}
          options={[1, 2, 3].map((s) => ({ value: s, label: `${s}×` }))}
          onChange={(scale) => onChange({ scale })}
        />
      </Field>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="line-numbers">Line numbers</Label>
          <Switch id="line-numbers" checked={settings.lineNumbers} onCheckedChange={(lineNumbers) => onChange({ lineNumbers })} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="shadow">Window shadow</Label>
          <Switch id="shadow" checked={settings.shadow} onCheckedChange={(shadow) => onChange({ shadow })} />
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Click the code to edit it, or paste your own. The file name is editable too. Nothing leaves your browser.
      </p>
    </div>
  )
}
