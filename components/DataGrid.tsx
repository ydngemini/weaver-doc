'use client'
import { motion } from 'framer-motion'

interface Props {
  headers: string[]
  rows: React.ReactNode[][]
  caption?: string
}

export default function DataGrid({ headers, rows, caption }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="my-6 overflow-x-auto rounded-sm"
      style={{
        border: '1px solid rgba(0,242,255,0.1)',
        boxShadow: '0 0 30px rgba(0,242,255,0.04)',
      }}
    >
      {caption && (
        <div
          className="px-5 py-2 text-xs tracking-widest"
          style={{
            background: 'rgba(188,19,254,0.06)',
            borderBottom: '1px solid rgba(188,19,254,0.15)',
            color: '#bc13fe',
          }}
        >
          {caption}
        </div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(0,10,30,0.8)', borderBottom: '1px solid rgba(0,242,255,0.15)' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left tracking-widest font-bold"
                style={{ color: '#00f2ff' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <motion.tr
              key={ri}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.07 }}
              style={{
                borderBottom: '1px solid rgba(0,242,255,0.05)',
                background: ri % 2 === 0 ? 'rgba(0,242,255,0.01)' : 'transparent',
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-5 py-3"
                  style={{ color: ci === 0 ? '#a0b4c0' : '#5a7a8a' }}
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
