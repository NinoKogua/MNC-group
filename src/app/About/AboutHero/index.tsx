import React from 'react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function AboutHero() {
    return (
        <section className="relative pt-16 pb-20 px-4 overflow-hidden bg-gradient-to-b from-[#B5CDC3] via-[#D1DFD9] to-[#F8F6F1]">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* მარცხენა შავი ბლოკი */}
                    <div className="col-span-12 md:col-span-6 bg-[#161616] rounded-[32px] p-10 flex flex-col justify-between min-h-[350px] text-white relative font-kirovi">
                        <div className="space-y-6 relative z-10">
                            <span className="text-xs font-bold tracking-widest opacity-50 uppercase">ფიჭვები - 2010</span>
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-none">
                                ჩვენ <br /> შესახებ
                            </h1>
                            <p className="text-gray-400 text-lg max-w-sm leading-relaxed font-mtavruli">
                                ვქმნით სივრცეებს, სადაც ბუნება და კომფორტი ჰარმონიულად ერწყმის ერთმანეთს
                            </p>
                        </div>

                        <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors relative z-10">
                            <ArrowDown className="text-white group-hover:translate-y-1 transition-transform" />
                        </div>

                        {/* დეკორატიული განათება კუთხეში */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl" />
                    </div>

                    {/* მარჯვენა ბლოკების Grid */}
                    <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 font-kirovi">

                        {/* გამოცდილება */}
                        <div className="bg-green-primary rounded-[32px] p-8 flex flex-col justify-between text-white">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-70">გამოცდილება</span>
                            <div className="flex flex-col">
                                <span className="text-6xl font-black leading-none">15+</span>
                                <span className="text-xs font-bold uppercase mt-2 opacity-70">წელი ბაზარზე</span>
                            </div>
                        </div>

                        {/* სურათი 1 */}
                        <div className="relative rounded-[32px] overflow-hidden min-h-[180px]">
                            <Image
                                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80"
                                alt="Pool view"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* სურათი 2 */}
                        <div className="relative rounded-[32px] overflow-hidden min-h-[180px]">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                                alt="Architecture"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* მაცხოვრებელი */}
                        <div className="bg-white rounded-[32px] p-8 flex flex-col justify-between border border-gray-100 shadow-sm text-green-primary">
                            <span className="text-sm font-bold uppercase tracking-widest">მაცხოვრებელი</span>
                            <div className="flex flex-col">
                                <span className="text-6xl font-black leading-none">200+</span>
                                <span className="text-xs font-bold uppercase mt-2">ბედნიერი ოჯახი</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
