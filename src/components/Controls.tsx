import Button from "./ui/Button";
import {
    CameraIcon,
    CameraSlashIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    PhoneDisconnect,
} from "./ui/Icons";
import { useMediaContext } from "@context/MediaContext";

export const Controls = () => {
    const {
        toggleAudio,
        toggleVideo,
        isAudioEnabled,
        isVideoEnabled,
        stream,
        endCall,
    } = useMediaContext();

    const audioActive = stream && isAudioEnabled;
    const videoActive = stream && isVideoEnabled;

    return (
        <div className="flex gap-6 justify-center p-4">
            <Button
                onClick={toggleAudio}
                variant={audioActive ? "default" : "danger"}
                icon={audioActive ? <MicrophoneIcon /> : <MicrophoneSlashIcon />}
                aria-label={audioActive ? "Mute microphone" : "Unmute microphone"}
                disabled={!stream}
            />
            <Button
                onClick={toggleVideo}
                variant={videoActive ? "default" : "danger"}
                icon={videoActive ? <CameraIcon /> : <CameraSlashIcon />}
                aria-label={videoActive ? "Turn off camera" : "Turn on camera"}
                disabled={!stream}
            />
            <Button
                onClick={endCall}
                variant="danger"
                icon={<PhoneDisconnect />}
                aria-label="End call"
                disabled={!stream}
            />
        </div>
    );
};
