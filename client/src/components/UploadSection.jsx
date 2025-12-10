"use client"

import { motion } from "framer-motion"
import { Upload, FileText, Zap } from "lucide-react"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

export default function UploadSection({ onFileSelect, isProcessing }) { 
  const [fileName, setFileName] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState(null) 
  const { isDark, colors } = useTheme()

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFile = (file) => {
    setUploadError(null); 
    if (isProcessing) return; 

    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileSelect(file); 
    } else if (file) {
      setUploadError("Only PDF files are supported.")
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  // --- File Input Handler ---
  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
    e.target.value = null
  }

  // Determine Tailwind classes for the drop zone (remains the same)
  const dropzoneStyle = isDragging
    ? isDark
      ? "border-blue-500 bg-blue-500/10 scale-105"
      : "border-blue-600 bg-blue-100 scale-105"
    : isDark
      ? "border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800"
      : "border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200"

  const isDisabled = isProcessing

  return (
    <div className={`flex-1 flex flex-col items-center justify-center p-8 ${colors.text.primary}`}>
      {/* Header (remains the same) */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.accent} flex items-center justify-center`}>
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className={`text-3xl font-bold ${colors.text.primary}`}>RAG Chatbot</h1>
        </div>
        <p className={colors.text.secondary}>Upload your documents to get started</p>
      </motion.div>

      {/* Upload Area (remains the same) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-md p-8 rounded-2xl border-2 border-dashed transition-all ${
          isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        } ${dropzoneStyle}`}
      >
        <label className={`block ${isDisabled ? "pointer-events-none" : "cursor-pointer"}`}>
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              className={`w-16 h-16 rounded-full ${isDark ? "bg-blue-500/20" : "bg-blue-200"} flex items-center justify-center`}
            >
              <Upload className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            </motion.div>
            <div className="text-center">
              <p className={`font-semibold ${colors.text.primary}`}>
                {fileName ? fileName : "Drag PDF here"}
              </p>
              <p className={`${colors.text.secondary} text-sm mt-1`}>
                {fileName ? "Processing document" : "or click to select"}
              </p>
            </div>
          </div>
          <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" disabled={isDisabled} />
        </label>
      </motion.div>

      {/* Upload Error Display (remains the same) */}
      {uploadError && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-500 font-medium max-w-md text-center"
        >
          🚨 {uploadError}
        </motion.p>
      )}

      {/* Info Cards (remains the same) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md mt-8 space-y-3"
      >
        <div
          className={`p-4 rounded-lg ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-200 border-slate-300"} ${colors.border} border flex gap-3`}
        >
          <Zap className={`w-5 h-5 ${isDark ? "text-yellow-400" : "text-yellow-600"} flex-shrink-0 mt-0.5`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>Fast Processing</p>
            <p className={`text-xs ${colors.text.secondary}`}>4-5 seconds per document</p>
          </div>
        </div>
        <div
          className={`p-4 rounded-lg ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-200 border-slate-300"} ${colors.border} border flex gap-3`}
        >
          <Zap className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-cyan-600"} flex-shrink-0 mt-0.5`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>Smart Retrieval</p>
            <p className={`text-xs ${colors.text.secondary}`}>Semantic + keyword search</p>
          </div>
        </div>
      </motion.div>

      {/* Status (Loading Animation) */}
      {isProcessing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ delay: i * 0.15, duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className={`w-2 h-2 rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
                />
              ))}
            </div>
            <span className={`text-sm ${colors.text.secondary}`}>Processing document...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}