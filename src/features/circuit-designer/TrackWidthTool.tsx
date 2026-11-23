import { useState } from 'react'
import { mmToMil, trackWidthMm, type CopperLayer } from '../../shared/electronics/pcb'

const parse = (text: string) => Number(text.replace(',', '.'))

function Field({ label, unit, value, onChange }: { label: string; unit: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-ink-2">{label}</span>
      <span className="flex h-9 items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3">
        <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent font-mono text-[13px] outline-none" />
        <span className="font-mono text-xs text-ink-2">{unit}</span>
      </span>
    </label>
  )
}

export function TrackWidthTool() {
  const [current, setCurrent] = useState('0,3')
  const [deltaT, setDeltaT] = useState('10')
  const [oz, setOz] = useState('1')
  const [layer, setLayer] = useState<CopperLayer>('external')

  let width: number | null = null
  let error: string | null = null
  try {
    width = trackWidthMm({ currentAmps: parse(current), deltaT: parse(deltaT), copperOz: parse(oz), layer })
    if (!Number.isFinite(width)) throw new RangeError('Valeurs invalides.')
  } catch (e) {
    width = null
    error = e instanceof RangeError ? e.message : 'Valeurs invalides.'
  }

  return (
    <section aria-label="Largeur de piste" className="rounded-md border border-line bg-surface p-4">
      <h2 className="mb-1 text-base font-semibold">Largeur minimale d'une piste</h2>
      <p className="mb-4 text-ink-2">Selon la norme IPC-2221 : la piste ne dépasse pas l'échauffement choisi.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Courant" unit="A" value={current} onChange={setCurrent} />
        <Field label="Échauffement accepté" unit="°C" value={deltaT} onChange={setDeltaT} />
        <Field label="Cuivre" unit="oz" value={oz} onChange={setOz} />
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-ink-2">Couche</span>
          <select value={layer} onChange={(e) => setLayer(e.target.value as CopperLayer)} className="h-9 rounded-md border border-line-strong bg-surface-2 px-3 text-sm">
            <option value="external">Externe (dessus ou dessous)</option>
            <option value="internal">Interne</option>
          </select>
        </label>
      </div>
      <div className="mt-4 border-t border-line pt-4 font-mono text-[13px]">
        {width !== null ? (
          <p>
            Largeur minimale : <span className="text-accent">{width.toFixed(3)} mm</span>{' '}
            <span className="text-ink-2">({mmToMil(width).toFixed(1)} mil)</span>
          </p>
        ) : (
          <p className="font-sans text-warning">▲ Attention : {error}</p>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-2">
        C'est un minimum thermique. Le fabricant impose en plus une largeur minimale de piste : respecte-la, et garde de la marge.
        1 oz de cuivre correspond à environ 35 µm.
      </p>
    </section>
  )
}
