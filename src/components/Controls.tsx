import { useMediaContext } from "@context/MediaContext";
import Button from "./ui/Button";
import {
    CameraIcon,
    CameraSlashIcon,
    ChatIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    PhoneDisconnectIcon,
} from "./ui/Icons";
import { memo } from "react";

const Controls = ({ isPreMeet, onHandleChat }: { isPreMeet?: boolean; onHandleChat?: () => void }) => {
    const {
        toggleAudio,
        toggleVideo,
        isAudioEnabled,
        isVideoEnabled,
        hasAudioTrack,
        hasVideoTrack,
        endCall,
    } = useMediaContext();

    return (
        <div className="flex gap-6 justify-center p-4">
            <Button
                onClick={toggleAudio}
                variant={isAudioEnabled ? "default" : "danger"}
                icon={isAudioEnabled ? <MicrophoneIcon /> : <MicrophoneSlashIcon />}
                aria-label={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
                disabled={!hasAudioTrack}
            />
            <Button
                onClick={toggleVideo}
                variant={isVideoEnabled ? "default" : "danger"}
                icon={isVideoEnabled ? <CameraIcon /> : <CameraSlashIcon />}
                aria-label={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                disabled={!hasVideoTrack}
            />
            {!isPreMeet && (
                <>
                    <Button onClick={onHandleChat} icon={<ChatIcon />} />
                    <Button
                        onClick={endCall}
                        variant="dangerFull"
                        icon={<PhoneDisconnectIcon />}
                        aria-label="End call"
                    />
                </>
            )}
        </div>
    );
};

export default memo(Controls);
