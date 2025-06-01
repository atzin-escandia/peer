import { JoinMeetForm } from "@components/forms/JoinMeetForm";
import { StartMeetForm } from "@components/forms/StartMeetForm";
import { LocalVideo } from "@components/LocalVideo";
import TabsContent from "@components/TabsMeeting";
import Card from "@components/ui/Card";
import Tabs from "@components/ui/Tab";

const Meet = () => {
    const tabs = [
        {
            id: "start",
            label: "Start meeting",
            content: <TabsContent FormComponent={StartMeetForm} />,
        },
        {
            id: "join",
            label: "Join meeting",
            content: <TabsContent FormComponent={JoinMeetForm} />,
        },
    ];

    return (
        <section className="h-[calc(100vh-60px)] text-[var(--header-text)] border-r border-[var(--border-color)] md:grid grid-cols-2 gap-4] mt-[60px]">
            <div className="flex flex-col items-center justify-center">
                <Card>
                    <Tabs tabs={tabs} />
                </Card>
            </div>
            <div className="bg-black/90 flex items-center justify-center w-full h-full">
                <div className="relative rounded-xl w-auto mx-auto aspect-video bg-black flex items-center justify-center text-white min-w-[500px]">
                    <LocalVideo />
                </div>
            </div>
        </section>
    );
};

export default Meet;
