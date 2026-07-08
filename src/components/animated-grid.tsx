export function AnimatedGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "grid-bg 15s linear infinite",
        }}
      />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute top-3/4 left-1/2 h-64 w-64 rounded-full bg-purple-500/4 blur-[100px]" />
    </div>
  )
}
