'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, Phone } from 'lucide-react'
import Logo from '@/app/assets/icons/Logo'
import Facebook from '@/app/assets/icons/Facebook'
import Instagram from '@/app/assets/icons/Instagram'
import Twitter from '@/app/assets/icons/Twitter'
import CallModal from '@/app/(frontend)/components/Modals'

interface BurgerProps {
  isOpen: boolean
  onClick: () => void
}

const AnimatedBurger: React.FC<BurgerProps> = ({ isOpen, onClick }) => (
  <button
    className="relative w-6 h-6 flex flex-col justify-center items-center md:hidden z-50"
    onClick={onClick}
    aria-label="Toggle Menu"
  >
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
    ></div>
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
    ></div>
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
    ></div>
  </button>
)

function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const segments = pathname.split('/')
  const currentLocale = ['ka', 'en'].includes(segments[1]) ? segments[1] : 'ka'

  const switchLocale = (locale: string) => {
    segments[1] = locale
    router.push(segments.join('/') || '/')
  }

  return (
    <div className="flex items-center gap-1 font-medium">
      <Globe size={18} />
      <button
        onClick={() => switchLocale('ka')}
        className={`text-sm px-1 transition-colors ${currentLocale === 'ka' ? 'text-green-primary font-bold' : 'text-gray-500 hover:text-green-primary'}`}
      >
        ქა
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`text-sm px-1 transition-colors ${currentLocale === 'en' ? 'text-green-primary font-bold' : 'text-gray-500 hover:text-green-primary'}`}
      >
        EN
      </button>
    </div>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pathname = usePathname()

  const segments = pathname.split('/')
  const currentLocale = ['ka', 'en'].includes(segments[1]) ? segments[1] : 'ka'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const openModal = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  const navLinks = [
    {
      to: `/${currentLocale}/about-us`,
      label: currentLocale === 'ka' ? 'ჩვენ შესახებ' : 'About Us',
    },
    { to: `/${currentLocale}`, label: currentLocale === 'ka' ? 'პროექტები' : 'Projects' },
    { to: `/${currentLocale}`, label: currentLocale === 'ka' ? 'რეზიდენციები' : 'Residences' },
    { to: `/${currentLocale}/blog`, label: currentLocale === 'ka' ? 'ახალი ამბები' : 'News' },
    { to: `/${currentLocale}/contact-us`, label: currentLocale === 'ka' ? 'კონტაქტი' : 'Contact' },
  ]

  return (
    <header className="w-full relative">
      <div className="w-full bg-green-primary text-white text-sm py-1.5 px-4 flex justify-between">
        <span className="text-beige-primary">
          {currentLocale === 'ka'
            ? 'მშენებლობის მომავალი, მსოფლიოს მასშტაბით'
            : 'The future of construction, worldwide'}
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.facebook.com/profile.php?id=61580922035190"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Facebook />
          </Link>
          <Link
            href="https://www.instagram.com/pinesmanglisi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Instagram />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Twitter />
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm py-4">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4">
          <Link href={`/${currentLocale}`}>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-green-primary">ფიჭვები</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center lg:gap-8 gap-4 text-gray-700 text-lg font-medium font-kirovi">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className="hover:text-green-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="bg-green-primary hidden md:flex text-beige-primary px-4 py-2 rounded-xl items-center gap-2 font-kirovi lg:px-3 transition-all hover:opacity-90"
            >
              <Phone size={18} />
              <span className="hidden lg:inline">
                {currentLocale === 'ka' ? 'შეუკვეთე ზარი' : 'Call Us'}
              </span>
            </button>
            <LocaleSwitcher />
            <AnimatedBurger isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="pt-24 flex flex-col p-6 space-y-4 font-kirovi text-gray-700">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className="text-lg hover:text-green-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={openModal}
            className="bg-green-primary text-beige-primary px-4 py-2 rounded-xl flex items-center gap-2 font-kirovi transition-all hover:opacity-90"
          >
            <Phone size={18} />
            <span>{currentLocale === 'ka' ? 'შეუკვეთე ზარი' : 'Call Us'}</span>
          </button>
        </div>
      </div>

      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleMenu}></div>
      )}
    </header>
  )
}
