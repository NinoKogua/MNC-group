'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'arrowButton' | 'primary' | 'outline'
  showArrow?: boolean
  isFullWidth?: boolean
  isLarge?: boolean
  href?: string
  children: React.ReactNode
}

export default function AppButton({
  variant = 'primary',
  showArrow = false,
  isFullWidth = false,
  isLarge = false,
  href,
  children,
  className = '',
  ...props
}: AppButtonProps) {
  const baseStyles =
    'group flex items-center justify-center rounded-2xl text-lg font-bold transition-all duration-300 active:scale-[0.98]'

  const widthStyle = isFullWidth ? 'w-full' : 'w-fit px-4 sm:px-8'

  const variants = {
    arrowButton: 'bg-green-primary text-white px-9 py-3 hover:bg-white hover:text-green-primary',
    primary:
      'w-full bg-green-primary hover:bg-green-primary/80 text-white text-lg font-bold py-3 rounded-xl transition-all disabled:bg-gray-300 flex justify-center items-center gap-3 shadow-lg shadow-green-900/10',
    outline: `text-base text-white font-bold py-3 border-2 border-white/70 backdrop-blur-sm hover:bg-white hover:text-green-primary font-kirovi ${
      isLarge ? 'bg-transparent' : 'bg-white/10'
    }`,
  }

  const content = (
    <span className="flex items-center gap-2">
      {children}
      {showArrow && (
        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
      )}
    </span>
  )

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${widthStyle} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button className={`${baseStyles} ${widthStyle} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  )
}
