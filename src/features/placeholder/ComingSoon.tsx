import { PageHeader } from '../../shared/ui/PageHeader'

export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} subtitle="Ce module arrive dans une prochaine étape." />
      <p className="max-w-prose rounded-md border border-line bg-surface p-4 text-ink-2">
        Il n'est pas dans le MVP : on le construit après Components, Projects et Learning.
      </p>
    </>
  )
}
