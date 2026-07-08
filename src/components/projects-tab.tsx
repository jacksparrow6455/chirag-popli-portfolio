"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { resumeData } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SpotlightCard } from "@/components/spotlight-card"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export function ProjectsTab() {
  const allTech = [...new Set(resumeData.projects.flatMap((p) => p.tech))]
  const [filter, setFilter] = useState<string>("all")
  const filtered = filter === "all" ? resumeData.projects : resumeData.projects.filter((p) => p.tech.includes(filter))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="rounded-full transition-all duration-200"
        >
          All
        </Button>
        {allTech.map((t) => (
          <Button
            key={t}
            variant={filter === t ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(t)}
            className="rounded-full transition-all duration-200"
          >
            {t}
          </Button>
        ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" key={filter} className="grid gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <motion.div key={p.title} variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="card-3d">
            <SpotlightCard>
              <Card
                className="card-3d-inner h-full overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
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
                  <div className="mb-2 text-lg font-bold text-slate-200">{p.title}</div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <div className="mb-4 rounded-md border-l-4 border-l-emerald-500 bg-emerald-500/10 px-3 py-2 font-mono text-xs text-emerald-400">
                    Impact: {p.impact}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="font-mono text-[10px] border-blue-900/50 bg-blue-500/10 text-blue-400">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
