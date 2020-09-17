import React from 'react';

export default ({ style }) => {
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
        fill="#C7C7CC"
        fillRule="evenodd"
        d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M10.554 14.56l6.451-6.755a.962.962 0 011.404 0 1.075 1.075 0 010 1.47L10.554 17.5 5.99 12.723a1.075 1.075 0 010-1.47.962.962 0 011.404 0l3.159 3.306z"
      />
    </svg>
  );
};
