import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { db } from '../../shared/db/db'
import { PageHeader } from '../../shared/ui/PageHeader'
import { lessons } from './lessons'

export function LearningPage() {
  // useLiveQuery relit la base à chaque changement : la liste se met à jour toute seule.
  const progress = useLiveQuery(() => db.progress.toArray(), [])
  const done = new Set(progress?.map((p) => p.lessonId))

  // On regroupe les leçons par parcours (Module 0, Parcours PCB, Parcours boîtier…).
  const modules = Array.from(new Set(lessons.map((l) => l.module)))

  return (
    <>
      <PageHeader title="Learning" subtitle="Parcours pour apprendre l'électronique, pas à pas." />
      <div className="flex max-w-2xl flex-col gap-8">
        {modules.map((module) => {
          const items = lessons.filter((l) => l.module === module)
          const finished = items.filter((l) => done.has(l.id)).length
          return (
            <section key={module} aria-label={module}>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xs font-medium uppercase tracking-wider text-ink-2">{module}</h2>
                <span className="font-mono text-xs text-ink-2">{finished} / {items.length}</span>
              </div>
              <ol className="flex flex-col gap-3">
                {items.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      to={`/learning/${lesson.id}`}
                      className="flex items-center gap-4 rounded-md border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong"
                    >
                      <span className="w-8 font-mono text-ink-2">{lesson.code}</span>
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
            </section>
          )
        })}
      </div>
    </>
  )
}
