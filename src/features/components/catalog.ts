import arduino from '../../../content/components/arduino-uno.md?raw'
import bouton from '../../../content/components/bouton.md?raw'
import condensateur from '../../../content/components/condensateur.md?raw'
import esp32 from '../../../content/components/esp32.md?raw'
import led from '../../../content/components/led.md?raw'
import resistance from '../../../content/components/resistance.md?raw'
import type { Exercise } from '../../shared/models/exercise'

export type Category = 'Passif' | 'Sortie' | 'Entrée' | 'Microcontrôleur'

export interface Spec {
  label: string
  value: string
}

export interface Pin {
  name: string
  role: string
}

// "ElectronicComponent" et non "Component", pour ne pas confondre avec un composant React.
export interface ElectronicComponent {
  id: string
  name: string
  category: Category
  summary: string
  body: string // texte Markdown (description, fonctionnement, exemples)
  specs: Spec[]
  pins: Pin[]
  compatibility: string[]
  precautions: string[]
  exercise: Exercise
}

export const categories: Category[] = ['Passif', 'Sortie', 'Entrée', 'Microcontrôleur']

export const catalog: ElectronicComponent[] = [
  {
    id: 'resistance',
    name: 'Résistance',
    category: 'Passif',
    summary: 'Limite le courant. Sans sens de branchement.',
    body: resistance,
    specs: [
      { label: 'Unité', value: 'ohm (Ω)' },
      { label: 'Valeurs courantes', value: 'série E12 : 10, 12, 15, 18, 22…' },
      { label: 'Tolérance fréquente', value: '5 %' },
      { label: 'Puissance fréquente', value: '0,25 W (à vérifier sur la fiche)' },
    ],
    pins: [
      { name: 'Patte 1', role: 'Borne (non polarisée)' },
      { name: 'Patte 2', role: 'Borne (non polarisée)' },
    ],
    compatibility: ['Se combine avec LED, boutons, capteurs et toutes les cartes.'],
    precautions: [
      'Vérifie la puissance dissipée : P = R × I². Elle doit rester sous la valeur maximale de la résistance.',
      'Une résistance chauffe : ne la touche pas juste après une longue utilisation à forte puissance.',
    ],
    exercise: {
      id: 'comp-resistance',
      prompt: 'Une résistance de 330 Ω est traversée par 10 mA. Quelle puissance dissipe-t-elle, en mW ?',
      unit: 'mW',
      answer: 33,
      tolerance: 0.02,
      hint: 'P = R × I², avec I en ampères (10 mA = 0,01 A). Le résultat est en watts, convertis en mW.',
      explanation: 'P = 330 × 0,01² = 0,033 W, soit 33 mW.',
    },
  },
  {
    id: 'led',
    name: 'LED',
    category: 'Sortie',
    summary: 'Émet de la lumière. Polarisée, avec résistance obligatoire.',
    body: led,
    specs: [
      { label: 'Tension directe (rouge)', value: 'environ 2 V (varie selon la couleur)' },
      { label: 'Courant typique', value: '10 à 20 mA (voir la fiche de ta LED)' },
      { label: 'Polarité', value: 'Oui : anode (+) et cathode (−)' },
    ],
    pins: [
      { name: 'Anode (+)', role: 'Patte la plus longue' },
      { name: 'Cathode (−)', role: 'Patte courte, côté plat du boîtier' },
    ],
    compatibility: ['Arduino Uno (5 V) et ESP32 (3,3 V), avec une résistance adaptée à chaque tension.'],
    precautions: [
      'Toujours une résistance en série : sans elle, le courant n\'est pas limité et la LED grille.',
      'Vérifie la tension directe et le courant maximal de ta LED, et le courant maximal d\'une broche de ta carte, dans leurs fiches techniques.',
    ],
    exercise: {
      id: 'comp-led',
      prompt: 'Alimentation 5 V, LED verte (Vf = 2,2 V), courant voulu 10 mA. Quelle résistance calculée, en Ω ?',
      unit: 'Ω',
      answer: 280,
      tolerance: 0.02,
      hint: 'R = (Valim − Vf) / I, avec I en ampères.',
      explanation: 'R = (5 − 2,2) / 0,01 = 280 Ω. La valeur E12 au-dessus est 330 Ω.',
    },
  },
  {
    id: 'bouton',
    name: 'Bouton poussoir',
    category: 'Entrée',
    summary: 'Ferme un circuit quand on appuie. À protéger du rebond.',
    body: bouton,
    specs: [
      { label: 'Type courant', value: 'tactile 4 pattes, 6 × 6 mm' },
      { label: 'Calibre fréquent', value: 'environ 12 V / 50 mA (à vérifier sur la fiche)' },
      { label: 'Polarité', value: 'Non' },
    ],
    pins: [
      { name: 'Pattes 1 et 2', role: 'Reliées entre elles (même côté)' },
      { name: 'Pattes 3 et 4', role: 'Reliées entre elles, connectées aux autres quand on appuie' },
    ],
    compatibility: ['Arduino Uno et ESP32, avec pull-up (interne ou externe).'],
    precautions: [
      'Ne laisse pas l\'entrée « flotter » : sans pull-up ou pull-down, la lecture est aléatoire.',
      'Ne l\'utilise pas pour commuter une charge forte : respecte le calibre de la fiche.',
    ],
    exercise: {
      id: 'comp-bouton',
      prompt: 'Une entrée à 5 V passe par une pull-up de 10 kΩ. Le bouton, relié à la masse, est pressé. Quel courant circule dans la résistance, en mA ?',
      unit: 'mA',
      answer: 0.5,
      tolerance: 0.02,
      hint: 'Tension de 5 V aux bornes de 10 000 Ω : I = U / R, puis convertis en mA.',
      explanation: 'I = 5 / 10 000 = 0,0005 A, soit 0,5 mA.',
    },
  },
  {
    id: 'condensateur',
    name: 'Condensateur',
    category: 'Passif',
    summary: 'Stocke et lisse. Les électrolytiques sont polarisés.',
    body: condensateur,
    specs: [
      { label: 'Unité', value: 'farad (F), surtout µF, nF et pF' },
      { label: 'Polarité', value: 'Oui pour les électrolytiques, non pour les céramiques' },
      { label: 'Valeur de découplage courante', value: '100 nF' },
    ],
    pins: [
      { name: 'Patte + (électrolytique)', role: 'Patte longue' },
      { name: 'Patte − (électrolytique)', role: 'Côté de la bande marquée sur le boîtier' },
    ],
    compatibility: ['Se place près de l\'alimentation d\'un microcontrôleur ou d\'un capteur.'],
    precautions: [
      'Respecte la tension maximale marquée sur le boîtier.',
      'Ne branche jamais un électrolytique à l\'envers : il peut chauffer, gonfler, voire éclater.',
    ],
    exercise: {
      id: 'comp-condensateur',
      prompt: 'Combien de nanofarads (nF) y a-t-il dans 0,1 µF ?',
      unit: 'nF',
      answer: 100,
      tolerance: 0.01,
      hint: '1 µF = 1000 nF.',
      explanation: '0,1 × 1000 = 100 nF.',
    },
  },
  {
    id: 'arduino-uno',
    name: 'Arduino Uno',
    category: 'Microcontrôleur',
    summary: 'Carte de référence pour débuter, logique 5 V.',
    body: arduino,
    specs: [
      { label: 'Microcontrôleur', value: 'ATmega328P' },
      { label: 'Tension logique', value: '5 V' },
      { label: 'Broches numériques', value: '14 (D0 à D13)' },
      { label: 'Entrées analogiques', value: '6 (A0 à A5), 10 bits' },
      { label: 'Courant par broche', value: '20 mA recommandé' },
    ],
    pins: [
      { name: 'D0 à D13', role: 'Entrées/sorties numériques' },
      { name: 'D13', role: 'Reliée à la LED intégrée' },
      { name: 'A0 à A5', role: 'Entrées analogiques' },
      { name: '5V, 3V3, GND', role: 'Alimentations et masse' },
    ],
    compatibility: ['LED, boutons, capteurs 5 V. Simulée par Wokwi.'],
    precautions: [
      'Ne dépasse pas le courant maximal d\'une broche : vérifie la fiche de la carte.',
      'Ne branche rien de plus de 5 V sur une broche d\'entrée.',
    ],
    exercise: {
      id: 'comp-uno',
      prompt: 'Un convertisseur analogique de 10 bits donne combien de valeurs différentes ?',
      unit: 'valeurs',
      answer: 1024,
      tolerance: 0,
      hint: 'Avec n bits, on a 2 puissance n valeurs.',
      explanation: '2¹⁰ = 1024 valeurs, de 0 à 1023.',
    },
  },
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'Microcontrôleur',
    summary: 'Wi-Fi et Bluetooth, logique 3,3 V.',
    body: esp32,
    specs: [
      { label: 'Tension logique', value: '3,3 V (pas tolérant 5 V)' },
      { label: 'Connectivité', value: 'Wi-Fi 2,4 GHz et Bluetooth' },
      { label: 'Convertisseur analogique', value: '12 bits' },
      { label: 'Alimentation de la carte', value: '5 V par USB (régulateur 3,3 V sur la carte)' },
    ],
    pins: [
      { name: 'GPIO', role: 'Entrées/sorties numériques' },
      { name: 'GPIO 34 à 39', role: 'Entrées seulement (selon le modèle)' },
      { name: '3V3, GND, VIN', role: 'Alimentations et masse' },
    ],
    compatibility: ['Capteurs 3,3 V. Les capteurs 5 V demandent une adaptation de niveau.'],
    precautions: [
      'Ses broches ne supportent pas 5 V : une tension trop élevée peut les détruire.',
      'Les broches disponibles et leur courant maximal dépendent de la carte : consulte sa fiche technique.',
    ],
    exercise: {
      id: 'comp-esp32',
      prompt: 'Un convertisseur analogique de 12 bits donne combien de valeurs différentes ?',
      unit: 'valeurs',
      answer: 4096,
      tolerance: 0,
      hint: 'Avec n bits, on a 2 puissance n valeurs.',
      explanation: '2¹² = 4096 valeurs, de 0 à 4095.',
    },
  },
]

export function findComponent(id: string | undefined): ElectronicComponent | undefined {
  return catalog.find((c) => c.id === id)
}
