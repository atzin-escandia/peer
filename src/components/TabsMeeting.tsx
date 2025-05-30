import { Controls } from "@components/Controls";
import Callout from "@components/ui/Callout";
import { WarningIcon } from "@components/ui/Icons";
import { useMediaContext } from "@context/MediaContext";

const TabsContent = ({ FormComponent }: { FormComponent: React.ElementType }) => {
    const { stream } = useMediaContext();

    return (
        <div className="space-y-5">
            <FormComponent />
            <Controls isPreMeet={true} />
            {!stream && (
                <Callout
                    variant="warning"
                    text="You need to enable microphone and camera access"
                    icon={<WarningIcon />}
                />
            )}
        </div>
    );
};

export default TabsContent;
