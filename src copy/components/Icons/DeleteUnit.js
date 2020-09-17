import React from 'react';

const DeleteUnit = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill="#C7C7CC"
        fillRule="evenodd"
        d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z"
        clipRule="evenodd"
      />
      <g filter="url(#filter0_b)">
        <path
          fill="#fff"
          fillOpacity="0.92"
          fillRule="evenodd"
          d="M8.855 8.855a1.213 1.213 0 000 1.715l3.43 3.43-3.43 3.43a1.213 1.213 0 101.715 1.715l3.43-3.43 3.43 3.43a1.213 1.213 0 101.715-1.715L15.715 14l3.43-3.43a1.213 1.213 0 10-1.715-1.715L14 12.285l-3.43-3.43a1.213 1.213 0 00-1.715 0z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <filter
          id="filter0_b"
          width="65.366"
          height="65.366"
          x="-18.683"
          y="-18.683"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="13.591" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default DeleteUnit;
