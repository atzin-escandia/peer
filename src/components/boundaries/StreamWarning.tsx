import Callout from "@components/ui/Callout";
import { WarningIcon } from "@components/ui/Icons";
import { useMediaContext } from "@context/MediaContext";

export const StreamWarning = ({ className, status }: { className?: string, status?: string }) => {
    const { hasAudioTrack, hasVideoTrack } = useMediaContext();

    let warningText = "";

    if (!hasAudioTrack && !hasVideoTrack) {
        warningText = "microphone and camera.";
    } else if (!hasAudioTrack) {
        warningText = "microphone.";
    } else if (!hasVideoTrack) {
        warningText = "camera.";
    }

    return (warningText && status !== 'disconnected') ? (
        <Callout
            className={className}
            variant="warning"
            text={`You need to allow access to your ${warningText}`}
            icon={<WarningIcon />}
        />
    ) : null;
};
