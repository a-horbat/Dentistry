import React from 'react';

const CheckboxIn = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="16" height="16" x="4" y="4" fill="#21C5C4" rx="2"></rect>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M16.722 8.667l-6.11 6.11L7.832 12"
      />
    </svg>
  );
};

export default CheckboxIn;
