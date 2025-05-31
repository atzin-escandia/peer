import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import PreMeet from "@components/PreMeet";
import { Controls } from "@components/Controls";
import { LocalVideo } from "@components/LocalVideo";
import { RemoteVideo } from "@components/RemoteVideo";
import Loading from "@components/Loading";
import Button from "@components/ui/Button";
import { CameraIcon, ChatIcon, } from "@components/ui/Icons";
import Chat from "@components/Chat";
import { MeetingCodeDialog } from "@components/MeetingCodeDialog";

export const Meet = () => {
    const { status, meetingId } = useSelector((state: RootState) => state.call);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (status === "available" && meetingId) {
            setOpen(true)
        }
    }, [status, meetingId]);

    if (status === "idle") return <PreMeet />;

    const RenderContent = () => {
        switch (status) {
            case "connecting":
                return <Loading />;

            case "disconnected":
                return (
                    <div className="text-center space-y-10">
                        <p className="text-white">
                            Call ended. Please start a new meeting.
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            icon={<CameraIcon />}
                        >
                            New meeting
                        </Button>
                    </div>
                );

            default:
                return (
                    <div className="relative flex w-full">
                        <div className="flex flex-col flex-1 space-y-5">
                            <div className="relative w-full h-[calc(100vh-200px)]">
                                <LocalVideo isMeet />
                                <RemoteVideo />
                            </div>
                            <div className="grid grid-cols-3 items-center w-full px-5">
                                <div />
                                <Controls />
                                <Button className="ml-auto" onClick={() => setIsChatOpen(true)} icon={<ChatIcon />} />
                            </div>
                        </div>
                        {isChatOpen && <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
                        <MeetingCodeDialog open={open} setOpen={setOpen} meetingId={meetingId as string} />
                    </div>
                );
        }
    };

    return (
        <section className="relative flex flex-col justify-center items-center h-[calc(100vh-60px)] bg-black">
            <RenderContent />
        </section>
    );
};

export default Meet;
