import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../shared/ui/Badge'
import { PageHeader } from '../../shared/ui/PageHeader'
import { SearchField } from '../../shared/ui/SearchField'
import { catalog, categories, type Category } from './catalog'

// Enlève les accents et met en minuscules : « Résistance » devient « resistance ».
function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function ComponentsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category | null>(null)

  const q = normalize(query)
  const results = catalog.filter(
    (c) =>
      (category === null || c.category === category) &&
      normalize(`${c.name} ${c.category} ${c.summary}`).includes(q),
  )

  return (
    <>
      <PageHeader title="Components" subtitle="Bibliothèque de composants électroniques." />
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <SearchField value={query} onChange={setQuery} placeholder="Rechercher un composant…" />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(category === c ? null : c)}
              aria-pressed={category === c}
              className={`h-8 rounded-md border px-3 text-sm transition-colors ${
                category === c
                  ? 'border-accent text-accent'
                  : 'border-line-strong text-ink-2 hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="text-ink-2">Aucun composant ne correspond à ta recherche.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((c) => (
            <li key={c.id}>
              <Link
                to={`/components/${c.id}`}
                className="block h-full rounded-md border border-line bg-surface p-4 transition-colors duration-150 hover:border-line-strong"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-2">
                    {c.category}
                  </span>
                  {c.specs[0] && <Badge tone="data">{c.specs[0].value.split(' ')[0]}</Badge>}
                </div>
                <h2 className="text-base font-semibold">{c.name}</h2>
                <p className="mt-1 text-ink-2">{c.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
