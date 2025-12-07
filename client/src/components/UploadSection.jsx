
import { motion } from "framer-motion"
import { Upload, FileText, Zap } from "lucide-react"
import { useState } from "react"

export default function UploadSection({ onFileSelect, isProcessing }) {
  const [fileName, setFileName] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">RAG Chatbot</h1>
        </div>
        <p className="text-slate-400 text-sm">Upload your documents to get started</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-md p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-500/10 scale-105"
            : "border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800"
        }`}
      >
        <label className="cursor-pointer block">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
            >
              <Upload className="w-8 h-8 text-blue-400" />
            </motion.div>
            <div className="text-center">
              <p className="text-white font-semibold">{fileName ? fileName : "Drag PDF here"}</p>
              <p className="text-slate-400 text-sm mt-1">{fileName ? "Ready to process" : "or click to select"}</p>
            </div>
          </div>
          <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" disabled={isProcessing} />
        </label>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md mt-8 space-y-3"
      >
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 flex gap-3">
          <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-slate-200">Fast Processing</p>
            <p className="text-xs text-slate-400">4-5 seconds per document</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 flex gap-3">
          <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-slate-200">Smart Retrieval</p>
            <p className="text-xs text-slate-400">Semantic + keyword search</p>
          </div>
        </div>
      </motion.div>

      {/* Status */}
      {isProcessing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ delay: i * 0.15, duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 rounded-full bg-blue-500"
                />
              ))}
            </div>
            <span className="text-sm text-slate-400">Processing document...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
