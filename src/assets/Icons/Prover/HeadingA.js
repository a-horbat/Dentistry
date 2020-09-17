import React from 'react';

export default ({ styles, other }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#828282"
      styles={styles}
      {...other}
    >
      <path
        d="M15.04 17.296H8.056L6.856 20.704H4L9.976 4H13.144L19.12 20.704H16.24L15.04 17.296ZM14.272 15.064L11.56 7.312L8.824 15.064H14.272Z"
        fill="current"
      />
    </svg>
  );
};
