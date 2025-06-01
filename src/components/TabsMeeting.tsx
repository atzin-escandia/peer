import { Controls } from "@components/Controls";
import { StreamWarning } from "./boundaries/StreamWarning";

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
