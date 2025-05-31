import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@components/ui/Dialog";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import { CopyIcon } from "./ui/Icons";

export function MeetingCodeDialog({
    meetingId,
    open,
    setOpen,
}: {
    meetingId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
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
                        className="absolute top-5 left-5 cursor-pointer "
                    ></DialogClose>
                </DialogHeader>
                <>
                    <div className="ml-3 flex-1 text-black">
                        <p className="text-sm font-medium text-black">
                            Invite your friend!
                        </p>
                        <p className="mt-2 mb-5 text-xs ">
                            Share this code with someone so they can join the
                            party.
                        </p>
                    </div>
                    <Button
                        icon={<CopyIcon />}
                        onClick={() => {
                            navigator.clipboard
                                .writeText(meetingId)
                                .then(() => {
                                    toast.success("Copied!");
                                });
                        }}
                    >
                        Copy code
                    </Button>
                </>
            </DialogContent>
        </Dialog>
    );
}
