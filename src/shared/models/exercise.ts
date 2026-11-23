// Un exercice à réponse numérique, utilisé par les leçons et par les fiches composants.
export interface Exercise {
  id: string
  prompt: string
  unit: string
  answer: number
  tolerance: number // erreur relative acceptée (0.02 = 2 %)
  hint: string
  explanation: string
}
