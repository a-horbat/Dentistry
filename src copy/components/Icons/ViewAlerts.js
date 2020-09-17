import React from 'react'

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
      <circle cx="10" cy="10" r="10" fill="#F2994A"></circle>
      <path
        fill="#fff"
        d="M8.667 15.667h2.666a1.333 1.333 0 11-2.666 0zM16 14.333V15H4v-.667L5.333 13V9a4.667 4.667 0 013.334-4.473v-.194a1.333 1.333 0 112.666 0v.194A4.667 4.667 0 0114.667 9v4L16 14.333z"
      ></path>
    </svg>
  )
}