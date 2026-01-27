import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button type="button" className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
