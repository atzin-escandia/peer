import { MicrophoneSlashIcon } from "@components/ui/Icons";
import UserAvatar from "@components/UserAvatar";
import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";

const VideoOverlay = () => {
    const { username } = useUserContext();
    const { stream, isAudioEnabled, isVideoEnabled } = useMediaContext();
    const videoActive = stream && isVideoEnabled;
    const audioActive = stream && isAudioEnabled;

    return (
        <>
            {!audioActive && (
                <MicrophoneSlashIcon size={30} className="absolute bottom-5 left-5 text-white" />
            )}
            {!videoActive && (
                <div className="w-full h-full flex justify-center items-center absolute">
                    <UserAvatar />
                </div>
            )}
            <h2 className="text-white text-sm absolute bottom-5 right-5 capitalize font-extrabold">
                {username ? username.slice(0, 20) : "Your name"}
            </h2>
        </>
    );
};

export default VideoOverlay;
