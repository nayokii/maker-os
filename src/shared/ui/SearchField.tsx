import { useEffect, useRef } from 'react'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchField({ value, onChange, placeholder }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Raccourci : la touche "/" place le curseur dans le champ (sauf si on tape déjà dans un champ).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (e.key === '/' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-9 w-full max-w-sm items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3 focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-accent">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-ink-2" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" />
        <path d="M9.5 9.5L13 13" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-2"
      />
      <kbd className="rounded-sm border border-line-strong px-1.5 font-mono text-xs text-ink-2">/</kbd>
    </div>
  )
}
