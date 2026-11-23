// Modèle simple d'un circuit série : source + résistance + LED.
// Ce n'est pas un vrai simulateur SPICE : la LED est vue comme une tension fixe (Vf) quand elle conduit.

export const LED_NOMINAL_AMPS = 0.02 // courant de fonctionnement courant d'une LED 5 mm
export const LED_MAX_AMPS = 0.03 // limite typique : à vérifier sur la fiche de ta LED
export const RESISTOR_MAX_WATTS = 0.25 // résistance 1/4 W

// Valeurs TYPIQUES : la tension directe réelle dépend de la LED (voir sa fiche technique).
export const LED_TYPES = [
  { id: 'red', label: 'Rouge', vf: 2.0, color: '#ff4d4d' },
  { id: 'yellow', label: 'Jaune', vf: 2.1, color: '#ffd23f' },
  { id: 'green', label: 'Verte', vf: 2.2, color: '#4dff88' },
  { id: 'blue', label: 'Bleue', vf: 3.0, color: '#4d8dff' },
  { id: 'white', label: 'Blanche', vf: 3.0, color: '#f2f2ff' },
] as const

export type LedState = 'off' | 'dim' | 'ok' | 'hot' | 'burned'

export interface LedCircuitInput {
  supplyVolts: number
  forwardVolts: number
  resistanceOhms: number // 0 = pas de résistance
}

export interface LedCircuitResult {
  state: LedState
  currentAmps: number // Infinity si rien ne limite le courant
  resistorVolts: number
  resistorWatts: number
  resistorOverload: boolean
  brightness: number // 0 à 1, pour l'affichage
}

export function analyzeLedCircuit({ supplyVolts, forwardVolts, resistanceOhms }: LedCircuitInput): LedCircuitResult {
  // La LED ne conduit pas tant que l'alimentation n'atteint pas sa tension directe.
  if (supplyVolts <= forwardVolts) {
    return { state: 'off', currentAmps: 0, resistorVolts: 0, resistorWatts: 0, resistorOverload: false, brightness: 0 }
  }
  // Sans résistance, rien ne limite le courant dans notre modèle : la LED est détruite.
  if (resistanceOhms <= 0) {
    return { state: 'burned', currentAmps: Infinity, resistorVolts: 0, resistorWatts: 0, resistorOverload: false, brightness: 0 }
  }

  const resistorVolts = supplyVolts - forwardVolts
  const currentAmps = resistorVolts / resistanceOhms
  const resistorWatts = resistanceOhms * currentAmps ** 2

  let state: LedState
  if (currentAmps < 0.0001) state = 'off'
  else if (currentAmps < 0.005) state = 'dim'
  else if (currentAmps <= LED_NOMINAL_AMPS + 1e-9) state = 'ok'
  else if (currentAmps <= LED_MAX_AMPS + 1e-9) state = 'hot'
  else state = 'burned'

  const brightness = state === 'burned' || state === 'off' ? 0 : Math.min(currentAmps / LED_NOMINAL_AMPS, 1)
  return { state, currentAmps, resistorVolts, resistorWatts, resistorOverload: resistorWatts > RESISTOR_MAX_WATTS, brightness }
}
