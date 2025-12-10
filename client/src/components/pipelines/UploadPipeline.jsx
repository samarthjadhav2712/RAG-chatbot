"use client"

import { motion } from "framer-motion"
import { FileText, Zap, Cpu, Database, Check } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

const UPLOAD_STEPS = [
  {
    id: 1,
    title: "Extract Text/Tables",
    subtitle: "Parsing PDF content",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    accentColor: "text-blue-400",
  },
  {
    id: 2,
    title: "Semantic Chunking",
    subtitle: "Splitting into chunks",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
    accentColor: "text-purple-400",
  },
  {
    id: 3,
    title: "Generate Embeddings",
    subtitle: "Using MPNet model",
    icon: Cpu,
    color: "from-cyan-500 to-cyan-600",
    accentColor: "text-cyan-400",
  },
  {
    id: 4,
    title: "Store in Vector DB",
    subtitle: "FAISS/Qdrant",
    icon: Database,
    color: "from-green-500 to-green-600",
    accentColor: "text-green-400",
  },
]

export default function UploadPipeline({ currentStep, isProcessing }) {
  const { isDark, colors } = useTheme()

  return (
    <div className="w-full max-w-lg space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h3 className={`text-2xl font-bold ${colors.text.primary} mb-2`}>Document Processing</h3>
        <p className={colors.text.secondary}>Pipeline: Text Extraction → Embedding → Storage</p>
      </motion.div>

      <div className="space-y-4">
        {UPLOAD_STEPS.map((step, idx) => {
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
              {idx < UPLOAD_STEPS.length - 1 && (
                <motion.div
                  className={`absolute left-6 top-14 w-0.5 h-12 bg-gradient-to-b ${isDark ? "from-slate-600 to-slate-700" : "from-slate-300 to-slate-400"}`}
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
                    ? `0 0 20px rgba(59, 130, 246, 0.5)`
                    : isCompleted
                      ? `0 0 10px rgba(16, 185, 129, 0.3)`
                      : "none",
                }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? isDark
                      ? `border-blue-500 bg-gradient-to-r ${step.color} bg-opacity-30`
                      : `border-blue-400 bg-blue-100`
                    : isCompleted
                      ? isDark
                        ? "border-green-500 bg-green-500/20"
                        : "border-green-400 bg-green-100"
                      : isDark
                        ? "border-slate-700 bg-slate-700/40"
                        : "border-slate-300 bg-slate-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${step.color} relative`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg"
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    )}

                    {/* Pulse effect for active */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 rounded-lg border-2 border-blue-400"
                      />
                    )}
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1 pt-1">
                    <motion.h4
                      animate={{
                        color: isActive
                          ? isDark
                            ? "#ffffff"
                            : "#1e40af"
                          : isCompleted
                            ? "#86efac"
                            : isDark
                              ? "#e2e8f0"
                              : "#475569",
                      }}
                      className="font-bold text-base"
                    >
                      {step.title}
                    </motion.h4>
                    <p className={`${isDark ? "text-slate-300" : "text-slate-600"} text-xs mt-1`}>{step.subtitle}</p>

                    {/* Progress Bar */}
                    {isActive && (
                      <motion.div
                        className={`mt-3 h-1 rounded-full overflow-hidden ${isDark ? "bg-slate-600" : "bg-slate-300"}`}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "0%", "100%"] }}
                          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
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

      {currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-4 rounded-lg ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-200 border-slate-300"} border space-y-2`}
        >
          <div className="flex justify-between text-sm">
            <span className={isDark ? "text-slate-400" : "text-slate-600"}>Completion</span>
            <span className={isDark ? "text-blue-400" : "text-blue-600"} style={{ fontWeight: 600 }}>
              {Math.round((currentStep / 4) * 100)}%
            </span>
          </div>
          <motion.div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-400"}`}>
            <motion.div
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
