import { useState } from 'react'
import { PageHeader } from '../../shared/ui/PageHeader'
import { CircuitLab } from './CircuitLab'
import { WokwiPanel } from './WokwiPanel'

type Tab = 'lab' | 'wokwi'

const tabs: { id: Tab; label: string }[] = [
  { id: 'lab', label: 'Circuit Lab' },
  { id: 'wokwi', label: 'Wokwi' },
]

export function SimulatorPage() {
  const [tab, setTab] = useState<Tab>('lab')
  return (
    <>
      <PageHeader title="Simulator" subtitle="Expérimente sans matériel : un labo intégré, et Wokwi pour Arduino et ESP32." />
      <div role="tablist" aria-label="Simulateurs" className="mb-6 flex gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm transition-colors ${tab === t.id ? 'border-accent text-accent' : 'border-transparent text-ink-2 hover:text-ink'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'lab' ? <CircuitLab /> : <WokwiPanel />}
    </>
  )
}
