import { VideoPlaceholder } from "@components/ui/VideoPlaceholder";
import { Controls } from "./Controls";

const MeetContent = () => {
    return <section className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40">
        <div className="w-full max-w-4xl mb-6">
            <VideoPlaceholder />
        </div>
        <Controls />
    </section>
};

export default MeetContent;
