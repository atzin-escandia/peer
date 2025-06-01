import { CameraIcon, VideoIcon } from "@components/ui/Icons";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="flex h-[calc(100vh-60px)] px-5 lg:px-20 xl:px-40 items-center mt-[60px]">
            <div className="flex flex-col justify-center w-1/2">
                <h1 className="text-7xl font-extrabold mb-4">
                    Video calls & meetings for everyone
                </h1>
                <p className="text-xl mt-5 mb-10 w-2/3">
                    Connect, collaborate and celebrate  from anywhere with Peer!
                </p>
                <Button
                    onClick={() => navigate("/meet")}
                    icon={<CameraIcon />}>
                    New meeting
                </Button>
            </div>
            <VideoIcon className="mx-auto mb-30" size={400} />
        </section>
    );
};

export default Home;
