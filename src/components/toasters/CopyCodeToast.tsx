import Button from "@components/ui/Button";
import { CloseIcon } from "@components/ui/Icons";
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
            <Button
                className="absolute top-0 right-0 z-10"
                variant="ghost"
                onClick={() => toast.dismiss(toastObj.id)}
                icon={<CloseIcon />}
            />
            <div className="flex-1 w-0 p-5">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Invite your friend!</p>
                        <p className="mt-1 text-sm text-black/50">
                            Share this code with someone so they can join this meeting
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
