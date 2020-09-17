import React from 'react';

const AddUnit = ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill="#C7C7CC"
        fillRule="evenodd"
        d="M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0s14 6.268 14 14z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14 6a1 1 0 00-1 1v6H7a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V7a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default AddUnit;
