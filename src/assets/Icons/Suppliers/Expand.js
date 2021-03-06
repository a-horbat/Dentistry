import React from 'react';

const Expand = ({ style }) => {
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
        fill="#828282"
        fillRule="evenodd"
        d="M14 3a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 11-2 0V4h-5a1 1 0 01-1-1zM3 14a1 1 0 011 1v5h5a1 1 0 110 2H3a1 1 0 01-1-1v-6a1 1 0 011-1z"
        clipRule="evenodd"
      />
      <path
        fill="#828282"
        fillRule="evenodd"
        d="M21.707 2.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414l7-7a1 1 0 011.414 0zM10.707 13.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414l7-7a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Expand;
