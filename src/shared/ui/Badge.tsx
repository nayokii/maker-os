import type { ReactNode } from 'react'

type Tone = 'data' | 'ok' | 'warn' | 'danger' | 'info' | 'idle'

// Statuts : couleur + pastille + mot (jamais la couleur seule). Données : fond neutre, texte mono.
const tones: Record<Tone, string> = {
  data: 'border-line bg-surface-2 font-mono font-normal text-ink',
  ok: 'border-current text-success',
  warn: 'border-current text-warning',
  danger: 'border-current text-danger',
  info: 'border-current text-info',
  idle: 'border-current text-ink-2',
}

export function Badge({ tone = 'idle', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center gap-1 rounded-sm border px-2 text-xs font-medium ${tones[tone]}`}
    >
      {tone !== 'data' && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
