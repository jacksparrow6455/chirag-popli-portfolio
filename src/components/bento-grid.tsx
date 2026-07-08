import type { ReactNode } from "react"

interface BentoItem {
  id: string
  content: ReactNode
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

export function BentoGrid({ items, className = "" }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm ${
            item.colSpan === 2 ? "md:col-span-2" : ""
          } ${item.colSpan === 3 ? "md:col-span-3" : ""} ${item.rowSpan === 2 ? "md:row-span-2" : ""} ${
            item.className ?? ""
          }`}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
