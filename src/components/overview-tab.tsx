"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { resumeData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar, BarChart, Area, AreaChart, Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart,
  Cell, Legend, CartesianGrid,
} from "recharts"
import { SpotlightCard } from "@/components/spotlight-card"

const COLORS = ["#60a5fa", "#a78bfa", "#22d3ee", "#fbbf24", "#f87171", "#34d399", "#f472b6"]
const CHART_TOOLTIP = {
  contentStyle: { background: "#0f172a", border: "1px solid #1e3a5f", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" },
  itemStyle: { color: "#e2e8f0" },
  labelStyle: { color: "#94a3b8" },
}

function AnimateIn({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right"; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const dirMap = { up: { y: 40 }, left: { x: -40 }, right: { x: 40 } }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function OverviewTab() {
  const shortSkillNames: Record<string, string> = {
    "Tableau (Desktop, Server, Prep)": "Tableau (Desktop, Server)",
    "Source-to-Pay (S2P) Process": "Source-to-Pay (S2P)",
    "Cross-Functional Collaboration": "Cross-Functional Collab.",
    "Stakeholder Management": "Stakeholder Management",
    "Procurement Analytics": "Procurement Analytics",
    "Leadership Demos & Training": "Leadership Demos & Training",
    "Supplier Onboarding & Invoicing": "Supplier Onboarding & Inv.",
    "Microsoft Excel (Advanced)": "MS Excel (Advanced)",
    "CRM Analytics (Salesforce)": "CRM Analytics (Salesforce)",
    "A/B Testing & Experimentation": "A/B Testing & Experimentation",
  }

  const allSkills = Object.values(resumeData.skills).flat().slice(0, 10)
  const skillsData = allSkills.map((s) => ({ name: shortSkillNames[s.name] ?? s.name, level: s.level }))

  const categories = Object.keys(resumeData.skills)
  const radarData = categories.map((cat) => {
    const skills = resumeData.skills[cat]
    return { category: cat, average: Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length) }
  })

  const domainData = [
    { name: "Gaming", value: 30 }, { name: "Fintech", value: 20 },
    { name: "Automation", value: 20 }, { name: "Data Viz", value: 20 }, { name: "Analytics", value: 10 },
  ]

  const careerData = [
    { year: "2016", company: "Chitkara University", role: "B.E. Computer Science", value: 20 },
    { year: "2019", company: "PlaySimple Games", role: "Business Analyst", value: 40 },
    { year: "2020", company: "Pocket52", role: "Business Operations Analyst", value: 55 },
    { year: "2021", company: "Accenture", role: "Data Engineering Analyst", value: 75 },
    { year: "2024", company: "Ernst & Young", role: "Senior Consultant", value: 95 },
  ]

  return (
    <div className="space-y-8">
      <AnimateIn>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I'm <span className="gradient-text">{resumeData.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground">{resumeData.tagline}</p>
        </div>
      </AnimateIn>



      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.08 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
      >
        {resumeData.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <SpotlightCard>
              <Card className="h-full border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="gradient-text text-2xl font-bold">{m.value}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">{m.label}</div>
                </CardContent>
              </Card>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimateIn delay={0.1}>
          <Card className="overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <CardHeader><CardTitle className="text-sm font-medium text-slate-400">Skills Proficiency</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontFamily: "monospace", fill: "#64748b" }} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" width={180} tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                    <Tooltip {...CHART_TOOLTIP} />
                    <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                      {skillsData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <Card className="overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <CardHeader><CardTitle className="text-sm font-medium text-slate-400">Career Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={careerData} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
                    <defs>
                      <linearGradient id="careerGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "monospace", fill: "#64748b" }} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip
                      {...CHART_TOOLTIP}
                      formatter={(_v: any, _n: any, props: any) => [props.payload?.role ?? "", "Role"]}
                      labelFormatter={(label: any) => `${label ?? ""}`}
                    />
                    <Area type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} fill="url(#careerGrad)" dot={(dotProps: any) => {
                      const { cx, cy, payload } = dotProps
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r={6} fill="#60a5fa" stroke="#0f172a" strokeWidth={2} />
                          <text x={cx} y={cy} dy={-14} textAnchor="middle" fill="#94a3b8" fontSize={8} fontFamily="monospace">
                            {payload.company.length > 14 ? payload.company.substring(0, 12) + '..' : payload.company}
                          </text>
                        </g>
                      )
                    }} activeDot={{ r: 8, fill: "#60a5fa", stroke: "#0f172a", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimateIn>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimateIn delay={0.3}>
          <Card className="overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <CardHeader><CardTitle className="text-sm font-medium text-slate-400">Skill Distribution by Category</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="average" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.12} strokeWidth={2} />
                    <Tooltip {...CHART_TOOLTIP} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          <Card className="overflow-hidden border-blue-900/30 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5">
            <CardHeader><CardTitle className="text-sm font-medium text-slate-400">Impact by Domain</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={domainData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="#0f172a" strokeWidth={3}>
                      {domainData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip {...CHART_TOOLTIP} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" formatter={(value) => <span style={{ color: "#94a3b8", fontSize: 12 }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.5}>
        <SpotlightCard>
          <Card className="border-l-4 border-l-blue-500 border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <CardContent className="p-6">
              <p className="text-sm leading-relaxed text-slate-400">{resumeData.summary}</p>
            </CardContent>
          </Card>
        </SpotlightCard>
      </AnimateIn>
    </div>
  )
}
