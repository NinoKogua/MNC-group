"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import HeroImg from "../../../assets/images/hero1.png";
import Image from "next/image";
import styles from "../../hero.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Hero() {
    const slides = [
        {
            id: 1,
            image: HeroImg,
            title: "მანგლისი",
            description: "ფიჭვების პროექტი მიზნად ისახავს მაღალმთიან და ეკოლოგიურად მეგობრული სივრცეების შექმნას.",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop",
            title: "ბუნებასთან ერთად",
            description: "აღმოაჩინეთ თანამედროვე არქიტექტურა, რომელიც იდეალურად ერწყმის მანგლისის უნიკალურ ბუნებას.",
        }
    ];

    return (
        <div className={`relative w-full h-[85vh] ${styles.heroSwiperContainer}`}>
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="w-full h-full relative">
                            {typeof slide.image === 'string' ? (
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url('${slide.image}')` }}
                                />
                            ) : (
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={slide.id === 1}
                                />
                            )}

                            <div className="absolute inset-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-center px-6">
                                <h1 className="text-white-primary text-6xl font-bold mb-4 tracking-wide font-kirovi">
                                    {slide.title}
                                </h1>

                                <p className="text-white-primary text-lg max-w-3xl mb-8 leading-relaxed font-mtavruli">
                                    {slide.description}
                                </p>

                                <div className="flex gap-4 font-kirovi">
                                    <button className="bg-green-primary text-white-primary px-8 py-3 rounded-xl text-lg font-bold hover:bg-green-primary/90 transition-colors">
                                        გაიგე მეტი
                                    </button>

                                    <button
                                        className="border-2 border-white/70 px-8 py-3 rounded-xl backdrop-blur-sm duration-300 hover:bg-white text-white-primary hover:text-green-primary transition-colors"
                                    >
                                        ვრცლად
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
