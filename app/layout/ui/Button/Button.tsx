"use client";

import { ButtonProps, variantClasses } from "./button.types";

const ButtonUI: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${className}`}>
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};

export default ButtonUI;
