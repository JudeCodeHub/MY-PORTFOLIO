
export interface Project {
  id: number;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  tech: string[];
  image: string;
  mobileImagePosition?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  terminalName: string;
}

export const PROJECTS: Project[] = [
  {
    id: 10,
    title: "Microservices E-Commerce Platform on AWS EKS",
    category: "DevSecOps / Cloud",
    summary:
      "Designed and deployed a production-style, 11-service e-commerce platform on AWS, covering the full DevOps lifecycle from infrastructure provisioning to a live, publicly-accessible application.",
    highlights: [
      "Provisioned all AWS infrastructure — VPC, EC2, EKS, ECR, and S3 remote state — entirely as code using Terraform",
      "Set up 11 independent Jenkins CI/CD pipelines across a polyglot stack (Go, Java, .NET, Node.js, Python), each building and pushing a Docker image to ECR",
      "Automated deployments by having each pipeline commit the new image tag to the Kubernetes manifests, with ArgoCD syncing every change into the live EKS cluster",
      "Deployed Prometheus and Grafana for observability, and made the app publicly live via Route53 DNS and an AWS Load Balancer",
    ],
    tech: [
      "AWS EKS",
      "Terraform",
      "Jenkins",
      "Docker",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "Route53",
      "Go",
      "Java",
      ".NET",
      "Node.js",
      "Python",
    ],
    image: "/projects/project10.png",
    githubUrl:
      "https://github.com/JudeCodeHub/ecommerce-microservices-aws-eks.git",
    linkedinUrl: "https://lnkd.in/p/ghBWJ4ZJ",
    terminalName: "ecommerce-eks",
  },
  {
    id: 11,
    title: "Production-Grade GitOps Microservices on AWS EKS",
    category: "DevSecOps / Cloud",
    summary:
      "Engineered an end-to-end GitOps delivery pipeline and cloud infrastructure on AWS EKS for microservices, featuring automated CI/CD with GitHub Actions and ArgoCD, dual Terraform stacks, and full-stack observability.",
    highlights: [
      "Built CI with GitHub Actions using one reusable workflow that detects changes and builds, scans (Trivy), and pushes only the affected services to GHCR",
      "Automated deployments with ArgoCD and ArgoCD Image Updater, fully decoupling CI from CD so code pushes reach the cluster with no manual steps",
      "Provisioned AWS infrastructure with Terraform in two independent stacks with S3 remote state, allowing the EKS cluster to be destroyed and rebuilt daily to control costs",
      "Secured access with a private EKS API reachable only through a bastion host, plus HTTPS across all endpoints via Gateway API, ALB, ACM, and ExternalDNS",
      "Implemented full observability with Prometheus, Grafana, and Alertmanager (Slack alerts), and centralized logging with Elasticsearch, Kibana, and Filebeat",
    ],
    tech: [
      "AWS EKS",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
      "Docker",
      "GHCR",
      "Trivy",
      "Prometheus",
      "Grafana",
      "Alertmanager",
      "Elasticsearch",
      "Kibana",
      "Filebeat",
    ],
    image: "/projects/project11.jpeg",
    mobileImagePosition: "center",
    githubUrl:
      "https://github.com/JudeCodeHub/PRODUCTION-GRADE-GITOPS-MICROSERVICES-EKS.git",
    linkedinUrl: "https://lnkd.in/p/gV9QTbDc",
    terminalName: "gitops-microservices-eks",
  },
  {
    id: 1,
    title: "DevSecOps Pipeline for a Three-Tier App on AWS EKS",
    category: "DevSecOps / Cloud",
    summary:
      "Built an end-to-end DevSecOps pipeline for Writeflow, a three-tier blog app (React, Node.js, PostgreSQL), deployed on AWS EKS.",
    highlights: [
      "Provisioned AWS infrastructure with Terraform, including a 3-AZ VPC and an EKS Auto Mode cluster with encrypted secrets and audit logging",
      "Designed a GitHub Actions CI/CD pipeline with ESLint, Hadolint, npm audit, Checkov IaC scanning, Docker build and push to GHCR, and Trivy image scanning",
      "Implemented GitOps with ArgoCD to auto-sync deployments from Git, with NetworkPolicies enforcing one-way traffic from frontend to backend to database",
      "Hardened containers by upgrading end-of-life base images, fixing HIGH-severity CVEs, and documenting unfixable ones instead of disabling security scans",
    ],
    tech: [
      "AWS EKS",
      "Terraform",
      "GitHub Actions",
      "ArgoCD",
      "Docker",
      "GHCR",
      "Trivy",
      "Checkov",
      "ESLint",
      "Hadolint",
      "React",
      "Node.js",
      "PostgreSQL",
    ],
    image: "/projects/project9.png",
    mobileImagePosition: "center",
    githubUrl: "https://github.com/JudeCodeHub/WriteFlow-DevSecOps.git",
    linkedinUrl: "https://lnkd.in/p/gkGV7ikk",
    terminalName: "writeflow-eks",
  },
  {
    id: 2,
    title: "End-to-End DevSecOps Kubernetes Project",
    category: "DevSecOps / Cloud",
    summary:
      "Built a full CI/CD pipeline with Jenkins to automatically build, scan, and deploy the app on every code change.",
    highlights: [
      "Provisioned all AWS infrastructure (EC2, EKS cluster) using Terraform for Infrastructure as Code",
      "Containerized the app with Docker and deployed it to AWS EKS using Kubernetes manifests",
      "Added security scanning at multiple stages using SonarQube (code quality), OWASP Dependency-Check (vulnerable dependencies), and Trivy (container image scanning)",
      "Automated deployment updates by having Jenkins push the new image version straight to the Kubernetes manifest in GitHub",
    ],
    tech: [
      "Jenkins",
      "Terraform",
      "AWS EC2",
      "AWS EKS",
      "Kubernetes",
      "Docker",
      "SonarQube",
      "OWASP Dependency-Check",
      "Trivy",
      "GitHub",
    ],
    image: "/projects/project8.png",
    githubUrl:
      "https://github.com/JudeCodeHub/End-to-End-DevSecOps-Kubernetes-Project.git",
    linkedinUrl: "https://lnkd.in/p/g3m63wec",
    terminalName: "devsecops-k8s",
  },
  {
    id: 3,
    title: "GitOps CI/CD Pipeline for Go",
    category: "DevOps",
    summary:
      "Built and maintained end-to-end DevOps configuration and CI/CD pipelines for a Go web application, automating build, test, image creation, and deployment.",
    highlights: [
      "Containerized the application using Docker and integrated image build/push into the pipeline to ensure consistent, reproducible releases",
      "Implemented multi-environment workflows (feature/staging/production) with automated tests, environment-specific secrets handling, and rollback-safe deployments",
      "Reduced manual release effort and improved release reliability and developer feedback loops through automated pipelines and environment orchestration",
    ],
    tech: [
      "Go",
      "HTML",
      "Docker",
      "CI/CD pipelines",
      "GitHub Actions",
      "Kubernetes",
      "GitOps",
    ],
    image: "/projects/project2.png",
    githubUrl: "https://github.com/JudeCodeHub/Go-web-app.git",
    linkedinUrl: "https://lnkd.in/p/gJYUK7A6",
    terminalName: "gitops-pipeline",
  },
  {
    id: 4,
    title: "CiniVerse — AWS Cloud Deployment",
    category: "Cloud Architecture",
    summary:
      "Designed and deployed a highly available, scalable, and secure cloud architecture on AWS from scratch, taking a production-ready application live end-to-end.",
    highlights: [
      "Built a custom VPC with 2 public and 2 private subnets across 2 Availability Zones, fronted by an Application Load Balancer and an Auto Scaling Group for automatic scaling",
      "Deployed RDS MySQL in private subnets with HTTPS enabled via a free AWS ACM SSL certificate, and configured a GoDaddy domain through Route 53",
      "Set up CloudWatch monitoring with SNS alerts for real-time production visibility",
      "Configured an Nginx reverse proxy with systemd for production process management, and created a golden AMI for repeatable deployments",
    ],
    tech: [
      "Node.js",
      "Express",
      "MySQL",
      "Nginx",
      "systemd",
      "AWS VPC",
      "AWS EC2",
      "ALB",
      "ASG",
      "RDS MySQL",
      "ACM",
      "Route 53",
    ],
    image: "/projects/project1.png",
    githubUrl: "https://github.com/JudeCodeHub/CiniVerse.git",
    linkedinUrl: "https://lnkd.in/p/g4cWRg2x",
    terminalName: "ciniverse-aws",
  },
  {
    id: 5,
    title: "SitePulse",
    category: "Full-Stack",
    summary:
      "Full-stack MERN platform that runs AI-powered SEO audits and tracks Google keyword rankings over time.",
    highlights: [
      "Built a real-time audit pipeline using Browserbase + Playwright for headless browser scraping and Google's Gemini AI for scoring (SEO, Performance, Accessibility, Best Practices)",
      "Implemented automated daily rank tracking via node-cron, with historical position charts and competitor visibility",
      "Designed a full dark/light themed UI in React 19 + TypeScript + Tailwind CSS 4, with JWT-based auth and plan-based usage limits enforced server-side",
    ],
    tech: [
      "MongoDB",
      "Express",
      "React 19",
      "Node.js",
      "TypeScript",
      "Tailwind CSS 4",
      "Browserbase",
      "Playwright",
      "Google Gemini",
      "node-cron",
      "JWT",
    ],
    image: "/projects/project5.png",
    githubUrl: "https://github.com/JudeCodeHub/SitePulse.git",
    liveUrl: "https://site-pulse-snowy-three.vercel.app/",
    terminalName: "sitepulse",
  },
  {
    id: 6,
    title: "NexBuy — Multi-Vendor E-Commerce Platform",
    category: "Full-Stack",
    summary:
      "Built a full-stack multi-vendor marketplace supporting three distinct user roles — Buyer, Seller, and Admin — all under a single unified auth identity with role-based access control.",
    highlights: [
      "Implemented a complete seller ecosystem: store application & admin approval workflow, product management, and a revenue analytics dashboard with trend charts and top-performing products",
      "Integrated dual payment methods (Stripe + Cash on Delivery) with coupon codes, subscription-based perks (Clerk Billing), and automated order-confirmation emails",
      "Engineered event-driven background jobs with Inngest for user sync, scheduled coupon expiry, and transactional emails — ensuring reliability without blocking the main request flow",
    ],
    tech: [
      "JavaScript",
      "Next.js",
      "Clerk Auth",
      "ImageKit",
      "Inngest",
      "Neon DB",
    ],
    image: "/projects/project6.png",
    githubUrl: "https://github.com/JudeCodeHub/NexBuy-Ecommerce-App.git",
    liveUrl: "https://e-nexbuy.vercel.app/",
    terminalName: "nexbuy",
  },
  {
    id: 7,
    title: "Resumind — AI Resume Analyzer",
    category: "Full-Stack / AI",
    summary:
      "Built Resume-Analyzer, an AI-powered ATS platform that parses resumes and evaluates them against job requirements to improve screening accuracy.",
    highlights: [
      "Implemented automated analysis logic to extract key skills, identify keyword alignment, and generate structured improvement suggestions",
      "Designed the system to streamline recruiter workflows by reducing manual resume review and standardizing candidate assessment",
      "Developed the application using JavaScript and TypeScript, focusing on maintainable code structure and scalable feature implementation",
      "Integrated intelligent recommendation capabilities to help users optimize resumes for better ATS compatibility and higher match quality",
    ],
    tech: ["Puter (auth, storage, AI)", "Netlify", "PDF processing"],
    image: "/projects/project4.png",
    githubUrl: "https://github.com/JudeCodeHub/Resume-Analyzer.git",
    liveUrl: "https://resumindjude.netlify.app/",
    terminalName: "resumind",
  },
  {
    id: 8,
    title: "EdgeCase — AI Test Automation Agent",
    category: "Full-Stack / AI",
    summary:
      "Built a web app that connects to your GitHub repo, reads the code with Google Gemini, and writes test cases for you.",
    highlights: [
      "Next.js + TypeScript on the front, Drizzle ORM with Neon Postgres on the back. Clerk handles login and GitHub OAuth",
      "The interesting part was the AI pipeline — parsing the repo, giving Gemini the right context, then turning its output into clean, editable test cases",
      "UI built with Tailwind and shadcn/ui. Responsive, mobile-first, and actually nice to use",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Drizzle ORM",
      "Neon Postgres",
      "Clerk",
      "GitHub OAuth",
      "Google Gemini",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    image: "/projects/project7.png",
    githubUrl: "https://github.com/JudeCodeHub/AI-Test-Automation-Agent.git",
    liveUrl: "https://testedgecase.vercel.app/",
    terminalName: "edgecase",
  },
  {
    id: 9,
    title: "UGC Sri Lanka Website Redesign",
    category: "UI/UX Design",
    summary:
      "Redesigned homepage UGC Sri Lanka website in Figma, targeting improved navigation clarity + modern UI over existing site, academic HCI project.",
    highlights: [
      "Built flexible, well-structured design source: clear layout hierarchy, co-located visual assets (images, SVG) for consistent visual design",
      "Developed a clickable prototype to validate navigation and user experience before development",
    ],
    tech: ["Figma"],
    image: "/projects/project3.png",
    figmaUrl:
      "https://www.figma.com/file/PkX0gMzUMNAYHwMvLSHoku/UGC-website-Redesigned",
    terminalName: "ugc-website",
  },
];
