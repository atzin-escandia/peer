import { StreamWarning } from "./boundaries/StreamWarning";
import Controls from "./Controls";

const TabsContent = ({ FormComponent }: { FormComponent: React.ElementType }) => {
    return (
        <div className="space-y-5">
            <FormComponent />
            <Controls isPreMeet={true} />
            <StreamWarning />
        </div>
    );
};

export default TabsContent;
