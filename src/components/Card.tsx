import type { PropsWithChildren } from 'react'

export default function Card({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`rounded-2xl border border-black/5 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-cardHover ${className}`}
    >
      {children}
    </div>
  )
}
