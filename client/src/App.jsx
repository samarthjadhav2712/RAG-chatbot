"use client"

import { useState } from "react"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import UploadSection from "./components/UploadSection"
import ChatSection from "./components/ChatSection"
import PipelineVisualization from "./components/PipelineVisualization"
import LandingPage from "./components/LandingPage"
import { Moon, Sun } from "lucide-react"
import { uploadFile } from "./api/uploadApi"

function AppContent() {
  const [isUploaded, setIsUploaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isChatProcessing, setIsChatProcessing] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [showLanding, setShowLanding] = useState(true)
  const { isDark, toggleTheme, colors } = useTheme()
  const [documentId, setDocumentId] = useState(null)

  // --- MODIFIED HANDLER TO INCLUDE API CALL ---
const handleFileSelect = async (file) => {
    // 1. Start processing & visualization
    setIsProcessing(true);
    setCurrentStep(0);

    const UPLOAD_STEPS_TO_CYCLE = 3; // Cycle through Extract, Chunking, Embedding (Steps 1-3)
    const FINAL_STEP = 4;            // Step 4 is final (Store in Vector DB)

    // 2. Start visualization interval: CYCLE steps 0, 1, 2, 3...
    const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
            // Cycle back to 0 when reaching the step BEFORE the maximum cycle step
            if (prev < UPLOAD_STEPS_TO_CYCLE - 1) {
                return prev + 1;
            } else {
                // Stick at the last cycling step (Step 3: Generate Embeddings)
                return UPLOAD_STEPS_TO_CYCLE - 1; 
            }
        });
    }, 1000); // Using 1 second for visual consistency

    // 3. Perform the actual API upload
    const response = await uploadFile(file);

    // 4. Stop visualization interval
    clearInterval(stepInterval); 
    setIsProcessing(false); // Stop loading spinner/animations

    // 5. Handle the API response
    if (response.success) {
        // Successful completion: Jump to the final step
        setCurrentStep(FINAL_STEP); // SET currentStep to 4 (Completion)
        
        const newDocumentId = response.result?.document_id || 'DEFAULT_DOC_ID';
        setDocumentId(newDocumentId);
        setIsUploaded(true); // Switch to Chat View
    } else {
        // Handle upload failure: Stop visualization and reset, or keep it at the last non-committal step
        setCurrentStep(0); // Reset the visualization to the start
        alert(`Upload Failed: ${response.error}`);
        setIsUploaded(false); 
    }
};

  const handleProcessingComplete = () => {
    setIsProcessing(false)
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
            // Pass documentId to ChatSection for API calls
            <ChatSection documentId={documentId}  onQuerySubmit={handleQuerySubmit} onChatComplete={handleChatComplete}  isChatProcessing={isChatProcessing} setChatStep={setChatStep}  chatStep={chatStep}/> 
          )}
        </div>

        {/* Right Panel - Pipeline Visualization */}
        <div className={`w-1/2 ${colors.bg.secondary} p-8 flex flex-col items-center justify-center overflow-y-auto`}>
          <PipelineVisualization
            isProcessing={isProcessing}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onComplete={handleProcessingComplete} // Keep this for visual completion logic
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
