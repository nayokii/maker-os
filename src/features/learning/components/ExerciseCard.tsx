import { useState } from 'react'
import type { Exercise } from '../../../shared/models/exercise'

type Status = 'idle' | 'wrong' | 'right'

export function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [attempts, setAttempts] = useState(0)

  function check() {
    const value = Number(text.replace(',', '.'))
    if (text.trim() === '' || Number.isNaN(value)) return
    const ok = Math.abs(value - exercise.answer) <= Math.abs(exercise.answer) * exercise.tolerance
    setStatus(ok ? 'right' : 'wrong')
    setAttempts((n) => n + 1)
  }

  return (
    <article className="rounded-md border border-line bg-surface p-4">
      <div className="text-xs font-medium uppercase tracking-wider text-ink-2">Exercice {index + 1}</div>
      <p className="mt-1">{exercise.prompt}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex h-9 items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3">
          <input
            inputMode="decimal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            aria-label={`Réponse en ${exercise.unit}`}
            className="w-28 bg-transparent font-mono text-[13px] text-ink outline-none"
          />
          <span className="font-mono text-xs text-ink-2">{exercise.unit}</span>
        </span>
        <button
          onClick={check}
          className="h-9 rounded-md bg-accent px-4 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
        >
          Vérifier
        </button>
      </div>
      {status === 'right' && (
        <p className="mt-3 text-success">✓ Juste. {exercise.explanation}</p>
      )}
      {status === 'wrong' && (
        <div className="mt-3 text-warning">
          <p>▲ Pas tout à fait. Indice : {exercise.hint}</p>
          {attempts >= 2 && <p className="mt-1 text-ink-2">Solution : {exercise.explanation}</p>}
        </div>
      )}
    </article>
  )
}
