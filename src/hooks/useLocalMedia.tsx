import { useEffect, useState } from "react";

export const useLocalMedia = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const media = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setStream(media);
            } catch (error) {
                console.error('Error here gettin media', error)
            }
        };

        init();
    }, []);

    const toggleAudio = () => {
        if (!stream) return;
        stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
        setIsAudioEnabled(prev => !prev);
    };

    const toggleVideo = () => {
        if (!stream) return;
        stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
        setIsVideoEnabled(prev => !prev);
    };

    const endCall = () => {
        if (!stream) return;
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
    };

    return {
        stream,
        isAudioEnabled,
        isVideoEnabled,
        toggleAudio,
        toggleVideo,
        endCall,
    };
};
