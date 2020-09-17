import React from 'react';

export default ({ style, ...other }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#828282"
      style={style}
      {...other}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5021 1.40264C10.9577 1.14014 11.4742 1.00195 12 1.00195C12.5258 1.00195 13.0424 1.14015 13.4979 1.40267L13.5 1.40388L20.5 5.40387C20.87 5.61747 21.189 5.90701 21.4369 6.25219C21.4972 6.31257 21.5508 6.38174 21.5956 6.45916C21.6342 6.52585 21.6642 6.59514 21.686 6.66575C21.8917 7.07921 21.9995 7.5354 22 7.99888V16.0009C21.9995 16.527 21.8606 17.0437 21.5973 17.4992C21.334 17.9547 20.9556 18.3329 20.5 18.5959L20.4961 18.5981L13.5 22.5959L13.4982 22.597C13.181 22.7798 12.8341 22.9024 12.4752 22.96C12.3338 23.0365 12.172 23.0799 12 23.0799C11.828 23.0799 11.6662 23.0365 11.5248 22.96C11.1659 22.9024 10.8191 22.7798 10.5019 22.597L10.5 22.5959L3.50386 18.5981L3.5 18.5959C3.04439 18.3329 2.66597 17.9547 2.40269 17.4992C2.13941 17.0437 2.00054 16.527 2 16.0009V7.99888C2.00048 7.53539 2.10832 7.07919 2.31401 6.66573C2.33581 6.59512 2.36582 6.52584 2.4044 6.45916C2.44918 6.38174 2.50275 6.31258 2.56312 6.2522C2.81097 5.90702 3.13004 5.61747 3.5 5.40388L3.50386 5.40165L10.5021 1.40264ZM13 20.5782L19.5 16.8639L19.5016 16.863C19.6527 16.7753 19.7783 16.6496 19.8658 16.4983C19.9535 16.3465 19.9998 16.1742 20 15.9989V8.53742L13 12.5867V20.5782ZM11 12.5867V20.5782L4.5 16.8639L4.49842 16.863C4.34726 16.7753 4.22169 16.6496 4.13423 16.4983C4.04654 16.3466 4.00025 16.1745 4 15.9993V8.53742L11 12.5867ZM12.5 3.13594L18.961 6.82793L12 10.8546L5.039 6.82793L11.4961 3.13815L11.5 3.13593C11.652 3.04816 11.8245 3.00195 12 3.00195C12.1755 3.00195 12.348 3.04817 12.5 3.13594Z"
        fill="current"
      />
    </svg>
  );
};
