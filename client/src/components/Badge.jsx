import React from "react";

const Badge = ({ props }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10",
    red: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10",
    green: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
    yellow: "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
  };

  const selectedColor = colorStyles[props.color] || colorStyles.blue;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${selectedColor} transition-colors duration-200`}
    >
      {props.text}
    </span>
  );
};

export default Badge;