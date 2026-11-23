import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../shared/db/db'
import { Badge } from '../../shared/ui/Badge'
import { Markdown } from '../../shared/ui/Markdown'
import { ExerciseCard } from '../learning/components/ExerciseCard'
import { findComponent } from './catalog'

function Table({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-surface-2 text-left text-xs uppercase tracking-wider text-ink-2">
            <th className="px-3 py-2 font-medium">{head[0]}</th>
            <th className="px-3 py-2 font-medium">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-t border-line">
              <td className="px-3 py-2 font-mono text-[13px] text-ink-2">{a}</td>
              <td className="px-3 py-2">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ComponentDetailPage() {
  const { componentId } = useParams()
  const component = findComponent(componentId)

  // On note la consultation : le Dashboard s'en sert pour « derniers composants consultés ».
  useEffect(() => {
    if (component) {
      void db.views.put({ componentId: component.id, viewedAt: new Date().toISOString() })
    }
  }, [component])

  if (!component) {
    return (
      <p>
        Composant introuvable. <Link to="/components" className="text-accent">Retour à la bibliothèque</Link>
      </p>
    )
  }

  return (
    <article className="max-w-3xl">
      <Link to="/components" className="text-sm text-ink-2 hover:text-ink">← Components</Link>
      <header className="mb-2 mt-4 flex items-center gap-3">
        <h1 className="text-[32px] font-semibold leading-10">{component.name}</h1>
        <Badge tone="data">{component.category}</Badge>
      </header>
      <p className="text-ink-2">{component.summary}</p>

      <Markdown source={component.body} />

      <h2 className="mb-3 mt-8 text-2xl font-semibold">Caractéristiques</h2>
      <Table head={['Paramètre', 'Valeur']} rows={component.specs.map((s) => [s.label, s.value])} />

      <h2 className="mb-3 mt-8 text-2xl font-semibold">Brochage</h2>
      <Table head={['Broche', 'Rôle']} rows={component.pins.map((p) => [p.name, p.role])} />

      <h2 className="mb-3 mt-8 text-2xl font-semibold">Compatibilités</h2>
      <ul className="list-disc space-y-1 pl-6">
        {component.compatibility.map((c) => <li key={c}>{c}</li>)}
      </ul>

      <h2 className="mb-3 mt-8 text-2xl font-semibold">Précautions</h2>
      <ul className="space-y-2 rounded-md border border-line-strong bg-surface p-4">
        {component.precautions.map((p) => (
          <li key={p} className="flex gap-2 text-warning">
            <span aria-hidden="true">▲</span>
            <span><b>Attention :</b> <span className="text-ink">{p}</span></span>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 mt-8 text-2xl font-semibold">Exercice</h2>
      <ExerciseCard exercise={component.exercise} index={0} />
    </article>
  )
}
