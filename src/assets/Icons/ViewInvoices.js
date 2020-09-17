import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="10" fill="#9B51E0" />
      <rect
        width="7"
        height="10"
        x="8.5"
        y="3.5"
        fill="#fff"
        stroke="#fff"
        rx="1.5"
      />
      <rect
        width="6.5"
        height="9.5"
        x="4.75"
        y="5.75"
        stroke="#fff"
        strokeWidth="1.5"
        rx="1.25"
      />
    </svg>
  );
};
