import { motion } from "framer-motion"
import { resumeData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Link, MapPin, Code2 } from "lucide-react"
import { SpotlightCard } from "@/components/spotlight-card"

const contacts = [
  { icon: <Mail size={24} />, label: "Email", value: resumeData.email, action: () => window.open(`mailto:${resumeData.email}`) },
  { icon: <Link size={24} />, label: "LinkedIn", value: resumeData.linkedin, action: () => window.open(`https://${resumeData.linkedin}`, "_blank") },
  { icon: <Code2 size={24} />, label: "GitHub", value: resumeData.github, action: () => window.open(`https://${resumeData.github}`, "_blank") },
  { icon: <MapPin size={24} />, label: "Location", value: resumeData.location },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export function ContactTab() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c, i) => (
          <motion.div key={i} variants={item} whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }} className="card-3d">
            <SpotlightCard>
              <Card
                className={`card-3d-inner border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 ${c.action ? "cursor-pointer" : ""}`}
                onClick={c.action}
                onMouseMove={(e) => {
                  if (!c.action) return
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty("--rotate-x", `${-((e.clientY - rect.top) / rect.height - 0.5) * 6}deg`)
                  e.currentTarget.style.setProperty("--rotate-y", `${((e.clientX - rect.left) / rect.width - 0.5) * 6}deg`)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty("--rotate-x", "0deg")
                  e.currentTarget.style.setProperty("--rotate-y", "0deg")
                }}
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                <motion.div
                  className="mb-2 text-blue-400"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  {c.icon}
                </motion.div>
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">{c.label}</div>
                <div className="text-sm font-medium text-slate-300">{c.value}</div>
              </CardContent>
              </Card>
            </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }
