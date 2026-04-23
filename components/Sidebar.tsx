'use client'
import { motion } from 'framer-motion'
import { Terminal, Cpu, GitBranch, Atom, Table2, Rocket, Shield, Radio } from 'lucide-react'

const NAV = [
  { id: 'overview',       label: 'System Overview',         icon: Terminal  },
  { id: 'architecture',   label: 'Core Architecture',        icon: Cpu       },
  { id: 'liquid-fracture',label: 'Liquid Fracture & Lobes', icon: GitBranch },
  { id: 'quantum-soul',   label: 'The Quantum Soul',         icon: Atom      },
  { id: 'config-matrix',  label: 'Configuration Matrix',     icon: Table2    },
  { id: 'live-telemetry', label: 'Live Telemetry',           icon: Radio     },
  { id: 'deployment',     label: 'Deployment Protocol',      icon: Rocket    },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-full w-64 flex flex-col z-50"
      style={{
        background: 'rgba(5, 5, 8, 0.97)',
        borderRight: '1px solid rgba(0, 242, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s',
      }}
      whileHover={{ borderRightColor: 'rgba(0,242,255,0.35)' } as never}
    >
      {/* Logo */}
      <div className="px-6 py-8" style={{ borderBottom: '1px solid rgba(0,242,255,0.07)' }}>
        <div
          className="text-xs tracking-widest text-glow-cyan"
          style={{ color: '#00f2ff', letterSpacing: '6px' }}
        >
          WEAVER
        </div>
        <div className="text-xl font-bold text-white mt-1 tracking-wide">ECOSYSTEM</div>
        <div className="text-xs mt-1 tracking-widest" style={{ color: '#bc13fe' }}>
          // MATRIX v2.0.1
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-6 py-3" style={{ borderBottom: '1px solid rgba(0,242,255,0.04)' }}>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: '#00f2ff', boxShadow: '0 0 6px #00f2ff' }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-xs tracking-widest" style={{ color: '#00f2ff' }}>
            SYSTEM NOMINAL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <div className="text-xs px-3 mb-3 tracking-widest" style={{ color: '#2a3a4a' }}>
          // SECTIONS
        </div>
        {NAV.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs tracking-wide border-l-2 border-transparent"
              style={{ color: '#5a6a7a' }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.08, ease: 'easeOut' }}
              whileHover={{ x: 4 }}
            >
              <Icon size={13} strokeWidth={1.5} />
              <span>{item.label}</span>
            </motion.a>
          )
        })}
      </nav>

      {/* Classification footer */}
      <div className="px-6 py-4" style={{ borderTop: '1px solid rgba(0,242,255,0.04)' }}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={10} style={{ color: '#bc13fe' }} />
          <span className="text-xs" style={{ color: '#3a2a4a', letterSpacing: '2px' }}>
            CLASSIFICATION
          </span>
        </div>
        <div className="text-xs" style={{ color: '#bc13fe', letterSpacing: '3px' }}>OMEGA-CLEARANCE</div>
        <div className="text-xs mt-1" style={{ color: '#2a3a4a' }}>ACCESS: GRANTED</div>
      </div>
    </motion.aside>
  )
}
