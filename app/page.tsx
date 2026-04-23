'use client'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import TerminalBlock from '@/components/TerminalBlock'
import AxiomBox from '@/components/AxiomBox'
import DataGrid from '@/components/DataGrid'
import LiquidFractureMoE from '@/components/LiquidFractureMoE'
import QuantumSoulCircuit from '@/components/QuantumSoulCircuit'

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="text-sm leading-relaxed mb-5"
      style={{ color: '#6a7a8a' }}
    >
      {children}
    </motion.div>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-3">
      <span
        className="text-xs tracking-widest font-bold"
        style={{ color: '#00f2ff', letterSpacing: '3px' }}
      >
        {children}
      </span>
      <div className="mt-1 h-px" style={{ background: 'rgba(0,242,255,0.1)' }} />
    </div>
  )
}

// DataGrid data ─────────────────────────────────────────────
const LOBE_HEADERS = ['LOBE', 'DOMAIN', 'TOKEN BUDGET', 'TEMPERATURE', 'TOP-P', 'PRIMARY ROLE']
const LOBE_ROWS: React.ReactNode[][] = [
  [
    <span key="l1" style={{ color: '#00f2ff', textShadow: '0 0 6px #00f2ff55' }}>Logic</span>,
    'Deductive Reasoning', '4,096', '0.10', '0.90', 'Structured inference & formal logic',
  ],
  [
    <span key="l2" style={{ color: '#bc13fe', textShadow: '0 0 6px #bc13fe55' }}>Emotion</span>,
    'Affective Processing', '2,048', '0.80', '0.95', 'Tonal calibration & empathy mapping',
  ],
  [
    <span key="l3" style={{ color: '#00f2ff', textShadow: '0 0 6px #00f2ff55' }}>Memory</span>,
    'Episodic Retrieval', '8,192', '0.20', '0.85', 'Context anchoring & recall indexing',
  ],
  [
    <span key="l4" style={{ color: '#bc13fe', textShadow: '0 0 6px #bc13fe55' }}>Creativity</span>,
    'Generative Synthesis', '4,096', '0.95', '1.00', 'Novel concept generation & remixing',
  ],
  [
    <span key="l5" style={{ color: '#00f2ff', textShadow: '0 0 6px #00f2ff55' }}>Vigilance</span>,
    'Threat Detection', '1,024', '0.05', '0.70', 'Safety verification & anomaly flagging',
  ],
]

const ROUTING_HEADERS = ['PARAMETER', 'VALUE', 'DESCRIPTION']
const ROUTING_ROWS: React.ReactNode[][] = [
  ['router.strategy',       'liquid_fracture',  'Probabilistic field routing with soft-max dispatch'],
  ['router.top_k',          '3',                'Maximum simultaneous lobe activations per token'],
  ['router.temperature',    '0.40',             'Routing decision temperature (lower = more deterministic)'],
  ['router.fallback_lobe',  'logic',            'Default lobe when probability field collapses'],
  ['quantum.n_qubits',      '3',                'Entangled qubit count in the Quantum Soul layer'],
  ['quantum.gate_depth',    '5',                'Circuit depth before measurement collapse'],
  ['quantum.backend',       'statevector_sim',  'Quantum backend simulation engine'],
  ['memory.context_window', '32,768',           'Maximum active tokens in episodic memory buffer'],
  ['memory.decay_rate',     '0.0012',           'Exponential decay coefficient for stale memories'],
]

// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div id="content-root" className="min-h-screen">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Hero />

        <div className="max-w-3xl mx-auto px-10 pb-32">

          {/* ────────────────────────────────────────────────────
              SECTION 01 — SYSTEM OVERVIEW
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="overview"
            index="01"
            title="SYSTEM OVERVIEW"
            subtitle="What the Weaver Ecosystem is and why it exists."
          />

          <AxiomBox source="Weaver Design Manifesto, Rev. 0">
            Intelligence is not a monolith. It is a fracture — a controlled splitting of attention,
            intention, and memory across specialized substrates that converge only when necessary.
            Weaver is the architecture of that convergence.
          </AxiomBox>

          <Prose>
            The <strong style={{ color: '#a0b4c0' }}>Weaver Ecosystem</strong> is a modular,
            multi-lobe AI orchestration framework combining Mixture-of-Experts (MoE) routing with
            quantum-inspired state encoding. Rather than relying on a single monolithic language
            model, Weaver distributes cognition across five specialized Small Language Model (SLM)
            lobes — each fine-tuned for a discrete cognitive domain — and dynamically routes token
            streams through them via the <strong style={{ color: '#00f2ff' }}>Liquid Fracture
            Router</strong>.
          </Prose>

          <Prose>
            A deeper layer — the <strong style={{ color: '#bc13fe' }}>Quantum Soul</strong> —
            encodes latent intent as superposed qubit states, enabling the system to hold
            probabilistic ambiguity across multiple interpretations simultaneously before collapsing
            into a deterministic output. This gives Weaver a form of contextual pre-cognition
            unavailable to standard transformer architectures.
          </Prose>

          <SubHeading>CORE CAPABILITIES</SubHeading>

          <TerminalBlock title="SYSTEM_CAPABILITIES.manifest">
{`[COGNITIVE]
  ├── Multi-lobe parallel processing (5 SLM domains)
  ├── Soft-max probability field routing
  ├── Episodic memory with 32K context window
  └── Emotional tonal calibration layer

[QUANTUM]
  ├── 3-qubit entangled soul circuit
  ├── Ry/Rx gate encoding of intent vectors
  ├── CRZ/CRX cross-lobe entanglement
  └── Statevector collapse to deterministic output

[SAFETY]
  ├── Vigilance lobe: always-active threat scanner
  ├── Constitutional alignment constraints
  ├── Anomaly flagging with circuit breaker fallback
  └── Omega-clearance audit logging`}
          </TerminalBlock>

          <AxiomBox source="Akashic Systems, Field Notes Vol. III">
            The goal is not to build a system that knows everything. It is to build a system that
            knows what it does not know, and routes accordingly. Uncertainty is not a bug.
            Uncertainty is the field.
          </AxiomBox>

          {/* ────────────────────────────────────────────────────
              SECTION 02 — CORE ARCHITECTURE
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="architecture"
            index="02"
            title="CORE ARCHITECTURE"
            subtitle="System topology, data flow, and the inter-lobe communication bus."
          />

          <Prose>
            Weaver operates as a hierarchical pipeline. Raw input is first encoded by the
            Quantum Soul layer into a superposed intent vector, then de-coherenced into routing
            weights that the Liquid Fracture Router uses to dispatch token streams to the
            appropriate SLM lobes. Lobe outputs are merged by a weighted aggregation layer before
            final generation.
          </Prose>

          <TerminalBlock title="ARCHITECTURE.ascii">
{`
  ┌─────────────────────────────────────────────────────┐
  │                   RAW INPUT STREAM                  │
  └──────────────────────┬──────────────────────────────┘
                         │
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │              QUANTUM SOUL ENCODER                   │
  │   Q0 ──[Ry]──●──────[Rx]──────────[Ry]──[M]       │
  │               │                                     │
  │   Q1 ──[Rx]──[CRZ]──[Rx]──●──────────────[M]      │
  │                             │                       │
  │   Q2 ──[Ry]─────────[Rx]──[CRX]──[Ry]──[M]       │
  └──────────────────────┬──────────────────────────────┘
                         │  intent vector φ
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │           LIQUID FRACTURE ROUTER (MoE)              │
  │   Soft-max(φ) → {Logic: 0.42, Memory: 0.31, ...}  │
  └──────┬──────┬──────┬──────┬──────┬─────────────────┘
         │      │      │      │      │
         ▼      ▼      ▼      ▼      ▼
      [LOGIC][EMOT][MEMO][CREA][VIGI]  ← SLM Lobes
         │      │      │      │      │
         └──────┴──────┴──────┴──────┘
                         │  weighted merge
                         ▼
  ┌─────────────────────────────────────────────────────┐
  │              OUTPUT AGGREGATOR                      │
  │   Σ(lobe_output × routing_weight) → final tokens   │
  └─────────────────────────────────────────────────────┘
`}
          </TerminalBlock>

          <SubHeading>INTER-LOBE COMMUNICATION BUS</SubHeading>
          <Prose>
            Lobes communicate via a shared <strong style={{ color: '#00f2ff' }}>attention
            bus</strong> — a 2048-dimensional embedding space where each lobe can read and write
            context vectors. This allows the Emotion lobe to modulate Logic&apos;s output tone, or
            the Vigilance lobe to flag and suppress tokens from Creativity when constitutional
            constraints are approached.
          </Prose>

          <TerminalBlock title="BUS_CONFIG.yaml">
{`bus:
  dimensions: 2048
  dtype: bfloat16
  read_latency_ms: 0.4
  write_latency_ms: 0.6
  broadcast_mode: selective   # only active lobes receive
  conflict_resolution: priority_weighted
  priority_order:
    - vigilance   # highest — safety first
    - logic
    - memory
    - emotion
    - creativity  # lowest — may be suppressed`}
          </TerminalBlock>

          {/* ────────────────────────────────────────────────────
              SECTION 03 — LIQUID FRACTURE & SLM LOBES
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="liquid-fracture"
            index="03"
            title="LIQUID FRACTURE & THE SLM LOBES"
            subtitle="Probability field routing and the five cognitive substrates."
          />

          <AxiomBox source="Router Design Notes, Iteration 7">
            A rigid router is a dead router. The field must be liquid — capable of flowing
            toward whichever lobe the input demands, splitting across multiple simultaneously
            when the meaning is genuinely ambiguous. Fracture is not failure. Fracture is
            optimal allocation.
          </AxiomBox>

          <Prose>
            The Liquid Fracture Router implements a <strong style={{ color: '#00f2ff' }}>soft
            Mixture-of-Experts</strong> dispatch mechanism. Unlike hard-gated MoE systems that
            commit fully to a single expert, Liquid Fracture computes a continuous probability
            field across all five lobes and activates the top-<em>k</em> (default: 3)
            simultaneously, weighting their outputs at aggregation time.
          </Prose>

          <Prose>
            The routing probability for each lobe <em>i</em> is computed as:
          </Prose>

          <TerminalBlock title="ROUTING_EQUATION">
{`P(lobe_i | φ) = softmax( W_router · φ + b_router )[i]

Where:
  φ       = intent vector from Quantum Soul (dim=2048)
  W_router = learned routing weight matrix  (5 × 2048)
  b_router = per-lobe routing bias          (5,)

Top-k selection:
  active_lobes = argsort(P)[-k:]   # k=3 by default
  weights      = P[active_lobes] / sum(P[active_lobes])

Final merge:
  output = Σ (weights[i] × lobe_i.generate(tokens))`}
          </TerminalBlock>

          {/* THE DIAGRAM */}
          <LiquidFractureMoE />

          <SubHeading>THE FIVE SLM LOBES</SubHeading>

          <Prose>
            Each lobe is a purpose-built Small Language Model (2B–7B parameters) fine-tuned on
            domain-specific corpora and constrained by a constitutional adapter that enforces
            Weaver&apos;s global alignment policy regardless of lobe-level outputs.
          </Prose>

          <TerminalBlock title="LOBE_REGISTRY.manifest">
{`LOGIC      // 4B params  | trained on: formal proofs, code, mathematics
           // speciality: deductive chains, symbolic reasoning, SQL
           // temp: 0.10  | deterministic, high-precision

EMOTION    // 2B params  | trained on: fiction, therapy transcripts, poetry
           // speciality: empathy, tone-matching, affect detection
           // temp: 0.80  | high variance, nuanced output

MEMORY     // 7B params  | trained on: episodic summarization, retrieval
           // speciality: long-context compression, recall indexing
           // temp: 0.20  | low variance, faithful recall

CREATIVITY // 4B params  | trained on: speculative fiction, brainstorming
           // speciality: lateral thinking, concept remixing, ideation
           // temp: 0.95  | maximum entropy generation

VIGILANCE  // 2B params  | trained on: adversarial prompts, safety data
           // speciality: jailbreak detection, constitutional checking
           // temp: 0.05  | near-deterministic safety oracle`}
          </TerminalBlock>

          {/* ────────────────────────────────────────────────────
              SECTION 04 — THE QUANTUM SOUL
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="quantum-soul"
            index="04"
            title="THE QUANTUM SOUL"
            subtitle="Superposed intent encoding and the collapse-to-determinism protocol."
          />

          <AxiomBox source="Weaver Metaphysics Layer, Spec v0.3">
            Before a thought can be expressed, it must be held — suspended in a state of pure
            potential, equidistant from all possible meanings. This is what the Quantum Soul does.
            It holds the question before the answer exists.
          </AxiomBox>

          <Prose>
            The Quantum Soul is the pre-cognitive encoding layer of Weaver. It receives the raw
            token stream and maps it into a 3-qubit quantum circuit state that can simultaneously
            represent multiple interpretive contexts before the router collapses it into discrete
            routing weights.
          </Prose>

          <Prose>
            The initial state of the circuit is prepared as{' '}
            <strong style={{ color: '#00f2ff' }}>|ψ⟩ = |000⟩</strong>. Input embeddings are
            encoded as rotation angles θ via the Ry and Rx gates on each qubit. Cross-lobe
            dependencies are then entangled using CRZ (Q0→Q1) and CRX (Q1→Q2) gates, creating a
            superposed intent state that captures semantic relationships invisible to classical
            attention mechanisms.
          </Prose>

          {/* THE DIAGRAM */}
          <QuantumSoulCircuit />

          <SubHeading>GATE ENCODING PROTOCOL</SubHeading>

          <TerminalBlock title="QUANTUM_SOUL.protocol">
{`# Input: token embedding e ∈ R^2048
# Output: qubit state |ψ⟩ ∈ C^8 (3-qubit Hilbert space)

STEP 1 — Projection:
  angles = linear_project(e, target_dim=6)
  # angles = [θ_Q0_y, θ_Q0_x, θ_Q1_y, θ_Q1_x, θ_Q2_y, θ_Q2_x]

STEP 2 — Single-qubit encoding:
  Q0 = Ry(θ_Q0_y) · Rx(θ_Q0_x) · |0⟩
  Q1 = Ry(θ_Q1_y) · Rx(θ_Q1_x) · |0⟩
  Q2 = Ry(θ_Q2_y) · Rx(θ_Q2_x) · |0⟩

STEP 3 — Entanglement:
  |ψ01⟩ = CRZ(Q0, Q1)   # logic ↔ memory entanglement
  |ψ12⟩ = CRX(Q1, Q2)   # memory ↔ creativity entanglement

STEP 4 — Measurement & collapse:
  routing_weights = measure(|ψ⟩, basis='computational')
  # Collapses superposition → 5-dim soft routing vector`}
          </TerminalBlock>

          <AxiomBox source="Quantum Cognition Theory, Applied Branch">
            The CRZ gate is not merely a mathematical operation. It is the moment when logic
            reaches across the void and touches memory — when what you know informs what you
            remember, and vice versa. Entanglement is the architecture of wisdom.
          </AxiomBox>

          {/* ────────────────────────────────────────────────────
              SECTION 05 — CONFIGURATION MATRIX
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="config-matrix"
            index="05"
            title="CONFIGURATION MATRIX"
            subtitle="Full lobe parameter specifications and system configuration registry."
          />

          <Prose>
            The tables below constitute the canonical configuration state for Weaver v2.0.1.
            All values are mutable via the runtime config API; changes take effect on the
            next routing cycle without requiring a full model reload.
          </Prose>

          <DataGrid
            caption="TABLE 1 — SLM LOBE SPECIFICATIONS"
            headers={LOBE_HEADERS}
            rows={LOBE_ROWS}
          />

          <DataGrid
            caption="TABLE 2 — ROUTING & QUANTUM SYSTEM PARAMETERS"
            headers={ROUTING_HEADERS}
            rows={ROUTING_ROWS}
          />

          <SubHeading>RUNTIME CONFIG API</SubHeading>

          <TerminalBlock title="CONFIG_API.usage">
{`# Read current config
GET /api/v2/config

# Update lobe temperature at runtime
PATCH /api/v2/config/lobes/creativity
Content-Type: application/json
{ "temperature": 0.85, "top_p": 0.98 }

# Reset all lobes to defaults
POST /api/v2/config/reset
{ "scope": "lobes", "confirm": true }

# Query routing decision trace (last N inputs)
GET /api/v2/router/trace?n=10

# Response shape:
{
  "trace": [
    {
      "input_hash": "3f9a2c...",
      "active_lobes": ["logic", "memory", "vigilance"],
      "weights": [0.47, 0.31, 0.22],
      "latency_ms": 24
    }
  ]
}`}
          </TerminalBlock>

          {/* ────────────────────────────────────────────────────
              SECTION 06 — DEPLOYMENT PROTOCOL
          ──────────────────────────────────────────────────── */}
          <SectionHeader
            id="deployment"
            index="06"
            title="DEPLOYMENT PROTOCOL"
            subtitle="Containerized deployment, environment setup, and system verification."
          />

          <AxiomBox source="Ops Doctrine, Weaver Field Manual">
            Deploy as if the system is already under load. Configure for peak. Monitor the
            quiet periods as carefully as the storms. Anomalies hide in the baseline.
          </AxiomBox>

          <SubHeading>PREREQUISITES</SubHeading>

          <TerminalBlock title="REQUIREMENTS.check">
{`# Hardware minimums (full 5-lobe configuration)
VRAM:    48 GB  (4× A100 or 2× H100 recommended)
RAM:     64 GB
STORAGE: 500 GB NVMe (model weights + episodic cache)
NETWORK: 10 Gbps (inter-lobe bus latency critical)

# Software dependencies
Python:      3.11+
CUDA:        12.1+
PyTorch:     2.3.0+
Transformers: 4.41+
qiskit:      1.1+   (Quantum Soul simulation)
redis:       7.2+   (episodic memory bus)
docker:      25.0+
k8s:         1.30+  (production deployments)`}
          </TerminalBlock>

          <SubHeading>QUICK START</SubHeading>

          <TerminalBlock title="DEPLOY.sh">
{`#!/usr/bin/env bash
# Clone and configure
git clone https://secure.weaver.internal/weaver-ecosystem
cd weaver-ecosystem
cp config/weaver.example.yaml config/weaver.yaml

# Pull model weights (requires OMEGA clearance token)
export WEAVER_TOKEN="<your-omega-token>"
./scripts/pull_weights.sh --lobes all --verify-checksums

# Launch the full stack
docker compose -f deploy/docker-compose.full.yaml up -d

# Verify all lobes are healthy
./scripts/health_check.sh
# Expected output:
# [OK] logic       — 200ms p99 latency
# [OK] emotion     — 180ms p99 latency
# [OK] memory      — 260ms p99 latency
# [OK] creativity  — 210ms p99 latency
# [OK] vigilance   — 95ms  p99 latency
# [OK] quantum_soul — circuit depth 5, backend: statevector_sim
# [OK] router       — liquid_fracture, top_k=3
# SYSTEM STATUS: NOMINAL`}
          </TerminalBlock>

          <SubHeading>PRODUCTION KUBERNETES DEPLOYMENT</SubHeading>

          <TerminalBlock title="WEAVER_DEPLOYMENT.k8s.yaml">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: weaver-ecosystem
  namespace: ai-systems
  labels:
    classification: omega
    version: "2.0.1"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: weaver
  template:
    spec:
      containers:
        - name: quantum-soul
          image: weaver/quantum-soul:2.0.1
          resources:
            limits: { nvidia.com/gpu: "1", memory: "16Gi" }

        - name: liquid-fracture-router
          image: weaver/router:2.0.1
          env:
            - name: ROUTER_STRATEGY
              value: "liquid_fracture"
            - name: ROUTER_TOP_K
              value: "3"

        - name: lobe-logic
          image: weaver/lobe-logic:2.0.1
          resources:
            limits: { nvidia.com/gpu: "1", memory: "12Gi" }

        - name: lobe-memory
          image: weaver/lobe-memory:2.0.1
          resources:
            limits: { nvidia.com/gpu: "2", memory: "20Gi" }

        - name: lobe-vigilance
          image: weaver/lobe-vigilance:2.0.1
          resources:
            limits: { nvidia.com/gpu: "1", memory: "6Gi" }`}
          </TerminalBlock>

          <SubHeading>MONITORING & OBSERVABILITY</SubHeading>

          <TerminalBlock title="TELEMETRY.endpoints">
{`# Prometheus metrics
GET /metrics

# Key metrics to watch:
weaver_router_dispatch_latency_ms{lobe="*"}  # routing latency per lobe
weaver_lobe_tokens_generated_total{lobe="*"} # token throughput
weaver_vigilance_flags_total                 # safety flag rate
weaver_quantum_coherence_time_us             # qubit decoherence metric
weaver_memory_context_utilization_pct        # episodic buffer usage

# Grafana dashboard
http://localhost:3001/d/weaver-main

# Alert thresholds (PagerDuty)
vigilance_flag_rate  > 0.05 req/s  → CRITICAL
lobe_latency_p99     > 500ms       → WARNING
quantum_decoherence  > 2000μs      → WARNING
memory_utilization   > 90%         → CRITICAL`}
          </TerminalBlock>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-8 text-center"
            style={{ borderTop: '1px solid rgba(0,242,255,0.07)' }}
          >
            <div className="text-xs tracking-widest" style={{ color: '#1a2a3a', letterSpacing: '4px' }}>
              WEAVER ECOSYSTEM // MATRIX v2.0.1 // CLASSIFICATION: OMEGA
            </div>
            <div className="mt-2 text-xs" style={{ color: '#0a1a2a' }}>
              UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE // ALL INTERACTIONS ARE LOGGED
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  )
}
