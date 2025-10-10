import React from "react";
import clsx from "clsx";

/**
 * Reusable Button Component
 * Props:
 * - variant: "default" | "outline" | "secondary" | "danger" | "success" | "ghost"
 * - size: "sm" | "md" | "lg" | "xl"
 * - className: extra Tailwind classes
 * - children: button text or elements
 * - ...props: other native button props
 */

export const Button = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    // Primary button
    default: "bg-light-primary text-white hover:bg-primary focus:ring-blue-500",
    
    // Outline button
    outline: "border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
    
    // Secondary button
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    
    // Danger button
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    
    // Success button
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    
    // Ghost button (minimal styling)
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    
    // Link-style button
    link: "text-blue-600 hover:text-blue-800 underline bg-transparent focus:ring-blue-500 p-0",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
    xl: "h-14 px-10 text-xl",
  };

  return (
    <button
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};