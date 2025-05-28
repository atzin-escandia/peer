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
    } = useMediaContext();

    const audioIcon = isAudioEnabled ? <MicrophoneIcon /> : <MicrophoneSlashIcon />;
    const videoIcon = isVideoEnabled ? <CameraIcon /> : <CameraSlashIcon />;

    return (
        <div className="flex gap-6 justify-center p-4">
            <Button variant={isAudioEnabled ? 'default' : "danger"} onClick={toggleAudio} icon={audioIcon} />
            <Button variant={isVideoEnabled ? 'default' : "danger"} onClick={toggleVideo} icon={videoIcon} />
            <Button variant="danger" icon={<PhoneDisconnect />} />
        </div>
    );
};
