import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function AboutMission() {
    return (
        <div className="w-full pb-20">
            {/* მისია - შავი სექცია */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#1A1A1A] overflow-hidden p-4 md:p-12 text-white">
                <div className="space-y-6 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center font-bold">+</div>
                        <span className="font-bold uppercase tracking-widest text-sm opacity-80">მისია</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        ვქმნით სივრცეებს, <br />
                        <span className="text-green-primary">რომლებიც შთააგონებენ</span>
                    </h2>
                    <p className="text-gray-400 leading-relaxed font-mtavruli">
                        ჩვენი მისიაა ამოძრავდეს ჩვენს გუნდს - ავაშენოთ სახლები, რომლებიც პასუხობენ თანამედროვე ცხოვრების ყველა სტანდარტს.
                    </p>
                    <ul className="space-y-3">
                        {['ეკოლოგიური მშენებლობა', 'ხარისხის გარანტია', 'ინოვაციური დიზაინი'].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm font-medium">
                                <CheckCircle2 size={18} className="text-green-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* სურათი 1 */}
                <div className="relative rounded-[16px] overflow-hidden h-[400px]">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                        alt="office"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* ხედვა - მწვანე სექცია */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-green-primary overflow-hidden p-4 md:p-12 text-white">
                {/* სურათი 2 - მობილურზე მეორეა, დესკტოპზე პირველი */}
                <div className="relative rounded-[16px] overflow-hidden h-[400px] order-2 md:order-1">
                    <Image
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                        alt="vision"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6 p-6 order-1 md:order-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">◎</div>
                        <span className="font-bold uppercase tracking-widest text-sm">ხედვა</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        მომავალი, სადაც ბუნება და არქიტექტურა ერთია
                    </h2>
                    <div className="flex gap-10 pt-6 border-t border-white/10">
                        <div>
                            <p className="text-3xl font-bold">500+</p>
                            <p className="text-xs uppercase opacity-70 italic mt-1 font-mtavruli">ბედნიერი ოჯახი</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">15+</p>
                            <p className="text-xs uppercase opacity-70 italic mt-1 font-mtavruli">წლიანი გამოცდილება</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
