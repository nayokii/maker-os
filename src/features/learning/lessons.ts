import ohm from '../../../content/lessons/00-tension-courant-resistance.md?raw'
import led from '../../../content/lessons/01-resistance-de-led.md?raw'
import p1 from '../../../content/lessons/p1-comprendre-un-pcb.md?raw'
import p2 from '../../../content/lessons/p2-le-schema-kicad.md?raw'
import p3 from '../../../content/lessons/p3-empreintes.md?raw'
import p4 from '../../../content/lessons/p4-placement-et-routage.md?raw'
import p5 from '../../../content/lessons/p5-verifier-et-fabriquer.md?raw'
import c1 from '../../../content/lessons/c1-dimensionner-un-boitier.md?raw'
import c2 from '../../../content/lessons/c2-premier-boitier-3d.md?raw'
import type { Exercise } from '../../shared/models/exercise'

export interface Lesson {
  id: string
  code: string // numéro affiché : 0.1, P.1, C.1…
  module: string
  title: string
  summary: string
  content: string
  tool?: 'led-calculator'
  link?: { to: string; label: string } // lien vers un outil de l'application
  exercises: Exercise[]
}

export const lessons: Lesson[] = [
  {
    id: 'tension-courant-resistance',
    code: '0.1',
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
    code: '0.2',
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
  {
    id: "comprendre-un-pcb",
    code: "P.1",
    module: "Parcours PCB · Créer une carte électronique",
    title: "Comprendre un PCB",
    summary: "Couches, pastilles, vias et le chemin du schéma à la carte.",
    content: p1,
    exercises: [
      {
        id: "p1-1",
        prompt: "Convertis 0,254 mm en mil (1 mil = 0,0254 mm).",
        unit: "mil",
        answer: 10,
        tolerance: 0.01,
        hint: "Divise les millimètres par 0,0254.",
        explanation: "0,254 / 0,0254 = 10 mil.",
      },
    ],
  },
  {
    id: "schema-kicad",
    code: "P.2",
    module: "Parcours PCB · Créer une carte électronique",
    title: "Dessiner le schéma dans KiCad",
    summary: "Un porte-clé à 2 LED : calcul, symboles, fils et contrôle ERC.",
    content: p2,
    exercises: [
      {
        id: "p2-1",
        prompt: "Alimentation 3 V, LED rouge (Vf = 2 V), courant voulu 5 mA. Quelle résistance calculée, en Ω ?",
        unit: "Ω",
        answer: 200,
        tolerance: 0.02,
        hint: "R = (Valim − Vf) / I, avec I en ampères (5 mA = 0,005 A).",
        explanation: "R = (3 − 2) / 0,005 = 200 Ω. La valeur E12 au-dessus est 220 Ω.",
      },
    ],
  },
  {
    id: "empreintes",
    code: "P.3",
    module: "Parcours PCB · Créer une carte électronique",
    title: "Les empreintes (footprints)",
    summary: "Pas, trous et contours : faire correspondre le dessin au composant réel.",
    content: p3,
    exercises: [
      {
        id: "p3-1",
        prompt: "Une patte de 0,6 mm, avec un jeu de 0,3 mm autour. Quel diamètre de trou, en mm ?",
        unit: "mm",
        answer: 0.9,
        tolerance: 0.02,
        hint: "Diamètre du trou = diamètre de la patte + jeu.",
        explanation: "0,6 + 0,3 = 0,9 mm. Vérifie toujours la fiche technique du composant.",
      },
    ],
  },
  {
    id: "placement-et-routage",
    code: "P.4",
    module: "Parcours PCB · Créer une carte électronique",
    title: "Placement et routage",
    summary: "Placer, tracer les pistes et choisir leur largeur.",
    content: p4,
    link: { to: '/circuit-designer', label: 'Ouvrir Circuit Designer' },
    exercises: [
      {
        id: "p4-1",
        prompt: "Piste externe, cuivre 1 oz (35 µm), 0,3 A, échauffement de 10 °C. Quelle largeur minimale selon IPC-2221, en mm ?",
        unit: "mm",
        answer: 0.057,
        tolerance: 0.05,
        hint: "Utilise le calculateur de largeur de piste dans Circuit Designer.",
        explanation: "Environ 0,057 mm. C'est un minimum thermique : ton fabricant impose souvent bien plus (largeur minimale de piste).",
      },
    ],
  },
  {
    id: "verifier-et-fabriquer",
    code: "P.5",
    module: "Parcours PCB · Créer une carte électronique",
    title: "Vérifier et préparer la fabrication",
    summary: "ERC, DRC, fichiers Gerber et vérification avant de commander.",
    content: p5,
    exercises: [
      {
        id: "p5-1",
        prompt: "Un PCB de 100 × 100 mm fait combien de cm² (1 cm = 10 mm) ?",
        unit: "cm²",
        answer: 100,
        tolerance: 0.01,
        hint: "100 mm = 10 cm, donc 10 cm × 10 cm.",
        explanation: "10 × 10 = 100 cm². Les fabricants facturent souvent selon la surface et la quantité.",
      },
    ],
  },
  {
    id: "dimensionner-un-boitier",
    code: "C.1",
    module: "Parcours boîtier · Modéliser en 3D",
    title: "Dimensionner un boîtier",
    summary: "PCB + jeu + paroi : calculer les dimensions extérieures.",
    content: c1,
    link: { to: '/circuit-designer', label: 'Ouvrir Circuit Designer' },
    exercises: [
      {
        id: "c1-1",
        prompt: "Carte de 40 mm de long, jeu de 1 mm de chaque côté, parois de 2 mm. Quelle longueur extérieure, en mm ?",
        unit: "mm",
        answer: 46,
        tolerance: 0.01,
        hint: "Longueur = carte + 2 × (jeu + paroi).",
        explanation: "40 + 2 × (1 + 2) = 46 mm.",
      },
    ],
  },
  {
    id: "premier-boitier-3d",
    code: "C.2",
    module: "Parcours boîtier · Modéliser en 3D",
    title: "Ton premier boîtier en 3D",
    summary: "Du fichier STEP de KiCad à une pièce prête à imprimer.",
    content: c2,
    exercises: [
      {
        id: "c2-1",
        prompt: "Une pièce de 12 mm de haut, imprimée avec des couches de 0,2 mm. Combien de couches ?",
        unit: "couches",
        answer: 60,
        tolerance: 0.01,
        hint: "Divise la hauteur par la hauteur de couche.",
        explanation: "12 / 0,2 = 60 couches.",
      },
    ],
  },
]

export function findLesson(id: string | undefined): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}
