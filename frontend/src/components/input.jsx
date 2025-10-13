import React from "react";
import clsx from "clsx";

/**
 * Reusable Input Component
 * Props:
 * - variant: "default" | "filled" | "underline" | "ghost" | "error" | "success"
 * - size: "sm" | "md" | "lg"
 * - id, type, value, onChange, placeholder, required, className: normal input props
 */

export const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const baseClasses =
    "w-full border rounded-lg focus:outline-none transition-all";

  const variants = {
    default:
      "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500",
    filled:
      "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white",
    underline:
      "border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-blue-500 focus:ring-0",
    ghost:
      "bg-transparent border border-transparent text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
    error:
      "border-red-500 text-red-700 placeholder-red-400 focus:ring-2 focus:ring-red-500",
    success:
      "border-green-500 text-green-700 placeholder-green-400 focus:ring-2 focus:ring-green-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
    />
  );
};

