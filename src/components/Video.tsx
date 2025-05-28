import { useEffect, useRef } from "react";

type Props = { stream: MediaStream | null; muted?: boolean };

export const Video = ({ stream, muted = false }: Props) => {
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
            muted={muted}
            className="rounded-xl w-[70%] h-auto mx-auto"
        />
    );
};
