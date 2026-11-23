import type { LedState } from '../../shared/electronics/ledCircuit'

interface Props {
  ledColor: string
  brightness: number // 0 à 1
  state: LedState
}

// Schéma du circuit : source à gauche, résistance en haut, LED à droite.
export function LedCircuitDiagram({ ledColor, brightness, state }: Props) {
  const burned = state === 'burned'
  const wire = 'var(--color-ink-2)'
  return (
    <svg viewBox="0 0 440 210" role="img" aria-label={`Circuit : source, résistance et LED. État de la LED : ${state}`} className="w-full max-w-xl">
      {/* fils */}
      <g stroke={wire} strokeWidth="2" fill="none">
        <path d="M60 60 H140" />
        <path d="M250 60 H340 V80" />
        <path d="M340 140 V170 H60 V122" />
        <path d="M60 60 V78" />
      </g>
      {/* source (pile) */}
      <g stroke="var(--color-ink)" strokeWidth="2">
        <path d="M40 78 H80" />
        <path d="M48 90 H72" />
        <path d="M40 106 H80" />
        <path d="M48 118 H72" />
      </g>
      <text x="90" y="100" fontSize="12" fill="var(--color-ink-2)" fontFamily="var(--font-mono)">Source</text>
      {/* résistance */}
      <rect x="140" y="46" width="110" height="28" rx="2" fill="var(--color-surface-2)" stroke="var(--color-line-strong)" strokeWidth="1.5" />
      <text x="195" y="38" textAnchor="middle" fontSize="12" fill="var(--color-ink-2)" fontFamily="var(--font-mono)">Résistance</text>
      {/* LED : triangle + barre */}
      <g stroke="var(--color-ink)" strokeWidth="2" fill="none">
        <path d="M322 90 L358 90 L340 122 Z" fill={burned ? 'var(--color-surface-2)' : 'var(--color-surface)'} />
        <path d="M322 124 H358" />
      </g>
      {!burned && state !== 'off' && (
        <>
          <circle cx="340" cy="106" r="46" fill={ledColor} opacity={brightness * 0.28} />
          <circle cx="340" cy="106" r="22" fill={ledColor} opacity={brightness * 0.55} />
        </>
      )}
      {burned && (
        <g stroke="var(--color-danger)" strokeWidth="3">
          <path d="M326 94 L354 122" />
          <path d="M354 94 L326 122" />
        </g>
      )}
      <text x="340" y="196" textAnchor="middle" fontSize="12" fill="var(--color-ink-2)" fontFamily="var(--font-mono)">LED</text>
    </svg>
  )
}
