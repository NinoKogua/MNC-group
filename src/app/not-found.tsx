"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, MessageSquare, Search } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-100 flex flex-col items-center">
    <div className="text-green-primary mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-8 mt-12">
    <div className="container mx-auto text-center">
      <p>&copy; 2023 კომპანიის სახელი. ყველა უფლება დაცულია.</p>
    </div>
  </footer>
);

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl md:text-8xl font-bold text-gray-800 mb-6 font-kirovi">
          ოჰო! გვერდი ვერ მოიძებნა
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          სამწუხაროდ, ძებნით ვერაფერი მოიძებნა, შესაძლოა გვერდი გადატანილი ან
          წაშლილი იყოს. სცადეთ სხვა მისამართი ან დაბრუნდით მთავარ გვერდზე.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/" passHref>
            <button className="bg-green-primary hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
              <ArrowLeft size={20} />
              მთავარ გვერდზე დაბრუნება
            </button>
          </Link>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors shadow-md border border-gray-200">
            კონტაქტი
          </button>
        </div>

        <div className="w-full max-w-4xl pt-12 border-t border-gray-200 mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-8">
            რა სიახლეებს ვეძებდით?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Search size={48} />}
              title="სწრაფი ძებნა"
              description="მოძებნეთ სასურველი ინფორმაცია მარტივად და სწრაფად."
            />
            <FeatureCard
              icon={<Home size={48} />}
              title="მთავარი გვერდი"
              description="დაბრუნდით საწყის გვერდზე და დაიწყეთ თავიდან."
            />
            <FeatureCard
              icon={<MessageSquare size={48} />}
              title="დაგვიკავშირდით"
              description="თუ ვერ იპოვეთ რასაც ეძებდით, მოგვწერეთ."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
