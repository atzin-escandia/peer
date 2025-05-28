import type { ReactNode } from "react";
import clsx from "clsx";

interface SVGWrapperProps {
    children: ReactNode;
    className?: string;
    size?: number;
}

const SVGWrapper = ({ children, className, size = 24 }: SVGWrapperProps) => {
    return (
        <div
            className={clsx("flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            {children}
        </div>
    );
};

export default SVGWrapper;
