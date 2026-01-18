"use client";
import React, { useState } from "react";

export default function AboutTimeline() {
  const timelineData = [
    {
      year: 2015,
      title: "დაარსება",
      description:
        "კომპანია დაარსდა და დაიწყო პირველი ნაბიჯები სამშენებლო ბაზარზე, ჩამოყალიბდა გუნდი და მთავარი ხედვა.",
    },
    {
      year: 2018,
      title: "პირველი პროექტი",
      description:
        "წარმატებით დასრულდა პირველი საცხოვრებელი კომპლექსი მრავალწლიანი გარანტიით, რომელმაც მაღალი შეფასება დაიმსახურა.",
    },
    {
      year: 2021,
      title: "გაფართოება",
      description:
        "დავიწყეთ მასშტაბური პროექტები რეგიონებში და დავნერგეთ ეკოლოგიურად სუფთა მშენებლობის ახალი სტანდარტები.",
    },
    {
      year: 2025,
      title: "მომავლის გეგმები",
      description:
        "ვგეგმავთ ინოვაციური 'ჭკვიანი სახლების' მშენებლობას და საერთაშორისო სტანდარტების სრულ დანერგვას საქართველოში.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 pt-0 text-center font-kirovi">
      <p className="text-green-primary font-bold uppercase text-[20px] tracking-[0.2em] mb-4">
        ისტორია
      </p>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-16">
        გზა წარმატებისკენ
      </h2>

      <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-20 px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#006341] -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${(activeIndex / (timelineData.length - 1)) * 100}%`,
          }}
        />

        {timelineData.map((item, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setActiveIndex(index)}
              className={`w-10 h-10 rounded-full border-4 border-[#F8F6F1] flex items-center justify-center transition-all duration-300 
                                ${index <= activeIndex ? "bg-[#006341] shadow-lg" : "bg-gray-300"}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${index <= activeIndex ? "bg-white" : "bg-gray-400"}`}
              />
            </button>
            <span
              className={`mt-4 font-bold text-lg ${index === activeIndex ? "text-green-primary" : "text-gray-400"}`}
            >
              {item.year}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute inset-0 bg-green-primary/5 rounded-[40px] rotate-2 scale-105 blur-xl group-hover:rotate-1 transition-transform duration-500" />

        <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-10 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-green-primary rounded-b-full shadow-[0_0_15px_rgba(0,99,65,0.3)]" />

          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#F8F6F1] border border-green-primary/10 text-green-primary rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl font-black">
                {timelineData[activeIndex].year}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-primary/30" />
              <span className="font-bold tracking-wide uppercase text-lg">
                {timelineData[activeIndex].title}
              </span>
            </div>

            <div className="relative">
              <span className="absolute -top-6 -left-4 text-6xl text-gray-100 font-serif leading-none pointer-events-none select-none">
                “
              </span>
              <p className="text-gray-600 font-mtavruli leading-relaxed text-xl relative z-10 px-4">
                {timelineData[activeIndex].description}
              </p>
              <span className="absolute -bottom-10 -right-4 text-6xl text-gray-100 font-serif leading-none pointer-events-none select-none">
                ”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
