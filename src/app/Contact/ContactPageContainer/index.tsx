import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '../ContactForm';
import ContactInfoCard from '@/components/common/ContactInfoCard'; // გზა გასწორებულია პროექტის მიხედვით

export default function ContactSection() {
    const mapLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.128481358913!2d44.77452657657958!3d41.71775827126042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472d4976a4e33%3A0x6334f593e81f1e3c!2s14%20Pekini%20Ave%2C%20T'bilisi!5e0!3m2!1sen!2sge!4v1709123456789!5m2!1sen!2sge";

    return (
        <section className="bg-[#F8F6F1] pb-20 mt-20">
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                <div className="text-center mb-12 font-kirovi">
                    <p className="text-green-primary font-bold uppercase text-[20px] tracking-normal mb-2">
                        არ დაელოდო დაგვიკავშირდი დღესვე
                    </p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        საკონტაქტო ინფორმაცია
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <ContactForm />

                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-xl flex-grow border border-gray-50">
                            <div className="bg-[#1A1A1A] p-4 flex items-center justify-between text-white">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-green-primary" />
                                    <span className="font-bold">მისამართი</span>
                                </div>
                                <span className="text-sm font-medium opacity-80 font-mtavruli">
                                    ქ. გამსახურდიას (პეკინის) გამზირი N14ა
                                </span>
                            </div>

                            <div className="h-[500px] w-full">
                                <iframe
                                    src={mapLocation}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Pichvebi Office Location"
                                ></iframe>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 font-kirovi">
                            <ContactInfoCard
                                icon={Phone}
                                label="ტელეფონი"
                                value="+995 555 50 50 30"
                            />
                            <ContactInfoCard
                                icon={Mail}
                                label="ელ-ფოსტა"
                                value="INFO@PICHVEBI.COM"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
