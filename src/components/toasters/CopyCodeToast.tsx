import Button from "@components/ui/Button";
import toast from "react-hot-toast";

export const CopyCodeToast = ({
    toast: toastObj,
    meetingId,
}: {
    toast: any;
    meetingId: string;
}) => {
    return (
        <div className="relative max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            <div className="flex-1 w-0 p-5">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-black">Invite your friend!</p>
                        <p className="mt-1 text-xs text-black/50">
                            Share this code with someone so they can join the party.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center p-4 border-l border-black/10">
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(meetingId).then(() => {
                            toast.dismiss(toastObj.id);
                            toast.success("Copied!");
                        });
                    }}
                >
                    Copy code
                </Button>
            </div>
        </div>
    );
};
