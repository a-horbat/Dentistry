import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#0B5379" />
      <path d="M4 7.5L9 3L9 5.86364L9 9.13636L9 12L4 7.5Z" fill="white" />
      <path
        d="M16 12.5L11 17L11 14.1364L11 10.8636L11 8L16 12.5Z"
        fill="white"
      />
    </svg>
  );
};
