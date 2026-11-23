import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../shared/ui/AppLayout'
import { ComponentsPage } from '../features/components/ComponentsPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { ComingSoon } from '../features/placeholder/ComingSoon'
import { LearningPage } from '../features/learning/LearningPage'
import { LessonPage } from '../features/learning/LessonPage'
import { ProjectsPage } from '../features/projects/ProjectsPage'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="learning/:lessonId" element={<LessonPage />} />
        <Route path="circuit-designer" element={<ComingSoon title="Circuit Designer" />} />
        <Route path="simulator" element={<ComingSoon title="Simulator" />} />
        <Route path="firmware-studio" element={<ComingSoon title="Firmware Studio" />} />
      </Route>
    </Routes>
  )
}
