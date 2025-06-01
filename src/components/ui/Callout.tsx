import { clsx } from "clsx";

type CalloutProps = {
    text: string;
    icon?: React.ReactNode;
    variant?: "success" | "warning" | "danger";
    className?: string;
};

const baseStyles =
    "flex items-center gap-3 px-4 py-3 rounded-xl border w-full text-xs max-w-[300px] sm:max-w-[500px]";

const variantStyles = {
    success:
        "bg-[var(--bg-success)] text-[var(--text-success)] border-[var(--border-success)]",
    warning:
        "bg-[var(--bg-warning)] text-[var(--text-warning)] border-[var(--border-warning)]",
    danger:
        "bg-[var(--bg-danger)] text-[var(--text-danger)] border-[var(--border-danger)]",
};

const Callout = ({ text, icon, variant = "success", className }: CalloutProps) => {
    return (
        <div className={clsx(baseStyles, variantStyles[variant], className)}>
            {icon && <span className="text-lg">{icon}</span>}
            <p>{text}</p>
        </div>
    );
};

export default Callout;
