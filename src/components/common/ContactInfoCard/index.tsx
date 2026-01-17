import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactInfoCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon: Icon, label, value }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700">
                <Icon size={24} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
                <span className="text-sm md:text-base font-extrabold text-gray-800">{value}</span>
            </div>
        </div>
    );
};

export default ContactInfoCard;
