// Calculs d'électronique de base. Aucune dépendance à l'interface : on peut les tester seuls.
// Unités : volts (V), ampères (A), ohms (Ω), watts (W). Les mA sont convertis par l'appelant.

/** Valeurs normalisées de résistances (série E12), pour une décade : 1 à 8,2. */
export const E12 = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2] as const

/** Loi d'Ohm : U = R × I */
export function voltage(resistanceOhms: number, currentAmps: number): number {
  return resistanceOhms * currentAmps
}

/** Loi d'Ohm : I = U / R */
export function current(voltageVolts: number, resistanceOhms: number): number {
  if (!(resistanceOhms > 0)) throw new RangeError('La résistance doit être positive.')
  return voltageVolts / resistanceOhms
}

/** Loi d'Ohm : R = U / I */
export function resistance(voltageVolts: number, currentAmps: number): number {
  if (!(currentAmps > 0)) throw new RangeError('Le courant doit être positif.')
  return voltageVolts / currentAmps
}

/** Puissance dissipée par une résistance : P = R × I² */
export function resistorPower(resistanceOhms: number, currentAmps: number): number {
  return resistanceOhms * currentAmps ** 2
}

export interface LedResistorInput {
  supplyVolts: number // tension d'alimentation
  forwardVolts: number // tension directe de la LED (Vf)
  currentAmps: number // courant voulu dans la LED
}

/** Résistance en série pour limiter le courant d'une LED : R = (Valim − Vf) / I */
export function ledResistor({ supplyVolts, forwardVolts, currentAmps }: LedResistorInput): number {
  if (!(currentAmps > 0)) throw new RangeError('Le courant doit être positif.')
  if (!(supplyVolts > forwardVolts)) {
    throw new RangeError("L'alimentation doit être supérieure à la tension directe de la LED.")
  }
  return (supplyVolts - forwardVolts) / currentAmps
}

/** Plus petite valeur E12 supérieure ou égale à `ohms` (on arrondit vers le haut : courant plus faible, donc plus sûr). */
export function nextE12Up(ohms: number): number {
  if (!(ohms > 0)) throw new RangeError('La résistance doit être positive.')
  const decade = 10 ** Math.floor(Math.log10(ohms))
  for (const base of E12) {
    const value = Number((base * decade).toPrecision(6))
    if (value >= ohms * (1 - 1e-9)) return value
  }
  return decade * 10
}
