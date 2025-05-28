import Button from "./ui/Button";
import { CameraIcon, CrossIcon, MicrophoneIcon } from "./ui/Icons";

export const Controls = () => (
    <div className="flex gap-6 justify-center p-4">
        <Button icon={<MicrophoneIcon size={30} />}> </Button>
        <Button icon={<CameraIcon size={30} />}> </Button>
        <Button variant="danger" icon={<CrossIcon size={30} />}> </Button>
    </div>
);
