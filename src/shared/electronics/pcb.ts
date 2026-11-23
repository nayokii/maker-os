// Calculs utiles pour concevoir un PCB et son boîtier.

export const MM_PER_MIL = 0.0254 // 1 mil = 1/1000 de pouce = 0,0254 mm
export const COPPER_MIL_PER_OZ = 1.378 // 1 oz/ft² de cuivre ≈ 35 µm ≈ 1,378 mil

export function milToMm(mil: number): number {
  return mil * MM_PER_MIL
}

export function mmToMil(mm: number): number {
  return mm / MM_PER_MIL
}

export type CopperLayer = 'external' | 'internal'

export interface TrackWidthInput {
  currentAmps: number // courant dans la piste
  deltaT: number // échauffement accepté (°C)
  copperOz: number // épaisseur de cuivre (1 oz = 35 µm)
  layer: CopperLayer
}

/**
 * Largeur MINIMALE de piste pour un courant donné, selon la formule IPC-2221 :
 *   I = k × ΔT^0,44 × A^0,725   (A = section en mil²)
 * k vaut 0,048 pour une couche externe et 0,024 pour une couche interne.
 * C'est un minimum thermique : respecte aussi les règles minimales du fabricant, et garde de la marge.
 */
export function trackWidthMm({ currentAmps, deltaT, copperOz, layer }: TrackWidthInput): number {
  if (!(currentAmps > 0)) throw new RangeError('Le courant doit être positif.')
  if (!(deltaT > 0)) throw new RangeError("L'échauffement doit être positif.")
  if (!(copperOz > 0)) throw new RangeError("L'épaisseur de cuivre doit être positive.")
  const k = layer === 'external' ? 0.048 : 0.024
  const areaMil2 = (currentAmps / (k * deltaT ** 0.44)) ** (1 / 0.725)
  const thicknessMil = copperOz * COPPER_MIL_PER_OZ
  return milToMm(areaMil2 / thicknessMil)
}

export interface EnclosureInput {
  pcbLength: number // mm
  pcbWidth: number // mm
  pcbHeight: number // mm, composants compris
  clearance: number // jeu autour du PCB (mm)
  wall: number // épaisseur de paroi (mm)
}

export interface EnclosureSize {
  length: number
  width: number
  height: number
}

/** Dimensions extérieures : PCB + jeu de chaque côté + paroi de chaque côté. */
export function enclosureOuter({ pcbLength, pcbWidth, pcbHeight, clearance, wall }: EnclosureInput): EnclosureSize {
  const extra = 2 * (clearance + wall)
  return { length: pcbLength + extra, width: pcbWidth + extra, height: pcbHeight + extra }
}
