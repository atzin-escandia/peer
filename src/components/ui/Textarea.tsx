import { clsx } from "clsx";
import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    icon?: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
    title?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = "", icon: Icon, error, errorMessage, title, id, ...props }, ref) => {
        return (
            <div className="relative">
                {title && (
                    <p className="text-xs mb-2 font-semibold" id={`${id}-title`}>
                        {title}
                    </p>
                )}
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {Icon}
                    </div>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={clsx(
                        "flex w-full text-xs rounded-lg border border-black bg-white px-4 py-2 focus:outline-none focus:ring-2",
                        error ? "border-red-500 focus:ring-red-500" : "border-black",
                        Icon ? "pl-10" : "pl-3",
                        className
                    )}
                    {...props}
                />
                {error && errorMessage && (
                    <p className="text-red-500 text-xs mt-2 ml-2" id={`${id}-error`}>
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;
