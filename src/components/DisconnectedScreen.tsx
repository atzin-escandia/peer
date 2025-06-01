import { useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";
import { CameraIcon } from "@components/ui/Icons";

const DisconnectedScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-10">
            <p className="text-white md:text-xl">
                Call ended. Please start a new meeting.
            </p>
            <Button onClick={() => navigate("/")} icon={<CameraIcon />}>
                New meeting
            </Button>
        </div>
    );
};

export default DisconnectedScreen;
