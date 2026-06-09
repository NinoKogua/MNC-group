import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import toiletImg from '@/app/assets/images/hall.png'
import tablesImg from '@/app/assets/images/tables.png'

export default function AboutMission() {
  return (
    <div className="w-full pb-20 px-4 md:px-8 space-y-8">

      {/* მისია */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">

        {/* ტექსტი */}
        <div className="bg-green-primary p-10 md:p-14 flex flex-col justify-center space-y-7">
          <h2 className="font-kirovi text-4xl md:text-5xl text-white leading-tight">
            ვქმნით სივრცეებს,{' '}
            <span className="text-beige-primary">რომლებიც შთააგონებენ</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            ჩვენი მისიაა, კურორტი მანგლისში, შეიქმნას თანამედროვე სტანდარტების ცხოვრების სტილი.
          </p>
          <ul className="space-y-3 pt-2">
            {[
              'ქართულ-ევროპული რესტორანი',
              'ხარისხის გარანტია',
              'თანამედროვე დიზაინი',
              'კონსიერჟი/ლობი/ღია აუზი/საუნა',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                <CheckCircle2 size={16} className="text-beige-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ფოტო */}
        <div className="relative h-[420px] md:h-auto">
          <Image
            src={toiletImg}
            alt="mission"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>

      {/* ხედვა */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl">

        {/* ფოტო */}
        <div className="relative h-[420px] md:h-auto order-2 md:order-1">
          <Image
            src={tablesImg}
            alt="vision"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* ტექსტი */}
        <div className="bg-[#F8F6F1] p-10 md:p-14 flex flex-col justify-center space-y-7 order-1 md:order-2">
          <h2 className="font-kirovi text-4xl md:text-5xl text-[#1a2e2a] leading-tight">
            მომავალი, სადაც{' '}
            <span className="text-green-primary">ბუნება და არქიტექტურა ერთია</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            ვისახავთ მომავალს, სადაც თითოეული სივრცე ბუნებასთან ჰარმონიაშია ესთეტიკა და ფუნქციონალურობა ერთ მთლიანობაში.
          </p>

          {/* სტატისტიკა */}
          <div className="flex gap-10 pt-6 border-t border-gray-200">
            <div>
              <p className="font-kirovi text-4xl text-[#1a2e2a]">500+</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                ბედნიერი ოჯახი
              </p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="font-kirovi text-4xl text-[#1a2e2a]">15+</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                წლიანი გამოცდილება
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}