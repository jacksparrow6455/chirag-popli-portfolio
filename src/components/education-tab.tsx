import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { resumeData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { SpotlightCard } from "@/components/spotlight-card"

function EduItem({ edu, index, isLast }: { edu: typeof resumeData.education[0]; index: number; isLast: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
      className="relative pl-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.2 }}
        className="absolute left-2.5 top-3 h-3 w-3 rounded-full border-2 border-blue-500 bg-background"
      />
      {!isLast && <div className="absolute bottom-0 left-[11px] top-6 w-0.5 bg-blue-900/50" />}
      <SpotlightCard>
        <Card className="border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
          <CardContent className="p-5">
            <div className="font-semibold text-slate-200">{edu.degree}</div>
            <div className="text-sm text-slate-400">{edu.school}</div>
            <div className="mt-1 flex gap-4 font-mono text-xs text-slate-500">
              <span>{edu.period}</span>
              <span className="text-emerald-400">{edu.grade}</span>
            </div>
          </CardContent>
        </Card>
      </SpotlightCard>
    </motion.div>
  )
}

export function EducationTab() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {resumeData.education.map((edu, i) => (
          <EduItem key={i} edu={edu} index={i} isLast={i === resumeData.education.length - 1} />
        ))}
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-slate-400">Certifications</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {resumeData.certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <SpotlightCard>
                <Card className="border-blue-900/30 transition-all duration-300 hover:border-amber-500/50 hover:shadow-md hover:shadow-amber-500/5">
                  <CardContent className="flex items-center gap-3 p-4">
                  <motion.div
                    animate={inView ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <Award size={20} className="shrink-0 text-amber-400" />
                  </motion.div>
                  <span className="text-sm text-slate-400">{cert}</span>
                </CardContent>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
