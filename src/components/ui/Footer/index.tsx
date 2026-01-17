import React from 'react';
import Instagram from '@/assets/icons/Instagram';
import Facebook from '@/assets/icons/Facebook';
import Twitter from '@/assets/icons/Twitter';
import Logo from '@/assets/icons/Logo';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const FOOTER_LINKS: FooterSection[] = [
    {
        title: 'ჩვენ შესახებ',
        links: [
            { label: 'ისტორია', href: '#' },
            { label: 'მისია და ხედვა', href: '#' },
            { label: 'გუნდი', href: '#' },
        ],
    },
    {
        title: 'პროექტები',
        links: [
            { label: 'მიმდინარე პროექტები', href: '#' },
            { label: 'დასრულებული პროექტები', href: '#' },
            { label: 'გალერეა', href: '#' },
        ],
    },
    {
        title: 'მომსახურება',
        links: [
            { label: 'კონსულტაცია', href: '#' },
            { label: 'კალკულატორი', href: '#' },
            { label: 'იპოთეკა', href: '#' },
        ],
    },
    {
        title: 'კონტაქტი',
        links: [
            { label: 'მისამართი', href: '#' },
            { label: 'დაგვიკავშირდით', href: '#' },
            { label: 'ლოკაცია', href: '#' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-green-primary py-12 md:py-16 text-white text-center md:text-left">
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10 md:mb-16">

                    <div className="lg:col-span-1 flex items-center md:items-start justify-center gap-6">
                        <Logo className="mb-4" />
                        <h2 className="text-4xl tracking-wider">
                            ფიჭვები
                        </h2>
                    </div>

                    {FOOTER_LINKS.map((section, index) => (
                        <div key={index} className="lg:col-span-1 flex flex-col gap-4">
                            <h3 className="text-lg font-bold uppercase mb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className="text-base text-gray-300 hover:text-white transition-colors font-medium"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="flex gap-4 order-2 md:order-1">
                        <Instagram href="#" />
                        <Facebook href="#" />
                        <Twitter href="#" />
                    </div>

                    <div className="text-center md:text-left text-sm text-beige-primary order-1 md:order-2">
                        <p>საავტორო უფლებები 2024. ყველა უფლება დაცულია.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-beige-primary order-3">
                        <span className="font-semibold">570 200 800</span>
                        <span className="hidden sm:inline">|</span>
                        <span>თბილისი, საქართველო</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
