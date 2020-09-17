import React from 'react';

export default ({ style }) => {
  return (
    <svg
      style={style || {}}
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9425 1.05715C11.4632 1.57785 11.4632 2.42207 10.9425 2.94277L3.88529 9.99996L10.9425 17.0572C11.4632 17.5779 11.4632 18.4221 10.9425 18.9428C10.4218 19.4635 9.57756 19.4635 9.05686 18.9428L1.05687 10.9428C0.536166 10.4221 0.536166 9.57785 1.05687 9.05715L9.05687 1.05715C9.57756 0.536451 10.4218 0.536451 10.9425 1.05715Z"
        fill="#4F4F4F"
      />
    </svg>
  );
};
