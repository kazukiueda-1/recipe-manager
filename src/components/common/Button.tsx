import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base = 'rounded-lg px-4 py-2.5 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-white text-primary-500 border border-primary-300 hover:bg-primary-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
