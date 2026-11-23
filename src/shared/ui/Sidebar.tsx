import { NavLink } from 'react-router-dom'
import { modules, type AppModule } from '../../app/modules'

const linkBase =
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150 hover:bg-surface-2 hover:text-ink'

function ModuleLink({ module }: { module: AppModule }) {
  return (
    <NavLink
      to={module.path}
      end={module.path === '/'}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? 'bg-surface-2 text-accent' : 'text-ink-2'}`
      }
    >
      <span className="h-3.5 w-3.5 shrink-0 rounded-sm border-[1.5px] border-current" />
      {module.label}
      {!module.ready && <span className="ml-auto font-mono text-xs text-ink-2">bientôt</span>}
    </NavLink>
  )
}

export function Sidebar() {
  // On regroupe les modules par famille (Conception, Exécution, Progression).
  const groups = Array.from(new Set(modules.map((m) => m.group)))

  return (
    <nav
      aria-label="Navigation principale"
      className="flex w-60 shrink-0 flex-col gap-1 border-r border-line bg-surface p-3"
    >
      <div className="mb-2 border-b border-line px-3 pb-3 pt-2 font-semibold tracking-wide">
        MAKER <span className="text-accent">OS</span>
      </div>
      {groups.map((group) => (
        <div key={group ?? 'root'} className="flex flex-col gap-0.5">
          {group && (
            <div className="px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-wider text-ink-2">
              {group}
            </div>
          )}
          {modules
            .filter((m) => m.group === group)
            .map((m) => (
              <ModuleLink key={m.path} module={m} />
            ))}
        </div>
      ))}
    </nav>
  )
}
