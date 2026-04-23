'use client'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  title?: string
  language?: string
}

export default function TerminalBlock({ children, title, language }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="my-6 rounded-sm overflow-hidden"
      style={{
        background: '#16161d',
        borderLeft: '3px solid #bc13fe',
        boxShadow:
          '-4px 0 20px rgba(188,19,254,0.15), 0 0 40px rgba(188,19,254,0.04)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid rgba(188,19,254,0.15)', background: 'rgba(188,19,254,0.05)' }}
      >
        <span className="text-xs tracking-widest" style={{ color: '#bc13fe' }}>
          {title ?? language ?? 'TERMINAL'}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a1a1a' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a1a' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1a3a1a' }} />
        </div>
      </div>
      <pre className="p-5 text-sm text-gray-300 overflow-x-auto leading-relaxed">
        <code>{children}</code>
      </pre>
    </motion.div>
  )
}
