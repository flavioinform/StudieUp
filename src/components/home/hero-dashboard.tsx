import { motion } from "framer-motion"
import { BookOpen, ListChecks, Bell, BarChart2, CheckCircle2 } from "lucide-react"

// Inline icon (no import needed behavior preserved)
function LayoutDashboardIcon({ className }: { className?: string }) {
  return <BookOpen className={className} />
}

const HeroDashboard = () => {
  const tasks = [
    { label: "Entrega Cálculo II", date: "Hoy 23:59", done: false, pct: 65 },
    { label: "Parcial Historia", date: "Mañana", done: false, pct: 40 },
    { label: "TP Física", date: "Vie", done: true, pct: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      className="relative w-full max-w-lg mx-auto lg:mx-0 select-none"
    >
      {/* Glow */}
      <div className="absolute -inset-6 rounded-3xl bg-purple-500/8 blur-3xl pointer-events-none" />

      {/* Window */}
      <div className="relative rounded-2xl border border-slate-700/50 bg-[#0F172A] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Titlebar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-[#1E293B] border-b border-slate-700/40">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[11px] text-slate-500 font-mono tracking-wide">
            studieup.app/dashboard
          </span>
        </div>

        <div className="flex min-h-[280px]">
          {/* Sidebar */}
          <div className="w-14 border-r border-slate-700/30 flex flex-col items-center gap-3 pt-5">
            {[
              { Icon: LayoutDashboardIcon, active: true },
              { Icon: ListChecks, active: false },
              { Icon: Bell, active: false },
              { Icon: BarChart2, active: false },
            ].map(({ Icon, active }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                className={`p-2 rounded-lg transition-colors ${active
                  ? "bg-[#9333EA] text-white"
                  : "text-slate-600 hover:text-slate-400"
                  }`}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-5 space-y-4">
            {/* Title row */}
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white">Mis Tareas</span>
              <span className="text-[11px] font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                3 pendientes
              </span>
            </div>

            {/* Task list */}
            <div className="space-y-2">
              {tasks.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-lg bg-[#1E293B] border border-slate-700/30 px-3 py-2.5"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${t.done ? "text-[#9333EA]" : "text-slate-700"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium truncate ${t.done
                        ? "line-through text-slate-600"
                        : "text-slate-100"
                        }`}
                    >
                      {t.label}
                    </p>
                    <div className="mt-1.5 h-1 rounded-full bg-slate-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${t.pct}%` }}
                        transition={{ delay: 0.85 + i * 0.1, duration: 0.7 }}
                        className="h-full rounded-full bg-[#9333EA]"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 shrink-0">
                    {t.date}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Promedio", val: "8.4" },
                { label: "Racha activa", val: "12d 🔥" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + i * 0.08, duration: 0.4 }}
                  className="bg-[#1E293B] border border-slate-700/30 rounded-lg px-3 py-2"
                >
                  <p className="text-[10px] text-slate-600">{s.label}</p>
                  <p className="text-sm font-bold text-white">{s.val}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroDashboard