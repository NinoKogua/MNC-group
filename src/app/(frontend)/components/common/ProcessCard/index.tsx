import React from 'react';

interface ProcessCardProps {
    number: string;
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isLast?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ number, title, description, icon: Icon, isLast = false }) => {
    return (
        <div className={`flex gap-4 p-6 bg-white rounded-xl shadow-sm ${!isLast ? 'border-b border-solid border-gray-100 lg:border-none' : ''}`}>
            <div className="flex items-center gap-4">
                <div className="min-w-[80px] min-h-[80px] rounded-lg bg-green-100/50 flex items-center justify-center relative">
                    <Icon className="w-8 h-8 text-green-primary" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-extrabold text-green-primary p-1 font-kirovi">
                    {number}
                </span>
                <h3 className="text-lg font-bold text-gray-800 font-kirovi">{title}</h3>
                <p className="text-sm text-gray-600 font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ProcessCard;
