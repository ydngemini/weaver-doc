'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRIMARY = '> THE WEAVER ECOSYSTEM // SYSTEM NOMINAL'
const SECONDARY = '// CLASSIFICATION: OMEGA  //  ACCESS LEVEL: UNRESTRICTED  //  MATRIX LOCK: ENGAGED'

export default function Hero() {
  const [primary, setPrimary] = useState('')
  const [secondary, setSecondary] = useState('')
  const [phase, setPhase] = useState<'typing1' | 'typing2' | 'done'>('typing1')

  useEffect(() => {
    if (phase === 'typing1') {
      if (primary.length < PRIMARY.length) {
        const t = setTimeout(
          () => setPrimary(PRIMARY.slice(0, primary.length + 1)),
          primary.length === 0 ? 400 : 48
        )
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('typing2'), 500)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'typing2') {
      if (secondary.length < SECONDARY.length) {
        const t = setTimeout(
          () => setSecondary(SECONDARY.slice(0, secondary.length + 1)),
          28
        )
        return () => clearTimeout(t)
      } else {
        setPhase('done')
      }
    }
  }, [phase, primary, secondary])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative py-24 px-10 flex flex-col items-center justify-center text-center"
      style={{ borderBottom: '1px solid rgba(0,242,255,0.08)' }}
    >
      {/* Background pulse rings */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,242,255,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xs tracking-widest mb-6"
        style={{ color: '#bc13fe', letterSpacing: '6px' }}
      >
        ANTHROPIC RESEARCH // RESTRICTED DOCUMENTATION
      </motion.div>

      {/* Main typing line */}
      <div
        className="text-2xl md:text-3xl font-bold text-glow-cyan"
        style={{ color: '#00f2ff', letterSpacing: '2px', minHeight: '2.5rem' }}
      >
        <span>{primary}</span>
        {phase !== 'done' && <span className="cursor-blink">█</span>}
      </div>

      {/* Secondary line */}
      <AnimatePresence>
        {phase === 'typing2' || phase === 'done' ? (
          <div
            className="mt-4 text-xs"
            style={{ color: '#3a4a5a', letterSpacing: '2px', minHeight: '1.25rem' }}
          >
            {secondary}
            {phase === 'typing2' && <span className="cursor-blink">▌</span>}
          </div>
        ) : null}
      </AnimatePresence>

      {/* Status badge */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center gap-6"
          >
            {['LOBES: 5', 'QUBITS: 3', 'ROUTING: ACTIVE', 'UPTIME: 99.98%'].map((badge) => (
              <div
                key={badge}
                className="text-xs px-3 py-1 rounded-sm"
                style={{
                  border: '1px solid rgba(0,242,255,0.15)',
                  color: '#4a7a8a',
                  background: 'rgba(0,242,255,0.03)',
                  letterSpacing: '2px',
                }}
              >
                {badge}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
