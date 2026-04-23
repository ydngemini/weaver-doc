'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Wifi, WifiOff, Globe, Database } from 'lucide-react'

type Status = 'idle' | 'loading' | 'ok' | 'error'

interface Zone { id: string; name: string; type: string }
interface DomainItem {
  id?: string
  domainName?: string
  name?: string
  status?: string
  createdDate?: string
  expireDate?: string
  autoRenew?: boolean
  [key: string]: unknown
}

interface ApiResult<T> { status: Status; data: T | null; error?: string; took?: number }

async function fetchJson<T>(url: string): Promise<ApiResult<T>> {
  const start = performance.now()
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const took = Math.round(performance.now() - start)
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }))
      return { status: 'error', data: null, error: body?.error ?? `HTTP ${res.status}`, took }
    }
    const data = (await res.json()) as T
    return { status: 'ok', data, took }
  } catch (err) {
    return { status: 'error', data: null, error: err instanceof Error ? err.message : 'Network error' }
  }
}

function StatusDot({ status }: { status: Status }) {
  const color = status === 'ok' ? '#00f2ff' : status === 'error' ? '#ff3860' : '#bc13fe'
  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      animate={status === 'loading' ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
      transition={status === 'loading' ? { duration: 0.8, repeat: Infinity } : { duration: 0.3 }}
    />
  )
}

function Badge({ children, color = '#4a6070' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="px-2 py-0.5 text-xs rounded-sm"
      style={{
        border: `1px solid ${color}44`,
        color,
        background: `${color}0a`,
        letterSpacing: '1px',
      }}
    >
      {children}
    </span>
  )
}

export default function LiveTelemetry() {
  const [zones, setZones] = useState<ApiResult<{ zones: Zone[] }>>({ status: 'idle', data: null })
  const [domains, setDomains] = useState<ApiResult<{ domains: DomainItem[] }>>({ status: 'idle', data: null })
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  const refresh = useCallback(async () => {
    setZones(s => ({ ...s, status: 'loading' }))
    setDomains(s => ({ ...s, status: 'loading' }))
    const [z, d] = await Promise.all([
      fetchJson<{ zones: Zone[] }>('/api/ionos/zones'),
      fetchJson<{ domains: DomainItem[] }>('/api/ionos/domains'),
    ])
    setZones(z)
    setDomains(d)
    setLastFetched(new Date())
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const zoneCount = zones.data?.zones?.length ?? 0
  const domainCount = domains.data?.domains?.length ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55 }}
      className="my-8 rounded-sm overflow-hidden"
      style={{
        border: '1px solid rgba(0,242,255,0.12)',
        background: 'rgba(5,5,12,0.85)',
        boxShadow: '0 0 40px rgba(0,242,255,0.05)',
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid rgba(0,242,255,0.08)', background: 'rgba(0,10,30,0.4)' }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {zones.status === 'error' || domains.status === 'error' ? (
              <WifiOff size={14} style={{ color: '#ff3860' }} />
            ) : (
              <Wifi size={14} style={{ color: '#00f2ff' }} />
            )}
          </motion.div>
          <span className="text-xs tracking-widest font-bold" style={{ color: '#00f2ff' }}>
            // LIVE IONOS TELEMETRY
          </span>
          <Badge color="#bc13fe">
            {lastFetched ? `LAST SYNC ${lastFetched.toLocaleTimeString()}` : 'STANDBY'}
          </Badge>
        </div>
        <button
          onClick={() => void refresh()}
          disabled={zones.status === 'loading' || domains.status === 'loading'}
          className="flex items-center gap-2 px-3 py-1 text-xs rounded-sm transition-colors"
          style={{
            border: '1px solid rgba(0,242,255,0.3)',
            color: '#00f2ff',
            background: 'rgba(0,242,255,0.03)',
            letterSpacing: '2px',
          }}
        >
          <motion.span
            animate={
              zones.status === 'loading' || domains.status === 'loading'
                ? { rotate: 360 }
                : { rotate: 0 }
            }
            transition={
              zones.status === 'loading' || domains.status === 'loading'
                ? { duration: 1, repeat: Infinity, ease: 'linear' }
                : { duration: 0 }
            }
          >
            <RefreshCw size={11} />
          </motion.span>
          REFRESH
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-b" style={{ borderColor: 'rgba(0,242,255,0.06)' }}>
        <StatCell icon={<Database size={13} />} label="DNS ZONES" value={zoneCount} status={zones.status} took={zones.took} />
        <StatCell icon={<Globe size={13} />}    label="DOMAINS"   value={domainCount} status={domains.status} took={domains.took} />
        <StatCell icon={<Wifi size={13} />}     label="API LATENCY"
          value={Math.max(zones.took ?? 0, domains.took ?? 0)}
          suffix="ms"
          status={zones.status === 'ok' && domains.status === 'ok' ? 'ok' : zones.status}
        />
      </div>

      {/* DNS Zones panel */}
      <DataPanel
        title="DNS ZONES"
        status={zones.status}
        error={zones.error}
        empty={zoneCount === 0}
        headers={['ZONE NAME', 'TYPE', 'ID']}
      >
        {zones.data?.zones?.map((z, i) => (
          <Row key={z.id} index={i}>
            <Cell color="#a0b4c0">{z.name}</Cell>
            <Cell><Badge color={z.type === 'NATIVE' ? '#00f2ff' : '#bc13fe'}>{z.type}</Badge></Cell>
            <Cell mono opacity={0.5}>{z.id}</Cell>
          </Row>
        ))}
      </DataPanel>

      {/* Domains panel */}
      <DataPanel
        title="DOMAIN INVENTORY"
        status={domains.status}
        error={domains.error}
        empty={domainCount === 0}
        headers={['DOMAIN', 'STATUS', 'EXPIRES', 'AUTO-RENEW']}
      >
        {domains.data?.domains?.map((d, i) => {
          const name = d.domainName ?? d.name ?? '—'
          const status = typeof d.status === 'string' ? d.status : '—'
          const expires = d.expireDate ? d.expireDate.slice(0, 10) : '—'
          const auto = d.autoRenew === true ? 'ON' : d.autoRenew === false ? 'OFF' : '—'
          return (
            <Row key={String(d.id ?? name ?? i)} index={i}>
              <Cell color="#a0b4c0">{name}</Cell>
              <Cell>
                <Badge color={status.toLowerCase().includes('active') ? '#00f2ff' : '#bc13fe'}>
                  {status}
                </Badge>
              </Cell>
              <Cell opacity={0.7}>{expires}</Cell>
              <Cell>
                <Badge color={auto === 'ON' ? '#00f2ff' : '#4a6070'}>{auto}</Badge>
              </Cell>
            </Row>
          )
        })}
      </DataPanel>

      {/* Footer */}
      <div
        className="px-5 py-2 text-xs"
        style={{
          borderTop: '1px solid rgba(0,242,255,0.06)',
          color: '#2a3a4a',
          letterSpacing: '2px',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-2">
          <StatusDot status={zones.status === 'ok' && domains.status === 'ok' ? 'ok' : zones.status === 'error' || domains.status === 'error' ? 'error' : 'loading'} />
          <span>
            SOURCE: api.hosting.ionos.com // AUTH: X-API-KEY // CHANNEL: ENCRYPTED
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function StatCell({
  icon, label, value, suffix, status, took,
}: {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
  status: Status
  took?: number
}) {
  return (
    <div className="px-5 py-4 border-r" style={{ borderColor: 'rgba(0,242,255,0.06)' }}>
      <div className="flex items-center gap-2 text-xs mb-1" style={{ color: '#4a6070', letterSpacing: '2px' }}>
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-glow-cyan" style={{ color: '#00f2ff' }}>
          {status === 'loading' ? '…' : status === 'error' ? 'ERR' : value}
        </span>
        {suffix && status === 'ok' && (
          <span className="text-xs" style={{ color: '#4a6070' }}>{suffix}</span>
        )}
        {took !== undefined && status === 'ok' && !suffix && (
          <span className="text-xs" style={{ color: '#2a3a4a' }}>{took}ms</span>
        )}
      </div>
    </div>
  )
}

function DataPanel({
  title, status, error, empty, headers, children,
}: {
  title: string
  status: Status
  error?: string
  empty: boolean
  headers: string[]
  children?: React.ReactNode
}) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(0,242,255,0.06)' }}>
      <div
        className="px-5 py-2 text-xs flex items-center justify-between"
        style={{ background: 'rgba(188,19,254,0.05)', color: '#bc13fe', letterSpacing: '3px', borderBottom: '1px solid rgba(188,19,254,0.12)' }}
      >
        <span>{title}</span>
        <StatusDot status={status} />
      </div>

      {status === 'loading' && (
        <div className="px-5 py-6 text-xs" style={{ color: '#4a6070', letterSpacing: '2px' }}>
          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>
            ▸ ESTABLISHING CHANNEL ...
          </motion.span>
        </div>
      )}

      {status === 'error' && (
        <div
          className="px-5 py-4 text-xs"
          style={{ color: '#ff3860', borderLeft: '2px solid #ff3860', background: 'rgba(255,56,96,0.04)', letterSpacing: '1px' }}
        >
          ▸ ERR: {error}
        </div>
      )}

      {status === 'ok' && empty && (
        <div className="px-5 py-4 text-xs" style={{ color: '#4a6070', letterSpacing: '2px' }}>
          ▸ NO RECORDS RETURNED
        </div>
      )}

      {status === 'ok' && !empty && (
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(0,10,30,0.5)', borderBottom: '1px solid rgba(0,242,255,0.08)' }}>
              {headers.map(h => (
                <th
                  key={h}
                  className="px-5 py-2 text-left tracking-widest font-bold"
                  style={{ color: '#00f2ff' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      )}
    </div>
  )
}

function Row({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      style={{
        borderBottom: '1px solid rgba(0,242,255,0.04)',
        background: index % 2 === 0 ? 'rgba(0,242,255,0.01)' : 'transparent',
      }}
    >
      {children}
    </motion.tr>
  )
}

function Cell({
  children, color, opacity = 1, mono,
}: {
  children: React.ReactNode
  color?: string
  opacity?: number
  mono?: boolean
}) {
  return (
    <td
      className="px-5 py-2.5"
      style={{
        color: color ?? '#5a7a8a',
        opacity,
        fontFamily: mono ? 'Space Mono, monospace' : undefined,
        fontSize: mono ? '10px' : undefined,
      }}
    >
      {children}
    </td>
  )
}
