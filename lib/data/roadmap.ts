export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedHours: number;
  realWorldUsage: string;
  prerequisites: string[];
  resources: { title: string; url: string; type: "docs" | "course" | "video" | "book" }[];
  projects: string[];
  xpReward: number;
}

export interface RoadmapSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  nodes: RoadmapNode[];
}

export const roadmapSections: RoadmapSection[] = [
  {
    id: "linux-bash",
    title: "Linux & Bash",
    icon: "Terminal",
    color: "emerald",
    description: "Linux-Grundlagen und Shell-Automatisierung mit Bash-Skripten",
    nodes: [
      {
        id: "linux-fundamentals",
        title: "Linux-Grundlagen",
        description: "Dateisysteme, Berechtigungen, Prozesse, Paketverwaltung",
        difficulty: "beginner",
        estimatedHours: 20,
        realWorldUsage: "Jeder Produktionsserver läuft auf Linux",
        prerequisites: [],
        resources: [
          { title: "The Linux Command Line", url: "https://linuxcommand.org/tlcl.php", type: "book" },
          { title: "Linux Journey", url: "https://linuxjourney.com", type: "course" },
        ],
        projects: ["Ubuntu-Server von Grund auf konfigurieren", "Backup-Automatisierungsskript"],
        xpReward: 150,
      },
      {
        id: "bash-scripting",
        title: "Bash-Scripting",
        description: "Variablen, Schleifen, Funktionen, Fehlerbehandlung, Cron-Jobs",
        difficulty: "intermediate",
        estimatedHours: 15,
        realWorldUsage: "Automatisierung von CI/CD, Deployment-Skripte",
        prerequisites: ["linux-fundamentals"],
        resources: [
          { title: "Bash Guide", url: "https://mywiki.wooledge.org/BashGuide", type: "docs" },
          { title: "Shell Scripting Tutorial", url: "https://www.shellscript.sh", type: "course" },
        ],
        projects: ["Server-Monitoring-Skript", "Deployment-Automatisierung"],
        xpReward: 125,
      },
      {
        id: "vim-tmux",
        title: "Vim & Tmux",
        description: "Effizientes Arbeiten im Terminal, Session-Multiplexing",
        difficulty: "intermediate",
        estimatedHours: 10,
        realWorldUsage: "Arbeiten auf Remote-Servern ohne GUI",
        prerequisites: ["linux-fundamentals"],
        resources: [
          { title: "Vim Adventures", url: "https://vim-adventures.com", type: "course" },
        ],
        projects: ["Eigene .vimrc + .tmux.conf Konfiguration"],
        xpReward: 75,
      },
    ],
  },
  {
    id: "docker",
    title: "Docker",
    icon: "Box",
    color: "blue",
    description: "Containerisierung von Anwendungen und lokale Umgebungen",
    nodes: [
      {
        id: "docker-basics",
        title: "Docker-Grundlagen",
        description: "Images, Container, Layers, Registries, grundlegende Befehle",
        difficulty: "beginner",
        estimatedHours: 12,
        realWorldUsage: "Standard-Tool in 90 % aller Tech-Unternehmen",
        prerequisites: ["linux-fundamentals"],
        resources: [
          { title: "Docker Dokumentation", url: "https://docs.docker.com", type: "docs" },
          { title: "Play with Docker", url: "https://labs.play-with-docker.com", type: "course" },
        ],
        projects: ["Next.js-App dockerisieren", "Lokale Image-Registry"],
        xpReward: 150,
      },
      {
        id: "dockerfile",
        title: "Dockerfile & Best Practices",
        description: "Multi-Stage-Builds, Cache-Optimierung, Sicherheit, .dockerignore",
        difficulty: "intermediate",
        estimatedHours: 8,
        realWorldUsage: "Jede CI/CD-Pipeline baut Docker-Images",
        prerequisites: ["docker-basics"],
        resources: [
          { title: "Dockerfile Best Practices", url: "https://docs.docker.com/build/building/best-practices", type: "docs" },
        ],
        projects: ["Produktions-Image unter 50 MB optimieren"],
        xpReward: 100,
      },
      {
        id: "docker-compose",
        title: "Docker Compose",
        description: "Multi-Container-Anwendungen, Netzwerke, Volumes, Healthchecks",
        difficulty: "intermediate",
        estimatedHours: 10,
        realWorldUsage: "Lokale Entwicklungsumgebungen, CI-Integration",
        prerequisites: ["dockerfile"],
        resources: [
          { title: "Compose File Reference", url: "https://docs.docker.com/compose/compose-file", type: "docs" },
        ],
        projects: ["Fullstack-App: Next.js + PostgreSQL + Redis mit Compose"],
        xpReward: 125,
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD",
    icon: "GitBranch",
    color: "violet",
    description: "Automatisierung von Build, Test und Deployment",
    nodes: [
      {
        id: "git-advanced",
        title: "Git Fortgeschritten",
        description: "Branching-Strategie, Rebase, Cherry-Pick, Hooks, Monorepo",
        difficulty: "intermediate",
        estimatedHours: 10,
        realWorldUsage: "Tägliches Werkzeug jedes Entwicklers",
        prerequisites: [],
        resources: [
          { title: "Pro Git Book", url: "https://git-scm.com/book", type: "book" },
          { title: "Oh My Git!", url: "https://ohmygit.org", type: "course" },
        ],
        projects: ["Git Flow in einem Team-Projekt implementieren"],
        xpReward: 100,
      },
      {
        id: "github-actions",
        title: "GitHub Actions",
        description: "Workflows, Jobs, Steps, Secrets, Matrix-Builds, Wiederverwendbare Actions",
        difficulty: "intermediate",
        estimatedHours: 20,
        realWorldUsage: "CI/CD für Millionen von Open-Source- und Enterprise-Projekten",
        prerequisites: ["git-advanced", "docker-basics"],
        resources: [
          { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "docs" },
        ],
        projects: ["Pipeline: Test → Build → Deploy auf AWS ECS"],
        xpReward: 200,
      },
      {
        id: "argocd",
        title: "ArgoCD & GitOps",
        description: "Continuous Delivery für Kubernetes, GitOps-Prinzipien",
        difficulty: "advanced",
        estimatedHours: 20,
        realWorldUsage: "Standard bei Enterprise-Kubernetes-Deployments",
        prerequisites: ["github-actions"],
        resources: [
          { title: "ArgoCD Documentation", url: "https://argo-cd.readthedocs.io", type: "docs" },
        ],
        projects: ["GitOps-Deployment für 3 Umgebungen (dev/staging/prod)"],
        xpReward: 250,
      },
    ],
  },
  {
    id: "aws",
    title: "AWS Cloud",
    icon: "Cloud",
    color: "orange",
    description: "Amazon Web Services — die führende Cloud-Plattform weltweit",
    nodes: [
      {
        id: "aws-fundamentals",
        title: "AWS-Grundlagen",
        description: "IAM, VPC, EC2, S3, RDS, Netzwerk-Grundlagen und Sicherheit",
        difficulty: "beginner",
        estimatedHours: 30,
        realWorldUsage: "33 % des Cloud-Markts, Industriestandard",
        prerequisites: ["linux-fundamentals"],
        resources: [
          { title: "AWS Free Tier", url: "https://aws.amazon.com/free", type: "docs" },
          { title: "A Cloud Guru", url: "https://acloudguru.com", type: "course" },
        ],
        projects: ["Statische Website auf S3 + CloudFront hosten"],
        xpReward: 300,
      },
      {
        id: "aws-containers",
        title: "AWS ECS & ECR",
        description: "Elastic Container Service, Elastic Container Registry, Fargate",
        difficulty: "intermediate",
        estimatedHours: 20,
        realWorldUsage: "Container-Deployment ohne K8s-Cluster-Management",
        prerequisites: ["aws-fundamentals", "docker-basics"],
        resources: [
          { title: "ECS Documentation", url: "https://docs.aws.amazon.com/ecs", type: "docs" },
        ],
        projects: ["Next.js + PostgreSQL auf ECS Fargate deployen"],
        xpReward: 225,
      },
      {
        id: "aws-serverless",
        title: "AWS Lambda & API Gateway",
        description: "Serverless Functions, Event-Driven Architecture, SAM, CDK",
        difficulty: "intermediate",
        estimatedHours: 20,
        realWorldUsage: "Skalierbare APIs ohne Server-Management",
        prerequisites: ["aws-fundamentals"],
        resources: [
          { title: "Serverless Framework", url: "https://www.serverless.com/framework/docs", type: "docs" },
        ],
        projects: ["Serverless REST API mit DynamoDB"],
        xpReward: 200,
      },
    ],
  },
  {
    id: "terraform",
    title: "Terraform",
    icon: "Layers",
    color: "purple",
    description: "Infrastructure as Code — Cloud-Infrastruktur verwalten",
    nodes: [
      {
        id: "terraform-basics",
        title: "Terraform-Grundlagen",
        description: "Providers, Resources, State, Variablen, Outputs, Workspaces",
        difficulty: "intermediate",
        estimatedHours: 25,
        realWorldUsage: "Standard-IaC in 70 % aller Cloud-nativen Unternehmen",
        prerequisites: ["aws-fundamentals"],
        resources: [
          { title: "Terraform Docs", url: "https://developer.hashicorp.com/terraform/docs", type: "docs" },
          { title: "HashiCorp Learn", url: "https://developer.hashicorp.com/terraform/tutorials", type: "course" },
        ],
        projects: ["VPC + EC2 + RDS-Infrastruktur via Terraform"],
        xpReward: 275,
      },
      {
        id: "terraform-modules",
        title: "Terraform Module & Best Practices",
        description: "DRY-Module, Remote State, Terragrunt, CI/CD mit Terraform",
        difficulty: "advanced",
        estimatedHours: 20,
        realWorldUsage: "Enterprise-IaC für hunderte von Umgebungen",
        prerequisites: ["terraform-basics"],
        resources: [
          { title: "Terraform Best Practices", url: "https://www.terraform-best-practices.com", type: "docs" },
        ],
        projects: ["Wiederverwendbare AWS VPC + EKS Module"],
        xpReward: 225,
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    icon: "Network",
    color: "cyan",
    description: "Container-Orchestrierung — von Google entwickelt, Industriestandard",
    nodes: [
      {
        id: "k8s-basics",
        title: "Kubernetes-Grundlagen",
        description: "Pods, Deployments, Services, ConfigMaps, Secrets, Namespaces",
        difficulty: "intermediate",
        estimatedHours: 35,
        realWorldUsage: "Plattform für 80 % aller Enterprise-Workloads",
        prerequisites: ["docker-compose"],
        resources: [
          { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/home", type: "docs" },
          { title: "Killercoda K8s", url: "https://killercoda.com/playgrounds/scenario/kubernetes", type: "course" },
        ],
        projects: ["3-Tier-Anwendung auf lokalem Cluster (kind/minikube) deployen"],
        xpReward: 350,
      },
      {
        id: "k8s-advanced",
        title: "Kubernetes Fortgeschritten",
        description: "HPA, VPA, PDB, RBAC, NetworkPolicies, StatefulSets, Operators",
        difficulty: "advanced",
        estimatedHours: 30,
        realWorldUsage: "Produktionscluster mit HA und Auto-Skalierung",
        prerequisites: ["k8s-basics"],
        resources: [
          { title: "CKA Study Guide", url: "https://github.com/dgkanatsios/CKAD-exercises", type: "course" },
        ],
        projects: ["Cluster mit RBAC + NetworkPolicies + HPA für Load-Tests"],
        xpReward: 300,
      },
      {
        id: "helm",
        title: "Helm Charts",
        description: "Kubernetes Package Manager, Templating, Chart-Repositories, Helmfile",
        difficulty: "intermediate",
        estimatedHours: 15,
        realWorldUsage: "Standard für Anwendungs-Deployments auf K8s",
        prerequisites: ["k8s-basics"],
        resources: [
          { title: "Helm Docs", url: "https://helm.sh/docs", type: "docs" },
        ],
        projects: ["Eigener Helm-Chart für eine Fullstack-Anwendung"],
        xpReward: 175,
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    icon: "Activity",
    color: "yellow",
    description: "Observability — Metriken, Logs, Tracing, Alerting",
    nodes: [
      {
        id: "prometheus-grafana",
        title: "Prometheus & Grafana",
        description: "Time-Series-Metriken, PromQL, Dashboards, Alerts",
        difficulty: "intermediate",
        estimatedHours: 20,
        realWorldUsage: "Standard-Monitoring im Cloud-nativen Stack",
        prerequisites: ["k8s-basics"],
        resources: [
          { title: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview", type: "docs" },
          { title: "Grafana Tutorials", url: "https://grafana.com/tutorials", type: "course" },
        ],
        projects: ["Monitoring-Dashboard für eine K8s-Anwendung"],
        xpReward: 200,
      },
      {
        id: "elk-stack",
        title: "ELK Stack / OpenSearch",
        description: "Elasticsearch, Logstash, Kibana — Log-Aggregation und Analyse",
        difficulty: "advanced",
        estimatedHours: 20,
        realWorldUsage: "Zentrales Logging für Enterprise-Plattformen",
        prerequisites: ["docker-compose"],
        resources: [
          { title: "Elasticsearch Guide", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html", type: "docs" },
        ],
        projects: ["Zentrales Logging für 3 Microservices"],
        xpReward: 200,
      },
      {
        id: "opentelemetry",
        title: "OpenTelemetry & Tracing",
        description: "Distributed Tracing, Spans, Jaeger, Correlation IDs",
        difficulty: "advanced",
        estimatedHours: 15,
        realWorldUsage: "Unverzichtbar in Microservice-Architekturen",
        prerequisites: ["prometheus-grafana"],
        resources: [
          { title: "OpenTelemetry Docs", url: "https://opentelemetry.io/docs", type: "docs" },
        ],
        projects: ["Request-Tracing über 3 Microservices"],
        xpReward: 175,
      },
    ],
  },
  {
    id: "ai-infra",
    title: "KI-Infrastruktur",
    icon: "Cpu",
    color: "pink",
    description: "Infrastruktur für das Deployment und Skalieren von KI/ML-Modellen",
    nodes: [
      {
        id: "gpu-compute",
        title: "GPU Computing & CUDA",
        description: "GPU vs. CPU für KI, GPU-Instanzen auf AWS/GCP, Kostenoptimierung",
        difficulty: "advanced",
        estimatedHours: 20,
        realWorldUsage: "Training und Inferenz von LLM-Modellen",
        prerequisites: ["aws-fundamentals"],
        resources: [
          { title: "AWS GPU Instances", url: "https://aws.amazon.com/ec2/instance-types/p3", type: "docs" },
        ],
        projects: ["HuggingFace-Modell auf GPU-Instanz deployen"],
        xpReward: 300,
      },
      {
        id: "model-serving",
        title: "Model Serving",
        description: "vLLM, TorchServe, Triton Inference Server, BentoML",
        difficulty: "expert",
        estimatedHours: 30,
        realWorldUsage: "Skalierbare APIs für ML-Modelle in Produktion",
        prerequisites: ["k8s-basics", "gpu-compute"],
        resources: [
          { title: "vLLM Documentation", url: "https://docs.vllm.ai", type: "docs" },
        ],
        projects: ["LLM-Serving mit Auto-Skalierung auf K8s"],
        xpReward: 400,
      },
    ],
  },
  {
    id: "rag",
    title: "RAG-Systeme",
    icon: "Brain",
    color: "rose",
    description: "Retrieval-Augmented Generation — KI-Anwendungen mit eigenem Wissen",
    nodes: [
      {
        id: "vector-databases",
        title: "Vektordatenbanken",
        description: "Embeddings, Pinecone, Qdrant, pgvector, Similarity Search, HNSW",
        difficulty: "intermediate",
        estimatedHours: 15,
        realWorldUsage: "Kern jedes RAG-Systems und Semantic Search",
        prerequisites: ["docker-basics"],
        resources: [
          { title: "Qdrant Docs", url: "https://qdrant.tech/documentation", type: "docs" },
          { title: "pgvector GitHub", url: "https://github.com/pgvector/pgvector", type: "docs" },
        ],
        projects: ["Semantische Suche über PDF-Dokumente"],
        xpReward: 225,
      },
      {
        id: "rag-architecture",
        title: "RAG-Architektur",
        description: "Chunking, Embedding, Retrieval, Reranking, Context-Injection",
        difficulty: "advanced",
        estimatedHours: 25,
        realWorldUsage: "Enterprise-Chatbots mit eigener Wissensbasis",
        prerequisites: ["vector-databases"],
        resources: [
          { title: "LangChain RAG", url: "https://python.langchain.com/docs/use_cases/question_answering", type: "docs" },
        ],
        projects: ["Chatbot für technische Dokumentation (RAG + LLM)"],
        xpReward: 350,
      },
      {
        id: "langchain-llm",
        title: "LangChain & Orchestrierung",
        description: "Chains, Agents, Tools, Memory, Streaming, LangGraph",
        difficulty: "advanced",
        estimatedHours: 20,
        realWorldUsage: "Aufbau komplexer KI-Pipelines",
        prerequisites: ["rag-architecture"],
        resources: [
          { title: "LangChain Docs", url: "https://python.langchain.com/docs/get_started/introduction", type: "docs" },
        ],
        projects: ["Multi-Step KI-Agent zur Code-Analyse"],
        xpReward: 300,
      },
    ],
  },
  {
    id: "ai-apis",
    title: "KI-APIs",
    icon: "Zap",
    color: "amber",
    description: "Integration von LLM-APIs — OpenAI, Anthropic, Google Gemini",
    nodes: [
      {
        id: "openai-api",
        title: "OpenAI & Anthropic API",
        description: "Chat Completions, Function Calling, Structured Outputs, Fine-Tuning, Rate Limits",
        difficulty: "beginner",
        estimatedHours: 10,
        realWorldUsage: "Grundlage für KI-Features in Produkten",
        prerequisites: [],
        resources: [
          { title: "OpenAI API Docs", url: "https://platform.openai.com/docs", type: "docs" },
          { title: "Anthropic API", url: "https://docs.anthropic.com", type: "docs" },
        ],
        projects: ["KI-Assistent für Code mit Function Calling"],
        xpReward: 150,
      },
      {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        description: "Chain-of-Thought, Few-Shot, System-Prompts, Guardrails, Evaluation",
        difficulty: "intermediate",
        estimatedHours: 15,
        realWorldUsage: "Schlüssel zur Qualität von KI-Antworten",
        prerequisites: ["openai-api"],
        resources: [
          { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai", type: "course" },
        ],
        projects: ["Evaluation und Optimierung von Prompts für RAG"],
        xpReward: 175,
      },
    ],
  },
  {
    id: "system-design",
    title: "System Design",
    icon: "LayoutDashboard",
    color: "slate",
    description: "Entwurf skalierbarer, robuster verteilter Systeme",
    nodes: [
      {
        id: "system-design-basics",
        title: "System-Design-Grundlagen",
        description: "CAP-Theorem, horizontale/vertikale Skalierung, Load Balancing, Caching",
        difficulty: "intermediate",
        estimatedHours: 25,
        realWorldUsage: "Pflichtthema in jedem Senior-Bewerbungsgespräch",
        prerequisites: ["docker-compose", "aws-fundamentals"],
        resources: [
          { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "docs" },
        ],
        projects: ["Architekturentwurf für eine Twitter-ähnliche Plattform"],
        xpReward: 250,
      },
      {
        id: "microservices",
        title: "Microservices & Event-Driven",
        description: "API Gateway, Service Mesh (Istio), Kafka, CQRS, Saga-Pattern",
        difficulty: "expert",
        estimatedHours: 40,
        realWorldUsage: "Standardarchitektur in Scale-ups und Enterprise",
        prerequisites: ["system-design-basics", "k8s-basics"],
        resources: [
          { title: "Microservices.io", url: "https://microservices.io", type: "docs" },
        ],
        projects: ["E-Commerce mit 5 Microservices + Kafka + API Gateway"],
        xpReward: 500,
      },
    ],
  },
];

export const allNodes = roadmapSections.flatMap((s) => s.nodes);

export function getNodeById(id: string): RoadmapNode | undefined {
  return allNodes.find((n) => n.id === id);
}

export function getTotalXp(): number {
  return allNodes.reduce((sum, n) => sum + n.xpReward, 0);
}
