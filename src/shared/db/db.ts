import Dexie, { type EntityTable } from 'dexie'

// Progression sur une leçon (stockée dans le navigateur, sur cet ordinateur).
export interface LessonProgress {
  lessonId: string
  completedAt: string // date ISO
}

// Dernière consultation d'une fiche composant.
export interface ComponentView {
  componentId: string
  viewedAt: string // date ISO
}

type MakerDb = Dexie & {
  progress: EntityTable<LessonProgress, 'lessonId'>
  views: EntityTable<ComponentView, 'componentId'>
}

export const db = new Dexie('maker-os') as MakerDb

// La clé primaire est le premier champ listé ; les autres sont des index (pour trier).
db.version(1).stores({
  progress: 'lessonId',
})
// Version 2 : on ajoute la table `views`. Dexie migre la base existante sans rien perdre.
db.version(2).stores({
  progress: 'lessonId',
  views: 'componentId, viewedAt',
})
