import React from 'react'
import { PENDING_TEXT, mailtoHref } from '@/lib/site.config'

/**
 * A policy page's contact address as a `mailto:` link.
 *
 * `legalContact()` returns the site's own `contactEmail`, which stays EMPTY
 * while the charity's email is still awaited (see `PendingField`). An empty
 * address would render as an empty `mailto:` link that looks usable and goes
 * nowhere, so this renders the plain-text "awaiting information" note instead
 * -- never another organization's address.
 */
export default function ContactEmail({
  email,
  className = 'text-[#0062CC] underline',
}: {
  email: string
  className?: string
}) {
  const address = email.trim()
  if (!address) return <em>{PENDING_TEXT}</em>
  return (
    <a href={mailtoHref(undefined, address)} className={className}>
      {address}
    </a>
  )
}
