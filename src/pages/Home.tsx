import { CameraIcon } from "@components/ui/Icons";
import Button from "@components/ui/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col justify-center h-[calc(100vh-60px)] px-5 lg:px-20 xl:px-40 ">
            <h2 className="text-7xl font-extrabold mb-4">
                Video calls and  <br /> meetings for everyone
            </h2>
            <p className="text-xl mb-10">
                Connect, collaborate and celebrate  from anywhere <br /> with Peer!
            </p>
            <Button
                onClick={() => navigate("/meet")}
                icon={<CameraIcon />}>
                New meeting
            </Button>
        </section>
    );
};

export default Home;
