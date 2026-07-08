import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { resumeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SpotlightCard } from "@/components/spotlight-card"

function SkillGroupCard({ group, skills, index }: { group: string; skills: { name: string; level: number }[]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <SpotlightCard>
        <Card className="h-full border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
          <CardHeader>
            <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">{group}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.12 + i * 0.06 }}
              >
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-300">{s.name}</span>
                  <span className="font-mono text-xs text-slate-500">{s.level}%</span>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.12 + i * 0.06 + 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                >
                  <Progress value={s.level} className="h-2 bg-slate-800" />
                </motion.div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </SpotlightCard>
    </motion.div>
  )
}

export function SkillsTab() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(resumeData.skills).map(([group, skills], i) => (
        <SkillGroupCard key={group} group={group} skills={skills} index={i} />
      ))}
    </div>
  )
}
