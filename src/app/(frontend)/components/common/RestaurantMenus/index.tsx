'use client'

import Image from 'next/image'
import { useState } from 'react'
import menuFood from '../../../../assets/images/restaurant_imgs/menus_pages-to-jpg-0001.jpg'
import menuDrink from '../../../../assets/images/restaurant_imgs/menus_pages-to-jpg-0002.jpg'

type Props = {
  locale: 'en' | 'ka'
}

export default function RestaurantMenus({ locale }: Props) {
  const [hoverFood, setHoverFood] = useState(false)
  const [hoverDrink, setHoverDrink] = useState(false)

  return (
    <section className="w-full bg-[#F8F6F1] py-16 px-4">
      <div className="max-w-2xl mx-auto text-center mb-20">
        <h2 className="font-kirovi text-4xl md:text-5xl text-gray-800 mb-4">
          {locale === 'ka' ? 'ჩვენი მენიუ' : 'Our Menu'}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          {locale === 'ka'
            ? 'შეფ-მზარეულ ლევანის ხელით შექმნილი კერძები ქართული სამზარეულოს სიღრმე თანამედროვე შეხებით. ყოველი კერძი მოყვება ადგილობრივი პროდუქტებით და სეზონური გემოთი.'
            : 'Crafted by Chef Levan the depth of Georgian cuisine with a modern touch. Every dish is prepared with local ingredients and seasonal flavours.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
        
        {/* Food Menu Link */}
        <a
          href="/assets/images/restaurant_imgs/food-menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-4 cursor-pointer"
          onMouseEnter={() => setHoverFood(true)}
          onMouseLeave={() => setHoverFood(false)}
        >
          <div
            className="relative w-48 md:w-56 shadow-2xl transition-all duration-500"
            style={{
              transform: hoverFood ? 'rotate(0deg) scale(1.1)' : 'rotate(-6deg) scale(1)',
            }}
          >
            <Image
              src={menuFood}
              alt={locale === 'ka' ? 'საჭმლის მენიუ' : 'Food menu'}
              className="w-full h-auto rounded-md"
              priority
            />
          </div>
          <span
            className="font-semibold tracking-wide text-sm uppercase mt-2 transition-colors duration-300"
          >
            {locale === 'ka' ? 'საჭმლის მენიუ' : 'Food Menu'}
          </span>
        </a>

        {/* Drink Menu Link */}
        <a
          href="/assets/images/restaurant_imgs/drink-menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-4 cursor-pointer"
          onMouseEnter={() => setHoverDrink(true)}
          onMouseLeave={() => setHoverDrink(false)}
        >
          <div
            className="relative w-48 md:w-56 shadow-2xl transition-all duration-500"
            style={{
              transform: hoverDrink ? 'rotate(0deg) scale(1.1)' : 'rotate(6deg) scale(1)',
            }}
          >
            <Image
              src={menuDrink}
              alt={locale === 'ka' ? 'სასმლის მენიუ' : 'Drink menu'}
              className="w-full h-auto rounded-md"
              priority
            />
          </div>
          <span
            className="font-semibold tracking-wide text-sm uppercase mt-2 transition-colors duration-300"
          >
            {locale === 'ka' ? 'სასმლის მენიუ' : 'Drink Menu'}
          </span>
        </a>
      </div>
    </section>
  )
}