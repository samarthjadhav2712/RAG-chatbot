
import { useEffect } from "react"
import UploadPipeline from "./pipelines/UploadPipeline"
import QueryPipeline from "./pipelines/QueryPipeline"

export default function PipelineVisualization({
  isProcessing,
  currentStep,
  setCurrentStep,
  onComplete,
  isChatMode,
  isChatProcessing,
  chatStep,
  setChatStep,
  onChatComplete,
}) {
  // Upload pipeline timer
  useEffect(() => {
    if (!isProcessing) return

    const stepsCount = 4
    const stepDuration = 2000 // 4 steps = 5 seconds total

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next >= stepsCount) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return stepsCount
        }
        return next
      })
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isProcessing, setCurrentStep, onComplete])

  // Chat pipeline timer
  useEffect(() => {
    if (!isChatProcessing) return

    const stepsCount = 5
    const stepDuration = 2000 // 5 steps = 5 seconds total

    const interval = setInterval(() => {
      setChatStep((prev) => {
        const next = prev + 1
        if (next >= stepsCount) {
          clearInterval(interval)
          setTimeout(onChatComplete, 300)
          return stepsCount
        }
        return next
      })
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isChatProcessing, setChatStep, onChatComplete])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!isChatMode ? (
        <UploadPipeline currentStep={currentStep} isProcessing={isProcessing} />
      ) : (
        <QueryPipeline currentStep={chatStep} isProcessing={isChatProcessing} />
      )}
    </div>
  )
}
