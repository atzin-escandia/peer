import { JoinMeetForm } from "@components/forms/JoinMeetForm";
import { StartMeetForm } from "@components/forms/StartMeetForm";
import Card from "@components/ui/Card";
import Tabs from "@components/ui/Tab";
import { VideoPlaceholder } from "./ui/VideoPlaceholder";
import TabsContent from "./TabsMeeting";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";

const PreMeet = () => {
    const { stream } = useMediaContext();
    const { createPeer } = useWebRTC(stream!);

    const tabs = [
        {
            id: "start",
            label: "Start meeting",
            content: <TabsContent FormComponent={(props) => <StartMeetForm {...props} createPeer={createPeer} />} />,
        },
        {
            id: "join",
            label: "Join meeting",
            content: <TabsContent FormComponent={(props) => <JoinMeetForm {...props} createPeer={createPeer} />} />,
        },
    ];

    return (
        <section className="h-[calc(100vh-60px)] text-[var(--header-text)] border-r border-[var(--border-color)] md:grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center">
                <Card>
                    <Tabs tabs={tabs} />
                </Card>
            </div>
            <div className="bg-black flex items-center justify-center w-full h-full">
                <VideoPlaceholder />
            </div>
        </section>
    );
};

export default PreMeet;
