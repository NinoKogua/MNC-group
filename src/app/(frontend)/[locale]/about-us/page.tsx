import React from 'react'
import AboutHero from './AboutHero'
import AboutTimeline from './AboutTimeline'
import AboutMission from './AboutMission'
import ClientAboutTeam from './ClientAboutTeam'

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F6F1]">
      <AboutHero />
      <AboutTimeline />
      <AboutMission />
      <div id="our-team" className="scroll-mt-24">
        <ClientAboutTeam />
      </div>
    </div>
  )
}
