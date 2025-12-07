

import { motion } from "framer-motion"
import { Brain, Search, GitMerge, Zap, Eye, Check } from "lucide-react"

const QUERY_STEPS = [
  {
    id: 1,
    title: "Query Analysis",
    subtitle: "LLM complexity check",
    icon: Brain,
    color: "from-indigo-600 to-purple-700",
    details: ["Analyze query type", "Determine complexity"],
  },
  {
    id: 2,
    title: "Query Embedding",
    subtitle: "Generate vector representation",
    icon: Zap,
    color: "from-pink-600 to-fuchsia-700",
    details: ["Convert to embedding"],
  },
  {
    id: 3,
    title: "Hybrid Search",
    subtitle: "BM25 + Dense search",
    icon: Search,
    color: "from-teal-500 to-emerald-600",
    details: ["BM25: Top 50", "Dense: Top 50"],
  },
  {
    id: 4,
    title: "Hybrid Fusion",
    subtitle: "Combine search results",
    icon: GitMerge,
    color: "from-amber-500 to-orange-600",
    details: ["Merge results: Top 50"],
  },
  {
    id: 5,
    title: "Re-Ranking",
    subtitle: "Cross-encoder scoring",
    icon: Eye,
    color: "from-sky-500 to-blue-600",
    details: ["ms-marco-miniLM", "Final: Top 10"],
  },
]

export default function QueryPipeline({ currentStep, isProcessing }) {
  return (
    <div className="w-full max-w-lg space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Query Processing</h3>
        <p className="text-slate-400 text-sm">Pipeline: Analysis → Embedding → Retrieval → Ranking</p>
      </motion.div>

      <div className="space-y-3">
        {QUERY_STEPS.map((step, idx) => {
          const isActive = idx === currentStep
          const isCompleted = idx < currentStep
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {idx < QUERY_STEPS.length - 1 && (
                <motion.div
                  className="absolute left-6 top-12 w-0.5 h-10 bg-gradient-to-b from-slate-600 to-slate-700"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Step Card */}
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : isCompleted ? 1 : 0.95,
                  boxShadow: isActive
                    ? `0 0 20px rgba(${idx === 0 ? "249, 115, 22" : idx === 1 ? "236, 72, 153" : idx === 2 ? "59, 130, 246" : idx === 3 ? "34, 211, 238" : "16, 185, 129"}, 0.5)`
                    : isCompleted
                      ? `0 0 10px rgba(16, 185, 129, 0.3)`
                      : "none",
                }}
                className={`p-3 rounded-xl border-2 transition-all ${
                  isActive
                    ? `border-blue-400 bg-gradient-to-r ${step.color} bg-opacity-30`
                    : isCompleted
                      ? "border-green-500 bg-green-500/20"
                      : "border-slate-700 bg-slate-700/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon Container */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 1.2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${step.color} relative`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}

                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                        className={`absolute inset-0 rounded-lg border-2 border-blue-400`}
                      />
                    )}
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1 pt-0.5">
                    <motion.h4
                      animate={{
                        color: isActive ? "#ffffff" : isCompleted ? "#86efac" : "#e2e8f0",
                      }}
                      className="font-bold text-sm"
                    >
                      {step.title}
                    </motion.h4>
                    <p className="text-slate-300 text-xs mt-0.5">{step.subtitle}</p>

                    {/* Details */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 space-y-1"
                      >
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-xs text-cyan-300 flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                            />
                            {detail}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Progress Bar */}
                    {isActive && (
                      <motion.div className="mt-2 h-0.5 bg-slate-600 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "0%", "100%"] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="h-full w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Stats */}
      {currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 space-y-3"
        >
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Processing</span>
            <span className="text-green-400 font-semibold">{Math.round((currentStep / 5) * 100)}%</span>
          </div>
          <motion.div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(currentStep / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-green-500 to-green-600"
            />
          </motion.div>
          <div className="text-xs text-slate-400 pt-2">
            Step {currentStep} of {QUERY_STEPS.length}
          </div>
        </motion.div>
      )}
    </div>
  )
}
