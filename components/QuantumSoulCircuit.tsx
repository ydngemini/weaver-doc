'use client'
import { motion } from 'framer-motion'

// Layout constants
const Y = { Q0: 80, Q1: 160, Q2: 240 }
const X_START = 80
const X_END   = 640

// Gate box helper
function GateBox({
  x, y, label, color = '#00f2ff',
}: { x: number; y: number; label: string; color?: string }) {
  return (
    <g>
      <rect
        x={x - 22} y={y - 14}
        width={44} height={28}
        rx={3}
        fill="rgba(5,5,14,0.9)"
        stroke={color}
        strokeWidth="1.2"
        style={{ filter: `drop-shadow(0 0 4px ${color}44)` }}
      />
      <text
        x={x} y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontFamily="'Space Mono', monospace"
        fill={color}
        letterSpacing="0.5"
      >
        {label}
      </text>
    </g>
  )
}

// Control dot (filled circle on control qubit)
function ControlDot({ x, y, color = '#bc13fe' }: { x: number; y: number; color?: string }) {
  return (
    <circle
      cx={x} cy={y} r={5}
      fill={color}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }}
    />
  )
}

// Entanglement vertical line with pulsing animation
function EntangleLine({ x, y1, y2, color, delay }: { x: number; y1: number; y2: number; color: string; delay: number }) {
  return (
    <motion.line
      x1={x} y1={y1} x2={x} y2={y2}
      stroke={color}
      strokeWidth="1.5"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    />
  )
}

// Moving signal dot along qubit wire
function SignalDot({ y, delay }: { y: number; delay: number }) {
  return (
    <motion.circle
      cx={0} cy={y} r={3}
      fill="#00f2ff"
      animate={{ cx: [X_START, X_END] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'linear' }}
      style={{ filter: 'drop-shadow(0 0 5px #00f2ff)' }}
    />
  )
}

export default function QuantumSoulCircuit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center my-10"
    >
      <div
        className="rounded-sm p-4 w-full max-w-2xl"
        style={{
          background: 'rgba(5,5,12,0.8)',
          border: '1px solid rgba(0,242,255,0.1)',
          boxShadow: '0 0 40px rgba(0,242,255,0.06)',
        }}
      >
        <div className="text-xs tracking-widest mb-3 text-center" style={{ color: '#bc13fe' }}>
          FIG.2 — QUANTUM SOUL CIRCUIT // ENTANGLEMENT FIELD ACTIVE
        </div>

        <svg viewBox="0 0 720 320" width="100%">
          <defs>
            <filter id="q-glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Qubit labels */}
          {(['Q0', 'Q1', 'Q2'] as const).map((q, i) => (
            <text
              key={q}
              x={52}
              y={Object.values(Y)[i] + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontFamily="'Space Mono', monospace"
              fill="#00f2ff"
              filter="url(#q-glow)"
              letterSpacing="0.5"
            >
              {q}
            </text>
          ))}

          {/* Qubit wires */}
          {Object.values(Y).map((y, i) => (
            <line
              key={`wire-${i}`}
              x1={X_START} y1={y} x2={X_END} y2={y}
              stroke="rgba(0,242,255,0.18)"
              strokeWidth="1.5"
            />
          ))}

          {/* ── Column 1: Ry(Q0), Rx(Q1), Ry(Q2) at x=150 ── */}
          <GateBox x={150} y={Y.Q0} label="Ry" color="#00f2ff" />
          <GateBox x={150} y={Y.Q1} label="Rx" color="#00f2ff" />
          <GateBox x={150} y={Y.Q2} label="Ry" color="#00f2ff" />

          {/* ── Column 2: CRZ (Q0 → Q1) at x=270 ── */}
          <EntangleLine x={270} y1={Y.Q0} y2={Y.Q1} color="#bc13fe" delay={0} />
          <ControlDot   x={270} y={Y.Q0} color="#bc13fe" />
          <GateBox      x={270} y={Y.Q1} label="CRZ" color="#bc13fe" />
          {/* CRZ label between lines */}
          <text x={288} y={(Y.Q0 + Y.Q1) / 2} fontSize="8" fontFamily="'Space Mono',monospace" fill="rgba(188,19,254,0.5)" letterSpacing="1">CRZ</text>

          {/* ── Column 3: Rx(Q0), Rx(Q1) at x=380 ── */}
          <GateBox x={380} y={Y.Q0} label="Rx" color="#00f2ff" />
          <GateBox x={380} y={Y.Q1} label="Rx" color="#00f2ff" />

          {/* ── Column 4: CRX (Q1 → Q2) at x=480 ── */}
          <EntangleLine x={480} y1={Y.Q1} y2={Y.Q2} color="#bc13fe" delay={0.8} />
          <ControlDot   x={480} y={Y.Q1} color="#bc13fe" />
          <GateBox      x={480} y={Y.Q2} label="CRX" color="#bc13fe" />
          <text x={498} y={(Y.Q1 + Y.Q2) / 2} fontSize="8" fontFamily="'Space Mono',monospace" fill="rgba(188,19,254,0.5)" letterSpacing="1">CRX</text>

          {/* ── Column 5: Ry(Q0), Ry(Q2) at x=580 ── */}
          <GateBox x={580} y={Y.Q0} label="Ry" color="#00f2ff" />
          <GateBox x={580} y={Y.Q2} label="Ry" color="#00f2ff" />

          {/* Signal dots traveling along each wire */}
          <SignalDot y={Y.Q0} delay={0}   />
          <SignalDot y={Y.Q1} delay={1.1} />
          <SignalDot y={Y.Q2} delay={2.2} />

          {/* Measurement indicators (end of circuit) */}
          {Object.values(Y).map((y, i) => (
            <g key={`meas-${i}`}>
              <rect
                x={X_END} y={y - 12}
                width={24} height={24}
                rx={2}
                fill="rgba(0,242,255,0.06)"
                stroke="rgba(0,242,255,0.3)"
                strokeWidth="1"
              />
              <text
                x={X_END + 12} y={y + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="10" fontFamily="'Space Mono',monospace"
                fill="rgba(0,242,255,0.6)"
              >
                M
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-2">
          {[
            { color: '#00f2ff', label: 'Single-Qubit Gate' },
            { color: '#bc13fe', label: 'Entanglement Gate' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: color, opacity: 0.7 }} />
              <span className="text-xs" style={{ color: '#4a6070', letterSpacing: '1px' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
