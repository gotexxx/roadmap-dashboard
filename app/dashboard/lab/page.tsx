"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, Play, Square, RotateCcw, Terminal,
  Network, Layers, GitBranch, CheckCircle2, XCircle,
  Clock, Zap, AlertTriangle, Cloud, Server
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type SimType = "k8s-scale" | "cicd-run" | "terraform-apply" | "docker-deploy";

interface SimLog { time: string; type: "info" | "success" | "error" | "warn"; msg: string }

const simulations: {
  id: SimType; title: string; icon: React.ElementType; color: string;
  description: string; duration: number;
}[] = [
  { id: "docker-deploy", title: "Docker Deploy", icon: Server, color: "text-blue-400", description: "Next.js-Container bauen und deployen", duration: 6000 },
  { id: "k8s-scale", title: "K8s Auto-Scaling", icon: Network, color: "text-cyan-400", description: "HPA-Skalierung unter Last simulieren", duration: 7000 },
  { id: "cicd-run", title: "CI/CD Pipeline Run", icon: GitBranch, color: "text-violet-400", description: "GitHub Actions: test → build → push → deploy", duration: 8000 },
  { id: "terraform-apply", title: "Terraform Apply", icon: Layers, color: "text-purple-400", description: "AWS-Infrastruktur provisionieren", duration: 9000 },
];

const simScripts: Record<SimType, SimLog[]> = {
  "docker-deploy": [
    { time: "00:01", type: "info", msg: "Building Docker image: api-server:v1.2.5" },
    { time: "00:03", type: "info", msg: "Step 1/8 : FROM node:20-alpine AS base" },
    { time: "00:05", type: "info", msg: "Step 3/8 : RUN pnpm install --frozen-lockfile" },
    { time: "00:08", type: "info", msg: "Step 5/8 : RUN pnpm build (Next.js production)" },
    { time: "00:15", type: "info", msg: "Step 7/8 : COPY --from=builder /app/.next/standalone ./" },
    { time: "00:18", type: "info", msg: "Build complete: api-server:v1.2.5 (142MB)" },
    { time: "00:20", type: "info", msg: "Pushing to ECR: 123456789.dkr.ecr.eu-west-1.amazonaws.com/api-server:v1.2.5" },
    { time: "00:28", type: "info", msg: "Updating ECS task definition..." },
    { time: "00:30", type: "info", msg: "Creating new task revision: api-server:47" },
    { time: "00:35", type: "info", msg: "Triggering rolling deployment (0/2 updated)..." },
    { time: "00:50", type: "info", msg: "Rolling deployment: 1/2 tasks updated, health check: OK" },
    { time: "01:05", type: "success", msg: "✓ Deployment complete! 2/2 tasks running (v1.2.5)" },
  ],
  "k8s-scale": [
    { time: "00:01", type: "info", msg: "HPA monitoring: api-deployment (target CPU: 70%)" },
    { time: "00:03", type: "info", msg: "Current replicas: 2, CPU avg: 45%" },
    { time: "00:08", type: "warn", msg: "CPU spike detected: 82% — above threshold!" },
    { time: "00:10", type: "info", msg: "HPA scale-up triggered: 2 → 3 replicas" },
    { time: "00:12", type: "info", msg: "Scheduling new pod: api-deployment-7d9f-xk2p1" },
    { time: "00:18", type: "info", msg: "Pod api-deployment-7d9f-xk2p1: Pending → Running" },
    { time: "00:20", type: "info", msg: "CPU avg dropping: 82% → 61%" },
    { time: "00:35", type: "info", msg: "CPU stabilized: 54% across 3 pods" },
    { time: "00:50", type: "info", msg: "Load decreasing. HPA scale-down cooldown: 5min" },
    { time: "01:05", type: "success", msg: "✓ Scaling complete. 3 replicas running, CPU: 48%" },
  ],
  "cicd-run": [
    { time: "00:01", type: "info", msg: "GitHub Actions triggered: push to main" },
    { time: "00:02", type: "info", msg: "Job: test (ubuntu-latest)" },
    { time: "00:05", type: "info", msg: "✓ pnpm install --frozen-lockfile (23s)" },
    { time: "00:08", type: "info", msg: "Running: pnpm test (vitest)" },
    { time: "00:20", type: "success", msg: "✓ Tests passed: 47/47" },
    { time: "00:22", type: "info", msg: "Job: build-push (aws credentials: OIDC)" },
    { time: "00:25", type: "info", msg: "docker build -t api-server:${{ github.sha }}" },
    { time: "00:45", type: "info", msg: "docker push 123456789.dkr.ecr.eu-west-1.amazonaws.com/api-server" },
    { time: "00:52", type: "success", msg: "✓ Image pushed successfully" },
    { time: "00:55", type: "info", msg: "Job: deploy (requires: build-push)" },
    { time: "00:58", type: "info", msg: "Updating ECS service: api-server" },
    { time: "01:20", type: "success", msg: "✓ Pipeline #491 complete — all 3 jobs passed (1m 20s)" },
  ],
  "terraform-apply": [
    { time: "00:01", type: "info", msg: "terraform init (downloading providers: aws ~5.x)" },
    { time: "00:05", type: "info", msg: "terraform plan -var-file=prod.tfvars" },
    { time: "00:08", type: "info", msg: "Plan: 12 to add, 3 to change, 0 to destroy" },
    { time: "00:10", type: "info", msg: "terraform apply -auto-approve" },
    { time: "00:12", type: "info", msg: "aws_vpc.main: Creating..." },
    { time: "00:15", type: "info", msg: "aws_subnet.public[0]: Creating..." },
    { time: "00:18", type: "info", msg: "aws_subnet.public[1]: Creating..." },
    { time: "00:25", type: "info", msg: "aws_security_group.api: Creating..." },
    { time: "00:35", type: "info", msg: "aws_lb.main: Creating... (ETA: 2-3 min)" },
    { time: "00:55", type: "info", msg: "aws_ecs_service.api: Creating..." },
    { time: "01:10", type: "info", msg: "aws_rds_instance.postgres: Creating... (ETA: 5 min)" },
    { time: "01:30", type: "warn", msg: "aws_lb.main: Still creating... (elapsed: 55s)" },
    { time: "02:00", type: "success", msg: "✓ Apply complete! 12 added, 3 changed, 0 destroyed" },
    { time: "02:01", type: "info", msg: "Outputs: alb_dns_name = api-lb-123456.eu-west-1.elb.amazonaws.com" },
  ],
};

export default function LabPage() {
  const [activeSimulation, setActiveSimulation] = useState<SimType | null>(null);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<SimLog[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);

  const runSimulation = (simId: SimType) => {
    setActiveSimulation(simId);
    setRunning(true);
    setLogs([]);
    setProgress(0);
    setCompleted(false);

    const script = simScripts[simId];
    const sim = simulations.find((s) => s.id === simId)!;
    const interval = sim.duration / script.length;

    script.forEach((log, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setProgress(Math.round(((i + 1) / script.length) * 100));
        if (i === script.length - 1) {
          setRunning(false);
          setCompleted(true);
        }
        logsRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
      }, i * interval);
    });
  };

  const reset = () => {
    setActiveSimulation(null);
    setRunning(false);
    setLogs([]);
    setProgress(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-start gap-3">
        <FlaskConical className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-medium text-violet-300">Cloud Lab — Simulator</div>
          <div className="text-xs text-violet-400/70 mt-0.5">
            Simuliere echte Deployments ohne Cloud-Kosten. Jede Simulation zeigt realistische Logs und Schritte.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {simulations.map((sim) => {
          const Icon = sim.icon;
          const isActive = activeSimulation === sim.id;
          return (
            <motion.button
              key={sim.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => !running && runSimulation(sim.id)}
              disabled={running}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-zinc-800 border-zinc-600"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
              } ${running && !isActive ? "opacity-40" : ""}`}
            >
              <Icon className={`w-6 h-6 mb-3 ${sim.color}`} />
              <div className="text-sm font-semibold text-zinc-200 mb-1">{sim.title}</div>
              <div className="text-[10px] text-zinc-500 leading-relaxed">{sim.description}</div>
              {isActive && running && (
                <div className="mt-2">
                  <Progress value={progress} className="h-0.5" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <CardTitle className="text-sm">
                {activeSimulation
                  ? simulations.find((s) => s.id === activeSimulation)?.title
                  : "Terminal — Simulation oben auswählen"}
              </CardTitle>
              {running && (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                </motion.div>
              )}
              {completed && <Badge variant="emerald" className="text-[9px]">✓ Abgeschlossen</Badge>}
            </div>
            {(logs.length > 0 || running) && (
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
          {running && (
            <Progress value={progress} className="h-0.5 mt-2" indicatorClassName="bg-gradient-to-r from-blue-500 to-violet-500" />
          )}
        </CardHeader>
        <CardContent>
          <div
            ref={logsRef}
            className="bg-zinc-950 rounded-lg border border-zinc-800 p-4 h-80 overflow-y-auto terminal-text"
          >
            {logs.length === 0 && !running && (
              <div className="flex flex-col items-center justify-center h-full text-zinc-700">
                <Terminal className="w-8 h-8 mb-3" />
                <div className="text-sm">Simulation auswählen zum Starten</div>
                <div className="text-xs mt-1">4 verfügbare Szenarien</div>
              </div>
            )}
            <div className="space-y-1">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-start gap-2.5 text-[11px]"
                >
                  <span className="text-zinc-600 flex-shrink-0 font-mono">[{log.time}]</span>
                  {log.type === "success" && <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />}
                  {log.type === "error" && <XCircle className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />}
                  {log.type === "warn" && <AlertTriangle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />}
                  {log.type === "info" && <span className="text-zinc-600 flex-shrink-0">›</span>}
                  <span className={
                    log.type === "success" ? "text-emerald-400" :
                    log.type === "error" ? "text-red-400" :
                    log.type === "warn" ? "text-yellow-400" :
                    "text-zinc-400"
                  }>
                    {log.msg}
                  </span>
                </motion.div>
              ))}
              {running && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center gap-2 text-[11px] text-zinc-600"
                >
                  <span>›</span>
                  <span>_</span>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Was du von jeder Simulation lernst</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Docker Deploy",
                points: ["Multi-stage Dockerfile optimization", "ECR push workflow", "ECS rolling deployment", "Health check verification"]
              },
              {
                title: "K8s Auto-Scaling",
                points: ["Horizontal Pod Autoscaler (HPA)", "CPU/memory metrics", "Scale-up vs scale-down cooldown", "Pod scheduling lifecycle"]
              },
              {
                title: "CI/CD Pipeline",
                points: ["GitHub Actions OIDC auth", "Parallel vs sequential jobs", "Docker build caching", "Zero-downtime deployment"]
              },
              {
                title: "Terraform Apply",
                points: ["VPC + subnet architecture", "Resource dependency graph", "State management", "Production deployment flow"]
              },
            ].map((item, i) => (
              <div key={item.title} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs font-semibold text-zinc-300 mb-2">{item.title}</div>
                <div className="space-y-1">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-[10px] text-zinc-500">
                      <CheckCircle2 className="w-3 h-3 text-zinc-700 flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
