import React from "react";

export const Input = ({ id, type = "text", value, onChange, placeholder, required, className = "" }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} mb-8`}
    />
  );
};
