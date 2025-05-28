import { useMediaContext } from "@context/MediaContext";
import { Video } from "@components/Video";
import { VideoPlaceholder } from "@components/ui/VideoPlaceholder";
import UserAvatar from "@components/UserAvatar";

const MeetContent = () => {
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

    return <VideoPlaceholder>{content}</VideoPlaceholder>;
};

export default MeetContent;
