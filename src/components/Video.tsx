import { useMediaContext } from "@context/MediaContext";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { useEffect, useRef } from "react";

export const Video = () => {
    const { stream } = useMediaContext();
    const remoteStream = useSelector((state: RootState) => state.call.remoteStream);

    const localRef = useRef<HTMLVideoElement>(null);
    const remoteRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localRef.current && stream) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (remoteRef.current && remoteStream) {
            remoteRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <video
                ref={localRef}
                autoPlay
                playsInline
                muted
                className="rounded-xl aspect-video w-full md:w-1/2"
            />
            {remoteStream && (
                <video
                    ref={remoteRef}
                    autoPlay
                    playsInline
                    className="rounded-xl aspect-video w-full md:w-1/2"
                />
            )}
        </div>
    );
};
