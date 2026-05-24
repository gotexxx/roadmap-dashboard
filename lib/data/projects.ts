export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedHours: number;
  technologies: string[];
  architecture: string;
  deploymentChecklist: { id: string; label: string }[];
  xpReward: number;
}

export const projects: ProjectItem[] = [
  {
    id: "cicd-pipeline",
    title: "CI/CD-Pipeline",
    description: "Vollständige Pipeline zur Automatisierung von Tests, Build und Deployment einer Next.js-App auf AWS ECS mit GitHub Actions.",
    difficulty: "intermediate",
    estimatedHours: 20,
    technologies: ["GitHub Actions", "Docker", "AWS ECS", "ECR", "Terraform"],
    architecture: "GitHub Push → GitHub Actions Trigger → Tests ausführen → Docker-Image bauen → zu ECR pushen → ECS Task Definition aktualisieren → auf Fargate deployen",
    deploymentChecklist: [
      { id: "ci1", label: "GitHub Actions Workflow (.yml) konfigurieren" },
      { id: "ci2", label: "ECR-Repository für Docker-Images erstellen" },
      { id: "ci3", label: "IAM-Rolle für GitHub OIDC konfigurieren" },
      { id: "ci4", label: "Unit- und Integrationstests schreiben" },
      { id: "ci5", label: "Stage hinzufügen: lint → test → build → push → deploy" },
      { id: "ci6", label: "Slack/Discord-Benachrichtigungen konfigurieren" },
      { id: "ci7", label: "Manuelle Genehmigung für Produktionsumgebung hinzufügen" },
      { id: "ci8", label: "Rollback im Fehlerfall testen" },
    ],
    xpReward: 400,
  },
  {
    id: "dockerized-fullstack",
    title: "Dockerisierte Fullstack-App",
    description: "Vollständige Fullstack-Anwendung mit Next.js, PostgreSQL und Redis in Docker Compose mit Hot-Reload und Datenpersistenz.",
    difficulty: "beginner",
    estimatedHours: 12,
    technologies: ["Docker", "Docker Compose", "Next.js", "PostgreSQL", "Redis", "Nginx"],
    architecture: "Nginx Reverse Proxy → Next.js App → PostgreSQL (Daten) + Redis (Cache/Sessions). Alles in isoliertem Docker-Netzwerk.",
    deploymentChecklist: [
      { id: "df1", label: "Dockerfile mit Multi-Stage-Build schreiben" },
      { id: "df2", label: "docker-compose.yml mit Healthchecks konfigurieren" },
      { id: "df3", label: "Persistente Volumes für PostgreSQL und Redis einrichten" },
      { id: "df4", label: "Nginx als Reverse Proxy konfigurieren" },
      { id: "df5", label: ".env.example mit Dokumentation der Umgebungsvariablen erstellen" },
      { id: "df6", label: "Hot-Reload in der Entwicklung verifizieren" },
      { id: "df7", label: "Datenbank-Initialisierungsskript hinzufügen" },
    ],
    xpReward: 250,
  },
  {
    id: "kubernetes-cluster",
    title: "Kubernetes-Cluster",
    description: "Produktionsreifer Kubernetes-Cluster auf AWS EKS mit Auto-Skalierung, Prometheus/Grafana-Monitoring und RBAC.",
    difficulty: "advanced",
    estimatedHours: 40,
    technologies: ["Kubernetes", "AWS EKS", "Helm", "Prometheus", "Grafana", "ArgoCD", "Terraform"],
    architecture: "EKS-Cluster (3 Node Groups) + Helm-Deployments + ArgoCD GitOps + Prometheus-Monitoring + Grafana-Dashboards + cert-manager SSL",
    deploymentChecklist: [
      { id: "k8s1", label: "EKS via Terraform provisionieren" },
      { id: "k8s2", label: "Node Groups konfigurieren (On-Demand + Spot)" },
      { id: "k8s3", label: "ArgoCD installieren und mit Repository verbinden" },
      { id: "k8s4", label: "Anwendung via Helm-Chart deployen" },
      { id: "k8s5", label: "HPA (Auto-Skalierung) konfigurieren" },
      { id: "k8s6", label: "Prometheus Stack installieren (kube-prometheus-stack)" },
      { id: "k8s7", label: "PagerDuty/Slack-Alerts konfigurieren" },
      { id: "k8s8", label: "RBAC — Namespace-Berechtigungen einschränken" },
      { id: "k8s9", label: "NetworkPolicies zwischen Services" },
      { id: "k8s10", label: "Load-Test und Auto-Skalierung verifizieren" },
    ],
    xpReward: 600,
  },
  {
    id: "terraform-aws",
    title: "Terraform AWS-Infrastruktur",
    description: "Vollständige AWS-Infrastruktur: VPC, ECS, Multi-AZ RDS, CloudFront, WAF — als Code mit Terraform-Modulen verwaltet.",
    difficulty: "advanced",
    estimatedHours: 30,
    technologies: ["Terraform", "AWS VPC", "AWS ECS", "AWS RDS", "CloudFront", "WAF", "Route53"],
    architecture: "VPC (public/private Subnets) → ALB → ECS Fargate → RDS Multi-AZ. CloudFront → S3 statische Assets. Route53 DNS-Management.",
    deploymentChecklist: [
      { id: "tf1", label: "VPC-Modul mit public/private/database Subnets erstellen" },
      { id: "tf2", label: "Remote State in S3 + DynamoDB-Locking" },
      { id: "tf3", label: "ECS-Fargate-Modul mit Auto-Skalierung" },
      { id: "tf4", label: "RDS PostgreSQL Multi-AZ mit automatischen Backups" },
      { id: "tf5", label: "Application Load Balancer mit SSL (ACM)" },
      { id: "tf6", label: "CloudFront-Distribution für statische Assets" },
      { id: "tf7", label: "WAF-Regeln gegen OWASP Top 10" },
      { id: "tf8", label: "Workspaces: dev/staging/prod" },
      { id: "tf9", label: "terraform-docs für alle Module" },
    ],
    xpReward: 550,
  },
  {
    id: "ai-rag-platform",
    title: "KI RAG-Plattform",
    description: "Enterprise-Plattform für dokumentenbasiertes Q&A mit Vektordatenbank, LLM-API und gestreamten Antworten.",
    difficulty: "expert",
    estimatedHours: 50,
    technologies: ["Next.js", "Python/FastAPI", "OpenAI API", "Qdrant", "PostgreSQL", "Redis", "Docker", "LangChain"],
    architecture: "Frontend (Next.js) → FastAPI Backend → LangChain Pipeline (Document Loader → Chunker → Embeddings → Qdrant) → OpenAI GPT-4 → Streaming Response",
    deploymentChecklist: [
      { id: "rag1", label: "FastAPI mit LangChain einrichten" },
      { id: "rag2", label: "Qdrant Vector Store (Docker + persistenter Speicher)" },
      { id: "rag3", label: "Document-Ingestion-Pipeline (PDF/DOCX/MD)" },
      { id: "rag4", label: "Chunking-Strategie (Recursive Character Splitter)" },
      { id: "rag5", label: "OpenAI Embeddings (text-embedding-3-small)" },
      { id: "rag6", label: "Hybrid-Suche (Semantisch + Keyword)" },
      { id: "rag7", label: "Reranking mit Cross-Encoder" },
      { id: "rag8", label: "Streaming-Antworten zum Frontend (SSE)" },
      { id: "rag9", label: "Chat-Verlauf mit PostgreSQL" },
      { id: "rag10", label: "Qualitätsevaluation (RAGAS)" },
      { id: "rag11", label: "Deployment auf AWS ECS mit Auto-Skalierung" },
    ],
    xpReward: 750,
  },
];
