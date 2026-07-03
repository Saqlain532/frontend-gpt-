import React from "react";

const ChatIcon = ({ width = 24, height = 20 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="#64748B"
        strokeMiterlimit="10"
        strokeWidth="1.91"
        d="M12,12h0a6.93,6.93,0,0,1,2-4.89l4.66-4.66a2,2,0,0,1,2.87,0h0a2,2,0,0,1,0,2.87L16.89,10A6.92,6.92,0,0,1,12,12Z"
      />

      <path
        fill="none"
        stroke="#64748B"
        strokeMiterlimit="10"
        strokeWidth="1.91"
        d="M14.86,1.48H5.32A3.82,3.82,0,0,0,1.5,5.3v9.54a3.82,3.82,0,0,0,3.82,3.82H9.14L12,21.52l2.86-2.86h3.82a3.82,3.82,0,0,0,3.82-3.82V9.11"
      />
    </svg>
  );
};

export default ChatIcon;