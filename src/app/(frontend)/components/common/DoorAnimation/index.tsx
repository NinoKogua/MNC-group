'use client'

import { useEffect, useRef, useState } from 'react'

export default function DoorAnimation({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [whiteOut, setWhiteOut] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // ტექსტი ვიდეოს შემდეგ გამოჩნდება — 800ms დაყოვნებით
    const t = setTimeout(() => setShowText(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (videoEnded) {
      setWhiteOut(true)
      const t = setTimeout(() => setShowContent(true), 600)
      return () => clearTimeout(t)
    }
  }, [videoEnded])

  return (
    <div className="relative">

      {!showContent && (
        <div
          className="sticky top-0 z-40 bg-white transition-opacity duration-500 pointer-events-none"
          style={{ opacity: whiteOut ? 1 : 0, height: '100vh' }}
        />
      )}

      {!showContent && (
        <div
          className="sticky top-0 z-30 overflow-hidden relative"
          style={{ height: '100vh', marginTop: '-100vh' }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onEnded={() => setVideoEnded(true)}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>

          {/* ტექსტი — ვიდეოს შემდეგ fade-in */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: showText ? 1 : 0 }}
          >
            <span
              className="font-kirovi text-white leading-none tracking-[0.15em] select-none"
              style={{ fontSize: 'clamp(72px, 13vw, 160px)' }}
            >
              MNC GROUP
            </span>
            <span
              className="font-kirovi text-white/50 leading-none tracking-[0.45em] select-none mt-3"
              style={{ fontSize: 'clamp(16px, 2.5vw, 32px)' }}
            >
              ჩვენი პროექტები
            </span>
          </div>
        </div>
      )}

      <div
        className="transition-opacity duration-700"
        style={{ opacity: showContent ? 1 : 0 }}
      >
        {children}
      </div>

    </div>
  )
}