import { useEffect, useRef } from "react";
import { useMediaContext } from "@context/MediaContext";

export const RemoteVideo = () => {
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
        className="aspect-video w-full sm:h-full sm:p-0"
    />
    );
};
