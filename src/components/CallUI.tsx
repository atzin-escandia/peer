import { lazy, Suspense, useState } from "react";
import { LocalVideo } from "@components/LocalVideo";
import { RemoteVideo } from "@components/RemoteVideo";
import Button from "@components/ui/Button";
import { ChatIcon } from "@components/ui/Icons";
import clsx from "clsx";
import Controls from "./Controls";
import Loading from "./ui/Loading";
// import Loading from "./Loading";

const Chat = lazy(() => import("@components/Chat"));

const CallUI = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className={clsx('relative sm:flex w-full h-full sm:overflow-hidden ', !isChatOpen && 'items-center flex')}>
            <div className={clsx(isChatOpen && "h-2/3 sm:h-full", "flex flex-col flex-1 space-y-5 overflow-hidden")}>
                <div className="relative flex-1 w-full overflow-hidden pt-10 items-center space-y-10 md:space-y-0">
                    <LocalVideo isMeet />
                    <RemoteVideo />
                </div>
                <div className="grid grid-cols-3 items-center w-full px-5 pb-5">
                    <div />
                    <Controls />
                    <Button className="ml-auto" onClick={() => setIsChatOpen(true)} icon={<ChatIcon />} />
                </div>
            </div>

            {isChatOpen && (
                <div className="h-1/3 sm:h-full overflow-y-auto border-l border-gray-800 bg-black">
                    <Suspense fallback={<div className="sm:h-screen w-full sm:w-[250px] items-center flex justify-center"><Loading /></div>}>
                        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen((prev) => !prev)} />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default CallUI;
