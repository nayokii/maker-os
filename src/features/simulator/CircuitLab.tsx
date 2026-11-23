import { useState } from 'react'
import {
  analyzeLedCircuit,
  LED_MAX_AMPS,
  LED_TYPES,
  RESISTOR_MAX_WATTS,
  type LedState,
} from '../../shared/electronics/ledCircuit'
import { Badge } from '../../shared/ui/Badge'
import { LedCircuitDiagram } from './LedCircuitDiagram'

// Valeurs de résistances proposées (série E12 + « aucune »).
const RESISTORS = [0, 47, 100, 150, 220, 330, 470, 1000, 2200, 4700, 10000]

function formatOhms(ohms: number): string {
  if (ohms === 0) return 'Aucune (0 Ω)'
  return ohms >= 1000 ? `${ohms / 1000} kΩ` : `${ohms} Ω`
}

const stateInfo: Record<LedState, { tone: 'idle' | 'info' | 'ok' | 'warn' | 'danger'; text: string }> = {
  off: { tone: 'idle', text: 'Éteinte' },
  dim: { tone: 'info', text: 'Très faible' },
  ok: { tone: 'ok', text: 'Fonctionnement normal' },
  hot: { tone: 'warn', text: 'À la limite : trop de courant' },
  burned: { tone: 'danger', text: 'Grillée : courant trop fort' },
}

export function CircuitLab() {
  const [supply, setSupply] = useState(5)
  const [ledId, setLedId] = useState<(typeof LED_TYPES)[number]['id']>('red')
  const [resistance, setResistance] = useState(220)
  const [guess, setGuess] = useState<string | null>(null)

  const led = LED_TYPES.find((l) => l.id === ledId) ?? LED_TYPES[0]
  const result = analyzeLedCircuit({ supplyVolts: supply, forwardVolts: led.vf, resistanceOhms: resistance })
  const info = stateInfo[result.state]

  const unlimited = !Number.isFinite(result.currentAmps)
  const milliamps = unlimited ? 'non limité' : `${(result.currentAmps * 1000).toFixed(1)} mA`

  // Prédiction : de 220 Ω à 1 kΩ sous 5 V avec une LED rouge (calculé avec le même modèle).
  const before = analyzeLedCircuit({ supplyVolts: 5, forwardVolts: 2.0, resistanceOhms: 220 })
  const after = analyzeLedCircuit({ supplyVolts: 5, forwardVolts: 2.0, resistanceOhms: 1000 })

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section aria-label="Circuit" className="rounded-md border border-line bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Circuit série : source, résistance, LED</h2>
          <Badge tone={info.tone}>{info.text}</Badge>
        </div>
        <LedCircuitDiagram ledColor={led.color} brightness={result.brightness} state={result.state} />

        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-line pt-4 font-mono text-[13px]">
          <dt className="text-ink-2">Courant dans la LED</dt>
          <dd className={result.state === 'burned' || result.state === 'hot' ? 'text-warning' : ''}>{milliamps}</dd>
          <dt className="text-ink-2">Tension aux bornes de la résistance</dt>
          <dd>{result.resistorVolts.toFixed(2)} V</dd>
          <dt className="text-ink-2">Tension aux bornes de la LED</dt>
          <dd>{led.vf.toFixed(1)} V (typique)</dd>
          <dt className="text-ink-2">Puissance dans la résistance</dt>
          <dd className={result.resistorOverload ? 'text-warning' : ''}>
            {(result.resistorWatts * 1000).toFixed(0)} mW
            {result.resistorOverload && ` ▲ au-dessus de ${RESISTOR_MAX_WATTS * 1000} mW`}
          </dd>
        </dl>

        {result.state === 'burned' && (
          <p className="mt-4 text-warning">
            ▲ <b>Attention :</b> <span className="text-ink">le courant dépasse environ {LED_MAX_AMPS * 1000} mA, limite typique d'une LED 5 mm. Augmente la résistance.</span>
          </p>
        )}
        <p className="mt-4 text-xs text-ink-2">
          Modèle simplifié : la LED garde une tension fixe quand elle conduit. Les valeurs réelles dépendent de ta LED :
          vérifie sa fiche technique avant de brancher quoi que ce soit.
        </p>
      </section>

      <aside className="flex flex-col gap-4">
        <section aria-label="Réglages" className="rounded-md border border-line bg-surface p-4">
          <h2 className="mb-3 text-base font-semibold">Réglages</h2>
          <label className="mb-4 block">
            <span className="mb-1 flex justify-between text-xs font-medium uppercase tracking-wider text-ink-2">
              Alimentation <span className="font-mono normal-case text-ink">{supply.toFixed(1)} V</span>
            </span>
            <input
              type="range" min={1.5} max={12} step={0.1} value={supply}
              onChange={(e) => setSupply(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
              aria-label="Tension d'alimentation en volts"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-ink-2">Couleur de la LED</span>
            <select
              value={ledId}
              onChange={(e) => setLedId(e.target.value as typeof ledId)}
              className="h-9 w-full rounded-md border border-line-strong bg-surface-2 px-3 text-sm"
            >
              {LED_TYPES.map((l) => <option key={l.id} value={l.id}>{l.label} (Vf ≈ {l.vf.toFixed(1)} V)</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-ink-2">Résistance</span>
            <select
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="h-9 w-full rounded-md border border-line-strong bg-surface-2 px-3 font-mono text-[13px]"
            >
              {RESISTORS.map((r) => <option key={r} value={r}>{formatOhms(r)}</option>)}
            </select>
          </label>
        </section>

        <section aria-label="Prédiction" className="rounded-md border border-line-strong bg-surface p-4">
          <h2 className="mb-2 text-base font-semibold">Prédis avant de tester</h2>
          <p className="text-ink-2">
            5 V, LED rouge. On passe la résistance de 220 Ω à 1 kΩ. La LED sera…
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['plus brillante', 'moins brillante', 'pareille'].map((g) => (
              <button
                key={g}
                onClick={() => setGuess(g)}
                aria-pressed={guess === g}
                className={`h-8 rounded-md border px-3 text-sm ${guess === g ? 'border-accent text-accent' : 'border-line-strong text-ink-2 hover:text-ink'}`}
              >
                {g}
              </button>
            ))}
          </div>
          {guess && (
            <p className="mt-3">
              {guess === 'moins brillante' ? <span className="text-success">✓ Juste. </span> : <span className="text-warning">▲ Pas tout à fait. </span>}
              Avec 220 Ω : {(before.currentAmps * 1000).toFixed(1)} mA. Avec 1 kΩ : {(after.currentAmps * 1000).toFixed(1)} mA.
              Plus la résistance est grande, moins il passe de courant (I = U / R), donc moins la LED brille.
              Vérifie-le avec les réglages.
            </p>
          )}
        </section>
      </aside>
    </div>
  )
}
