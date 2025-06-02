/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useMediaContext } from "@context/MediaContext";
import { useWebRTC } from "@hooks/useWebRTC";
import { useSelector } from "react-redux";
import MeetRoom from "@pages/meet/[id]";

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}));

vi.mock("@context/MediaContext", () => ({
    useMediaContext: vi.fn(),
}));

vi.mock("@hooks/useWebRTC", () => ({
    useWebRTC: vi.fn(),
}));

vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
}));

vi.mock("@components/MeetContent", () => ({
    __esModule: true,
    default: ({ status, meetingId, isDialogOpen }: any) => (
        <div data-testid="meet-content">
            MeetContent {status} {meetingId} {isDialogOpen ? "open" : "closed"}
        </div>
    ),
}));

vi.mock("@components/boundaries/StreamWarning", () => ({
    StreamWarning: ({ status, className }: any) => (
        <div data-testid="stream-warning" className={className}>
            StreamWarning {status}
        </div>
    ),
}));

describe("MeetRoom component", () => {
    const mockCreatePeer = vi.fn();
    const mockStream = {} as MediaStream;

    beforeEach(() => {
        vi.clearAllMocks();

        (useParams as any).mockReturnValue({ id: "123" });
        (useMediaContext as any).mockReturnValue({ stream: mockStream });
        (useWebRTC as any).mockReturnValue({ createPeer: mockCreatePeer });
        (useSelector as any).mockImplementation((selectorFn: any) =>
            selectorFn({ call: { status: "connected" } })
        );
    });

    it("calls createPeer and opens dialog when stream and id exist", () => {
        render(<MeetRoom />);
        expect(mockCreatePeer).toHaveBeenCalledWith(true);
        expect(screen.getByTestId("meet-content")).toHaveTextContent("MeetContent connected 123 open");
    });

    it("renders MeetContent and StreamWarning with correct props", () => {
        render(<MeetRoom />);
        expect(screen.getByTestId("meet-content")).toBeInTheDocument();
        expect(screen.getByTestId("stream-warning")).toHaveTextContent("StreamWarning connected");
    });

    it("does not call createPeer when stream is null", () => {
        (useMediaContext as any).mockReturnValue({ stream: null });
        render(<MeetRoom />);
        expect(mockCreatePeer).not.toHaveBeenCalled();
    });
});
