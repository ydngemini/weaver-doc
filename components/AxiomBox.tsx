'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  source?: string
}

export default function AxiomBox({ children, source }: Props) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="relative my-6 pl-6 pr-5 py-5 rounded-r-sm"
      style={{
        borderLeft: '3px solid #00f2ff',
        background: 'rgba(0,242,255,0.03)',
        boxShadow: '4px 0 0 rgba(0,242,255,0.02), -4px 0 24px rgba(0,242,255,0.06)',
      }}
    >
      {/* Decorative top-left corner mark */}
      <div
        className="absolute top-2 left-6 text-xs tracking-widest"
        style={{ color: 'rgba(0,242,255,0.25)', fontSize: '9px' }}
      >
        AXIOM
      </div>
      <p className="mt-3 text-sm leading-relaxed italic" style={{ color: '#6a7a8a' }}>
        {children}
      </p>
      {source && (
        <footer className="mt-3 text-xs tracking-widest" style={{ color: '#00f2ff', opacity: 0.55 }}>
          — {source}
        </footer>
      )}
    </motion.blockquote>
  )
}
