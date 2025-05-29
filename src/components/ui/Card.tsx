import React from "react";

const Card = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="bg-[var(--header-bg)] p-10 rounded-3xl border border-[var(--border-color)] min-w-[500px]">
            {children}
        </div>
    );
};

export default Card;
