import { useState } from 'react'
import { enclosureOuter } from '../../shared/electronics/pcb'

const parse = (text: string) => Number(text.replace(',', '.'))

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-2">{label}</span>
      <span className="flex h-9 items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3">
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent font-mono text-[13px] outline-none" />
        <span className="font-mono text-xs text-ink-2">mm</span>
      </span>
    </label>
  )
}

export function EnclosureTool() {
  const [length, setLength] = useState('40')
  const [width, setWidth] = useState('20')
  const [height, setHeight] = useState('12')
  const [clearance, setClearance] = useState('1')
  const [wall, setWall] = useState('2')

  const values = [length, width, height, clearance, wall].map(parse)
  const valid = values.every((v) => Number.isFinite(v) && v >= 0) && values.slice(0, 3).every((v) => v > 0)
  const size = valid
    ? enclosureOuter({ pcbLength: values[0]!, pcbWidth: values[1]!, pcbHeight: values[2]!, clearance: values[3]!, wall: values[4]! })
    : null

  return (
    <section aria-label="Dimensions du boîtier" className="rounded-md border border-line bg-surface p-4">
      <h2 className="mb-1 text-base font-semibold">Dimensions extérieures du boîtier</h2>
      <p className="mb-4 text-ink-2">Dimension extérieure = carte + 2 × (jeu + paroi).</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Longueur PCB" value={length} onChange={setLength} />
        <Field label="Largeur PCB" value={width} onChange={setWidth} />
        <Field label="Hauteur (composants)" value={height} onChange={setHeight} />
        <Field label="Jeu autour" value={clearance} onChange={setClearance} />
        <Field label="Paroi" value={wall} onChange={setWall} />
      </div>
      <div className="mt-4 border-t border-line pt-4 font-mono text-[13px]">
        {size ? (
          <p>
            Boîtier : <span className="text-accent">{size.length} × {size.width} × {size.height} mm</span>
          </p>
        ) : (
          <p className="font-sans text-warning">▲ Attention : saisis des valeurs positives.</p>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-2">
        Ajoute les ouvertures (LED, connecteur) et un peu de marge pour les tolérances de ton imprimante : fais un essai court avant la pièce finale.
      </p>
    </section>
  )
}
