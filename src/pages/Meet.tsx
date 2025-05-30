import { useEffect } from "react";
import toast from "react-hot-toast";
import PreMeet from "@components/PreMeet";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { CopyCodeToast } from "@components/toasters/CopyCodeToast";
import { VideoPlaceholder } from "@components/ui/VideoPlaceholder";
import { Controls } from "@components/Controls";

export const Meet = () => {
    const status = useSelector((state: RootState) => state.call.status);
    const meetingId = useSelector((state: RootState) => state.call.meetingId);

    useEffect(() => {
        if (status === "available") {
            toast.custom(
                (t) => <CopyCodeToast toast={t} meetingId={meetingId} />, { duration: Infinity }
            );
        }
    }, [status]);

    console.log("status", status);
    if (status === "idle") return <PreMeet />;
    if (status === "connecting") return <p>Loading...</p>;
    // if (status === "disconnected") {
    //     return (
    //         <div className="h-screen flex items-center justify-center text-white">
    //             <p>Call ended. Please refresh or start a new meeting.</p>
    //         </div>
    //     );
    // }

    return (
        <section className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40">
            <div className="w-full max-w-4xl mb-6">
                <VideoPlaceholder />
            </div>
            <Controls />
        </section>
    );
};

export default Meet;
