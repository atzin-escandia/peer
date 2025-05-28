'use client';

import { Controls } from "@components/Controls";
import { Video } from "@components/Video";
import { Loading } from "@components/ui/Loading";
import { useMediaContext } from "@context/MediaContext";

export const Meet = () => {
    const { stream } = useMediaContext();

    return (
        <section className="flex flex-col justify-center items-center h-[calc(100vh-120px)] px-5 lg:px-20 xl:px-40">
            <div className="w-full max-w-4xl mb-6">
                {stream ? <Video stream={stream} muted /> : <Loading />}
            </div>
            <Controls />
        </section>
    );
};

export default Meet;
