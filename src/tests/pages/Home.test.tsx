/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@pages/Home";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

vi.mock("@components/ui/Icons", () => ({
    CameraIcon: () => <div data-testid="camera-icon" />,
    VideoIcon: ({ className, size }: { className?: string; size?: number }) => (
        <div data-testid="video-icon" className={className}>
            Video Icon {size}
        </div>
    ),
}));

vi.mock("@components/ui/Button", () => ({
    default: ({ children, onClick, icon, className }: any) => (
        <button onClick={onClick} className={className} data-testid="custom-button">
            {icon}
            {children}
        </button>
    ),
}));

describe("Home component", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(mockNavigate);
    });

    it("renders heading, description, button and icons", () => {
        render(<Home />);

        expect(
            screen.getByRole("heading", {
                name: /video calls & meetings for everyone/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByText(/connect, collaborate and celebrate from anywhere/i)
        ).toBeInTheDocument();

        expect(screen.getByRole("button", { name: /new meeting/i })).toBeInTheDocument();
        expect(screen.getByTestId("camera-icon")).toBeInTheDocument();
        expect(screen.getByTestId("video-icon")).toHaveTextContent("Video Icon 300");
    });

    it("navigates to /meet when clicking the button", async () => {
        render(<Home />);
        const button = screen.getByRole("button", { name: /new meeting/i });
        await userEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith("/meet");
    });
});
