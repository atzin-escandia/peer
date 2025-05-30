import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { useEffect, useRef } from "react";
import { useMediaContext } from "@context/MediaContext";

export const RemoteVideo = () => {
    // const remoteStream = useSelector(
    //     (state: RootState) => state.call.remoteStream
    // );
    // const remoteRef = useRef<HTMLVideoElement>(null);

    // useEffect(() => {
    //     if (remoteRef.current && remoteStream) {
    //         remoteRef.current.srcObject = remoteStream;
    //     }
    // }, [remoteStream]);

    // if (!remoteStream) return null;

    // return <video
    //     ref={remoteRef}
    //     autoPlay
    //     playsInline
    //     className="rounded-xl aspect-video w-full"
    // />

    const { stream } = useMediaContext();
    const localRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localRef.current && stream) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    return (<video
        ref={localRef}
        autoPlay
        playsInline
        muted
        className="aspect-video w-full h-full"
    />
    );
};
