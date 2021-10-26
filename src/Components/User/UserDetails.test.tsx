import React from "react";
import {act, render, screen} from "@testing-library/react";
import {UserDetails} from "./UserDetails";


describe("User Details", () => {
    const githubClientMock = {
        getUserDetails: jest.fn()
    }

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("Should show loading", async () => {
        await act(async () => {
            githubClientMock.getUserDetails.mockResolvedValue(Promise.resolve([]));
            render(<UserDetails login={"grijesh"} githubClient={githubClientMock as any}/>);
            expect(screen.getByText("Loading....")).toBeInTheDocument();
        });
    });

    test("Should show users details", async () => {
        githubClientMock.getUserDetails.mockResolvedValue(Promise.resolve({
            "name": "Grijesh",
            "location": "Newcastle",
            "avatar_url": "http://localhost/avatar"
        }));
        render(<UserDetails login={"grijesh"} githubClient={githubClientMock as any}/>);
        expect(await screen.findByTestId("name")).toHaveTextContent("Grijesh")
        expect(await screen.findByTestId("location")).toHaveTextContent("Newcastle")
        expect((await screen.findByTestId("avatar") as HTMLImageElement).src).toBe("http://localhost/avatar")
        expect((await screen.findByTestId("avatar") as HTMLImageElement).alt).toBe("Grijesh")
    });

})
