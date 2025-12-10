"use client"

import { useState } from "react"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import UploadSection from "./components/UploadSection"
import ChatSection from "./components/ChatSection"
import PipelineVisualization from "./components/PipelineVisualization"
import LandingPage from "./components/LandingPage"
import { Moon, Sun } from "lucide-react"

function AppContent() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isChatProcessing, setIsChatProcessing] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [showLanding, setShowLanding] = useState(true)
  const { isDark, toggleTheme, colors } = useTheme()

  const handleFileSelect = (file) => {
    setIsProcessing(true)
    setCurrentStep(0)
  }

  const handleProcessingComplete = () => {
    setIsProcessing(false)
    setIsUploaded(true)
  }

  const handleQuerySubmit = () => {
    setIsChatProcessing(true)
    setChatStep(0)
  }

  const handleChatComplete = () => {
    setIsChatProcessing(false)
  }

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg.primary} ${colors.text.primary}`}>
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-2 rounded-lg ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-200 hover:bg-slate-300"} transition-colors`}
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
      </button>

      <div className="max-w-8xl mx-auto h-screen flex overflow-hidden">
        {/* Left Panel */}
        <div className={`w-1/2 ${colors.border} border-r flex flex-col overflow-hidden`}>
          {!isUploaded ? (
            <UploadSection onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          ) : (
            <ChatSection onQuerySubmit={handleQuerySubmit} isChatProcessing={isChatProcessing} />
          )}
        </div>

        {/* Right Panel - Pipeline Visualization */}
        <div className={`w-1/2 ${colors.bg.secondary} p-8 flex flex-col items-center justify-center overflow-y-auto`}>
          <PipelineVisualization
            isProcessing={isProcessing}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onComplete={handleProcessingComplete}
            isChatMode={isUploaded}
            isChatProcessing={isChatProcessing}
            chatStep={chatStep}
            setChatStep={setChatStep}
            onChatComplete={handleChatComplete}
          />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
