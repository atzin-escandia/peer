import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { StreamWarning } from "@components/boundaries/StreamWarning";
import MeetContent from "@components/MeetContent";

const MeetRoom = () => {
    const { id } = useParams<{ id: string }>();
    const { stream } = useMediaContext();
    const { createPeer } = useWebRTC(stream!);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { status } = useSelector((state: RootState) => state.call);

    useEffect(() => {
        if (id && stream) {
            createPeer(true);
            setIsDialogOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, stream]);

    return (
        <section className="relative flex flex-col justify-center items-center bg-black h-screen">
            <MeetContent status={status} meetingId={id!} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            <StreamWarning status={status} className="absolute top-5 left-5" />
        </section>
    );
};

export default MeetRoom;
