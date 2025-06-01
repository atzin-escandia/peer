import { MicrophoneSlashIcon } from "@components/ui/Icons";
import UserAvatar from "@components/UserAvatar";
import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";
import { useTrackStatus } from "@hooks/useTrackStatus";

const VideoOverlay = () => {
    const { username } = useUserContext();
    const { isAudioEnabled, isVideoEnabled } = useMediaContext();
    const { audioTrackEnabled, videoTrackEnabled } = useTrackStatus();

    return (
        <>
            {(!isAudioEnabled || !audioTrackEnabled) && (
                <MicrophoneSlashIcon size={30} className="absolute bottom-5 left-5 text-white" />
            )}
            {(!isVideoEnabled || !videoTrackEnabled) && (
                <div className="w-full sm:h-full flex justify-center items-center absolute">
                    <UserAvatar />
                </div>
            )}
            <p className="text-white text-sm absolute bottom-5 right-5 capitalize font-extrabold md:text-xl">
                {username ? username.slice(0, 20) : "Your name"}
            </p>
        </>
    );
};

export default VideoOverlay;
