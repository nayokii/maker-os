interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6 border-b border-line pb-4">
      <h1 className="text-[32px] font-semibold leading-10">{title}</h1>
      {subtitle && <p className="mt-1 text-ink-2">{subtitle}</p>}
    </header>
  )
}
