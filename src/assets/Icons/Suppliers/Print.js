import React from 'react';

const Print = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill="#828282"
        fillRule="evenodd"
        d="M4 1a1 1 0 011-1h12a1 1 0 011 1v6h1a3 3 0 013 3v5a3 3 0 01-3 3h-1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3H3a3 3 0 01-3-3v-5a3 3 0 013-3h1V1zm2 16v3h10v-6H6v3zm12-1v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3H3a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-1zM16 2v5H6V2h10z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Print;
