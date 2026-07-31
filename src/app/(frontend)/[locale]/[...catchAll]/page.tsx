import { notFound } from 'next/navigation'

/** Matches any URL under a locale that isn't a real route, so it hits the sibling not-found.tsx. */
export default function CatchAll() {
  notFound()
}
