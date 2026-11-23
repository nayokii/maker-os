import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

// Cadre commun : la sidebar à gauche, la page courante à droite (<Outlet />).
export function AppLayout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
