import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import PreMeet from "@components/PreMeet";
import { CopyCodeToast } from "@components/toasters/CopyCodeToast";
import { Controls } from "@components/Controls";
import { LocalVideo } from "@components/LocalVideo";
import { RemoteVideo } from "@components/RemoteVideo";
import Loading from "@components/Loading";
import Button from "@components/ui/Button";
import { CameraIcon } from "@components/ui/Icons";

export const Meet = () => {
    const { status, meetingId } = useSelector((state: RootState) => state.call);

    useEffect(() => {
        if (status === "available" && meetingId) {
            toast.custom(
                (t) => <CopyCodeToast toast={t} meetingId={meetingId} />,
                { duration: Infinity }
            );
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
                    <div className="space-y-5">
                        <div className="relative w-full h-[calc(100vh-200px)]">
                            <LocalVideo isMeet />
                            <RemoteVideo />
                        </div>
                        <Controls />
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
