import {GithubClient} from "./GithubClient";
import {User, Users} from "../model/model";

describe("Github API", () => {

    describe("Get UserDetails", () => {
        let githubClient: GithubClient;

        beforeEach(() => {
            githubClient = new GithubClient();
        })

        afterEach(() => {
            jest.clearAllMocks();
        });

        test("getUserDetails should return user details successfully", async () => {
            const data: User = {
                id: 1,
                name: "Grijesh",
                avatar_url: "test",
                followers_url: "test",
                following_url: "test",
                location: "test"
            }
            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.resolve(JSON.stringify(data)),
                status: 200
            })

            const apiResponse = await githubClient.getUserDetails("grijesh");
            expect(fetch).toHaveBeenCalledWith("https://api.github.com/users/grijesh");
            expect(apiResponse).toEqual(JSON.stringify(data));
        })

        test("getUserDetails should return error when server return 500", async () => {
            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.resolve("Error"),
                status: 500
            })

            const apiResponse = await githubClient.getUserDetails("test-user").catch(error => error);
            expect(apiResponse).toEqual("Error while fetching test-user details.");
        })

        test("getUserDetails should return error when failed while fetching", async () => {
            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.reject("Error"),
                status: 200
            })

            const apiResponse = await githubClient.getUserDetails("test-user").catch(error => error);
            expect(apiResponse).toEqual("Error");
        })

    })


    describe("Get Users", () => {
        let githubClient: GithubClient;

        beforeEach(() => {
            githubClient = new GithubClient();
        })

        test("getUsers should return users successfully", async () => {
            const data: Users[] = [{
                id: 1,
                login: "test1"
            }, {
                id: 2,
                login: "test2"
            }]

            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.resolve(JSON.stringify(data)),
                status: 200
            })

            const apiResponse = await githubClient.getUsers();
            expect(fetch).toHaveBeenCalledWith("https://api.github.com/users");
            expect(apiResponse).toEqual(JSON.stringify(data));
        })

        test("getUsers should return error when server return 500", async () => {
            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.resolve("Error"),
                status: 500
            })

            const apiResponse = await githubClient.getUsers().catch(error => error);
            expect(apiResponse).toEqual("Error while fetching users.");
        })

        test("getUsers should return error when failed while fetching", async () => {
            window.fetch = jest.fn().mockResolvedValueOnce({
                json:() => Promise.reject("Error"),
                status: 200
            })

            const apiResponse = await githubClient.getUsers().catch(error => error);
            expect(apiResponse).toEqual("Error");
        })

    })


})
