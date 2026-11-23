import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { db } from '../../shared/db/db'
import { PageHeader } from '../../shared/ui/PageHeader'
import { findComponent } from '../components/catalog'
import { lessons } from '../learning/lessons'

export function DashboardPage() {
  const done = useLiveQuery(() => db.progress.count(), [])
  const views = useLiveQuery(
    () => db.views.orderBy('viewedAt').reverse().limit(5).toArray(),
    [],
  )

  const total = lessons.length
  const doneCount = done ?? 0
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Vue d'ensemble de tes projets et de ta progression." />
      <div className="grid max-w-4xl gap-4 md:grid-cols-2">
        <section className="rounded-md border border-line bg-surface p-4">
          <h2 className="mb-3 text-base font-semibold">Progression</h2>
          <div className="font-mono text-[13px]">
            {doneCount} / {total} leçons <span className="text-ink-2">({percent} %)</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-sm bg-surface-2" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Progression des leçons">
            <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
          <Link to="/learning" className="mt-4 inline-block text-accent hover:text-accent-hover">
            Continuer à apprendre →
          </Link>
        </section>

        <section className="rounded-md border border-line bg-surface p-4">
          <h2 className="mb-3 text-base font-semibold">Derniers composants consultés</h2>
          {views && views.length > 0 ? (
            <ul className="space-y-1">
              {views.map((v) => {
                const c = findComponent(v.componentId)
                return (
                  c && (
                    <li key={v.componentId}>
                      <Link to={`/components/${c.id}`} className="text-ink hover:text-accent">
                        {c.name}
                      </Link>
                      <span className="ml-2 text-xs text-ink-2">{c.category}</span>
                    </li>
                  )
                )
              })}
            </ul>
          ) : (
            <p className="text-ink-2">Aucune fiche consultée pour l'instant.</p>
          )}
        </section>
      </div>
    </>
  )
}
