import { useState } from 'react'
import { ledResistor, nextE12Up, resistorPower, current } from '../../../shared/electronics/ohm'

// Convertit un texte saisi (« 3,3 ») en nombre. Renvoie NaN si ce n'est pas un nombre.
function parse(text: string): number {
  return Number(text.replace(',', '.'))
}

function Field({ label, unit, value, onChange }: { label: string; unit: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-2">{label}</span>
      <span className="flex h-9 items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3">
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-[13px] text-ink outline-none"
        />
        <span className="font-mono text-xs text-ink-2">{unit}</span>
      </span>
    </label>
  )
}

export function LedCalculator() {
  const [supply, setSupply] = useState('5')
  const [vf, setVf] = useState('2')
  const [milliamps, setMilliamps] = useState('20')

  const supplyVolts = parse(supply)
  const forwardVolts = parse(vf)
  const currentAmps = parse(milliamps) / 1000

  let result: { ohms: number; standard: number; realMilliamps: number; watts: number } | null = null
  let error: string | null = null
  try {
    const ohms = ledResistor({ supplyVolts, forwardVolts, currentAmps })
    const standard = nextE12Up(ohms)
    const realAmps = current(supplyVolts - forwardVolts, standard)
    result = { ohms, standard, realMilliamps: realAmps * 1000, watts: resistorPower(standard, realAmps) }
  } catch (e) {
    error = e instanceof RangeError ? e.message : 'Valeurs invalides.'
  }

  return (
    <section aria-label="Calculateur de résistance de LED" className="my-8 rounded-md border border-line bg-surface p-4">
      <h3 className="mb-3 text-base font-semibold">Calculateur : résistance d'une LED</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Alimentation" unit="V" value={supply} onChange={setSupply} />
        <Field label="Tension LED (Vf)" unit="V" value={vf} onChange={setVf} />
        <Field label="Courant voulu" unit="mA" value={milliamps} onChange={setMilliamps} />
      </div>
      <div className="mt-4 border-t border-line pt-4 font-mono text-[13px]">
        {result ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-ink-2">Résistance calculée</dt>
            <dd>{result.ohms.toFixed(0)} Ω</dd>
            <dt className="text-ink-2">Valeur E12 au-dessus</dt>
            <dd className="text-accent">{result.standard} Ω</dd>
            <dt className="text-ink-2">Courant réel</dt>
            <dd>{result.realMilliamps.toFixed(1)} mA</dd>
            <dt className="text-ink-2">Puissance dans R</dt>
            <dd>{(result.watts * 1000).toFixed(0)} mW (résistance 250 mW)</dd>
          </dl>
        ) : (
          <p className="font-sans text-sm text-warning">▲ Attention : {error}</p>
        )}
      </div>
    </section>
  )
}
