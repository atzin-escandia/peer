import Button from "./ui/Button";
import {
    CameraIcon,
    CameraSlashIcon,
    MicrophoneIcon,
    MicrophoneSlashIcon,
    PhoneDisconnect,
} from "./ui/Icons";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";
import { useState } from "react";

export const Controls = () => {
    const {
        toggleAudio,
        toggleVideo,
        isAudioEnabled,
        isVideoEnabled,
        stream,
        endCall,
    } = useMediaContext();

    const { createPeer, applyRemoteSignal } = useWebRTC(stream!);
    const [remoteSignal, setRemoteSignal] = useState("");

    const audioActive = stream && isAudioEnabled;
    const videoActive = stream && isVideoEnabled;

    return (
        <div className="flex flex-col items-center gap-4">
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

            <div className="flex gap-2">
                <Button onClick={() => createPeer(true)} disabled={!stream}>
                    Start Call
                </Button>
                <Button onClick={() => createPeer(false)} disabled={!stream}>
                    Join Call
                </Button>
            </div>

            <textarea
                placeholder="The other codee"
                value={remoteSignal}
                onChange={(e) => setRemoteSignal(e.target.value)}
                onBlur={() => {
                    try {
                        const data = JSON.parse(remoteSignal);
                        applyRemoteSignal(data);
                    } catch (err) {
                        alert("Invalid signal JSON");
                    }
                }}
                className="w-full max-w-md p-2 border rounded-md"
            />
        </div>
    );
};
