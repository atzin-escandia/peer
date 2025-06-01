import { CameraIcon, VideoIcon } from "@components/ui/Icons";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col md:flex-row h-[calc(100vh-60px)] px-5 lg:px-20 xl:px-40 items-center mt-[60px] justify-center">
            <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-5xl md:text-7xl font-extrabold mb-4">
                    Video calls & meetings for everyone
                </h2>
                <p className="mt-5 mb-10 w-1/2 mx-auto md:mx-0 text-base md:text-xl">
                    Connect, collaborate and celebrate from anywhere with Peer!
                </p>
                <Button
                    onClick={() => navigate("/meet")}
                    icon={<CameraIcon />}
                    className="mx-auto md:mx-0"
                >
                    New meeting
                </Button>
            </div>
            <VideoIcon className="mx-auto mt-10 md:mt-0" size={300} />
        </section>
    );
};

export default Home;
