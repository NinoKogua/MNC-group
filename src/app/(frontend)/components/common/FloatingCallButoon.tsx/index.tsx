"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";
import CallModal from "../../Modals/index";

export default function FloatingCallButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-12 right-6 z-[60]">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-primary text-beige-primary shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
        >
          <span className="absolute inset-0 rounded-full bg-green-primary opacity-40 animate-ping group-hover:duration-700" />

          <span className="absolute -inset-2 rounded-full bg-green-primary/20 animate-pulse" />

          <div className="relative z-10">
            <Phone size={28} className="stroke-[2.5px]" />
          </div>
        </button>
      </div>

      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
