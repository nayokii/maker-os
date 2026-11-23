import { PageHeader } from '../../shared/ui/PageHeader'
import { EnclosureTool } from './EnclosureTool'
import { TrackWidthTool } from './TrackWidthTool'

export function CircuitDesignerPage() {
  return (
    <>
      <PageHeader
        title="Circuit Designer"
        subtitle="Outils pour passer du schéma à la carte (PCB) puis au boîtier. Le dessin se fait dans KiCad."
      />
      <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
        <TrackWidthTool />
        <EnclosureTool />
      </div>
      <section className="mt-6 max-w-5xl rounded-md border border-line bg-surface p-4">
        <h2 className="mb-2 text-base font-semibold">Les logiciels à installer</h2>
        <ul className="list-disc space-y-1 pl-6 text-ink-2">
          <li><span className="text-ink">KiCad</span> : schéma et PCB, gratuit (kicad.org).</li>
          <li><span className="text-ink">Tinkercad</span> (navigateur) ou <span className="text-ink">FreeCAD</span> : modélisation du boîtier 3D, gratuits.</li>
        </ul>
        <p className="mt-3 text-xs text-ink-2">
          MAKER OS ne convertit pas tes fichiers en CAD : tu dessines dans ces logiciels, et suis les parcours de Learning pour apprendre à le faire.
        </p>
      </section>
    </>
  )
}
