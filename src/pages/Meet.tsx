import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useMediaContext } from "@context/MediaContext";
import MeetContent from "@components/MeetContent";
import PreMeet from "@components/PreMeet";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

export const Meet = () => {
    const { audioError, videoError } = useMediaContext();
    const audioToastShown = useRef(false);
    const videoToastShown = useRef(false);
    const peer = useSelector((state: RootState) => state.call.peer);

    useEffect(() => {
        if (audioError && !audioToastShown.current) {
            toast("Give access to microphone", { icon: "📸" });
            audioToastShown.current = true;
        }
    }, [audioError]);

    useEffect(() => {
        if (videoError && !videoToastShown.current) {
            toast("Give access to camera", { icon: "🎙️" });
            videoToastShown.current = true;
        }
    }, [videoError]);

    return peer ? <MeetContent /> : <PreMeet />;
};

export default Meet;
