import React, {useEffect, useState} from 'react';
import {GithubClient} from "../../Api/GithubClient";
import {User} from "../../model/model";

interface UserDetailsProps {
    login: string,
    githubClient: GithubClient
}

export const UserDetails = (userDetailsProps: UserDetailsProps) => {

    const [user, setUser] = useState<User>();

    useEffect(() => {
       userDetailsProps.githubClient.getUserDetails(userDetailsProps.login)
           .then(setUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <div>
            <img data-testid={"avatar"} src={user.avatar_url} alt={user.name}/> <br/>
            <label data-testid={"name"}>{user.name}</label> <br/>
            <label data-testid={"location"}>{user.location}</label> <br/>
        </div>
    )
}