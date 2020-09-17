import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      fill="none"
      viewBox="0 0 64 64"
    >
      <g filter="url(#filter0_d)">
        <circle cx="32" cy="30" r="12" fill="#fff" />
      </g>
      <path
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M30 30h-2.667M30 26h-2.667M30 34h-2.667"
      />
      <path
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M35.334 31.334l2-2-2-2"
      />
      <defs>
        <filter
          id="filter0_d"
          width="64"
          height="64"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};
