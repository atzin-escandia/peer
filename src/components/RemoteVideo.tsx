import remoteVideo from '../assets/video.jpg';

// Simulation of remote video

export const RemoteVideo = () => {
    return (
        <div className="aspect-video w-full sm:h-full sm:p-0">
            <img
                src={remoteVideo}
                alt="Remote video"
                className="w-full h-full object-cover"
            />
        </div>
    );
};
