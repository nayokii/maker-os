import { describe, expect, it } from 'vitest'
import { enclosureOuter, milToMm, mmToMil, trackWidthMm } from './pcb'

describe('unités PCB', () => {
  it('convertit mil et mm', () => {
    expect(milToMm(10)).toBeCloseTo(0.254)
    expect(mmToMil(0.254)).toBeCloseTo(10)
  })
})

describe('largeur de piste (IPC-2221)', () => {
  it('0,3 A, 10 °C, 1 oz externe : environ 0,057 mm', () => {
    expect(trackWidthMm({ currentAmps: 0.3, deltaT: 10, copperOz: 1, layer: 'external' })).toBeCloseTo(0.057, 3)
  })
  it('1 A, 10 °C, 1 oz externe : environ 0,3 mm', () => {
    expect(trackWidthMm({ currentAmps: 1, deltaT: 10, copperOz: 1, layer: 'external' })).toBeCloseTo(0.3, 1)
  })
  it('une couche interne demande une piste plus large', () => {
    const ext = trackWidthMm({ currentAmps: 1, deltaT: 10, copperOz: 1, layer: 'external' })
    const int = trackWidthMm({ currentAmps: 1, deltaT: 10, copperOz: 1, layer: 'internal' })
    expect(int).toBeGreaterThan(ext)
  })
  it('refuse un courant nul', () => {
    expect(() => trackWidthMm({ currentAmps: 0, deltaT: 10, copperOz: 1, layer: 'external' })).toThrow(RangeError)
  })
})

describe('boîtier', () => {
  it('PCB 40 × 20 × 12, jeu 1 mm, paroi 2 mm', () => {
    expect(enclosureOuter({ pcbLength: 40, pcbWidth: 20, pcbHeight: 12, clearance: 1, wall: 2 })).toEqual({
      length: 46,
      width: 26,
      height: 18,
    })
  })
})
