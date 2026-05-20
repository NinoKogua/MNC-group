import { LucideIcon } from 'lucide-react';

interface FeatureProps {
    // მხარდაჭერილია როგორც Lucide, ისე შენი Custom SVG ხატულები
    Icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    description: string;
}

export default function FeatureCard({ Icon, title, description }: FeatureProps) {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-start text-left">

            {/* ხატულის კონტეინერი */}
            <div className="p-3 mb-4 rounded-xl bg-green-50 text-green-primary">
                <Icon size={28} />
            </div>

            {/* სათაური */}
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-kirovi">
                {title}
            </h3>

            {/* აღწერა */}
            <p className="text-gray-600 text-sm">
                {description}
            </p>
        </div>
    );
}
