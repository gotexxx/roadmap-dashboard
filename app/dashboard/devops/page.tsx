"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Server, Cpu, HardDrive, Network, CheckCircle2,
  XCircle, Clock, Terminal, AlertTriangle, TrendingUp, Zap,
  RefreshCw, Circle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMetrics(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    time: `${i}m`,
    cpu: randomBetween(15, 75),
    memory: randomBetween(40, 80),
    requests: randomBetween(50, 400),
    latency: randomBetween(12, 80),
  }));
}

const k8sPods = [
  { name: "api-server-7d9f", namespace: "production", status: "Running", restarts: 0, cpu: "45m", memory: "128Mi", age: "5d" },
  { name: "api-server-7d9f-2", namespace: "production", status: "Running", restarts: 1, cpu: "38m", memory: "115Mi", age: "5d" },
  { name: "worker-6c8b-1", namespace: "production", status: "Running", restarts: 0, cpu: "120m", memory: "256Mi", age: "2d" },
  { name: "worker-6c8b-2", namespace: "production", status: "Pending", restarts: 0, cpu: "0m", memory: "0Mi", age: "1m" },
  { name: "redis-0", namespace: "production", status: "Running", restarts: 0, cpu: "8m", memory: "64Mi", age: "10d" },
  { name: "postgres-0", namespace: "production", status: "Running", restarts: 0, cpu: "25m", memory: "512Mi", age: "10d" },
  { name: "monitoring-stack-1", namespace: "monitoring", status: "Running", restarts: 2, cpu: "200m", memory: "1Gi", age: "3d" },
  { name: "ingress-nginx-ctrl", namespace: "ingress", status: "Running", restarts: 0, cpu: "50m", memory: "90Mi", age: "7d" },
];

const cicdRuns = [
  { id: "#483", branch: "main", status: "success", duration: "3m 42s", time: "vor 5 Min.", steps: ["test", "build", "push", "deploy"] },
  { id: "#482", branch: "feature/rag-api", status: "running", duration: "1m 20s", time: "jetzt", steps: ["test", "build"] },
  { id: "#481", branch: "fix/db-pool", status: "success", duration: "2m 18s", time: "vor 22 Min.", steps: ["test", "build", "push", "deploy"] },
  { id: "#480", branch: "main", status: "failed", duration: "1m 05s", time: "vor 45 Min.", steps: ["test"] },
  { id: "#479", branch: "chore/deps", status: "success", duration: "2m 55s", time: "vor 2h", steps: ["test", "build", "push", "deploy"] },
];

const deployLogs = [
  { time: "20:41:03", level: "info", msg: "Starting deployment pipeline #483" },
  { time: "20:41:05", level: "info", msg: "Building Docker image: api-server:v1.2.4" },
  { time: "20:41:38", level: "info", msg: "Docker build completed (890MB → 142MB with multi-stage)" },
  { time: "20:41:40", level: "info", msg: "Pushing image to ECR: 123456789.dkr.ecr.eu-west-1.amazonaws.com/api-server:v1.2.4" },
  { time: "20:42:12", level: "success", msg: "Image pushed successfully. Digest: sha256:4a3b..." },
  { time: "20:42:15", level: "info", msg: "Updating ECS task definition..." },
  { time: "20:42:18", level: "info", msg: "Triggering rolling deployment (2/2 tasks)..." },
  { time: "20:43:44", level: "success", msg: "✓ Deployment complete. Health checks passed." },
  { time: "20:44:01", level: "info", msg: "ArgoCD synced: kubernetes/production/api-server" },
];

export default function DevOpsPage() {
  const [metrics, setMetrics] = useState(generateMetrics);
  const [tick, setTick] = useState(0);
  const [liveLog, setLiveLog] = useState(deployLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const next = [...prev.slice(1), {
          time: `now`,
          cpu: randomBetween(15, 75),
          memory: randomBetween(40, 80),
          requests: randomBetween(50, 400),
          latency: randomBetween(12, 80),
        }];
        return next;
      });
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const latestMetric = metrics[metrics.length - 1];

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Live metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "CPU Usage", value: `${latestMetric.cpu}%`, icon: Cpu, color: "text-blue-400", bg: "bg-blue-500/10", warning: latestMetric.cpu > 70 },
          { label: "Memory", value: `${latestMetric.memory}%`, icon: HardDrive, color: "text-violet-400", bg: "bg-violet-500/10", warning: latestMetric.memory > 75 },
          { label: "Req/min", value: latestMetric.requests.toString(), icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", warning: false },
          { label: "Latency p95", value: `${latestMetric.latency}ms`, icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", warning: latestMetric.latency > 60 },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Card className={m.warning ? "border-orange-500/30" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${m.color}`} />
                    </div>
                    {m.warning && <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-zinc-600">LIVE</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-zinc-100">{m.value}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{m.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CPU & Memory (live)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="CPU" />
                <Line type="monotone" dataKey="memory" stroke="#a78bfa" strokeWidth={1.5} dot={false} name="Memory" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Requests/min & Latency p95</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={1.5} fill="url(#reqGrad)" name="Req/min" />
                <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Latency ms" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Kubernetes pods */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              Kubernetes Pods
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="emerald">{k8sPods.filter((p) => p.status === "Running").length} Running</Badge>
              <Badge variant="yellow">{k8sPods.filter((p) => p.status === "Pending").length} Pending</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-800">
                  {["Pod", "Namespace", "Status", "Restarts", "CPU", "Memory", "Alter"].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-zinc-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {k8sPods.map((pod) => (
                  <tr key={pod.name} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-2 px-3 terminal-text text-zinc-300 font-medium">{pod.name}</td>
                    <td className="py-2 px-3 text-zinc-500">{pod.namespace}</td>
                    <td className="py-2 px-3">
                      <Badge
                        variant={pod.status === "Running" ? "emerald" : pod.status === "Pending" ? "yellow" : "red"}
                        className="text-[9px]"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${pod.status === "Running" ? "bg-emerald-400" : "bg-yellow-400"} inline-block`} />
                        {pod.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-3">
                      <span className={pod.restarts > 0 ? "text-orange-400" : "text-zinc-500"}>{pod.restarts}</span>
                    </td>
                    <td className="py-2 px-3 terminal-text text-zinc-400">{pod.cpu}</td>
                    <td className="py-2 px-3 terminal-text text-zinc-400">{pod.memory}</td>
                    <td className="py-2 px-3 text-zinc-600">{pod.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CI/CD Runs */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-violet-400" />
              CI/CD Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cicdRuns.map((run) => (
                <div key={run.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                  {run.status === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  {run.status === "failed" && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                  {run.status === "running" && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <RefreshCw className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    </motion.div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-300">{run.id}</span>
                      <span className="text-xs text-zinc-500 truncate">{run.branch}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {run.steps.map((step, i) => (
                        <span key={step} className="text-[9px] text-zinc-600">
                          {i > 0 && "→ "}<span className="text-zinc-400">{step}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] text-zinc-500">{run.duration}</div>
                    <div className="text-[10px] text-zinc-600">{run.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployment logs */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Deployment-Logs
              </CardTitle>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-zinc-600">LIVE</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 p-3 h-64 overflow-y-auto terminal-text">
              <div className="space-y-1">
                {liveLog.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-start gap-2 text-[11px]"
                  >
                    <span className="text-zinc-600 flex-shrink-0">{log.time}</span>
                    <span className={cn(
                      "flex-shrink-0",
                      log.level === "success" ? "text-emerald-500" :
                      log.level === "error" ? "text-red-400" : "text-zinc-500"
                    )}>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span className={log.level === "success" ? "text-emerald-400" : "text-zinc-400"}>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
