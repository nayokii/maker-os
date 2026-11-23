// Liste unique des modules de l'application : la sidebar et les routes la lisent.
export type ModuleGroup = 'Conception' | 'Exécution' | 'Progression'

export interface AppModule {
  path: string
  label: string
  group: ModuleGroup | null
  ready: boolean // false = module pas encore développé (page "à venir")
}

export const modules: AppModule[] = [
  { path: '/', label: 'Dashboard', group: null, ready: true },
  { path: '/components', label: 'Components', group: 'Conception', ready: true },
  { path: '/projects', label: 'Projects', group: 'Conception', ready: true },
  { path: '/circuit-designer', label: 'Circuit Designer', group: 'Conception', ready: true },
  { path: '/simulator', label: 'Simulator', group: 'Exécution', ready: true },
  { path: '/firmware-studio', label: 'Firmware Studio', group: 'Exécution', ready: false },
  { path: '/learning', label: 'Learning', group: 'Progression', ready: true },
]
