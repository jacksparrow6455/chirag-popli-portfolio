import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resumeData } from "@/lib/data"
import type { SectionId } from "@/components/sidebar"

export function Header({ activeSection, onMenuClick }: { activeSection: SectionId; onMenuClick: () => void }) {
  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-blue-900/30 bg-background/80 px-4 backdrop-blur-md sm:px-8"
    >
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden text-slate-400 hover:text-slate-200" onClick={onMenuClick}>
          <Menu size={20} />
        </Button>
        <div className="font-mono text-sm text-slate-500">
          portfolio<span className="text-blue-400">.sh</span> ~/
          <span className="text-blue-400">{activeSection}</span>
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <a href={`mailto:${resumeData.email}`}>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
            Contact
          </Button>
        </a>
      </motion.div>
    </motion.header>
  )
}
