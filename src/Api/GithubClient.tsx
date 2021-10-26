import {User, Users} from "../model/model";

export class GithubClient {

    getUserDetails(user: String): Promise<User> {
        return window.fetch(`https://api.github.com/users/${user}`)
            .then(response => {
                if (response.status === 200) {
                    return Promise.resolve(response.json());
                } else {
                    return Promise.reject(`Error while fetching ${user} details.`);
                }
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }

    getUsers(): Promise<Users[]> {
        return window.fetch(`https://api.github.com/users`)
            .then(response => {
                if (response.status === 200) {
                    return Promise.resolve(response.json());
                } else {
                    return Promise.reject(`Error while fetching users.`);
                }
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }

}
