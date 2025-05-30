import { Controls } from "@components/Controls";
import { JoinMeetForm } from "@components/forms/JoinMeetForm";
import { StartMeetForm } from "@components/forms/StartMeetForm";
import Callout from "@components/ui/Callout";
import Card from "@components/ui/Card";
import { WarningIcon } from "@components/ui/Icons";
import Tabs from "@components/ui/Tab";
import { useMediaContext } from "@context/MediaContext";
import { VideoPlaceholder } from "./ui/VideoPlaceholder";

const PreMeet = () => {
    const { stream } = useMediaContext();
    const tabs = [

        {
            id: "tab1",
            label: "Start meeting",
            content: (
                <div className="space-y-5">
                    <StartMeetForm />
                    <Controls isPreMeet={true} />
                    {!stream && (
                        <Callout
                            variant="warning"
                            text="You need to enable microphone and camera access"
                            icon={<WarningIcon />}
                        />
                    )}
                </div>
            ),
        },
        {
            id: "tab2",
            label: "Join meeting",
            content: (
                <div className="space-y-5">
                    <JoinMeetForm />
                    <Controls isPreMeet={true} />
                    {!stream && (
                        <Callout
                            variant="warning"
                            text="You need to enable microphone and camera access"
                            icon={<WarningIcon />}
                        />
                    )}
                </div>
            ),
        },
    ];

    return (
        <section className="h-[calc(100vh-60px)] text-[var(--header-text)] border-r border-[var(--border-color)] md:grid grid-cols-2 gap-4 ">
            <div className="flex flex-col items-center justify-center ">
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
