import { MicrophoneSlashIcon } from "@components/ui/Icons";
import UserAvatar from "@components/UserAvatar";
import { useMediaContext } from "@context/MediaContext";
import { useUserContext } from "@context/UserContext";

const VideoOverlay = () => {
    const { username } = useUserContext();
    const {
        isAudioEnabled,
        isVideoEnabled,
        hasAudioTrack,
        hasVideoTrack,
    } = useMediaContext();

    return (
        <>
            {(!isAudioEnabled || !hasAudioTrack) && (
                <MicrophoneSlashIcon size={30} className="absolute bottom-1 left-5 text-white" />
            )}
            {(!isVideoEnabled || !hasVideoTrack) && (
                <div className="w-full sm:h-full flex justify-center items-center absolute bottom-10 sm:bottom-0">
                    <UserAvatar />
                </div>
            )}
            <p className="text-white z-50 text-sm absolute bottom-1 right-5 capitalize font-extrabold md:text-xl">
                {username ? username.slice(0, 20) : "Name"}
            </p>
        </>
    );
};

export default VideoOverlay;
