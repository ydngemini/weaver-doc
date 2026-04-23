'use client'
import { motion } from 'framer-motion'

// Pentagon: center (300,260), radius 130
const CX = 300
const CY = 260
const R  = 130  // node ring radius
const LR = 198  // label ring radius

function rad(deg: number) { return (deg * Math.PI) / 180 }
function pt(angle: number, radius: number) {
  return { x: CX + radius * Math.cos(rad(angle)), y: CY + radius * Math.sin(rad(angle)) }
}

const NODES = [
  { label: 'LOGIC',      angle: -90,  color: '#00f2ff' },
  { label: 'EMOTION',    angle: -18,  color: '#bc13fe' },
  { label: 'MEMORY',     angle:  54,  color: '#00f2ff' },
  { label: 'CREATIVITY', angle: 126,  color: '#bc13fe' },
  { label: 'VIGILANCE',  angle: 198,  color: '#00f2ff' },
]

function textAnchor(x: number): 'middle' | 'start' | 'end' {
  if (Math.abs(x - CX) < 20) return 'middle'
  return x > CX ? 'start' : 'end'
}

const pentagonPoints = NODES.map(n => {
  const p = pt(n.angle, R)
  return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
}).join(' ')

export default function LiquidFractureMoE() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center my-10"
    >
      <div
        className="rounded-sm p-4 w-full max-w-xl"
        style={{
          background: 'rgba(5,5,12,0.8)',
          border: '1px solid rgba(0,242,255,0.1)',
          boxShadow: '0 0 40px rgba(0,242,255,0.06)',
        }}
      >
        {/* Diagram label */}
        <div className="text-xs tracking-widest mb-3 text-center" style={{ color: '#bc13fe' }}>
          FIG.1 — LIQUID FRACTURE MoE // PROBABILITY FIELD ROUTER
        </div>

        <svg
          viewBox="0 0 600 520"
          width="100%"
          style={{ filter: 'drop-shadow(0 0 12px rgba(0,242,255,0.08))' }}
        >
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-magenta">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Pentagon fill + stroke */}
          <motion.polygon
            points={pentagonPoints}
            fill="rgba(0,242,255,0.025)"
            stroke="rgba(0,242,255,0.25)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Animated routing beams: center → each node */}
          {NODES.map((node, i) => {
            const np = pt(node.angle, R)
            const d = `M ${CX} ${CY} L ${np.x.toFixed(2)} ${np.y.toFixed(2)}`
            return (
              <motion.path
                key={`beam-${node.label}`}
                d={d}
                stroke={node.color}
                strokeWidth="1.5"
                fill="none"
                filter={node.color === '#00f2ff' ? 'url(#glow-cyan)' : 'url(#glow-magenta)'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity:    [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  delay: i * 0.45,
                  ease: 'easeInOut',
                }}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const np  = pt(node.angle, R)
            const lp  = pt(node.angle, LR)
            const ta  = textAnchor(lp.x)
            return (
              <g key={`node-${node.label}`}>
                {/* Outer pulse ring */}
                <motion.circle
                  cx={np.x}
                  cy={np.y}
                  r={14}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  animate={{ r: [14, 22, 14], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                />
                {/* Node body */}
                <circle
                  cx={np.x}
                  cy={np.y}
                  r={10}
                  fill={node.color === '#00f2ff' ? 'rgba(0,242,255,0.12)' : 'rgba(188,19,254,0.12)'}
                  stroke={node.color}
                  strokeWidth="1.5"
                  filter={node.color === '#00f2ff' ? 'url(#glow-cyan)' : 'url(#glow-magenta)'}
                />
                {/* Label */}
                <text
                  x={lp.x.toFixed(2)}
                  y={lp.y.toFixed(2)}
                  textAnchor={ta}
                  dominantBaseline="middle"
                  fontSize="9.5"
                  letterSpacing="1.5"
                  fontFamily="'Space Mono', monospace"
                  fill={node.color}
                  filter={node.color === '#00f2ff' ? 'url(#glow-cyan)' : 'url(#glow-magenta)'}
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Center: RAW INPUT */}
          {/* Outer rotating ring */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={42}
            fill="none"
            stroke="rgba(188,19,254,0.35)"
            strokeWidth="1"
            strokeDasharray="5 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          {/* Middle pulse ring */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={35}
            fill="none"
            stroke="rgba(0,242,255,0.2)"
            strokeWidth="1"
            animate={{ r: [35, 42, 35], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Core circle */}
          <circle
            cx={CX}
            cy={CY}
            r={30}
            fill="rgba(5,5,10,0.9)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <text x={CX} y={CY - 6}  textAnchor="middle" fontSize="8" letterSpacing="2" fontFamily="'Space Mono', monospace" fill="rgba(255,255,255,0.75)">RAW</text>
          <text x={CX} y={CY + 6}  textAnchor="middle" fontSize="8" letterSpacing="2" fontFamily="'Space Mono', monospace" fill="rgba(255,255,255,0.75)">INPUT</text>
        </svg>
      </div>
    </motion.div>
  )
}
