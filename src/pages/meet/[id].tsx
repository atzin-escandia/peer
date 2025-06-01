import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { StreamWarning } from "@components/boundaries/StreamWarning";
import MeetContent from "@components/MeetContent";
import Loading from "@components/ui/Loading";

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
    }, [id, stream]);

    // TODO:CHECK THIS loading
    // if (!stream) return <Loading />;

    return (
        <section className="relative flex flex-col justify-center items-center bg-black h-screen">
            <MeetContent status={status} meetingId={id!} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            <StreamWarning className="absolute top-5 left-5" />
        </section>
    );
};

export default MeetRoom;
