import Button from "./ui/Button";
import { CameraIcon, CameraSlashIcon, CrossIcon, MicrophoneIcon, MicrophoneSlashIcon } from "./ui/Icons";

type Props = {
    onEndCall: () => void;
    onToggleVideo: () => void;
    onToggleAudio: () => void;
    isAudioEnabled: boolean
    isVideoEnabled: boolean
};

export const Controls = ({ onEndCall, onToggleAudio, onToggleVideo, isAudioEnabled, isVideoEnabled }: Props) => {
    const audioIcon = isAudioEnabled ? <MicrophoneIcon /> : <MicrophoneSlashIcon />;
    const videoIcon = isVideoEnabled ? <CameraIcon /> : <CameraSlashIcon />;

    return (
        <div className="flex gap-6 justify-center p-4">
            <Button onClick={onToggleAudio} icon={audioIcon} />
            <Button onClick={onToggleVideo} icon={videoIcon} />
            <Button variant="danger" onClick={onEndCall} icon={<CrossIcon />} />
        </div>
    )
};
