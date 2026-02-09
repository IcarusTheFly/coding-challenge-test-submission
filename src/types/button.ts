import { ButtonHTMLAttributes } from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'primary' | 'secondary' | 'dark';

// Extend ButtonHTMLAttributes to allow all standard button props
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
}

