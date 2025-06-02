import { createContext, useContext } from "react";
import { useLocalMedia } from "@hooks/useLocalMedia";

type MediaContextType = {
    stream: MediaStream | null;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    hasAudioTrack: boolean;
    hasVideoTrack: boolean;
    toggleAudio: () => void;
    toggleVideo: () => void;
    endCall: () => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
    const media = useLocalMedia();

    return (
        <MediaContext.Provider value={media}>
            {children}
        </MediaContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMediaContext = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error("useMediaContext must be used within a MediaProvider");
    }
    return context;
};
