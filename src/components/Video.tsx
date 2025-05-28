import { useMediaContext } from "@context/MediaContext";
import { useEffect, useRef } from "react";

export const Video = () => {
    const { stream } = useMediaContext();
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref.current && stream) {
            ref.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            ref={ref}
            autoPlay
            playsInline
            muted={false}
            className="rounded-xl mx-auto aspect-auto"
        />
    );
};
