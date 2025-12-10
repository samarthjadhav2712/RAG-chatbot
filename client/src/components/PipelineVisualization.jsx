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
