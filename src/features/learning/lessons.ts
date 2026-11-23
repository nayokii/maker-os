import ohm from '../../../content/lessons/00-tension-courant-resistance.md?raw'
import led from '../../../content/lessons/01-resistance-de-led.md?raw'

export interface Exercise {
  id: string
  prompt: string
  unit: string
  answer: number
  tolerance: number // erreur relative acceptée (0.02 = 2 %)
  hint: string
  explanation: string
}

export interface Lesson {
  id: string
  module: string
  title: string
  summary: string
  content: string
  tool?: 'led-calculator'
  exercises: Exercise[]
}

export const lessons: Lesson[] = [
  {
    id: 'tension-courant-resistance',
    module: 'Module 0 · Bases électriques',
    title: 'Tension, courant, résistance',
    summary: 'Les trois grandeurs de base et la loi d\'Ohm.',
    content: ohm,
    exercises: [
      {
        id: 'ohm-1',
        prompt: 'Une résistance de 220 Ω est traversée par 0,02 A. Quelle tension a-t-elle à ses bornes ?',
        unit: 'V',
        answer: 4.4,
        tolerance: 0.02,
        hint: 'On cherche U. Utilise U = R × I.',
        explanation: 'U = R × I = 220 × 0,02 = 4,4 V.',
      },
      {
        id: 'ohm-2',
        prompt: 'Une résistance de 1000 Ω est branchée sur 3 V. Quel courant la traverse, en mA ?',
        unit: 'mA',
        answer: 3,
        tolerance: 0.02,
        hint: 'I = U / R donne des ampères. Convertis ensuite en mA (× 1000).',
        explanation: 'I = 3 / 1000 = 0,003 A, soit 3 mA.',
      },
    ],
  },
  {
    id: 'resistance-de-led',
    module: 'Module 0 · Bases électriques',
    title: 'Calculer la résistance d\'une LED',
    summary: 'Pourquoi une LED grille sans résistance, et comment choisir la bonne.',
    content: led,
    tool: 'led-calculator',
    exercises: [
      {
        id: 'led-1',
        prompt: 'Alimentation 5 V, LED rouge (Vf = 2 V), courant voulu 15 mA. Quelle résistance calculée, en Ω ?',
        unit: 'Ω',
        answer: 200,
        tolerance: 0.02,
        hint: 'R = (Valim − Vf) / I, avec I en ampères (15 mA = 0,015 A).',
        explanation: 'R = (5 − 2) / 0,015 = 200 Ω.',
      },
      {
        id: 'led-2',
        prompt: 'Pile 9 V, LED rouge (Vf = 2 V), courant voulu 20 mA. Quelle résistance calculée, en Ω ?',
        unit: 'Ω',
        answer: 350,
        tolerance: 0.02,
        hint: 'Même formule : la tension à absorber est 9 − 2.',
        explanation: 'R = (9 − 2) / 0,02 = 350 Ω. La valeur E12 au-dessus est 390 Ω.',
      },
      {
        id: 'led-3',
        prompt: 'ESP32 en 3,3 V, LED rouge (Vf = 2 V), résistance de 150 Ω. Quel courant passe dans la LED, en mA ?',
        unit: 'mA',
        answer: 8.67,
        tolerance: 0.03,
        hint: 'I = (Valim − Vf) / R. Convertis en mA à la fin.',
        explanation: 'I = (3,3 − 2) / 150 ≈ 0,00867 A, soit environ 8,7 mA.',
      },
    ],
  },
]

export function findLesson(id: string | undefined): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
