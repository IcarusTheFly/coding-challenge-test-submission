import { ButtonProps } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  className,
  ...restProps
}) => {
  const classNames = [$.button];
  if (variant === 'primary') {
    classNames.push($.primary);
  } else if (variant === 'secondary') {
    classNames.push($.secondary);
  } else if (variant === 'dark') {
    classNames.push($.dark);
  }
  
  // Add custom className if provided
  if (className) {
    classNames.push(className);
  }

  return (
    <button
      className={classNames.join(' ')}
      type={type}
      onClick={onClick}
      disabled={loading}
      {...restProps}
    >
      {loading && <span data-testid="loading-spinner" className={$.spinner}></span>}
      {children}
    </button>
  );
};

export default Button;
