

import { useState } from "react"
import UploadSection from "./components/UploadSection"
import ChatSection from "./components/ChatSection"
import PipelineVisualization from "./components/PipelineVisualization"
import LandingPage from "./components/LandingPage"

export default function App() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isChatProcessing, setIsChatProcessing] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [showLanding, setShowLanding] = useState(true)

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="max-w-8xl mx-auto h-screen flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 border-r border-slate-700 flex flex-col overflow-hidden">
          {!isUploaded ? (
            <UploadSection onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          ) : (
            <ChatSection onQuerySubmit={handleQuerySubmit} isChatProcessing={isChatProcessing} />
          )}
        </div>

        {/* Right Panel - Pipeline Visualization */}
        <div className="w-1/2 bg-slate-900/50 p-8 flex flex-col items-center justify-center overflow-y-auto">
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
