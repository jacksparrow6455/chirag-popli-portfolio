import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { resumeData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/spotlight-card"

function ExpCard({ exp, index }: { exp: typeof resumeData.experience[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className="card-3d"
    >
      <SpotlightCard>
        <Card
          className="card-3d-inner overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty("--rotate-x", `${-((e.clientY - rect.top) / rect.height - 0.5) * 8}deg`)
            e.currentTarget.style.setProperty("--rotate-y", `${((e.clientX - rect.left) / rect.width - 0.5) * 8}deg`)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty("--rotate-x", "0deg")
            e.currentTarget.style.setProperty("--rotate-y", "0deg")
          }}
        >
          <CardContent className="p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <div className="text-lg font-bold text-slate-200">{exp.role}</div>
              <div className="font-semibold text-blue-400">{exp.company}</div>
              {exp.client && <div className="mt-0.5 font-mono text-xs text-slate-500">Client: {exp.client}</div>}
            </div>
            <div className="shrink-0 font-mono text-xs text-slate-500">{exp.period}</div>
          </div>
          <ul className="my-4 space-y-2">
            {exp.achievements.map((a, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.15 + j * 0.05 }}
                className="relative pl-5 text-sm text-slate-400"
              >
                <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                {a}
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
            className="flex flex-wrap gap-1.5"
          >
            {exp.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[10px] border-blue-900/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                {t}
              </Badge>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      </SpotlightCard>
    </motion.div>
  )
}

export function ExperienceTab() {
  return (
    <div className="space-y-6">
      {resumeData.experience.map((exp, i) => (
        <ExpCard key={i} exp={exp} index={i} />
      ))}
    </div>
  )
}
