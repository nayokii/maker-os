import { describe, expect, it } from 'vitest'
import { analyzeLedCircuit } from './ledCircuit'

const red = 2.0

describe('circuit LED série', () => {
  it('5 V, LED rouge, 220 Ω : fonctionnement normal (environ 13,6 mA)', () => {
    const r = analyzeLedCircuit({ supplyVolts: 5, forwardVolts: red, resistanceOhms: 220 })
    expect(r.state).toBe('ok')
    expect(r.currentAmps * 1000).toBeCloseTo(13.64, 1)
  })
  it('sans résistance : LED détruite', () => {
    expect(analyzeLedCircuit({ supplyVolts: 5, forwardVolts: red, resistanceOhms: 0 }).state).toBe('burned')
  })
  it('47 Ω sous 5 V : courant trop fort', () => {
    expect(analyzeLedCircuit({ supplyVolts: 5, forwardVolts: red, resistanceOhms: 47 }).state).toBe('burned')
  })
  it('alimentation inférieure à Vf : éteinte', () => {
    expect(analyzeLedCircuit({ supplyVolts: 1.5, forwardVolts: red, resistanceOhms: 220 }).state).toBe('off')
  })
  it('10 kΩ sous 5 V : très faible', () => {
    expect(analyzeLedCircuit({ supplyVolts: 5, forwardVolts: red, resistanceOhms: 10000 }).state).toBe('dim')
  })
  it('150 Ω sous 5 V : exactement 20 mA, encore normal', () => {
    expect(analyzeLedCircuit({ supplyVolts: 5, forwardVolts: red, resistanceOhms: 150 }).state).toBe('ok')
  })
  it('signale une résistance qui surchauffe', () => {
    const r = analyzeLedCircuit({ supplyVolts: 12, forwardVolts: 3.0, resistanceOhms: 47 })
    expect(r.resistorOverload).toBe(true)
  })
})
