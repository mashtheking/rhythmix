'use client';

import {ButtonHTMLAttributes, forwardRef} from "react";
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  disabled,
  type = "button",
  className,
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        "w-full rounded-full bg-orange-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold transition-all",
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      { children }
    </button>
  )
})
Button.displayName = "Button";
export default Button;