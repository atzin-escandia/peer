import { clsx } from "clsx";
import { forwardRef } from "react";

type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    variant?: "default" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
    "inline-flex items-center gap-2 px-4 py-2 rounded-3xl border transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 w-fit";

const variantStyles = {
    default:
        "bg-[var(--bg-color)] text-[var(--text-color)] border-b border-[var(--border-color)]",
    danger:
        "bg-[var(--bg-danger)] text-[var(--border-danger)] border border-red-500",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, icon, disabled, variant = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={clsx(baseStyles, variantStyles[variant], className)}
                aria-disabled={disabled}
                {...props}
            >
                {icon}
                {children}
            </button>
        );
    }
);

export default Button;
