import React from 'react';

export default ({ style, ...other }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#828282"
      viewBox="0 0 24 24"
      {...other}
    >
      <path
        fill="current"
        fillRule="evenodd"
        d="M18.86 7.002a1.21 1.21 0 011 .48l2.9 3.872c.159.207.243.46.24.72v5.734a1.2 1.2 0 01-1.2 1.2H19a1.005 1.005 0 01-.17 0 3 3 0 01-5.65 0H9.82a3 3 0 01-5.64 0H4a3 3 0 01-3-3.001V6.002A3 3 0 014 3h10a3 3 0 013 3.002v1h1.86zM6 18.008a1 1 0 102 0 1 1 0 00-2 0zm10 1a1 1 0 110-2 1 1 0 010 2zm3-2h2v-4.673l-2.5-3.332H17v4.002a1 1 0 11-2 0V6.002a1 1 0 00-1-1H4a1 1 0 00-1 1v10.005a1 1 0 001 1h.18a3 3 0 015.64 0h3.36a3 3 0 015.65 0c.057-.004.113-.004.17 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};
