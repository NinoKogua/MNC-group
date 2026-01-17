"use client";

import React, { useEffect, useState } from "react";
import { X, Phone } from "lucide-react";

interface CallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    phone: string;
    message: string;
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
    const [formData, setFormData] = useState<FormData>({ name: "", phone: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="relative bg-white w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-300"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-start gap-2 mb-2 w-full">
                                <Phone className="text-green-primary" size={24} />
                                <h2 className="text-2xl font-bold text-green-primary uppercase tracking-wide font-kiroviBold">
                                    შეუკვეთე ზარი
                                </h2>
                            </div>
                            <p className="text-gray-500 mb-8 text-sm text-left">
                                შეავსეთ ფორმა და ჩვენი წარმომადგენელი მალე დაგიკავშირდებათ
                            </p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                required
                                type="text"
                                placeholder="სახელი და გვარი"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all"
                            />
                            <input
                                required
                                type="tel"
                                placeholder="ტელ. ნომერი"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all"
                            />
                            <textarea
                                placeholder="შეტყობინება (არასავალდებულო)"
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-green-primary text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-[0.98]"
                            >
                                გაგზავნა
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">მადლობა!</h3>
                        <p className="text-gray-500">თქვენი მოთხოვნა მიღებულია.</p>
                        <button
                            onClick={() => {
                                onClose();
                                setIsSubmitted(false);
                            }}
                            className="mt-6 text-green-primary font-semibold hover:underline"
                        >
                            დახურვა
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
