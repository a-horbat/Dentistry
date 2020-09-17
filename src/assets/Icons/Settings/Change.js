import React from 'react';

const Edit = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        fill="#828282"
        fillRule="evenodd"
        clipPath="url(#clip0)"
        clipRule="evenodd"
      >
        <path d="M16.293.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L19.586 5l-3.293-3.293a1 1 0 010-1.414z"></path>
        <path d="M7 6a3 3 0 00-3 3v2a1 1 0 11-2 0V9a5 5 0 015-5h14a1 1 0 110 2H7zM7.707 14.293a1 1 0 010 1.414L4.414 19l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
        <path d="M21 12a1 1 0 011 1v2a5 5 0 01-5 5H3a1 1 0 110-2h14a3 3 0 003-3v-2a1 1 0 011-1z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Edit;
