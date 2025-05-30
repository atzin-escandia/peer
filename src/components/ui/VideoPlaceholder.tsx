import UserAvatar from "@components/UserAvatar";
import { Video } from "@components/Video";
import { useMediaContext } from "@context/MediaContext";

export const VideoPlaceholder = () => {
    const { stream, videoError, isVideoEnabled } = useMediaContext();

    if (stream && isVideoEnabled) {
        return <Video />;
    }

    let content: React.ReactNode;

    if (!stream) {
        if (videoError) {
            content = <UserAvatar />;
        } else {
            content = <p className="text-center text-gray-500">Loading video...</p>;
        }
    } else {
        content = <UserAvatar />;
    }

    return (
        <div className="rounded-xl w-auto h-[500px] mx-auto aspect-auto bg-black flex items-center justify-center text-white">
            {content}
        </div>
    );
}
