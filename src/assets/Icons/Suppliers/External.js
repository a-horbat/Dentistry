import React from 'react';

const External = ({ style }) => {
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
        d="M5 7a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-6a1 1 0 112 0v6a3 3 0 01-3 3H5a3 3 0 01-3-3V8a3 3 0 013-3h6a1 1 0 110 2H5zM14 3a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 11-2 0V4h-5a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
      <path
        fill="#828282"
        fillRule="evenodd"
        d="M21.707 2.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414-1.414l11-11a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default External;
