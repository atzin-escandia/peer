import Loading from "@components/ui/Loading";
import { MeetingCodeDialog } from "@components/dialogs/MeetingCodeDialog";
import DisconnectedScreen from "./DisconnectedScreen";
import CallUI from "./CallUI";

interface MeetContentProps {
    status: string;
    meetingId: string;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

const MeetContent = ({ status, meetingId, isDialogOpen, setIsDialogOpen }: MeetContentProps) => {
    switch (status) {
        case "connecting":
            return <Loading />;
        case "disconnected":
            return <DisconnectedScreen />;
        default:
            return (
                <>
                    <CallUI />
                    <MeetingCodeDialog open={isDialogOpen} setOpen={setIsDialogOpen} meetingId={meetingId} />
                </>
            );
    }
};

export default MeetContent;
