import React from 'react';

const Mail = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#828282"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      />
      <path
        stroke="#828282"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M22 6l-10 7L2 6"
      />
    </svg>
  );
};

export default Mail;
