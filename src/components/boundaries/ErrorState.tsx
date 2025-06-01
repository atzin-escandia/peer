import { BugIcon } from "@components/ui/Icons";
import clsx from "clsx";

export const ErrorState = ({
    message = "Error",
    fullH,
}: {
    message: string;
    fullH?: boolean;
}) => {
    return (
        <div
            className={clsx(
                " flex-col flex justify-around items-center h-50",
                fullH && "h-[calc(100vh-180px)]"
            )}
        >
            <div className="flex flex-col justify-center items-center gap-5">
                <BugIcon />
                <span className="text-2xl font-semibold">{message}</span>
            </div>
        </div>
    );
};
