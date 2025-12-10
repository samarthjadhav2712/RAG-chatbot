"use client"

import { motion } from "framer-motion"
import { Send, MessageCircle } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"

export default function ChatSection({ onQuerySubmit, isChatProcessing }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Document processed successfully! Ask me anything about it.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const { isDark, colors } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isChatProcessing) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    onQuerySubmit()

    // Simulate response after processing
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "assistant",
          text: "This is a sample response based on your query and the retrieved context from the document.",
          timestamp: new Date(),
        },
      ])
    }, 5000)
  }

  return (
    <div className={`flex flex-col h-full ${colors.text.primary}`}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-6 ${colors.border} border-b`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`font-semibold ${colors.text.primary}`}>Chat with Document</h2>
            <p className={`text-xs ${colors.text.secondary}`}>Smart retrieval enabled</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-6 space-y-4 ${isDark ? "bg-slate-900/50" : "bg-slate-50"}`}>
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                msg.type === "user"
                  ? isDark
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-blue-500 text-white rounded-br-none"
                  : isDark
                    ? "bg-slate-700 text-slate-100 rounded-bl-none"
                    : "bg-slate-300 text-slate-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </motion.div>
        ))}
        {isChatProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div
              className={`w-8 h-8 rounded-full ${isDark ? "bg-slate-700" : "bg-slate-300"} flex items-center justify-center`}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ delay: i * 0.15, duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-slate-400" : "bg-slate-600"}`}
                  />
                ))}
              </div>
            </div>
            <div className={`text-xs ${colors.text.secondary} self-center`}>Processing query...</div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-6 ${colors.border} border-t`}>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isChatProcessing}
            placeholder="Ask a question about your document..."
            className={`flex-1 rounded-lg px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 ${
              isDark
                ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                : "bg-slate-200 border-slate-300 text-slate-900 placeholder-slate-600 focus:border-blue-500 focus:ring-blue-500"
            } border`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isChatProcessing}
            className={`px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors disabled:cursor-not-allowed ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700"
                : "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400"
            }`}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </div>
  )
}
