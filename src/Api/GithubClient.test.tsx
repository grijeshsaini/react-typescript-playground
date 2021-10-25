import {GithubClient} from "./GithubClient";
import {UserDetails} from "../model/model";

describe("Github API", () => {

    describe("Get UserDetails", () => {
        let githubClient: GithubClient;

        beforeEach(() => {
            githubClient = new GithubClient();
        })

        test("getUserDetails should return user details successfully", async () => {
            const data: UserDetails = {
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


})
