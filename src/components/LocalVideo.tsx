import { useMediaContext } from "@context/MediaContext";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import VideoOverlay from "@components/VideoOverlay";

export const LocalVideo = ({ isMeet }: { isMeet?: boolean }) => {
    const { stream } = useMediaContext();
    const localRef = useRef<HTMLVideoElement>(null);

    const videoStyles = isMeet ? 'sm:absolute z-10 w-full sm:w-60 bottom-5 right-30 sm:p-0' : " min-w-[350px]"

    useEffect(() => {
        if (localRef.current && stream) {
            localRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <>
            <video
                data-testid="video"
                ref={localRef}
                autoPlay
                playsInline
                muted
                className={clsx(videoStyles, 'aspect-video')}
            />
            <VideoOverlay />
        </>
    );
};
