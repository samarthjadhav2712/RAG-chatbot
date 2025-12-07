

import { motion } from "framer-motion"
import { ArrowRight, FileText, Brain, Search, Zap, Shield, CloudLightning as Lightning } from "lucide-react"

export default function LandingPage({ onGetStarted }) {
  const features = [
    {
      icon: FileText,
      title: "Smart Document Processing",
      description: "Upload PDFs and extract text, tables, and structured data with advanced semantic chunking",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "LLM-based query complexity analysis for intelligent request routing and optimization",
    },
    {
      icon: Search,
      title: "Hybrid Search Engine",
      description: "BM25 keyword search combined with dense vector search for comprehensive retrieval",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Watch animated pipelines showing every step of document processing and query resolution",
    },
    {
      icon: Shield,
      title: "Advanced Re-ranking",
      description: "Cross-encoder powered re-ranking using ms-marco-miniLM for precision results",
    },
    {
      icon: Lightning,
      title: "Vector Database",
      description: "Efficient storage and retrieval using FAISS or Qdrant for lightning-fast queries",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-slate-700 backdrop-blur-sm fixed top-0 w-full z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">RAG ChatBot</span>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={onGetStarted}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-medium transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm font-medium mb-4">
              Advanced Retrieval Augmented Generation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Intelligent Document Search & Retrieval
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
          >
            Upload your documents and experience advanced semantic search powered by AI. Watch as your queries are
            intelligently processed through our multi-stage retrieval pipeline.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Start Chatting
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need for advanced document retrieval and semantic search
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Pipeline Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Watch Your Data Flow</h2>
            <p className="text-slate-400 text-lg">Real-time visualization of our intelligent processing pipeline</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Pipeline Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-xl border border-slate-700 bg-slate-800/50"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Document Processing
              </h3>
              <div className="space-y-3">
                {["Extract Text & Tables", "Semantic Chunking", "Generate Embeddings", "Store in Vector DB"].map(
                  (step, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            {/* Query Pipeline Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-xl border border-slate-700 bg-slate-800/50"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Query Processing
              </h3>
              <div className="space-y-3">
                {[
                  "Query Analysis",
                  "Query Embedding",
                  "Hybrid Search (BM25 + Dense)",
                  "Result Re-ranking",
                  "Final Ranking",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-slate-400 text-lg mb-8">
              Upload your first document and experience the power of intelligent retrieval
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Launch App
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
