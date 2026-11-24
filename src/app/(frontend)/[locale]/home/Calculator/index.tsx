import React from 'react'
import ApartmentFinder from '../../../components/common/ApartmentFinder'
import InfoCardsGrid from '../../../components/common/InfoCardsGrid'

export default async function CalculatorSection() {
  return (
    <section className="bg-beige-50 py-12 lg:py-16 px-4">
      <div className="bg-white-primary max-w-[1408px] mx-auto px-4 py-10 rounded-2xl">
        <ApartmentFinder />
        {/* <InfoCardsGrid /> */}
      </div>
    </section>
  )
}
