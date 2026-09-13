'use client'

import { useEffect, useState } from 'react'

interface WhatsAppButtonProps {
  phoneNumber: string // e.g. "447700000000" — no + or spaces
  message?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hi, I'd like to get a cleaning quote for my property.",
}: WhatsAppButtonProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  // Auto-show tooltip once per session
  useEffect(() => {
    const shown = sessionStorage.getItem('wa_tip')
    if (!shown) {
      const t1 = setTimeout(() => setTooltipVisible(true), 2000)
      const t2 = setTimeout(() => setTooltipVisible(false), 5000)
      sessionStorage.setItem('wa_tip', '1')
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [])

  return (
    <div
      className="float-whatsapp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}
    >
      {/* Tooltip */}
      <div
        id="whatsapp-tooltip"
        aria-hidden={!tooltipVisible}
        role="tooltip"
        style={{
          backgroundColor: '#fff',
          color: '#1a1a1a',
          fontSize: '13px',
          fontWeight: 500,
          padding: '10px 14px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          whiteSpace: 'nowrap',
          opacity: tooltipVisible ? 1 : 0,
          transform: tooltipVisible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        Chat with us on WhatsApp
      </div>

      {/* Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        aria-describedby={tooltipVisible ? 'whatsapp-tooltip' : undefined}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onFocus={() => setTooltipVisible(true)}
        onBlur={() => setTooltipVisible(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
          textDecoration: 'none',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="white" aria-hidden="true">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.734 5.47 2.018 7.77L0 32l8.43-2.21A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.12a13.06 13.06 0 01-6.657-1.82l-.476-.283-4.944 1.296 1.32-4.824-.31-.494A13.072 13.072 0 012.88 16C2.88 9.304 8.304 3.88 16 3.88S29.12 9.304 29.12 16 23.696 29.12 16 29.12zm7.14-9.795c-.39-.196-2.31-1.14-2.668-1.27-.36-.13-.62-.195-.88.196-.26.39-1.01 1.27-1.236 1.53-.227.26-.455.293-.845.098-.39-.196-1.645-.607-3.134-1.933-1.158-1.033-1.94-2.308-2.167-2.7-.226-.39-.024-.6.17-.795.175-.174.39-.455.585-.683.196-.228.26-.39.39-.65.13-.26.065-.487-.033-.683-.098-.196-.88-2.12-1.205-2.902-.317-.763-.64-.66-.88-.672l-.748-.013c-.26 0-.683.097-1.04.487-.357.39-1.364 1.333-1.364 3.25s1.397 3.77 1.592 4.032c.196.26 2.75 4.194 6.666 5.884.93.402 1.657.642 2.223.822.934.297 1.785.255 2.457.155.749-.113 2.31-.944 2.635-1.856.326-.912.326-1.694.228-1.856-.097-.163-.357-.26-.748-.456z"/>
        </svg>
      </a>
    </div>
  )
}
