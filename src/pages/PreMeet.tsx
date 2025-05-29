import { Controls } from "@components/Controls";
import { PreMeetForm } from "@components/forms/PreMeetForm";
import Callout from "@components/ui/Callout";
import Card from "@components/ui/Card";
import { WarningIcon } from "@components/ui/Icons";
import UserAvatar from "@components/UserAvatar";
import { useMediaContext } from "@context/MediaContext";

const PreMeet = () => {
    const { stream } = useMediaContext();

    return (
        <section className="h-[calc(100vh-60px)] text-[var(--header-text)] border-r border-[var(--border-color)] md:grid grid-cols-2 gap-4 ">
            <div className="flex flex-col items-center justify-center ">
                <Card>
                    <div className="space-y-5">
                        <PreMeetForm />
                        <Controls isPreMeet={true} />
                        {!stream && (
                            <Callout
                                variant="warning"
                                text="You need to enable microphone and camera access"
                                icon={<WarningIcon />}
                            />
                        )}
                    </div>
                </Card>
            </div>
            <div className="bg-black flex items-center justify-center w-full h-full">
                <UserAvatar />
            </div>
        </section>
    );
};

export default PreMeet;
