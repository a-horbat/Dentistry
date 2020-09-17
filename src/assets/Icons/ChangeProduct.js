import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path fill="#fff" d="M4 6H17V15H4z" />
      <path
        fill="#EB5757"
        d="M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 3.5a1 1 0 110-2 1 1 0 010 2zm0-3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 3.5a1 1 0 110-2 1 1 0 010 2zm0-11C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 3.5a1 1 0 110-2 1 1 0 010 2z"
      />
      <path fill="#fff" d="M9 13h2v2H9v-2zm0-8h2v6H9V5z" />
    </svg>
  );
};
