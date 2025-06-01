import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Controls } from "@components/Controls";

const toggleAudio = vi.fn();
const toggleVideo = vi.fn();
const endCall = vi.fn();

vi.mock("@context/MediaContext", () => ({
    useMediaContext: () => ({
        toggleAudio,
        toggleVideo,
        endCall,
        isAudioEnabled: true,
        isVideoEnabled: true,
    }),
}));

vi.mock("@hooks/useTrackStatus", () => ({
    useTrackStatus: () => ({
        audioTrackEnabled: true,
        videoTrackEnabled: true,
        hasAudioTrack: true,
        hasVideoTrack: true,
    }),
}));

vi.mock("@components/ui/Button", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ onClick, icon, "aria-label": ariaLabel, disabled }: any) => (
        <button onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
            {icon}
        </button>
    ),
}));

vi.mock("@components/ui/Icons", () => ({
    MicrophoneIcon: () => <span>mic</span>,
    MicrophoneSlashIcon: () => <span>mic-off</span>,
    CameraIcon: () => <span>cam</span>,
    CameraSlashIcon: () => <span>cam-off</span>,
    PhoneDisconnectIcon: () => <span>hangup</span>,
}));

describe("Controls", () => {
    it("renders audio and video buttons with correct labels", () => {
        render(<Controls />);

        expect(screen.getByLabelText("Mute microphone")).toBeInTheDocument();
        expect(screen.getByLabelText("Turn off camera")).toBeInTheDocument();
    });

    it("calls toggleAudio and toggleVideo on click", () => {
        render(<Controls />);

        fireEvent.click(screen.getByLabelText("Mute microphone"));
        fireEvent.click(screen.getByLabelText("Turn off camera"));

        expect(toggleAudio).toHaveBeenCalled();
        expect(toggleVideo).toHaveBeenCalled();
    });

    it("shows End call button when isPreMeet is false", () => {
        render(<Controls isPreMeet={false} />);
        expect(screen.getByLabelText("End call")).toBeInTheDocument();
    });

    it("hides End call button when isPreMeet is true", () => {
        render(<Controls isPreMeet={true} />);
        expect(screen.queryByLabelText("End call")).not.toBeInTheDocument();
    });

    it("calls endCall on End call button click", () => {
        render(<Controls isPreMeet={false} />);
        fireEvent.click(screen.getByLabelText("End call"));
        expect(endCall).toHaveBeenCalled();
    });
});
