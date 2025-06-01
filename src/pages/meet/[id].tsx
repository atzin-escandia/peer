import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";
import { LocalVideo } from "@components/LocalVideo";
import { RemoteVideo } from "@components/RemoteVideo";
import Button from "@components/ui/Button";
import { CameraIcon, ChatIcon } from "@components/ui/Icons";
import { Controls } from "@components/Controls";
import Loading from "@components/Loading";
import { MeetingCodeDialog } from "@components/dialogs/MeetingCodeDialog";
import Chat from "@components/Chat";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { StreamWarning } from "@components/boundaries/StreamWarning";

const MeetRoom = () => {
    const { id } = useParams<{ id: string }>();
    const { stream } = useMediaContext();
    const { createPeer } = useWebRTC(stream!);
    const [open, setOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { status } = useSelector((state: RootState) => state.call);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            createPeer(true);
            setOpen(true)
        }
    }, [id, stream]);

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
                            onClick={() => navigate('/')}
                            icon={<CameraIcon />}
                        >
                            New meeting
                        </Button>
                    </div>
                );

            default:
                return (
                    <div className="relative flex w-full h-full overflow-hidden">
                        <div className="flex flex-col flex-1 space-y-5 h-full overflow-hidden">
                            <div className="relative flex-1 w-full overflow-hidden pt-10">
                                <LocalVideo isMeet />
                                <RemoteVideo />
                            </div>
                            <div className="grid grid-cols-3 items-center w-full px-5 pb-5">
                                <div />
                                <Controls />
                                <Button
                                    className="ml-auto"
                                    onClick={() => setIsChatOpen(true)}
                                    icon={<ChatIcon />}
                                />
                            </div>
                        </div>
                        {isChatOpen && (
                            <div className="w-[300px] h-full overflow-y-auto border-l border-gray-800 bg-black">
                                <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                            </div>
                        )}
                        <MeetingCodeDialog open={open} setOpen={setOpen} meetingId={id as string} />
                        <StreamWarning className="absolute top-5 left-5" />
                    </div>
                );
        }
    };

    return (
        <section className="relative flex flex-col justify-center items-center bg-black h-screen">
            <RenderContent />
        </section>
    );
};

export default MeetRoom;
