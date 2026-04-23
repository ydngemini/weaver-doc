'use client'
import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050508',
            color: '#ff3860',
            fontFamily: "'Space Mono', monospace",
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '1rem', color: '#bc13fe' }}>
            // SYSTEM FAULT
          </div>
          <h1 style={{ fontSize: '1.5rem', color: '#ff3860', marginBottom: '1rem' }}>
            RENDER FAILURE
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#6a7a8a', maxWidth: '480px', lineHeight: 1.6 }}>
            A client-side error prevented the interface from rendering.
            Try reloading the page. If the issue persists, clear your browser cache.
          </p>
          <pre
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255,56,96,0.06)',
              border: '1px solid rgba(255,56,96,0.2)',
              borderRadius: '4px',
              fontSize: '0.7rem',
              color: '#ff3860',
              maxWidth: '600px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {this.state.error?.message ?? 'Unknown error'}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1.5rem',
              background: 'rgba(0,242,255,0.05)',
              border: '1px solid rgba(0,242,255,0.3)',
              color: '#00f2ff',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            RELOAD
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
