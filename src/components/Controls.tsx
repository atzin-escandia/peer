import { useMediaContext } from "@context/MediaContext";
import Button from "./ui/Button";
import {
    CameraIcon,
    CameraSlashIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    PhoneDisconnectIcon,
} from "./ui/Icons";
import { useTrackStatus } from "@hooks/useTrackStatus";

export const Controls = ({ isPreMeet }: { isPreMeet?: boolean }) => {
    const {
        toggleAudio,
        toggleVideo,
        isAudioEnabled,
        isVideoEnabled,
        endCall,
    } = useMediaContext();

    const {
        audioTrackEnabled,
        videoTrackEnabled,
        hasAudioTrack,
        hasVideoTrack,
    } = useTrackStatus();

    return (
        <div className="flex gap-6 justify-center p-4">
            <Button
                onClick={toggleAudio}
                variant={!audioTrackEnabled ? "danger" : isAudioEnabled ? "default" : "danger"}
                icon={isAudioEnabled ? <MicrophoneIcon /> : <MicrophoneSlashIcon />}
                aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
                disabled={!hasAudioTrack}
            />
            <Button
                onClick={toggleVideo}
                variant={!videoTrackEnabled ? "danger" : isVideoEnabled ? "default" : "danger"}
                icon={isVideoEnabled ? <CameraIcon /> : <CameraSlashIcon />}
                aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                disabled={!hasVideoTrack}
            />
            {!isPreMeet && (
                <Button
                    onClick={endCall}
                    variant="dangerFull"
                    icon={<PhoneDisconnectIcon />}
                    aria-label="End call"
                />
            )}
        </div>
    );
}