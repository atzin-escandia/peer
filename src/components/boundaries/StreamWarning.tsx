import Callout from "@components/ui/Callout";
import { WarningIcon } from "@components/ui/Icons";
import { useTrackStatus } from "@hooks/useTrackStatus";

export const StreamWarning = ({ className }: { className?: string }) => {
    const { hasAudioTrack, hasVideoTrack } = useTrackStatus();

    let warningText = "";

    if (!hasAudioTrack && !hasVideoTrack) {
        warningText = "microphone and camera.";
    } else if (!hasAudioTrack) {
        warningText = "microphone.";
    } else if (!hasVideoTrack) {
        warningText = "camera.";
    }

    return warningText ? (
        <Callout
            className={className}
            variant="warning"
            text={`You need to allow access to your ${warningText}`}
            icon={<WarningIcon />}
        />
    ) : null;
};
