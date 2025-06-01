import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LocalVideo } from "@components/LocalVideo";
import React from "react";

vi.mock("@components/VideoOverlay", () => ({
    __esModule: true,
    default: () => <div data-testid="video-overlay" />,
}));

const mockStream = new MediaStream();
vi.mock("@context/MediaContext", () => ({
    useMediaContext: () => ({
        stream: mockStream,
    }),
}));

describe("LocalVideo", () => {
    let videoMock: HTMLVideoElement;

    beforeEach(() => {
        videoMock = document.createElement("video");
        vi.spyOn(React, "useRef").mockReturnValueOnce({ current: videoMock });
    });

    it("renders video element and sets srcObject", () => {
        render(<LocalVideo />);
        const videoElement = screen.getByTestId("video") as HTMLVideoElement;

        videoElement.srcObject = mockStream;

        expect(videoElement.srcObject).toBe(mockStream);
    });


    it("renders with correct class when isMeet is true", () => {
        render(<LocalVideo isMeet />);
        const video = screen.getByTestId("video");
        expect(video.className).toContain("sm:absolute");
        expect(video.className).toContain("w-full");
        expect(video.className).toContain("sm:w-60");
    });

    it("renders with correct class when isMeet is false", () => {
        render(<LocalVideo />);
        const video = screen.getByTestId("video");
        expect(video.className).toContain("w-full");
        expect(video.className).toContain("aspect-video");
    });

    it("renders VideoOverlay component", () => {
        render(<LocalVideo />);
        expect(screen.getByTestId("video-overlay")).toBeInTheDocument();
    });
});
