'use client';

import { Controls } from "@components/Controls";
import { Video } from "@components/Video";
import { Loading } from "@components/ui/Loading";
import { useLocalMedia } from "@hooks/useLocalMedia";

export const Meet = () => {
    const {
        stream,
        toggleAudio,
        toggleVideo,
        endCall,
        isAudioEnabled,
        isVideoEnabled

    } = useLocalMedia();

    return (
        <section className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40">
            <div className="w-full max-w-4xl mb-6">
                {stream ? <Video stream={stream} muted /> : <Loading />}
            </div>

            <Controls
                onEndCall={endCall}
                onToggleAudio={toggleAudio}
                onToggleVideo={toggleVideo}
                isAudioEnabled={isAudioEnabled}
                isVideoEnabled={isVideoEnabled}
            />
        </section>
    );
};

export default Meet;
