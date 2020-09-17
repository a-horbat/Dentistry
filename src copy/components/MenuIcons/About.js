import React from "react";

export default ({ style }) => {
  return (
    <svg
      style={style}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C8.08262 22 5.28473 20.8411 3.22183 18.7782C1.15893 16.7153 0 13.9174 0 11Z"
        fill="currentColor"
      />
      <rect x="10" y="4" width="2" height="10" rx="1" fill="currentColor" />
      <rect x="10" y="15" width="2" height="3" rx="1" fill="currentColor" />
    </svg>
  );
};
