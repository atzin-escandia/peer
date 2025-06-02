import { lazy, Suspense, useState } from "react";
import { LocalVideo } from "@components/LocalVideo";
import { RemoteVideo } from "@components/RemoteVideo";
import clsx from "clsx";
import Controls from "./Controls";
import Loading from "./ui/Loading";

const Chat = lazy(() => import("@components/Chat"));

const CallUI = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="relative flex flex-col sm:flex-row w-full h-screen overflow-hidden">
            <div
                className={clsx(
                    "flex flex-col flex-1 transition-all duration-300",
                    isChatOpen ? "h-2/3 sm:h-full" : "h-full"
                )}
            >
                <div className="relative flex-1 w-full overflow-hidden pt-10 flex flex-col space-y-10 justify-center">
                    <LocalVideo isMeet />
                    <RemoteVideo />
                </div>
                <div className="mx-auto">
                    <Controls onHandleChat={() => setIsChatOpen((prev) => !prev)} />
                </div>
            </div>
            {isChatOpen && (
                <div className="h-1/3 sm:h-full sm:w-[250px] overflow-y-auto border-l border-gray-800 bg-black">
                    <Suspense
                        fallback={
                            <div className="h-full w-full flex items-center justify-center">
                                <Loading />
                            </div>
                        }
                    >
                        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen((prev) => !prev)} />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default CallUI;
