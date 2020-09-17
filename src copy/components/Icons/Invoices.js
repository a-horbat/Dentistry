import React from "react";

export default ({ style }) => {
  return (
    <svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#9B51E0" />
      <rect
        x="8.5"
        y="3.5"
        width="7"
        height="10"
        rx="1.5"
        fill="white"
        stroke="white"
      />
      <rect
        x="4.75"
        y="5.75"
        width="6.5"
        height="9.5"
        rx="1.25"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};
