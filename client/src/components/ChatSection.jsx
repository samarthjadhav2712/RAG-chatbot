"use client"

import { motion } from "framer-motion"
import { Send, MessageCircle } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { sendQuery } from "../api/queryApi"

// 2. HELPER FUNCTION TO PROCESS CITATIONS
const formatAnswerWithCitations = (answer, citations) => {
    // Regex to find citation markers like [10], [1, 2], etc.
    const citationRegex = /\[(\d+(,\s*\d+)*)\]/g; 

    // Helper map for quick page lookup: { "10": 8, "1": 7, ... }
    const pageMap = citations.reduce((map, citation) => {
        map[citation.citation_id.toString()] = citation.page;
        return map;
    }, {});

    // Replace the citation marker with the desired link format: [Page X]
    const formattedText = answer.replace(citationRegex, (match, citationIds) => {
        const ids = citationIds.split(',').map(id => id.trim());
        
        // Collect unique page numbers for the IDs cited in this specific match
        const pages = ids
            .map(id => pageMap[id])
            .filter((page, index, self) => page !== undefined && self.indexOf(page) === index);
        
        if (pages.length === 0) return ''; 

        // Format as [Page X, Page Y, ...]
        return pages.length > 0 ? ` [Page ${pages.join(', Page ')}]` : '';
    });
    
    // Convert newlines and bolding for display (as discussed previously)
    return formattedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .split('\n')
        .map((paragraph, index) => {
            // Trim and skip empty lines resulting from double \n\n
            if (paragraph.trim() === '') return null;
            
            return (
                <p 
                    key={index} 
                    className={`text-sm ${index > 0 ? 'mt-2' : ''}`}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                />
            );
        });
};

export default function ChatSection({ documentId, onQuerySubmit, onChatComplete, isChatProcessing , setChatStep, chatStep}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      // Display the document ID the user is chatting with
      text: `Document processed successfully ! Ask me anything about it.`, 
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const { isDark, colors } = useTheme()

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

  // ... (scrollToBottom and useEffect remain the same) ...
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // --- MODIFIED SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isChatProcessing || !documentId) return

    const userQuery = input.trim()
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: userQuery,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    onQuerySubmit() // Notify parent (App.jsx) to start chat processing visualization

  const stepInterval = setInterval(() => {
        setChatStep(prev => { // 👈 Use the passed setter
            const stepsCount = 5; // Total steps in QueryPipeline
            if (prev < stepsCount) return prev + 1; 
            return 0; // Cycle back to 0 while waiting for API
        });
    }, 1000);

    // 1. Call the API
    const apiResponse = await sendQuery(userQuery, documentId);

    // 2. Stop visualization
    clearInterval(stepInterval); 
    setChatStep(5);

    // 3. Notify parent that processing is complete
    onChatComplete(); 

    // 4. Process and display the response
    if (apiResponse.success) {
        const { answer, citations } = apiResponse.data;

        // Format the answer, replacing citation IDs like [10] with [Page 8]
        const formattedAnswer = formatAnswerWithCitations(answer, citations);

        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                type: "assistant",
                text: formattedAnswer,
                timestamp: new Date(),
            },
        ]);
    } else {
        // Handle API error
        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                type: "assistant",
                text: `Error: ${apiResponse.error}`,
                timestamp: new Date(),
            },
        ]);
    }
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
                {/* Check if text is an array (our processed JSX content) or simple string (user/error message) */}
              {Array.isArray(msg.text) ? msg.text : <p className="text-sm">{msg.text}</p>} 
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
