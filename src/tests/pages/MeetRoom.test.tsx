/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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

vi.mock("@components/boundaries/StreamWarning", () => ({
    StreamWarning: () => <div data-testid="stream-warning" />,
}));

vi.mock("@components/MeetContent", () => ({
    __esModule: true,
    default: ({ status, meetingId, isDialogOpen }: any) => (
        <div data-testid="meet-content">
            Status: {status}, MeetingId: {meetingId}, DialogOpen: {isDialogOpen ? "yes" : "no"}
        </div>
    ),
}));

vi.mock("@components/ui/Loading", () => ({
    __esModule: true,
    default: () => <div data-testid="loading" />,
}));

describe("MeetRoom component", () => {
    const mockCreatePeer = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        (useParams as vi.Mock).mockReturnValue({ id: "test-meeting-id" });
        (useMediaContext as vi.Mock).mockReturnValue({ stream: {} });
        (useWebRTC as vi.Mock).mockReturnValue({ createPeer: mockCreatePeer });
        (useSelector as vi.Mock).mockImplementation((selector) =>
            selector({ call: { status: "connected" } })
        );
    });

    it("renders Loading when no stream", () => {
        (useMediaContext as vi.Mock).mockReturnValue({ stream: null });

        render(<MeetRoom />);
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    it("calls createPeer and sets dialog open on mount when id and stream exist", async () => {
        render(<MeetRoom />);

        await waitFor(() => {
            expect(mockCreatePeer).toHaveBeenCalledWith(true);
        });

        expect(screen.getByTestId("meet-content")).toHaveTextContent("DialogOpen: yes");
    });

    it("renders MeetContent and StreamWarning", () => {
        render(<MeetRoom />);
        expect(screen.getByTestId("meet-content")).toBeInTheDocument();
        expect(screen.getByTestId("stream-warning")).toBeInTheDocument();
    });

    it("passes correct props to MeetContent", () => {
        render(<MeetRoom />);
        const meetContent = screen.getByTestId("meet-content");
        expect(meetContent).toHaveTextContent("Status: connected");
        expect(meetContent).toHaveTextContent("MeetingId: test-meeting-id");
    });
});
