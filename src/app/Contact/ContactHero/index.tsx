import React from "react";
import SparkleStarIcon from "@/assets/icons/SparkleStar"; // დარწმუნდით რომ გზა სწორია

const ContactHero = () => {
  return (
    <div className="flex justify-center bg-[#F8F6F1]">
      <section className="relative bg-[#135544] pt-20 pb-32 overflow-hidden w-full max-w-[1440px]">
        <div className="absolute">
          <svg
            width="1442"
            height="537"
            viewBox="0 0 1442 537"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_213_900)">
              <rect
                x="255.471"
                y="18.3168"
                width="99"
                height="99"
                rx="14.5"
                transform="rotate(28.1136 255.471 18.3168)"
                stroke="#F9F7F3"
                strokeOpacity="0.22"
                strokeWidth="3"
              />
              <rect
                x="1105.02"
                y="1.8401"
                width="60.5649"
                height="60.5649"
                rx="14.5"
                transform="rotate(74.8385 1105.02 1.8401)"
                stroke="#F9F7F3"
                strokeOpacity="0.22"
                strokeWidth="3"
              />
              <rect
                x="1118.79"
                y="398.181"
                width="80.4101"
                height="80.4101"
                rx="16"
                transform="rotate(-30.5684 1118.79 398.181)"
                fill="#F9F7F3"
                fillOpacity="0.22"
              />
              <rect
                x="42.377"
                y="166.644"
                width="60.6268"
                height="60.6268"
                rx="16"
                transform="rotate(44.3456 42.377 166.644)"
                fill="#F9F7F3"
                fillOpacity="0.22"
              />
              <circle
                cx="1388.79"
                cy="318.287"
                r="47.5"
                stroke="#F9F7F3"
                strokeOpacity="0.22"
                strokeWidth="3"
              />
              <circle
                cx="412.367"
                cy="387.864"
                r="33.9881"
                transform="rotate(53.949 412.367 387.864)"
                stroke="#F9F7F3"
                strokeOpacity="0.22"
                strokeWidth="3"
              />
              <circle
                cx="141.19"
                cy="451.731"
                r="69.3362"
                transform="rotate(15 141.19 451.731)"
                fill="#F9F7F3"
                fillOpacity="0.22"
              />
              <circle
                cx="1277.98"
                cy="100.48"
                r="54.0461"
                transform="rotate(15 1277.98 100.48)"
                fill="#F9F7F3"
                fillOpacity="0.22"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_213_900"
                x="2.62598"
                y="3.62378"
                width="1439.16"
                height="525.461"
                filterUnits="userSpaceOnUse"
                colorinterpolation-filters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_213_900"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_213_900"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <span className="text-white text-sm font-bold">ნებისმიერ დროს</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-beige-primary tracking-wider mb-6 font-kirovi">
            დაგვიკავშირდით
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto">
            ჩვენი გუნდი მზად არის დაგეხმაროთ ნებისმიერ საკითხში
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 mx-auto w-full leading-[0] flex justify-center">
          <svg
            width="1599"
            height="402"
            viewBox="0 0 1599 402"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M264.502 40.3017C155.26 17.8339 97.3415 18.6022 -1 40.3017V402H1599V40.3017C1417.06 106.916 1313.57 103.64 1126.89 40.3017C951.507 -11.7321 854.347 -15.1092 683.716 40.3017C529.293 90.4471 438.166 95.4269 264.502 40.3017Z"
              fill="#F9F7F3"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default ContactHero;
