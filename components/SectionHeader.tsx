'use client'
import { motion } from 'framer-motion'

interface Props {
  id: string
  index: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ id, index, title, subtitle }: Props) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="pt-16 mb-8 scroll-mt-8"
    >
      <div className="text-xs tracking-widest mb-2" style={{ color: '#bc13fe' }}>
        // SECTION_{index}
      </div>
      <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm" style={{ color: '#4a6070' }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 h-px w-full"
        style={{ background: 'linear-gradient(90deg, #00f2ff 0%, rgba(0,242,255,0.1) 40%, transparent 80%)' }}
      />
    </motion.div>
  )
}
