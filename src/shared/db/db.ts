import Dexie, { type EntityTable } from 'dexie'

// Progression sur une leçon (stockée dans le navigateur, sur cet ordinateur).
export interface LessonProgress {
  lessonId: string
  completedAt: string // date ISO
}

type MakerDb = Dexie & {
  progress: EntityTable<LessonProgress, 'lessonId'>
}

export const db = new Dexie('maker-os') as MakerDb

// `lessonId` est la clé primaire : une seule ligne par leçon.
db.version(1).stores({
  progress: 'lessonId',
})
