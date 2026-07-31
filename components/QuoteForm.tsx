'use client'

import {
  cloneElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import {
  QUOTE_REQUEST_LIMITS,
  validateQuoteRequest,
  type QuoteRequestField,
} from '@/lib/inbound-submission-validation'
import type { ServiceType, Urgency } from '@/types/inbound-submission'
import { businessProfile } from '@/config/business'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const SERVICE_OPTIONS: ServiceType[] = [
  'End of Tenancy',
  'Airbnb / Short-Let',
  'Office Cleaning',
  'Domestic',
  'Deep Clean',
  'Gym & Studio',
  'Other',
]

const SERVICE_LABELS: Record<ServiceType, string> = {
  'End of Tenancy': 'End-of-tenancy cleaning',
  'Airbnb / Short-Let': 'Airbnb & short-let cleaning',
  'Office Cleaning': 'Office cleaning',
  Domestic: 'Domestic cleaning',
  'Deep Clean': 'Deep cleaning',
  'Gym & Studio': 'Gym & studio cleaning',
  Other: 'Other',
}

const URGENCY_OPTIONS: { value: Urgency; label: string; color: string }[] = [
  { value: 'High', label: 'High', color: '#e24b4a' },
  { value: 'Medium', label: 'Medium', color: '#ef9f27' },
  { value: 'Low', label: 'Low', color: '#639922' },
]

interface FormData {
  name: string
  phone: string
  email: string
  service_type: ServiceType | ''
  postcode: string
  property_type: string
  bedrooms: string
  bathrooms: string
  preferred_date: string
  urgency: Urgency
  parking_access: string
  photo_url: string
  message: string
  consent: boolean
  website: string
}

const INITIAL: FormData = {
  name: '',
  phone: '',
  email: '',
  service_type: '',
  postcode: '',
  property_type: '',
  bedrooms: '',
  bathrooms: '',
  preferred_date: '',
  urgency: 'Medium',
  parking_access: '',
  photo_url: '',
  message: '',
  consent: false,
  website: '',
}

type FieldErrors = Partial<Record<keyof FormData, string>>

type ApiErrorBody = {
  ok?: false
  code?: string
  message?: string
  errors?: Record<string, string>
}

const FIELD_LABELS: Partial<Record<keyof FormData, string>> = {
  name: 'Full name',
  phone: 'Phone',
  email: 'Email',
  service_type: 'Service type',
  postcode: 'Property postcode',
  property_type: 'Property type',
  bedrooms: 'Bedrooms',
  bathrooms: 'Bathrooms',
  preferred_date: 'Preferred date',
  urgency: 'Urgency',
  parking_access: 'Parking and access notes',
  photo_url: 'Property photos',
  message: 'Additional details',
  consent: 'Permission to respond',
}

const PUBLIC_FIELDS = new Set(Object.keys(FIELD_LABELS))
const URGENCY_RADIO_IDS: Record<Urgency, string> = {
  High: 'urgency-high',
  Medium: 'urgency-medium',
  Low: 'urgency-low',
}
const SUMMARY_TARGETS: Partial<Record<keyof FormData, string>> = {
  urgency: URGENCY_RADIO_IDS.Medium,
}
const today = new Date().toISOString().split('T')[0]

function userMessageForStatus(status: number, body: ApiErrorBody | null) {
  if (status === 429) return 'Too many requests have been sent. Please wait a few minutes and try again.'
  if (status === 400 && body?.code === 'SUBMISSION_REJECTED') {
    return 'We could not accept this request. Please refresh the page and try again.'
  }
  if (status === 500) return 'We could not save your request. Please try again later.'
  if (status === 503) return 'The quote request service is temporarily unavailable. Please try again later.'
  return body?.message || 'Something went wrong. Please try again, or contact us directly.'
}

export function QuoteForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<FormState>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummaryRef.current?.focus()
  }, [errors])

  useEffect(() => {
    if (state === 'success') successRef.current?.focus()
  }, [state])

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((previous) => ({ ...previous, [key]: value }))
    setServerMessage('')

    if (errors[key]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[key]
        return next
      })
    }

    if (state === 'error') setState('idle')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setServerMessage('')

    const validation = validateQuoteRequest(form)
    if (!validation.ok) {
      const visibleErrors = Object.fromEntries(
        Object.entries(validation.errors).filter(([key]) => PUBLIC_FIELDS.has(key)),
      ) as FieldErrors
      setErrors(visibleErrors)
      setState('idle')
      return
    }

    setErrors({})
    setState('loading')

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          postcode: form.postcode.trim().toUpperCase(),
          property_type: form.property_type || null,
          bedrooms: form.bedrooms || null,
          bathrooms: form.bathrooms || null,
          preferred_date: form.preferred_date || null,
          parking_access: form.parking_access.trim() || null,
          photo_url: form.photo_url.trim() || null,
          message: form.message.trim() || null,
        }),
      })

      const body = (await response.json().catch(() => null)) as ApiErrorBody | null

      if (!response.ok) {
        const fieldErrors = Object.fromEntries(
          Object.entries(body?.errors || {}).filter(([key]) => PUBLIC_FIELDS.has(key)),
        ) as FieldErrors

        if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors)
        setServerMessage(userMessageForStatus(response.status, body))
        setState('error')
        return
      }

      setForm(INITIAL)
      setState('success')
    } catch {
      setServerMessage('We could not connect to the quote request service. Please try again, or contact us directly.')
      setState('error')
    }
  }

  function startAnotherRequest() {
    setErrors({})
    setServerMessage('')
    setState('idle')
    requestAnimationFrame(() => nameRef.current?.focus())
  }

  function focusSummaryTarget(targetId: string) {
    document.getElementById(targetId)?.focus()
  }

  const inputStyle = (key: keyof FormData): CSSProperties => ({
    width: '100%',
    padding: '10px 12px',
    fontSize: '15px',
    border: `2px solid ${errors[key] ? '#b42318' : '#d1d5db'}`,
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
  })

  function field(
    key: keyof FormData,
    label: string,
    input: ReactElement<Record<string, unknown>>,
    hint?: string,
    required = false,
  ) {
    const hintId = hint ? `${key}-hint` : undefined
    const errorId = errors[key] ? `${key}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div>
        <label htmlFor={key} style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '5px' }}>
          {label}
          {required && <span aria-hidden="true" style={{ color: '#b42318' }}> *</span>}
        </label>
        {hint && <p id={hintId} style={{ fontSize: '12px', color: '#667085', margin: '0 0 5px' }}>{hint}</p>}
        {cloneElement(input, {
          'aria-invalid': errors[key] ? true : undefined,
          'aria-describedby': describedBy,
          'aria-required': required || undefined,
          className: 'quote-form-control',
        })}
        {errors[key] && (
          <p id={errorId} style={{ fontSize: '13px', fontWeight: 600, color: '#b42318', marginTop: '5px' }}>
            <span aria-hidden="true">Error: </span>{errors[key]}
          </p>
        )}
      </div>
    )
  }

  const gridRow = (children: ReactNode) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1rem' }}>
      {children}
    </div>
  )

  const sectionLabel = (text: string) => (
    <h2 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '1rem' }}>{text}</h2>
  )

  const divider = <div aria-hidden="true" style={{ borderTop: '1px solid #f3f4f6', margin: '0 0 1.5rem' }} />
  const errorEntries = Object.entries(errors) as [keyof FormData, string][]

  if (state === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        aria-labelledby="quote-success-title"
        className="quote-form-focus-target"
        style={{ padding: '1rem 0', textAlign: 'center' }}
      >
        <h2 id="quote-success-title" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
          Quote request received
        </h2>
        <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.7, margin: '0 auto 1.5rem', maxWidth: '36rem' }}>
          Thank you. We received the details you submitted and will review them before contacting you.
        </p>
        <p style={{ color: '#667085', fontSize: '13px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This confirmation does not mean that a booking has been made.
        </p>
        <button type="button" onClick={startAnotherRequest} className="quote-form-button" style={{ padding: '12px 18px' }}>
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={state === 'loading'}>
      {errorEntries.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="quote-error-title"
          className="quote-form-focus-target"
          style={{ backgroundColor: '#fff5f5', border: '2px solid #b42318', borderRadius: '8px', padding: '14px 16px', color: '#7a271a', marginBottom: '1.25rem' }}
        >
          <h2 id="quote-error-title" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
            Check the following fields
          </h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {errorEntries.map(([key, message]) => {
              const summaryTarget = SUMMARY_TARGETS[key] || key
              return (
              <li key={key} style={{ marginTop: '4px' }}>
                <a href={`#${summaryTarget}`} onClick={() => focusSummaryTarget(summaryTarget)} style={{ color: '#7a271a', textDecoration: 'underline', fontWeight: 600 }}>
                  {FIELD_LABELS[key] || key}: {message}
                </a>
              </li>
              )
            })}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        {sectionLabel('Your details')}
        {gridRow(
          <>
            {field('name', 'Full name', <input ref={nameRef} id="name" type="text" value={form.name} onChange={(event) => set('name', event.target.value)} autoComplete="name" maxLength={QUOTE_REQUEST_LIMITS.name} style={inputStyle('name')} />, undefined, true)}
            {field('phone', 'Phone', <input id="phone" type="tel" value={form.phone} onChange={(event) => set('phone', event.target.value)} autoComplete="tel" maxLength={QUOTE_REQUEST_LIMITS.phone} style={inputStyle('phone')} />, undefined, true)}
          </>,
        )}
        {field('email', 'Email', <input id="email" type="email" value={form.email} onChange={(event) => set('email', event.target.value)} autoComplete="email" maxLength={QUOTE_REQUEST_LIMITS.email} style={inputStyle('email')} />, undefined, true)}
      </div>

      {divider}

      <div style={{ marginBottom: '1.5rem' }}>
        {sectionLabel('Service and property')}
        <div style={{ marginBottom: '1rem' }}>
          {field('service_type', 'Service type', <select id="service_type" value={form.service_type} onChange={(event) => set('service_type', event.target.value as ServiceType)} style={{ ...inputStyle('service_type'), appearance: 'none' }}><option value="" disabled>Select a service…</option>{SERVICE_OPTIONS.map((service) => <option key={service} value={service}>{SERVICE_LABELS[service]}</option>)}</select>, undefined, true)}
        </div>
        {gridRow(
          <>
            {field('postcode', 'Property postcode', <input id="postcode" type="text" value={form.postcode} onChange={(event) => set('postcode', event.target.value)} autoComplete="postal-code" maxLength={QUOTE_REQUEST_LIMITS.postcode} style={inputStyle('postcode')} />, undefined, true)}
            {field('property_type', 'Property type', <select id="property_type" value={form.property_type} onChange={(event) => set('property_type', event.target.value)} style={{ ...inputStyle('property_type'), appearance: 'none' }}><option value="">Select…</option>{['Flat', 'House', 'Studio', 'Office', 'Other'].map((value) => <option key={value} value={value}>{value}</option>)}</select>)}
          </>,
        )}
        {gridRow(
          <>
            {field('bedrooms', 'Bedrooms', <select id="bedrooms" value={form.bedrooms} onChange={(event) => set('bedrooms', event.target.value)} style={{ ...inputStyle('bedrooms'), appearance: 'none' }}><option value="">Select…</option>{[{ value: '0', label: 'Studio / none' }, { value: '1', label: '1 bedroom' }, { value: '2', label: '2 bedrooms' }, { value: '3', label: '3 bedrooms' }, { value: '4', label: '4 bedrooms' }, { value: '5', label: '5+ bedrooms' }].map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>)}
            {field('bathrooms', 'Bathrooms', <select id="bathrooms" value={form.bathrooms} onChange={(event) => set('bathrooms', event.target.value)} style={{ ...inputStyle('bathrooms'), appearance: 'none' }}><option value="">Select…</option>{['1', '2', '3', '4'].map((value) => <option key={value} value={value}>{value === '4' ? '4+ bathrooms' : `${value} bathroom${value === '1' ? '' : 's'}`}</option>)}</select>)}
          </>,
        )}
      </div>

      {divider}

      <div style={{ marginBottom: '1.5rem' }}>
        {sectionLabel('Timing')}
        {gridRow(
          <>
            {field('preferred_date', 'Preferred date', <input id="preferred_date" type="date" min={today} value={form.preferred_date} onChange={(event) => set('preferred_date', event.target.value)} style={inputStyle('preferred_date')} />, 'We will confirm availability.')}
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Urgency</legend>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {URGENCY_OPTIONS.map(({ value, label, color }) => (
                  <label key={value} className="quote-form-radio-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', border: `2px solid ${form.urgency === value ? 'var(--brand-primary)' : '#d1d5db'}`, backgroundColor: form.urgency === value ? 'var(--bg-soft)' : '#fff', color: '#344054', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                    <input id={URGENCY_RADIO_IDS[value]} type="radio" name="urgency" value={value} checked={form.urgency === value} onChange={() => set('urgency', value)} />
                    <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </>,
        )}
      </div>

      {divider}

      <div style={{ marginBottom: '1.5rem' }}>
        {sectionLabel('Access and photos')}
        <div style={{ marginBottom: '1rem' }}>
          {field('parking_access', 'Parking and access notes', <input id="parking_access" type="text" value={form.parking_access} onChange={(event) => set('parking_access', event.target.value)} maxLength={QUOTE_REQUEST_LIMITS.parking_access} style={inputStyle('parking_access')} />, 'Parking restrictions, key collection, floor number or other access details.')}
        </div>
        {field('photo_url', 'Property photos', <input id="photo_url" type="url" value={form.photo_url} onChange={(event) => set('photo_url', event.target.value)} maxLength={QUOTE_REQUEST_LIMITS.photo_url} style={inputStyle('photo_url')} />, 'Optional Google Drive or Dropbox link. You can also send photos after submitting.')}
      </div>

      {divider}

      <div style={{ marginBottom: '1.5rem' }}>
        {sectionLabel('Anything else')}
        {field('message', 'Additional details', <textarea id="message" value={form.message} onChange={(event) => set('message', event.target.value)} rows={4} maxLength={QUOTE_REQUEST_LIMITS.message} style={{ ...inputStyle('message'), resize: 'vertical' }} />, `${form.message.length} of ${QUOTE_REQUEST_LIMITS.message} characters used.`)}
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => set('website', event.target.value)} />
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <input type="checkbox" id="consent" checked={form.consent} onChange={(event) => set('consent', event.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'consent-help consent-error' : 'consent-help'} className="quote-form-control" style={{ marginTop: '3px', width: '18px', height: '18px', flexShrink: 0 }} />
          <label htmlFor="consent" style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.5 }}>
            I agree that {businessProfile.tradingName} may use these details to respond to my quote request. See the <a href="/privacy-policy" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>privacy policy</a>.
          </label>
        </div>
        <p id="consent-help" style={{ fontSize: '12px', color: '#667085', margin: '5px 0 0 28px' }}>Required before the request can be sent.</p>
        {errors.consent && <p id="consent-error" style={{ fontSize: '13px', fontWeight: 600, color: '#b42318', margin: '5px 0 0 28px' }}><span aria-hidden="true">Error: </span>{errors.consent}</p>}
      </div>

      {state === 'error' && serverMessage && (
        <div role="alert" style={{ backgroundColor: '#fff5f5', border: '2px solid #b42318', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#7a271a', marginTop: '1rem' }}>
          <strong>We could not send your request.</strong> {serverMessage}
        </div>
      )}

      <button type="submit" disabled={state === 'loading'} className="quote-form-button" style={{ width: '100%', padding: '14px 24px', marginTop: '1.5rem', opacity: state === 'loading' ? 0.7 : 1 }}>
        {state === 'loading' ? 'Sending…' : 'Send quote request'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#667085', marginTop: '1rem' }}>
        Final price depends on property size, condition and access. We will confirm all details before booking.
      </p>
    </form>
  )
}
