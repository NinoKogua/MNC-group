"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Phone } from "lucide-react";
import Logo from "@/assets/icons/Logo";
import Facebook from "@/assets/icons/Facebook";
import Instagram from "@/assets/icons/Instagram";
import Twitter from "@/assets/icons/Twitter";
import CallModal from "@/components/Modals";

interface BurgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const AnimatedBurger: React.FC<BurgerProps> = ({ isOpen, onClick }) => (
  <button
    className="relative w-6 h-6 flex flex-col justify-center items-center md:hidden z-50"
    onClick={onClick}
    aria-label="Toggle Menu"
  >
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-all duration-300 ease-in-out ${
        isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
      }`}
    ></div>
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    ></div>
    <div
      className={`absolute h-0.5 w-6 bg-green-primary transition-all duration-300 ease-in-out ${
        isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
      }`}
    ></div>
  </button>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/About", label: "ჩვენ შესახებ" },
    { to: "/", label: "პროექტები" },
    { to: "/", label: "რეზიდენციები" },
    { to: "/", label: "ახალი ამბები" },
    { to: "/Contact", label: "კონტაქტი" },
  ];

  return (
    <header className="w-full relative">
      <div className="w-full bg-green-primary text-white text-sm py-1.5 px-4 flex justify-between">
        <span className="text-beige-primary">
          მშენებლობის მომავალი, მსოფლიოს მასშტაბით
        </span>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:opacity-80">
            <Facebook />
          </Link>
          <Link href="#" className="hover:opacity-80">
            <Instagram />
          </Link>
          <Link href="#" className="hover:opacity-80">
            <Twitter />
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm py-4">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold text-green-primary">
                ფიჭვები
              </span>
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
              className="bg-green-primary hidden md:flex text-beige-primary px-4 py-2 rounded-xl items-center gap-2 font-kirovi lg:px-2 transition-all hover:opacity-90"
            >
              <Phone size={18} />
              <span className="hidden lg:inline">შეუკვეთე ზარი</span>
            </button>
            <div className="flex items-center gap-1 cursor-pointer font-medium">
              <Globe size={18} />
              EN
            </div>
            <AnimatedBurger isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
          {/* Mobile Call Button */}
          <button
            onClick={openModal}
            className="bg-green-primary text-beige-primary px-4 py-2 rounded-xl flex items-center gap-2 font-kirovi transition-all hover:opacity-90"
          >
            <Phone size={18} />
            <span>შეუკვეთე ზარი</span>
          </button>
        </div>
      </div>

      {/* Modal & Overlay */}
      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
