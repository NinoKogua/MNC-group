"use client";

import React, { ComponentType } from 'react';
import FeatureCard from '@/components/common/FeaturedCard';
import CtaBanner from '@/components/common/CtaBanner';
import HomeIcon from '@/assets/icons/Home';
import ShieldIcon from '@/assets/icons/Shield';
import CubeIcon from '@/assets/icons/Cube';
import StarsIcon from '@/assets/icons/Stars';

type IconType = ComponentType<{ size?: number; className?: string }>;

interface Feature {
    icon: IconType;
    title: string;
    description: string;
    bgColor: string;
}

const featureData: Feature[] = [
    {
        icon: HomeIcon,
        title: 'მასშტაბური გეგმი',
        description: 'ხანგრძლივი გეგმით, მშენებლობის გზნება მუდმივად მიმდინარეობს.',
        bgColor: 'bg-green-100/50',
    },
    {
        icon: ShieldIcon,
        title: 'მდგრადობის პრინციპი',
        description: 'ჩვენ ვქმნით ენერგოეფექტურ შენობებს მწვანე სტანდარტების დაცვით.',
        bgColor: 'bg-green-100/50',
    },
    {
        icon: CubeIcon,
        title: 'განვითარებული გამოცდილება',
        description: 'საუკეთესო ცოდნით, ხარისხის სტაბილურობით და უსაფრთხოებით.',
        bgColor: 'bg-green-100/50',
    },
    {
        icon: StarsIcon,
        title: 'სწრაფი კომუნიკაცია',
        description: 'ჩვენ მუდმივად ვინარჩუნებთ სწრაფ და ეფექტურ კომუნიკაციას.',
        bgColor: 'bg-green-100/50',
    },
];

export default function HowWeWorkSection() {
    return (
        <section className="bg-beige-50 py-12 lg:py-16">
            <div className="max-w-[1440px] mx-auto px-4">
                <div className="text-center mb-6 lg:mb-8">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4 font-kirovi">
                        რატომ ფიჭვები?
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                        უნიკალური უპირატესობა თქვენი კომფორტისთვის
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {featureData.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            Icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

                <CtaBanner />
            </div>
        </section>
    );
}
