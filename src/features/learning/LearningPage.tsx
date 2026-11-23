import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { db } from '../../shared/db/db'
import { PageHeader } from '../../shared/ui/PageHeader'
import { lessons } from './lessons'

export function LearningPage() {
  // useLiveQuery relit la base à chaque changement : la liste se met à jour toute seule.
  const progress = useLiveQuery(() => db.progress.toArray(), [])
  const done = new Set(progress?.map((p) => p.lessonId))

  return (
    <>
      <PageHeader title="Learning" subtitle="Parcours pour apprendre l'électronique, pas à pas." />
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-2">
        Module 0 · Bases électriques
      </div>
      <ol className="flex max-w-2xl flex-col gap-3">
        {lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link
              to={`/learning/${lesson.id}`}
              className="flex items-center gap-4 rounded-md border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong"
            >
              <span className="font-mono text-ink-2">0.{i + 1}</span>
              <span className="flex-1">
                <span className="block font-semibold">{lesson.title}</span>
                <span className="block text-ink-2">{lesson.summary}</span>
              </span>
              <span className={done.has(lesson.id) ? 'text-success' : 'text-ink-2'}>
                {done.has(lesson.id) ? '✓ Terminée' : 'À faire'}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
