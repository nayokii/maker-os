import { describe, expect, it } from 'vitest'
import { current, ledResistor, nextE12Up, resistance, resistorPower, voltage } from './ohm'

describe('loi d\'Ohm', () => {
  it('calcule la tension, le courant et la résistance', () => {
    expect(voltage(220, 0.02)).toBeCloseTo(4.4)
    expect(current(5, 1000)).toBeCloseTo(0.005)
    expect(resistance(5, 0.02)).toBeCloseTo(250)
  })
  it('refuse les valeurs impossibles', () => {
    expect(() => current(5, 0)).toThrow(RangeError)
    expect(() => resistance(5, 0)).toThrow(RangeError)
  })
})

describe('résistance de LED', () => {
  it('5 V, LED rouge 2 V, 20 mA donne 150 ohms', () => {
    expect(ledResistor({ supplyVolts: 5, forwardVolts: 2, currentAmps: 0.02 })).toBeCloseTo(150)
  })
  it('refuse une alimentation inférieure à la tension de la LED', () => {
    expect(() => ledResistor({ supplyVolts: 1.5, forwardVolts: 2, currentAmps: 0.02 })).toThrow(RangeError)
  })
  it('puissance de la résistance', () => {
    expect(resistorPower(150, 0.02)).toBeCloseTo(0.06)
  })
})

describe('valeurs normalisées E12', () => {
  it('arrondit vers le haut', () => {
    expect(nextE12Up(130)).toBe(150)
    expect(nextE12Up(150)).toBe(150)
    expect(nextE12Up(350)).toBe(390)
    expect(nextE12Up(466.7)).toBe(470)
    expect(nextE12Up(0.9)).toBe(1)
    expect(nextE12Up(9000)).toBe(10000)
  })
})
