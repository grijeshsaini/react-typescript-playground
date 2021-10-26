import React from "react";
import {act, render, screen} from "@testing-library/react";
import {UserList} from "./UserList";
import {StaticRouter} from "react-router-dom";


describe("Users", () => {
    const githubClientMock = {
        getUsers: jest.fn()
    }

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("Should show loading", async () => {
        await act(async () => {
            githubClientMock.getUsers.mockResolvedValue(Promise.resolve([]));
            render(<UserList githubClient={githubClientMock as any}/>);
            expect(screen.getByText("Loading.....")).toBeInTheDocument();
        });
    });

    test("Should show users table headers", async () => {
        githubClientMock.getUsers.mockResolvedValue(Promise.resolve([]));
        render(<UserList githubClient={githubClientMock as any}/>);
        expect(await screen.findByText("Id")).toBeInTheDocument();
        expect(await screen.findByText("Login")).toBeInTheDocument();
    });

    test("Should show users", async () => {
        githubClientMock.getUsers.mockResolvedValue(Promise.resolve([{
            "id" : 1,
            "login": "grijesh"
        }]));
        render(<StaticRouter><UserList githubClient={githubClientMock as any}/></StaticRouter>);
        expect(await screen.findByText("1")).toBeInTheDocument();
        expect(await screen.findByText("grijesh")).toBeInTheDocument();

        const links = await document.querySelectorAll("a");
        expect(links[0].href).toBe("http://localhost/users/grijesh");
        expect(githubClientMock.getUsers).toBeCalled();
    });

})
