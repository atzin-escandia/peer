import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useMediaContext } from "@context/MediaContext";
import { Controls } from "@components/Controls";
import MeetContent from "@components/MeetContent";
import Button from "@components/ui/Button";
import { useWebRTC } from "@hooks/useWebRTC";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

export const Meet = () => {
    const { audioError, videoError, stream } = useMediaContext();
    const { createPeer } = useWebRTC(stream!);
    const peer = useSelector((state: RootState) => state.call.peer);

    const audioToastShown = useRef(false);
    const videoToastShown = useRef(false);

    useEffect(() => {
        if (audioError && !audioToastShown.current) {
            toast('Give access to microphone', { icon: '📸' });
            audioToastShown.current = true;
        }
    }, [audioError]);

    useEffect(() => {
        if (videoError && !videoToastShown.current) {
            toast('Give access to camera', { icon: '🎙️' });
            videoToastShown.current = true;
        }
    }, [videoError]);

    return (
        <section className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40">
            <div className="w-full max-w-4xl mb-6">
                <MeetContent />
            </div>
            <Controls />
            {peer && (

                <Button onClick={() => createPeer(false)} disabled={!stream}>
                    Join Call
                </Button>
            )}
        </section>
    );
};

export default Meet;
