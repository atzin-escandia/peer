import Button from "@components/ui/Button";
import UserAvatar from "@components/UserAvatar";
import toast from "react-hot-toast"; // IMPORTA el objeto global toast aquí

export const CopyCodeToast = ({ toast: toastObj, meetingId }: { toast: any; meetingId: string }) => {
    return (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        {/* <UserAvatar /> */}
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Invite your friend!
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Share this code with someone so they can join this meeting
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center p-4 border-l border-gray-200">
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
