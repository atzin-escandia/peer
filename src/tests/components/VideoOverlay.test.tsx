import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import VideoOverlay from "@components/VideoOverlay";

vi.mock("@components/UserAvatar", () => ({
    default: () => <div data-testid="user-avatar">Avatar</div>,
}));

vi.mock("@components/ui/Icons", () => ({
    MicrophoneSlashIcon: ({ className }: { className: string }) => (
        <div data-testid="mic-icon" className={className}>Mic Off</div>
    ),
}));

let mockUser = { username: "Atzin" };
let mockMedia = { isAudioEnabled: true, isVideoEnabled: true };
let mockTrackStatus = { audioTrackEnabled: true, videoTrackEnabled: true };

vi.mock("@context/UserContext", () => ({
    useUserContext: () => mockUser,
}));

vi.mock("@context/MediaContext", () => ({
    useMediaContext: () => mockMedia,
}));

vi.mock("@hooks/useTrackStatus", () => ({
    useTrackStatus: () => mockTrackStatus,
}));

const createMocks = ({
    username = "Atzin",
    isAudioEnabled = true,
    isVideoEnabled = true,
    audioTrackEnabled = true,
    videoTrackEnabled = true,
} = {}) => {
    mockUser = { username };
    mockMedia = { isAudioEnabled, isVideoEnabled };
    mockTrackStatus = { audioTrackEnabled, videoTrackEnabled };
};

describe("VideoOverlay", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the username", () => {
        createMocks();
        render(<VideoOverlay />);
        expect(screen.getByText("Atzin")).toBeInTheDocument();
    });

    it("displays the microphone icon when audio is disabled", () => {
        createMocks({ isAudioEnabled: false });
        render(<VideoOverlay />);
        expect(screen.getByTestId("mic-icon")).toBeInTheDocument();
    });

    it("displays the microphone icon when audioTrack is disabled", () => {
        createMocks({ audioTrackEnabled: false });
        render(<VideoOverlay />);
        expect(screen.getByTestId("mic-icon")).toBeInTheDocument();
    });

    it("shows the user avatar when video is disabled", () => {
        createMocks({ isVideoEnabled: false });
        render(<VideoOverlay />);
        expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
    });

    it("shows the user avatar when videoTrack is disabled", () => {
        createMocks({ videoTrackEnabled: false });
        render(<VideoOverlay />);
        expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
    });
});
