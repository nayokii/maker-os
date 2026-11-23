import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../shared/db/db'
import { ExerciseCard } from './components/ExerciseCard'
import { LedCalculator } from './components/LedCalculator'
import { Markdown } from './components/Markdown'
import { findLesson } from './lessons'

export function LessonPage() {
  const { lessonId } = useParams()
  const lesson = findLesson(lessonId)
  const completed = useLiveQuery(
    () => (lessonId ? db.progress.get(lessonId) : undefined),
    [lessonId],
  )

  if (!lesson) {
    return (
      <p>
        Leçon introuvable. <Link to="/learning" className="text-accent">Retour au parcours</Link>
      </p>
    )
  }

  async function markDone() {
    if (!lesson) return
    await db.progress.put({ lessonId: lesson.id, completedAt: new Date().toISOString() })
  }

  return (
    <article>
      <Link to="/learning" className="text-sm text-ink-2 hover:text-ink">← Learning</Link>
      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-ink-2">{lesson.module}</div>
      <Markdown source={lesson.content} />
      {lesson.tool === 'led-calculator' && <LedCalculator />}
      {lesson.link && (
        <Link to={lesson.link.to} className="my-6 inline-block rounded-md border border-line-strong px-4 py-2 text-sm text-accent hover:bg-surface-2">
          {lesson.link.label} →
        </Link>
      )}
      <h2 className="mb-3 mt-10 text-2xl font-semibold">Exercices</h2>
      <div className="flex max-w-2xl flex-col gap-3">
        {lesson.exercises.map((ex, i) => (
          <ExerciseCard key={ex.id} exercise={ex} index={i} />
        ))}
      </div>
      <div className="mt-8">
        {completed ? (
          <span className="text-success">✓ Leçon terminée</span>
        ) : (
          <button
            onClick={markDone}
            className="h-9 rounded-md border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            Marquer comme terminée
          </button>
        )}
      </div>
    </article>
  )
}
