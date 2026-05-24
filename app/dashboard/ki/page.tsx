"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain, Database, Zap, ArrowRight, Cpu, Network,
  GitBranch, FileText, Search, Settings, Activity,
  CheckCircle2, Circle, ExternalLink, Code2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ragPipeline = [
  { id: "ingestion", label: "Document Ingestion", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10",
    desc: "PDF/DOCX/MD → chunk → clean", tools: ["LangChain", "PyPDF2", "Unstructured"] },
  { id: "embedding", label: "Embedding", icon: Cpu, color: "text-violet-400", bg: "bg-violet-500/10",
    desc: "text → vector (1536-dim)", tools: ["OpenAI text-embedding-3-small", "sentence-transformers"] },
  { id: "vector-store", label: "Vector Store", icon: Database, color: "text-cyan-400", bg: "bg-cyan-500/10",
    desc: "HNSW index, cosine similarity", tools: ["Qdrant", "pgvector", "Pinecone"] },
  { id: "retrieval", label: "Retrieval", icon: Search, color: "text-emerald-400", bg: "bg-emerald-500/10",
    desc: "semantic + keyword hybrid search", tools: ["Qdrant", "BM25", "Cohere Rerank"] },
  { id: "generation", label: "LLM Generation", icon: Brain, color: "text-pink-400", bg: "bg-pink-500/10",
    desc: "context-injected prompt → response", tools: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3"] },
  { id: "streaming", label: "Streaming Response", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10",
    desc: "SSE → React streaming UI", tools: ["Vercel AI SDK", "FastAPI SSE"] },
];

const vectorDatabases = [
  {
    name: "Qdrant", type: "Open-source", use: "Production RAG, Semantic Search",
    pros: ["Schnelles Filtering", "Payload Indexing", "Cloud-native"],
    color: "blue", perf: 92,
  },
  {
    name: "pgvector", type: "PostgreSQL Extension", use: "Bestehende PostgreSQL-Projekte",
    pros: ["Zero Infra Overhead", "ACID Transactions", "SQL Queries"],
    color: "emerald", perf: 75,
  },
  {
    name: "Pinecone", type: "Managed SaaS", use: "Schneller Prototyp, managed Infra",
    pros: ["Serverless", "Auto-scale", "Einfaches API"],
    color: "violet", perf: 88,
  },
];

const llmApis = [
  { name: "GPT-4o", provider: "OpenAI", context: "128k", cost: "$5/1M in", strength: "Beste Reasoning-Qualität", badge: "violet" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", context: "200k", cost: "$3/1M in", strength: "Code, Dokumentenanalyse, RAG", badge: "orange" },
  { name: "Gemini 1.5 Pro", provider: "Google", context: "1M", cost: "$3.5/1M in", strength: "Riesiges Context Window", badge: "blue" },
  { name: "Llama 3.1 70B", provider: "Meta (self-host)", context: "128k", cost: "GPU-Kosten", strength: "Open-source, Datenschutz", badge: "emerald" },
];

const inferenceStack = [
  { layer: "API Layer", tech: "FastAPI + async", desc: "REST/WebSocket endpoint" },
  { layer: "Orchestration", tech: "LangChain / LangGraph", desc: "Chain, Agent, Memory" },
  { layer: "Caching", tech: "Redis Semantic Cache", desc: "Embedding-based cache" },
  { layer: "Inference", tech: "vLLM / TGI", desc: "Batching, paged attention" },
  { layer: "Hardware", tech: "NVIDIA A10G / T4 GPU", desc: "AWS p3/g4dn instances" },
  { layer: "Monitoring", tech: "Prometheus + Langfuse", desc: "Tokens, latency, cost" },
];

const colorText: Record<string, string> = {
  blue: "text-blue-400", emerald: "text-emerald-400", violet: "text-violet-400",
  orange: "text-orange-400", pink: "text-pink-400",
};
const colorBg: Record<string, string> = {
  blue: "bg-blue-500/10", emerald: "bg-emerald-500/10", violet: "bg-violet-500/10",
  orange: "bg-orange-500/10", pink: "bg-pink-500/10",
};
const colorBorder: Record<string, string> = {
  blue: "border-blue-500/20", emerald: "border-emerald-500/20", violet: "border-violet-500/20",
  orange: "border-orange-500/20", pink: "border-pink-500/20",
};

export default function KIPage() {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="w-4 h-4 text-pink-400" />
            RAG-Pipeline Architektur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {ragPipeline.map((step, i) => {
              const Icon = step.icon;
              const isSelected = selectedPipeline === step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPipeline(isSelected ? null : step.id)}
                    className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                      isSelected ? `${step.bg} border-zinc-600` : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div className="text-[10px] font-medium text-zinc-300 leading-tight">{step.label}</div>
                    <div className="text-[9px] text-zinc-600 mt-0.5">{step.desc}</div>
                  </motion.button>
                  {i < ragPipeline.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-zinc-700 mx-1 flex-shrink-0 hidden lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          {selectedPipeline && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-700"
            >
              {(() => {
                const step = ragPipeline.find((s) => s.id === selectedPipeline);
                if (!step) return null;
                const Icon = step.icon;
                return (
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200 mb-1">{step.label}</div>
                      <div className="text-xs text-zinc-500 mb-2">{step.desc}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {step.tools.map((t) => (
                          <Badge key={t} variant="default" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Vektordatenbanken
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vectorDatabases.map((db, i) => (
              <motion.div
                key={db.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-zinc-200">{db.name}</span>
                    <Badge variant="default" className="ml-2 text-[9px]">{db.type}</Badge>
                  </div>
                  <div className={`text-sm font-bold ${colorText[db.color]}`}>{db.perf}%</div>
                </div>
                <Progress value={db.perf} className="h-1 mb-2" indicatorClassName={`bg-gradient-to-r from-${db.color}-500 to-${db.color}-400`} />
                <div className="text-[10px] text-zinc-500 mb-2">Verwendung: {db.use}</div>
                <div className="flex flex-wrap gap-1">
                  {db.pros.map((pro) => (
                    <Badge key={pro} variant="default" className="text-[9px]">✓ {pro}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              LLM API Vergleich
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {llmApis.map((llm, i) => (
              <motion.div
                key={llm.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-200">{llm.name}</span>
                    <Badge variant={llm.badge as "violet" | "orange" | "blue" | "emerald"} className="text-[9px]">{llm.provider}</Badge>
                  </div>
                  <span className="text-xs text-zinc-500">{llm.cost}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-zinc-500">
                  <span>Context: <span className="text-zinc-400">{llm.context}</span></span>
                  <span className="text-zinc-400">{llm.strength}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-pink-400" />
            Production Inference Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {inferenceStack.map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-zinc-500">
                  {i + 1}
                </div>
                <div className="w-32 flex-shrink-0">
                  <div className="text-xs font-medium text-zinc-400">{layer.layer}</div>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <Badge variant="default" className="text-[10px] terminal-text">{layer.tech}</Badge>
                  <span className="text-[11px] text-zinc-600 hidden sm:block">{layer.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Code2 className="w-4 h-4 text-violet-400" />
            Code-Snippets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 terminal-text text-[11px] text-zinc-400 overflow-x-auto">
            <div className="text-zinc-600 mb-1"># RAG Pipeline — Python (LangChain + Qdrant)</div>
            <div><span className="text-blue-400">from</span> langchain_community.vectorstores <span className="text-blue-400">import</span> Qdrant</div>
            <div><span className="text-blue-400">from</span> langchain_openai <span className="text-blue-400">import</span> OpenAIEmbeddings, ChatOpenAI</div>
            <div><span className="text-blue-400">from</span> langchain.chains <span className="text-blue-400">import</span> RetrievalQA</div>
            <div className="mt-2"><span className="text-zinc-600"># 1. Embeddings + Vector Store</span></div>
            <div>embeddings = <span className="text-emerald-400">OpenAIEmbeddings</span>(model=<span className="text-yellow-400">"text-embedding-3-small"</span>)</div>
            <div>vectorstore = <span className="text-emerald-400">Qdrant</span>.from_documents(docs, embeddings, url=<span className="text-yellow-400">"http://localhost:6333"</span>)</div>
            <div className="mt-2"><span className="text-zinc-600"># 2. RAG Chain</span></div>
            <div>llm = <span className="text-emerald-400">ChatOpenAI</span>(model=<span className="text-yellow-400">"gpt-4o-mini"</span>, temperature=<span className="text-orange-400">0</span>)</div>
            <div>chain = <span className="text-emerald-400">RetrievalQA</span>.from_chain_type(llm, retriever=vectorstore.as_retriever(k=<span className="text-orange-400">4</span>))</div>
            <div className="mt-2"><span className="text-zinc-600"># 3. Query</span></div>
            <div>result = chain.invoke({`{"query": "Was ist Terraform?"}`})</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
