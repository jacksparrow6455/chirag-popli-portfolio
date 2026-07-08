import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { resumeData } from "@/lib/data"
import { cn } from "@/lib/utils"
import { BarChart3, Briefcase, Wrench, Rocket, GraduationCap, Mail, X } from "lucide-react"

export type SectionId = "overview" | "experience" | "skills" | "projects" | "education" | "contact"

const navItems: { id: SectionId; icon: React.ReactNode; label: string }[] = [
  { id: "overview", icon: <BarChart3 size={18} />, label: "Overview" },
  { id: "experience", icon: <Briefcase size={18} />, label: "Experience" },
  { id: "skills", icon: <Wrench size={18} />, label: "Skills" },
  { id: "projects", icon: <Rocket size={18} />, label: "Projects" },
  { id: "education", icon: <GraduationCap size={18} />, label: "Education" },
  { id: "contact", icon: <Mail size={18} />, label: "Contact" },
]

export function Sidebar({ activeSection, onNavigate, isOpen, onClose }: {
  activeSection: SectionId; onNavigate: (id: SectionId) => void; isOpen: boolean; onClose: () => void
}) {
  const initials = resumeData.name.split(" ").map((n) => n[0]).join("")

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r border-blue-900/30 bg-sidebar text-sidebar-foreground transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0 shadow-2xl shadow-blue-500/10" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="relative flex flex-col items-center gap-2 border-b border-blue-900/30 p-6">
          <button onClick={onClose} className="absolute right-3 top-3 rounded-md p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-300 md:hidden">
            <X size={18} />
          </button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <Avatar className="h-16 w-16 ring-2 ring-blue-500/30 ring-offset-2 ring-offset-sidebar">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="text-center">
            <div className="font-semibold text-slate-200">{resumeData.name}</div>
            <div className="text-xs text-slate-500">{resumeData.title}</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <div className="mb-2 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-slate-600">
            Navigation
          </div>
          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              onClick={() => { onNavigate(item.id); onClose() }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                activeSection === item.id
                  ? "bg-blue-500/10 font-medium text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              {item.icon}
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="border-t border-blue-900/30 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"
            />
            Available for opportunities
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}
