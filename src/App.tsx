import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar, type SectionId } from "@/components/sidebar"
import { Header } from "@/components/header"
import { OverviewTab } from "@/components/overview-tab"
import { ExperienceTab } from "@/components/experience-tab"
import { SkillsTab } from "@/components/skills-tab"
import { ProjectsTab } from "@/components/projects-tab"
import { EducationTab } from "@/components/education-tab"
import { ContactTab } from "@/components/contact-tab"
import { SmoothScroll } from "@/components/smooth-scroll"
import { AnimatedGrid } from "@/components/animated-grid"

const sections: { id: SectionId; component: React.ReactNode }[] = [
  { id: "overview", component: <OverviewTab /> },
  { id: "experience", component: <ExperienceTab /> },
  { id: "skills", component: <SkillsTab /> },
  { id: "projects", component: <ProjectsTab /> },
  { id: "education", component: <EducationTab /> },
  { id: "contact", component: <ContactTab /> },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <SmoothScroll>
      <div className="flex min-h-screen bg-gradient-to-br from-[#080c18] via-[#0a1628] to-[#0c1428]">
        <AnimatedGrid />
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col md:pl-64">
          <Header activeSection={activeSection} onMenuClick={() => setSidebarOpen(true)} />
          <main className="relative flex-1 p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {sections.find((s) => s.id === activeSection)?.component}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SmoothScroll>
  )
}
