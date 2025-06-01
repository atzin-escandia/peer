import { useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@components/ui/Dialog";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { CheckIcon, CopyIcon } from "../ui/Icons";
import Callout from "../ui/Callout";
import confetti from "canvas-confetti";
import { VITE_HTTP_URL } from "@utils/index";

export function MeetingCodeDialog({
    meetingId,
    open,
    setOpen,
}: {
    meetingId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    useEffect(() => {
        if (open) {
            confetti();
            const timer = setTimeout(() => {
                confetti.reset();
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleCopyLink = () => {
        const fullLink = `${VITE_HTTP_URL}/meet/${meetingId}`;
        navigator.clipboard
            .writeText(fullLink)
            .then(() => toast.success("Copied!"))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                preventCloseOnOutsideClick
                onKeyDown={(event) => {
                    event.stopPropagation();
                }}
            >
                <DialogHeader className="px-2 py-2">
                    <DialogTitle className="text-center text-black">
                        Your meeting's ready
                    </DialogTitle>
                    <DialogClose
                        asChild
                        className="absolute top-5 left-5 cursor-pointer"
                    />
                </DialogHeader>
                <div className="ml-3 flex-1 text-black">
                    <p className="mt-2 mb-5 text-xs">
                        Share this link with your friends so they can join this party.
                    </p>
                </div>
                <div className="relative w-full flex">
                    <Callout
                        variant="success"
                        text={meetingId}
                        icon={<CheckIcon />}
                    />
                    <Button
                        className="absolute right-0 top-2"
                        variant="ghost"
                        icon={<CopyIcon className="text-[var(--text-success)]" />}
                        onClick={handleCopyLink}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
