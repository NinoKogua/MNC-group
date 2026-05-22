import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import toiletImg from '@/app/assets/images/hall.png'
import tablesImg from '@/app/assets/images/tables.png'

export default function AboutMission() {
  return (
    <div className="w-full pb-20">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1A1A1A] overflow-hidden p-4 md:p-12 text-white">
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-primary rounded-lg flex items-center justify-center font-bold">
              +
            </div>
            <span className="font-bold uppercase tracking-widest text-sm opacity-80">მისია</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            ვქმნით სივრცეებს, <br />
            <span className="text-green-primary">რომლებიც შთააგონებენ</span>
          </h2>
          <p className="text-gray-400 leading-relaxed font-mtavruli">
            ჩვენი მისიაა, კურორტი მანგლისში, შეიქმნას თანამედროვე სტანდარტების ცხოვრების სტილი.
          </p>
          <ul className="space-y-3">
            {[
              'ქართულ-ევროპული რესტორანი',
              'ხარისხის გარანტია',
              'თანამედროვე დიზაინი',
              'კონსიერჟი/ლობი/ღია აუზი/საუნა',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 size={18} className="text-green-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[16px] overflow-hidden h-[400px]">
          <Image src={toiletImg} alt="office" fill className="object-cover" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-green-primary overflow-hidden p-4 md:p-12 text-white">
        <div className="relative rounded-[16px] overflow-hidden h-[400px] order-2 md:order-1">
          <Image src={tablesImg} alt="vision" fill className="object-cover" />
        </div>

        <div className="space-y-6 p-6 order-1 md:order-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-beige-primary rounded-lg flex items-center justify-center font-bold text-green-primary">
              ◎
            </div>
            <span className="font-bold uppercase tracking-widest text-sm">ხედვა</span>
          </div>
          <h2 className="text-3xl md:text-5xl  font-extrabold leading-tight">
            მომავალი, სადაც <span className="text-beige-primary">ბუნება და არქიტექტურა ერთია</span>
          </h2>
          <div className="flex gap-10 pt-6 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-beige-primary">500+</p>
              <p className="text-xs uppercase opacity-70 italic mt-1 font-mtavruli">
                ბედნიერი ოჯახი
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-beige-primary">15+</p>
              <p className="text-xs uppercase opacity-70 italic mt-1 font-mtavruli">
                წლიანი გამოცდილება
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
