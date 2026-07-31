import { validateQuoteRequest } from './inbound-submission-validation'
import type { InboundSubmissionInsert } from '../types/inbound-submission'

export type QuoteRequestResult =
  | { ok: true; status: 200 }
  | {
      ok: false
      status: 400 | 500
      code: 'SUBMISSION_REJECTED' | 'VALIDATION_ERROR' | 'PERSISTENCE_ERROR'
      message: string
      errors?: Record<string, string>
    }

type PersistSubmission = (
  payload: InboundSubmissionInsert,
) => Promise<{ error: unknown | null }>

export async function processQuoteRequest(
  body: unknown,
  persist: PersistSubmission,
): Promise<QuoteRequestResult> {
  const result = validateQuoteRequest(body)

  if (!result.ok) {
    const honeypotRejected = Boolean(result.errors.website)
    return {
      ok: false,
      status: 400,
      code: honeypotRejected ? 'SUBMISSION_REJECTED' : 'VALIDATION_ERROR',
      message: honeypotRejected
        ? 'We could not accept this request.'
        : 'Check the highlighted fields and try again.',
      errors: honeypotRejected
        ? undefined
        : (result.errors as Record<string, string>),
    }
  }

  const { error } = await persist(result.payload)
  if (error) {
    return {
      ok: false,
      status: 500,
      code: 'PERSISTENCE_ERROR',
      message: 'We could not save your request. Please try again later.',
    }
  }

  return { ok: true, status: 200 }
}
