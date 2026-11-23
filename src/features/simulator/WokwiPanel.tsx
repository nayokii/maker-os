import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { db } from '../../shared/db/db'

// On n'accepte que les liens de projets Wokwi : https://wokwi.com/projects/<numéro>
function parseWokwiUrl(text: string): string | null {
  try {
    const url = new URL(text.trim())
    const ok = url.protocol === 'https:' && url.hostname === 'wokwi.com' && /^\/projects\/\d+\/?$/.test(url.pathname)
    return ok ? `https://wokwi.com${url.pathname.replace(/\/$/, '')}` : null
  } catch {
    return null
  }
}

export function WokwiPanel() {
  const links = useLiveQuery(() => db.wokwiLinks.orderBy('addedAt').reverse().toArray(), [])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [embedded, setEmbedded] = useState<string | null>(null)

  async function add() {
    const clean = parseWokwiUrl(url)
    if (!clean) {
      setError('Colle le lien d\'un projet Wokwi, de la forme https://wokwi.com/projects/123456789')
      return
    }
    setError(null)
    await db.wokwiLinks.put({ url: clean, title: title.trim() || clean, addedAt: new Date().toISOString() })
    setUrl('')
    setTitle('')
  }

  return (
    <div className="max-w-3xl">
      <section className="rounded-md border border-line bg-surface p-4">
        <h2 className="mb-2 text-base font-semibold">Wokwi : simulateur Arduino et ESP32</h2>
        <p className="text-ink-2">
          Wokwi simule la carte, le code C++ et les composants dans ton navigateur, sans matériel. Crée un projet,
          puis colle ici son lien pour le garder dans MAKER OS.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-hover" href="https://wokwi.com/projects/new/arduino-uno" target="_blank" rel="noopener noreferrer">
            Nouveau projet Arduino Uno ↗
          </a>
          <a className="rounded-md border border-line-strong px-4 py-2 text-sm hover:bg-surface-2" href="https://wokwi.com/projects/new/esp32" target="_blank" rel="noopener noreferrer">
            Nouveau projet ESP32 ↗
          </a>
        </div>
      </section>

      <section className="mt-6 rounded-md border border-line bg-surface p-4">
        <h2 className="mb-3 text-base font-semibold">Enregistrer un projet</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nom (ex. LED qui clignote)" aria-label="Nom du projet" className="h-9 rounded-md border border-line-strong bg-surface-2 px-3 text-sm outline-none placeholder:text-ink-2" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://wokwi.com/projects/…" aria-label="Lien du projet Wokwi" className="h-9 rounded-md border border-line-strong bg-surface-2 px-3 font-mono text-[13px] outline-none placeholder:text-ink-2" />
          <button onClick={add} className="h-9 rounded-md bg-accent px-4 text-sm font-medium text-bg hover:bg-accent-hover">Ajouter</button>
        </div>
        {error && <p className="mt-2 text-warning">▲ {error}</p>}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-semibold">Mes projets Wokwi</h2>
        {links && links.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.url} className="flex flex-wrap items-center gap-3 rounded-md border border-line bg-surface p-3">
                <span className="flex-1">
                  <span className="block font-medium">{l.title}</span>
                  <span className="block font-mono text-xs text-ink-2">{l.url}</span>
                </span>
                <a className="text-accent hover:text-accent-hover" href={l.url} target="_blank" rel="noopener noreferrer">Ouvrir ↗</a>
                <button className="text-ink-2 hover:text-ink" onClick={() => setEmbedded(embedded === l.url ? null : l.url)}>
                  {embedded === l.url ? 'Masquer' : 'Essayer l\'intégration'}
                </button>
                <button className="text-ink-2 hover:text-danger" onClick={() => db.wokwiLinks.delete(l.url)} aria-label={`Retirer ${l.title}`}>
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-2">Aucun projet enregistré pour l'instant.</p>
        )}
        {embedded && (
          <div className="mt-4">
            <p className="mb-2 text-xs text-ink-2">
              Intégration expérimentale : si le cadre reste vide, Wokwi refuse l'affichage dans une autre page. Utilise alors « Ouvrir ».
            </p>
            <iframe title="Projet Wokwi" src={embedded} className="h-[520px] w-full rounded-md border border-line bg-surface" referrerPolicy="no-referrer" />
          </div>
        )}
      </section>
    </div>
  )
}
