"use client";

import React, { useState } from 'react';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("შეტყობინება გაიგზავნა!");
        }, 1500);
    };

    const inputClass = "w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-green-600 transition-colors bg-white font-medium text-gray-700 placeholder:text-gray-300";

    return (
        <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-gray-50 h-full font-kirovi">
            <div className="inline-block bg-green-50 text-green-primary text-xs font-bold px-3 py-1 rounded-lg mb-4">
                ● ფორმა
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">მოგვწერეთ</h2>
            <p className="text-gray-400 font-medium mb-8 font-mtavruli">შეავსეთ ფორმა და ჩვენ უმოკლეს დროში დაგიკავშირდებით</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="სახელი და გვარი" className={inputClass} required />
                <input type="email" placeholder="ელ-ფოსტა" className={inputClass} required />
                <input type="tel" placeholder="ტელ-ნომერი" className={inputClass} required />
                <textarea placeholder="შეტყობინება" rows={8} className={inputClass} required />

                <button
                    disabled={loading}
                    className="w-full bg-green-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-900 transition-all active:scale-95 disabled:bg-gray-400"
                >
                    {loading ? "იგზავნება..." : "გაგზავნა"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;