import React from 'react'
import CalculatorForm from '../../../components/common/CalculatorForm'
import InfoCardsGrid from '../../../components/common/InfoCardsGrid'

export default function CalculatorSection() {
  return (
    <section className="bg-beige-50 py-12 lg:py-16 px-4">
      <div className="bg-white-primary max-w-[1408px] mx-auto px-4 pb-10 rounded-2xl">
        <CalculatorForm />
        <InfoCardsGrid />
      </div>
    </section>
  )
}
