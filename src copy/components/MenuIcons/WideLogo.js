import React from "react";

export default ({ style }) => {
  return (
    <svg
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="132"
      height="52"
      fill="none"
      viewBox="0 0 132 52"
    >
      <path fill="url(#pattern0)" d="M0 0H131.13V52H0z" />
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00345 .0087)" xlinkHref="#image0" />
        </pattern>
        <image
          id="image0"
          width="290"
          height="115"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
