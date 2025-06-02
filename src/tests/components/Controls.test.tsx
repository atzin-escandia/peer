/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Controls from "@components/Controls";
import { useMediaContext } from "@context/MediaContext";

vi.mock("@components/ui/Icons", () => ({
    MicrophoneIcon: () => <div data-testid="microphone-icon" />,
    MicrophoneSlashIcon: () => <div data-testid="microphone-slash-icon" />,
    CameraIcon: () => <div data-testid="camera-icon" />,
    CameraSlashIcon: () => <div data-testid="camera-slash-icon" />,
    ChatIcon: () => <div data-testid="chat-icon" />,
    PhoneDisconnectIcon: () => <div data-testid="phone-disconnect-icon" />,
}));

vi.mock("@components/ui/Button", () => ({
    default: ({ onClick, icon, "aria-label": ariaLabel, disabled }: any) => (
        <button onClick={onClick} aria-label={ariaLabel} disabled={disabled} data-testid="custom-button">
            {icon}
        </button>
    ),
}));

vi.mock("@context/MediaContext", () => ({
    useMediaContext: vi.fn(),
}));

describe("Controls component", () => {
    const toggleAudio = vi.fn();
    const toggleVideo = vi.fn();
    const endCall = vi.fn();
    const onHandleChat = vi.fn();

    const mockContext = {
        toggleAudio,
        toggleVideo,
        endCall,
        isAudioEnabled: true,
        isVideoEnabled: true,
        hasAudioTrack: true,
        hasVideoTrack: true,
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useMediaContext as any).mockReturnValue(mockContext);
    });

    it("renders audio and video buttons when audio/video are enabled", () => {
        render(<Controls />);
        expect(screen.getByTestId("microphone-icon")).toBeInTheDocument();
        expect(screen.getByTestId("camera-icon")).toBeInTheDocument();
    });

    it("renders slash icons when audio/video are disabled", () => {
        (useMediaContext as any).mockReturnValue({
            ...mockContext,
            isAudioEnabled: false,
            isVideoEnabled: false,
        });
        render(<Controls />);
        expect(screen.getByTestId("microphone-slash-icon")).toBeInTheDocument();
        expect(screen.getByTestId("camera-slash-icon")).toBeInTheDocument();
    });

    it("disables buttons if there is no audio or video track", () => {
        (useMediaContext as any).mockReturnValue({
            ...mockContext,
            hasAudioTrack: false,
            hasVideoTrack: false,
        });
        render(<Controls />);
        const buttons = screen.getAllByTestId("custom-button");
        expect(buttons[0]).toBeDisabled();
        expect(buttons[1]).toBeDisabled();
    });

    it("calls toggleAudio and toggleVideo on click", async () => {
        render(<Controls />);
        const buttons = screen.getAllByTestId("custom-button");
        await userEvent.click(buttons[0]);
        await userEvent.click(buttons[1]);
        expect(toggleAudio).toHaveBeenCalled();
        expect(toggleVideo).toHaveBeenCalled();
    });

    it("shows Chat and End Call buttons when isPreMeet is false", () => {
        render(<Controls isPreMeet={false} onHandleChat={onHandleChat} />);
        expect(screen.getByTestId("chat-icon")).toBeInTheDocument();
        expect(screen.getByTestId("phone-disconnect-icon")).toBeInTheDocument();
    });

    it("does not show Chat and End Call buttons when isPreMeet is true", () => {
        render(<Controls isPreMeet={true} />);
        expect(screen.queryByTestId("chat-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("phone-disconnect-icon")).not.toBeInTheDocument();
    });

    it("calls onHandleChat and endCall on click", async () => {
        render(<Controls isPreMeet={false} onHandleChat={onHandleChat} />);
        const buttons = screen.getAllByTestId("custom-button");
        await userEvent.click(buttons[2]);
        await userEvent.click(buttons[3]);
        expect(onHandleChat).toHaveBeenCalled();
        expect(endCall).toHaveBeenCalled();
    });
});
