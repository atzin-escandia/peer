import { useMediaContext } from "@context/MediaContext";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { useEffect, useRef } from "react";
import { useUserContext } from "@context/UserContext";

export const Video = () => {
    const { stream } = useMediaContext();
    const remoteStream = useSelector(
        (state: RootState) => state.call.remoteStream
    );
    const { username } = useUserContext();

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
        // <div className="flex flex-col md:flex-row gap-4 justify-center">
        <div className="p-10 relative ">
            <video
                ref={localRef}
                autoPlay
                playsInline
                muted
                className="rounded-xl aspect-auto w-full"
            />
            <h2 className="text-white absolute bottom-10 right-10 capitalize font-extrabold">
                {username.slice(0, 20)}
            </h2>
            {/* {remoteStream && (
                <video
                    ref={remoteRef}
                    autoPlay
                    playsInline
                    className="rounded-xl aspect-auto w-full md:w-1/2"
                />
            )} */}
        </div>
    );
};
