import React, {useEffect, useState} from 'react';
import {Users} from "../../model/model";
import {GithubClient} from "../../Api/GithubClient";
import './user.css'
import { Link } from 'react-router-dom';

interface UserProps {
    githubClient: GithubClient
}

export const UserList = ({githubClient}: UserProps) => {

    const [users, setUsers] = useState<Users[]>();

    useEffect(() => {
        githubClient.getUsers()
            .then(setUsers)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!users) {
        return (
            <div>
                Loading.....
            </div>
        )
    }

    return (
        <table className={"styled-table"}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {users.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{data.id}</td>
                            <td>{data.login}</td>
                            <td>
                                <Link data-testid={"viewLink"} to={`/users/${data.login}`}>View</Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
