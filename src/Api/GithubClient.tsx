import {UserDetails} from "../model/model";

export class GithubClient {

    getUserDetails(user: String): Promise<UserDetails> {
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

}
