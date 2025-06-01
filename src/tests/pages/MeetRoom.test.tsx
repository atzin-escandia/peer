/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MeetRoom from "@pages/meet/[id]";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: vi.fn(),
        useNavigate: vi.fn(),
    };
});

vi.mock("@context/MediaContext", () => ({
    useMediaContext: () => ({ stream: {} }),
}));

vi.mock("@hooks/useWebRTC", () => ({
    useWebRTC: () => ({ createPeer: vi.fn() }),
}));

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useSelector: vi.fn(),
    };
});

vi.mock("@components/LocalVideo", () => ({
    LocalVideo: () => <div data-testid="local-video" />,
}));
vi.mock("@components/RemoteVideo", () => ({
    RemoteVideo: () => <div data-testid="remote-video" />,
}));
vi.mock("@components/Controls", () => ({
    Controls: () => <div data-testid="controls" />,
}));
vi.mock("@components/Chat", () => ({
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="chat">Chat Open</div> : null,
}));
vi.mock("@components/ui/Button", () => ({
    default: ({ children, onClick }: any) => (
        <button onClick={onClick}>{children}</button>
    ),
}));
vi.mock("@components/ui/Icons", () => ({
    CameraIcon: () => <div data-testid="camera-icon" />,
    ChatIcon: () => <div data-testid="chat-icon" />,
}));
vi.mock("@components/Loading", () => ({
    default: () => <div data-testid="loading" />,
}));
vi.mock("@components/dialogs/MeetingCodeDialog", () => ({
    MeetingCodeDialog: ({ open }: { open: boolean }) =>
        open ? <div data-testid="meeting-code-dialog" /> : null,
}));
vi.mock("@components/boundaries/StreamWarning", () => ({
    StreamWarning: () => <div data-testid="stream-warning" />,
}));

describe("MeetRoom", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useParams as any).mockReturnValue({ id: "abc123" });
        (useNavigate as any).mockReturnValue(mockNavigate);
    });

    it("renders loading screen when status is 'connecting'", () => {
        (useSelector as any).mockReturnValue({ status: "connecting" });

        render(<MeetRoom />);

        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("shows disconnected message when status is 'disconnected'", () => {
        (useSelector as any).mockReturnValue({ status: "disconnected" });

        render(<MeetRoom />);

        expect(
            screen.getByText(/call ended\. please start a new meeting/i)
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /new meeting/i })).toBeInTheDocument();
    });

    it("shows meeting code dialog if id is present", () => {
        (useSelector as any).mockReturnValue({ status: "connected" });

        render(<MeetRoom />);

        expect(screen.getByTestId("meeting-code-dialog")).toBeInTheDocument();
    });
});
