/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Meet from "@pages/meet";

vi.mock("@components/LocalVideo", () => ({
    LocalVideo: () => <div data-testid="local-video" />,
}));

vi.mock("@components/forms/JoinMeetForm", () => ({
    JoinMeetForm: () => <div data-testid="join-meet-form" />,
}));

vi.mock("@components/forms/StartMeetForm", () => ({
    StartMeetForm: () => <div data-testid="start-meet-form" />,
}));

vi.mock("@components/TabsMeeting", () => ({
    default: ({ FormComponent }: any) => <FormComponent />,
}));

vi.mock("@components/ui/Card", () => ({
    default: ({ children }: any) => <div data-testid="card">{children}</div>,
}));

vi.mock("@components/ui/Tab", () => ({
    default: ({ tabs }: any) => (
        <div data-testid="tabs">
            {tabs.map((tab: any) => (
                <div key={tab.id}>
                    <h3>{tab.label}</h3>
                    {tab.content}
                </div>
            ))}
        </div>
    ),
}));

describe("Meet", () => {
    it("renders LocalVideo and both tabs with corresponding forms", () => {
        render(<Meet />);

        expect(screen.getByTestId("local-video")).toBeInTheDocument();

        expect(screen.getByText("Start meeting")).toBeInTheDocument();
        expect(screen.getByText("Join meeting")).toBeInTheDocument();

        expect(screen.getByTestId("start-meet-form")).toBeInTheDocument();
        expect(screen.getByTestId("join-meet-form")).toBeInTheDocument();
    });
});
