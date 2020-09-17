import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#EB5757" />
      <path d="M14 6L6.5 13.5" stroke="white" strokeWidth="2" />
      <path d="M6.5 6L14 13.5" stroke="white" strokeWidth="2" />
    </svg>
  );
};
